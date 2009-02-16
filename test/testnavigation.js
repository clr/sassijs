$( function(){

  $( [
    '',
    'helper',
    'string-scanner',
    'pepper',
    'sassij/error',
    'sassij/engine',
    'sassij/tree/node',
    'sassij/tree/attr-node'
  ] ).each( function( i, test ){ 
    var option = $( '<option>'+test+'</option>' );
    $( '#test_select' ).append( option );
    $( option ).data( 'url', document.location.toString().split( "sassij\/test", 1 )[0] + 'sassij/test/' + test + '.qunit' );
  });

  $( '#test_select' ).change( function(){
    var url = $( $( '#test_select option:selected' )[0] ).data( 'url' );
    if( url.length > 0 ){
      document.location = url;
    }
  });

})
