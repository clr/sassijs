loadJavascriptLibrary = function( root ){
  var libraries = [
    'lib/pepper',
    'lib/sassij',
    'lib/helper',
    'lib/string-scanner',
    'lib/sassij/engine',
    'lib/sassij/tree/node'
  ]
  for( i = 0; i < libraries.length; i++ ){
    var library = document.createElement( 'script' );
    library.setAttribute( "type", "text/javascript" );
    library.setAttribute( "src", root + '/' + libraries[i] + '.js' );
    document.getElementsByTagName( 'head' )[0].appendChild( library );
  }
}

var root = document.location.toString().split( "\/test", 1 )[0];
loadJavascriptLibrary( root );

