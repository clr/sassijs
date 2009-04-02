SassijsTreeNodeComment = function( line ){
  this.species = 'comment';
  this.line = line;
};

SassijsTreeNodeComment.inherits( SassijsTreeNode );

SassijsTreeNodeComment.method( 'getCss', function(){
  var css = this.getLine().getRule() + " */";
  return css; 
});

