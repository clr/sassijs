Sassijs = function( template ){
  this.template = template;
};

Sassijs.method( 'getTree', function(){
  // Lazy-load.
  if( this.tree == null ){
    this.determineTree();
  }
  return this.tree;
});

Sassijs.method( 'getTemplate', function(){
  return this.template;
});

Sassijs.method( 'determineTree', function(){
  this.tree = new SassijsTree( this.getTemplate() );
});


