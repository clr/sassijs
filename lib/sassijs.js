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

Sassijs.method( 'getCss', function(){
  return this.getTree().getRoot().getCss().join( '\n' );
});

Sassijs.method( 'getStyleElement', function(){
  return '<style type="text/css"><!--\n' + this.getCss() + '\n--></style>';
});

Sassijs.method( 'writeToDocument', function(){
  var style = document.createElement( 'style' );
  var definition = this.getTree().getRoot().getCss().join( '\n' );
  style.setAttribute( "type", "text/css" );
  if( style.styleSheet ){
    // IE
    style.styleSheet.cssText = definition;
  } else {
    // Good browsers.
    var text = document.createTextNode( definition );
    style.appendChild( text );
  }
  document.getElementsByTagName('head')[0].appendChild( style );
});

