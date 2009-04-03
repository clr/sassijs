SassijsTreeNodeRule = function( line ){
  this.species = 'rule';
  this.line = line;
};

SassijsTreeNodeRule.inherits( SassijsTreeNode );

SassijsTreeNodeRule.method( 'getCss', function(){
  var css = this.getLine().getSyntax();
  return css;
});

