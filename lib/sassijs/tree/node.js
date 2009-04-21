SassijsTreeNode = function( line, newOptions ){ 
  this.children = [];
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

SassijsTreeNode.method( 'toS', function() {
  var result = "";
  for( child in this.getChildren() ){
    if( child.isType( AttrNode ) ){
      throw( new SassijError( 'Attributes aren\'t allowed at the root of a document.', child.line ) );
    } else {
      //    result << "#{child.to_s(1)}" + (@style == :compressed ? '' : "\n")
      // need to add a @style indicator at some point
      result += child.toS( 1 );
    }
  }
      // @style == :compressed ? result+"\n" : result[0...-1]
  return result;
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
        ruleChildren[ i ] = prefixRule + " " + ruleChildren[ i ];
      }
    }
    return ruleChildren;
  } else {
    // This is returned by an attribute.
//    return this.getLine().getSyntax();
  }
});

