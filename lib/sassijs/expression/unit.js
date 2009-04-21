// BIG TODO: Figure out wtf to do with em and ens.
SassijsExpressionUnit = function( string ){
  this.unit = string;
  this.acceptableChars = [ '\\*', '\\/', '\\%', '\\+', '\\-', '\\(', '\\)', '\\=\\=', '\\!\\=', '\\>\\=', '\\<\\=', '\\>', '\\<' ];
  this.sizeSpecies = [ 'in', 'cm', 'pc', 'mm', 'pt', 'px' ];
  this.sizeConversion_table = [
    [ 1,                2.54,         6,            25.4,        72,          72         ], // in
    [ null,             1,            2.36220473,   10,          28.3464567,  28.3464567 ], // cm
    [ null,             null,         1,            4.23333333,  12,          12         ], // pc
    [ null,             null,         null,         1,           2.83464567,  2.83464567 ], // mm
    [ null,             null,         null,         null,        1,           1          ], // pt
    [ null,             null,         null,         null,        null,        1          ]  // px
  ];
  this.sizeConversionToPoints = { in: 72, cm: 28.3464567, pc: 12, mm: 2.83464567, px: 1, pt: 1 };
  this.termRegex = /([\d\.]+)([\w]*)/;
  this.termsAndOperatorsRegex = /[\d\.\w]+|\+|\*|\/|%|-|\(|\)|==|!=|>=|<=|>|</g;
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

// This function assumes that we have already identified the unit as a size.
SassijsExpressionUnit.method( 'getSizeInPoints', function( term ){
  var unitAndSpecies = term.match( this.termRegex );
  if( !unitAndSpecies ){
    return false;
  }
  var unit = unitAndSpecies[1];
  var species = unitAndSpecies[2];
  return( unit * this.sizeConversionToPoints[ species ] );
});


// You kids mess around too much.  Just convert everything into points.
// This function assumes that we have already identified the expression in size.
SassijsExpressionUnit.method( 'getNormalizedSize', function( sample ){
  // Break the sample into terms, and look at the first one to 
  // determine what unit type.  The default is text.
//  var termsAndOperatorsRegex = new RegExp( '(\\d|\\.|\\w)+|' + this.acceptableChars.join( '|' ) );
//var termsAndOperatorsRegex = /(\d|\.|\w)+|\*|\/|%|\+|-|\(|\)|==|!=|>=|<=|>|</g;
  var termsAndOperators = sample.match( this.termsAndOperatorsRegex );
  var normalized = [];
  for( var i = 0; i < termsAndOperators.length; i++ ){
    var unitInPoints = this.getSizeInPoints( termsAndOperators[ i ] );
    if( unitInPoints ){
      normalized.push( unitInPoints );
    } else {
      normalized.push( termsAndOperators[ i ] );
    }
  }
  return normalized.join( ' ' ); // Just for readability in development.
});


