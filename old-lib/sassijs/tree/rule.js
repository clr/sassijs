SassijsTreeNodeRule = function( line ){
  this.children = [];
  this.species = 'rule';
  this.line = line;
};

SassijsTreeNodeRule.inherits( SassijsTreeNode );

/*
I don't think I'll need this function after all.

''
// This function has to look at it's children, and if it 
// sees a compressed Rule node, it splits that node into
// two, with identical children.
SassijsTreeNodeRule.method( 'determineMitosis', function(){
  var css = '';
  var attributes = [];
  for( var i = 0; i < this.getChildren().length; i++ ){
    var child = this.getChildren()[ i ];
    if( ( child.getSpecies() == "" ) && child.getLine().getSyntax().indexOf( ',' ) ){
      var uncompressedRules = child.getLine().getSyntax().split( ',' );
    }
    if( )switch( this.getChildren()[ i ].getSpecies() ){
      case 'rule':
        css += this.getLine().getSyntax() + ' ' + this.getChildren()[ i ].getCss();
      case 'attribute':
        attributes.push( this.getChildren()[ i ].getCss() );
    }
  }
  if( attributes.length > 0 ){
    return this.getLine().getSyntax() + " { " + attributes.join( '; ' ) + " }";
  } else {
    return css;
  }
});

SassijsTreeNodeRule.method( 'getCss', function(){
  var css = '';
  var attributes = [];
  for( var i = 0; i < this.getChildren().length; i++ ){
    switch( this.getChildren()[ i ].getSpecies() ){
      case 'rule':
        css += this.getLine().getSyntax() + ' ' + this.getChildren()[ i ].getCss();
      case 'attribute':
        attributes.push( this.getChildren()[ i ].getCss() );
    }
  }
  if( attributes.length > 0 ){
    return this.getLine().getSyntax() + " { " + attributes.join( '; ' ) + " }";
  } else {
    return css;
  }
});

*/
