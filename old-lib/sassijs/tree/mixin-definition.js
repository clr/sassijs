SassijsTreeNodeMixinDefinition = function( line ){
  this.species = 'mixinDefinition';
  this.line = line;
};

SassijsTreeNodeMixinDefinition.inherits( SassijsTreeNode );

// In this special case, we want the node to return its children
// rendered as CSS.  This node will be removed from the tree
// root in pre-processing.
SassijsTreeNodeMixinDefinition.method( 'getCss', function(){
  var css = '';
  var children = this.getChildren();
  for( i = 0; i < children.length; i++ ){
    css += children[ i ].getCss();
  }
  return css;
});

