// BIG TODO: Figure out wtf to do with em and ens.
SassijsExpressionUnit = function( string ){
  this.unit = string;
  this.acceptableChars = [ '\*', '\/', '\%', '\+', '\-', '\(', '\)', '\=\=', '\!\=', '\>\=', '\<\=', '\>', '\<' ];
  this.sizeSpecies = [ 'in', 'cm', 'pc', 'mm', 'pt', 'px' ];
  this.sizeConversion_table = [
    [ 1,                2.54,         6,            25.4,        72,          72         ], // in
    [ null,             1,            2.36220473,   10,          28.3464567,  28.3464567 ], // cm
    [ null,             null,         1,            4.23333333,  12,          12         ], // pc
    [ null,             null,         null,         1,           2.83464567,  2.83464567 ], // mm
    [ null,             null,         null,         null,        1,           1          ], // pt
    [ null,             null,         null,         null,        null,        1          ]  // px
  ];
};

SassijsExpressionUnit.method( 'getSpecies', function( sample ){
  // Break the sample into terms, and look at the first one to 
  // determine what unit type.  The default is text.
  terms = sample.match( /(\w|\d|\.)+/g );
  firstTerm = terms[0];
  sizeRegex = new RegExp( '(\d|\.)+' + this.sizeSpecies.join( '|' ) );
  if( sizeRegex.exec( firstTerm ) ){
    return 'size';
  }
});

// This function assumes that we have already identified the expression in size.
SassijsExpressionUnit.method( 'getInPoints', function( sample ){
  // Break the sample into terms, and look at the first one to 
  // determine what unit type.  The default is text.
  specialChars = ( new SassijsExpression ).getAcceptableChars();
  termsAndOperatorsRegex = new RegExp( '(\d|\.)+' + this.acceptableChars.join( '|' ) );
  if( sizeRegex.exec( first_term ) ){
    return 'size';
  }
});


// This function assumes that we have already identified the expression in size.
SassijsExpressionUnit.method( 'getNormalizedExpression', function( sample ){
  // Break the sample into terms, and look at the first one to 
  // determine what unit type.  The default is text.
  var termsAndOperatorsRegex = new RegExp( '(\d|\.)+|' + this.acceptableChars.join( '|' ) );
  var termsAndOperators = termsAndOperatorsRegex.exec( sample );
  var normalized = [];
  for( i = 0; i < termsAndOperatorsRegex; i++ ){
    if( termsAndOperators[ i ].search( /^(\d|\.)+/ ) ){
      normalized.push( this.getInPoints( termsAndOperators[ i ] ) );
    } else {
      normalized.push( termsAndOperators[ i ] );
    }
  }
  return normalized.join( ' ' ); // Just for readability in development.
});


