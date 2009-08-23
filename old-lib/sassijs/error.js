SassijError = function( newComment, newLineNumber, supressRaise ){
  this.setComment( newComment == undefined ? "Unspecified Error" : newComment );
  this.setLineNumber( newLineNumber == undefined ? "None" : newLineNumber  );
  
  if( supressRaise != true ){
    throw( this.toString() );
  }
}

SassijError.method( 'getComment', function(){
  return this.comment;
});

SassijError.method( 'getLineNumber', function(){
  return this.lineNumber;
});

SassijError.method( 'setComment', function( newValue ){
  this.comment = newValue;
  return this;
});

SassijError.method( 'setLineNumber', function( newValue ){
  this.lineNumber = newValue;
  return this;
});

SassijError.method( 'shout', function(){
  alert( this.toString() );
});

SassijError.method( 'toString', function(){
  return ( this.getComment() + ": " + this.getLineNumber() );
});
