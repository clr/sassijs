SassijsTreeNode = function( line, newOptions ){ 
  this.nodeName = null;
  this.nodeValue = null;
  this.nodeType = null;

  if( newOptions ){
    this.options = newOptions;
  } else {
    this.options = { style: 'none' };
  }
  this.style = this.options.style;
  this.line = line;
};

// It's an odd kind of tree, but we can only traverse out,
// and these poor children will never know their parents.
SassijsTreeNode.method( 'getChildren', function(){
  return this.children;
});

// It's an odd kind of tree, but we can only traverse out,
// and these poor children will never know their parents.
SassijsTreeNode.method( 'hasChildren', function(){
  return( this.children.length > 0 );
});

SassijsTreeNode.method( 'getLine', function(){
  return this.line;
});

SassijsTreeNode.method( 'setChildren', function( newValue ){
  this.children = newValue;
  return this;
});

SassijsTreeNode.method( 'appendChild', function( child ){
  if( error = this.isInvalidChild( child ) ) {
    throw( new SassijError( error, child.line ) );
  }
  this.children.push( child );
  return this;
});
  
SassijsTreeNode.method( 'getLastChild', function() {
  return this.getChildren()[ this.getChildren().length - 1 ];
});


SassijsTreeNode.method( 'getSpecies', function(){
  return this.species;
});
  
// This method should be overridden by subclasses to return an error message
// if the given child node is invalid,
// and false or nil otherwise.
SassijsTreeNode.method( 'isInvalidChild', function( child ){
  return false;
});

// This is a funny function, because it has to take the tree and flip
// it around into an array such that each leaf is a new array entry,
// with its lineage prepended.  The catch is that nodes don't know
// their parents, so this has to be done in one large recursive crawl.
SassijsTreeNode.method( 'getCss', function(){
  var css = '';
  var ruleChildren = [];
  var attributeChildren = [];
  for( var i = 0; i < this.getChildren().length; i++ ){
    switch( this.getChildren()[ i ].getSpecies() ){
      case 'rule':
        ruleChildren = ruleChildren.concat( this.getChildren()[ i ].getCss() );
        break;
      case 'attribute':
        attributeChildren.push( this.getChildren()[ i ].getCss() );
        break;
      default:
        break;
    }
  }
  if( attributeChildren.length > 0 ){
    ruleChildren.unshift( "{ " + attributeChildren.join( ' ' ) + " }" );
  }
  if( ruleChildren.length > 0 ){
    // Rules should always have ruleChildren, either as subchildren or as 
    // a collection of attributes.
    for( var i = 0; i < ruleChildren.length; i++ ){
      prefixRule = this.getLine().getSyntax();
      if( prefixRule.length > 0 ){
        // Sometimes CSS rules are compressed like 'a span, a div' and we
        // need to expand those children here and prepend the parent to 
        // both sub-rules, span and div in the above example.
        if( ruleChildren[ i ].indexOf( ',' ) ){
          ruleChildrenParts = ruleChildren[ i ].split( ', ' );
          for( var j = 0; j < ruleChildrenParts.length; j++ ){
            ruleChildrenParts[ j ] = prefixRule + " " + ruleChildrenParts[ j ];
          }
          ruleChildren[ i ] = ruleChildrenParts.join( ', ' );
        } else {
          ruleChildren[ i ] = prefixRule + " " + ruleChildren[ i ];
        }
      }
    }
    return ruleChildren;
  } else {
    // This is returned by an attribute.
//    return this.getLine().getSyntax();
  }
});


// There are several cases where the children of a node are compressed
// in a short-hand.  When this node is a Rule, it needs to have its
// children duplicated and appended to the split Rule in order to be 
// uncompressed.
SassijsTreeNode.method( 'recurse', function( anonymousFunction ){
  anonymousFunction.call( this );
  for( var i = 0; i < this.getChildren().length; i++ ){
    this.getChildren()[ i ].recurse( anonymousFunction );
  }
});
