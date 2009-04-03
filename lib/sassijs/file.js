// This class wraps Sassijs and simply loads a file into the template variable.  We
// assume the presence of a loading DOM element 'document'.
SassijsFile = function( url, async ){
  this.loaded = false;
  this.template = null;
  this.fetch( url, async );
}

SassijsFile.inherits( Sassijs );

SassijsFile.method( 'isLoaded', function(){
  return this.loaded;
});

SassijsFile.method( 'fetch', function( url, async ){
  // Asynchronous transfer is the default.
  if( async != false ){
    async = true;
  }
  if( window.XMLHttpRequest ){
    req = new XMLHttpRequest();
  } else if( window.ActiveXObject ){
    req = new ActiveXObject("Microsoft.XMLHTTP");
  }
  // This is an asynch call that won't freeze up the browser.
  if( ( async ) && ( req != undefined ) ){
    var that = this;
    req.onreadystatechange = function(){ 
      if( req.readyState == 4 ) { // only if req is "loaded"
        if( ( req.status == 200 ) || ( req.status == 0 ) ) { // only if "OK" (0 is status for locally served files)
          this.loaded = true;
          this.template = req.responseText;
        } else {
          this.loaded = false;
        }
      }
    };
    req.open( "GET", url );
    req.send( "" );
  // This is a synchronous call that holds up the browser, which is 
  // necessary for qUnit to work properly, for example.
  } else {
    var that = this;
console.log( url );
    req.open( "GET", url, false );
    req.send( "" );
    if( req.readyState == 4 ) { // only if req is "loaded"
      if( ( req.status == 200 ) || ( req.status == 0 ) ) { // only if "OK" (0 is status for locally served files)
        this.loaded = true;
        this.template = req.responseText;
      } else {
        this.loaded = false;
      }
    }
  }
});

