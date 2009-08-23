SassijsTreeNodeComment = function( line ){
  this.children = [];
  this.species = 'comment';
  this.line = line;
};

SassijsTreeNodeComment.inherits( SassijsTreeNode );

SassijsTreeNodeComment.method( 'getCss', function(){
  var css = this.getLine().getSyntax() + " */";
  return css; 
});

