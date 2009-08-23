libraries = function(){
  return [
    'pepper',
    'sassijs',
    'helper',
    'node',
    'string-scanner',
    'sassijs/error',
    'sassijs/environment',
    'sassijs/tree/node',
    'sassijs/tree/attribute',
    'sassijs/tree/comment',
    'sassijs/tree/directive',
    'sassijs/tree/mixin-definition',
    'sassijs/tree/mixin-include',
    'sassijs/tree/rule',
    'sassijs/tree/variable',
    'sassijs/expression/unit',
    'sassijs/expression',
    'sassijs/file',
    'sassijs/line',
    'sassijs/tree',
    'autoloader'
  ];
};

templates = function(){
  return [
    'alt',
    'basic',
    'bork',
    'bork2',
    'compact',
    'complex',
    'compressed',
    'expanded',
    'import',
    'importee',
    'line_numbers',
    'mixins',
    'multiline',
    'nested',
    'parent_ref',
    '_partial',
    'script',
    'units'
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

  // Create the unit test selector.
  $( '#banner' ).append( $( "<span style='color:white;'>unit tests: </span><select id='unit_test_select'></select>" ) );
  $( [ '' ].concat( libraries() ) ).each( function( i, test ){ 
    var option = $( '<option>'+test+'</option>' );
    $( '#unit_test_select' ).append( option );
    $( option ).data( 'url', document.location.toString().split( "\/test", 1 )[0] + '/test/' + test + '.qunit' );
  });
  $( '#unit_test_select' ).change( function(){
    var url = $( $( '#unit_test_select option:selected' )[0] ).data( 'url' );
    if( url.length > 0 ){
      document.location = url;
    }
  });

  // Create the template-based integration test selector.
  $( '#banner' ).append( $( "<span style='color:white;'> integration tests: </span><select id='integration_test_select'></select>" ) );
  $( [ '' ].concat( templates() ) ).each( function( i, test ){ 
    var option = $( '<option>'+test+'</option>' );
    $( '#integration_test_select' ).append( option );
    $( option ).data( 'url', document.location.toString().split( "\/test", 1 )[0] + '/test/integrations.qunit?' + test );
  });
  $( '#integration_test_select' ).change( function(){
    var url = $( $( '#integration_test_select option:selected' )[0] ).data( 'url' );
    if( url.length > 0 ){
      document.location = url;
    }
  });
})
