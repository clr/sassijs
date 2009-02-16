SassijError = function( newComment, newLineNumber, supressRaise ){
  this.setComment( newComment == undefined ? "Unspecified Error" : newComment );
  this.setLineNumber( newLineNumber == undefined ? "None" : newLineNumber  );
  
  if( supressRaise != true ){
    throw( this.toString() );
  }
}

SassijError.attr( 'comment' ).attr( 'lineNumber' );

SassijError.method( 'shout', function(){
  alert( this.toString() );
});

SassijError.method( 'toString', function(){
  return ( this.getComment() + ": " + this.getLineNumber() );
});
