SassijsTreeNodeRule = function( line ){
  this.children = [];
  this.species = 'rule';
  this.line = line;
};

SassijsTreeNodeRule.inherits( SassijsTreeNode );

SassijsTreeNodeRule.method( 'determineMitosis', function(){
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

/*
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
