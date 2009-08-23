// This class is inspired by the Ruby class of the same name.  Essentially, this
// is a string which keeps track of an index and only scans the remainder of the
// string from that index forward.  Think of a StringIO.
StringScanner = function( string ){
  this.original = string;
  this.index = 0;
};

StringScanner.method( 'advanceIndex', function( advance ){
  this.index = this.index + advance;
  return this;
});

StringScanner.method( 'getCurrent', function(){
  return this.original.slice( this.index );
});

StringScanner.method( 'scan', function( pattern ){
  var newIndex = this.getCurrent().search( pattern );
  if( newIndex >= 0 ){
    var result = this.getCurrent().match( pattern );
    this.advanceIndex( newIndex + result.toString().length );
    return result.toString();
  }
  return false;
});

StringScanner.method( 'scanIndex', function( pattern ){
  var newIndex = this.getCurrent().search( pattern );
  if( newIndex >= 0 ){
    var result = this.getCurrent().match( pattern );
    this.advanceIndex( newIndex + result.toString().length );
    return this.index;
  }
  return false;
});
