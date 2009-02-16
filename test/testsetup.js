libraries = function(){
  return [
    'pepper',
    'sassij',
    'helper',
    'string-scanner',
    'sassij/error',
    'sassij/engine',
    'sassij/tree/node'
  ];
};

loadJavascriptLibrary = function( root ){
  for( i = 0; i < libraries().length; i++ ){
    var library = document.createElement( 'script' );
    library.setAttribute( "type", "text/javascript" );
    library.setAttribute( "src", root + '/lib/' + libraries()[i] + '.js' );
    document.getElementsByTagName( 'head' )[0].appendChild( library );
  }
}

var root = document.location.toString().split( "\/test", 1 )[0];
loadJavascriptLibrary( root );

