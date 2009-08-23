// This class evaluates variables and expressions, but not 
// mixins, which are appended to trees at an earlier stage
// in pre-processing.
SassijsExpression = function( string, variables ){
  this.string = string;
  // variables are the databank prepolated with SassijsVariables.
  this.variables = variables;
  this.parts = [];
  this.identifiedParts = [];
  this.acceptableChars = [ '*', '/', '%', '+', '-', '(', ')', '==', '!=', '>=', '<=', '>', '<' ];
  this.operators = [ '*', '/', '%', '+', '-' ];
  this.first_operators = [ '*', '/', '%' ];
  this.second_operators = [ '+', '-' ];
};

SassijsExpression.method( 'getExpression', function(){
  return this.string.slice( 1, ( this.string.length ) );
});

SassijsExpression.method( 'getValue', function(){
  var sassijsExpressionUnit = new SassijsExpressionUnit();
  var species = sassijsExpressionUnit.getSpecies( this.getExpression() );
  switch( species ){
    case 'size':
      var expressionString = sassijsExpressionUnit.getNormalizedSize( this.getExpression() );
      var points = eval( expressionString );
      return points + 'pt';
    default:
      return this.getExpression();
  }
  
});



