libraries = function(){
  return [
    'pepper',
    'sassijs',
    'helper',
    'string-scanner',
    'sassijs/error',
    'sassijs/environment',
    'sassijs/tree/node',
    'sassijs/script/string',
    'sassijs/engine',
    'sassijs/file',
    'sassijs/line',
    'sassijs/tree'
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

$( function(){

  $( [ '' ].concat( libraries( root ) ) ).each( function( i, test ){ 
    var option = $( '<option>'+test+'</option>' );
    $( '#test_select' ).append( option );
    $( option ).data( 'url', document.location.toString().split( "sassijs\/test", 1 )[0] + 'sassijs/test/' + test + '.qunit' );
  });

  $( '#test_select' ).change( function(){
    var url = $( $( '#test_select option:selected' )[0] ).data( 'url' );
    if( url.length > 0 ){
      document.location = url;
    }
  });

})
