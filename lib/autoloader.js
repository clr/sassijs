SassijsAutoloader = {

  getTemplates: function(){
    var sassLinks = [];
    var potentialSass = document.getElementsByTagName( 'link' );
    for( var i = 0; i < potentialSass.length; i++ ){
      if( potentialSass[ i ].getAttribute( 'type' ) == 'text/sass' ){
        sassLinks.push( potentialSass[ i ].getAttribute( 'href' ) );
      }
    }
    return sassLinks;
  },
  
  run: function(){
    var sassLinks = SassijsAutoloader.getTemplates();
    for( var i = 0; i < sassLinks.length; i++ ){
      sassijs = new SassijsFile( sassLinks[ i ], false );
      sassijs.writeToDocument();
    }
  }

}

window.onload = function(){ SassijsAutoloader.run(); };
