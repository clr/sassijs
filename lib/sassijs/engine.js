SassijsEngine = function( sassijsTree ){
  this.root = sassijsTree.getRoot();
}

SassijsEngine.method( 'getCss', function(){
  var css = '';
  for( var i = 0; i < this.root.getChildren().length; i++ ){
    css += this.root.getChildren()[ i ].getCss() + '\n';
  }
  return css;
});

