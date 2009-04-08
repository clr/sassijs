// This class evaluates variables and expressions, but not 
// mixins, which are appended to trees at an earlier stage
// in pre-processing.
SassijsExpression = function( string, variables ){
  this.string = string;
  // variables are the databank prepolated with SassijsVariables.
  this.variables = variables;
  this.parts = [];
  this.identifiedParts = [];
  this.operators = [ '*', '/', '%', '+', '-' ]
  this.first_operators = [ '*', '/', '%' ]
  this.second_operators = [ '+', '-' ]
}

SassijsExpression.method( 'getValue', function(){
  // This means that we have sub-expressions, not just literals, 
  // and therefore need to parse them out and evaluate them individually.
  var subExpression = false;
  if( subExpression = this.getFirstPrecedentExpression() ){
    return( new SassijsExpression( subExpression[0] + new SassijsExpression( subExpression[1] ).getValue() + subExpression[2] ).getValue() );
  } else if( subExpression = this.getSecondPrecedentExpression() ){
    return( new SassijsExpression( subExpression[0] + new SassijsExpression( subExpression[1] ).getValue() + subExpression[2] ).getValue() );
  } else if( subExpression = this.getSecondPrecedentExpression() ){
    return( new SassijsExpression( subExpression[0] + new SassijsExpression( subExpression[1] ).getValue() + subExpression[2] ).getValue() );
  } else if( subExpression = this.getSecondPrecedentExpression() ){
    return( new SassijsExpressionTerm( this.getString() );
  }
  // Otherwise attempt to evaluate the string as-is.
  // First we parse the string into operands, literals, and variables.
  var parts = this.getParts();
  
});

SassijsExpression.method( 'getString', function(){
  return this.string;
}

// We take parenthesis to return three strings: before the opening paren,
// the contents of the parens, and after the closing, matching paren.
SassijsExpression.method( 'getFirstPrecedentExpression', function(){
  var startParenIndex = null;
  if( startParenIndex = this.string.search( /\(/ ) ){
    // Retrieve next sub-expression.
    subexpression = new StringScanner( this.string );
    var parenLevel = 0;
    var paren = null;
    var endParenIndex = null;
    while( ( endParenIndex == null ) && ( paren = subexpression.scanIndex( /\(|\)/ ) ) ){
      if( this.string.charAt( paren - 1 ) == "(" ){
        parenLevel++;
      } else if( this.string.charAt( paren - 1 ) == ")" ) {
        // A parenLevel of 1 means that we found a matching first-order closing parenthesis. 
        // We can raise an error here about non-matching parens.
        if( parenLevel == 1 ){ 
          endParenIndex = paren;
        } else {
          parenLevel--;
        }
      }
    }
    // At this point, we should have the index of the opening paren and 
    // the closing paren, which we can use to return the three segments.
    var anteExpression = this.string.substring( 0, ( startParenIndex ) );
    var subExpression = this.string.substring( ( startParenIndex + 1 ), ( endParenIndex - 1) );
    var postExpression = this.string.substring( ( endParenIndex ), ( this.string.length ) );
    return [ anteExpression, subExpression, postExpression ];
  } else {
    return false;
  }
});


// We break the higher-precedence operations into two terms and an operation.
// We cannot have any parenthesis when we get to this point, or we will fail.
SassijsExpression.method( 'getSecondPrecedentExpression', function(){
  subexpression = new StringScanner( this.string );
  var operator = subexpression.scanIndex( /(^\s+)(\s?)(\\|\*|\%)(\s?)(^\s+)/ );
  if( operator ){
    // At this point, we should have the index of the operator, which 
    // we can use to return the three segments.
    var anteExpression = this.string.substring( 0, ( operator - 1 ) );
    var operator = this.string.charAt( operator );
    var postExpression = this.string.substring( ( operator + 1 ), ( this.string.length ) );
    return [ anteExpression, operator, postExpression ];
  } else {
    return false;
  }
});


// We split the string into chunks so each term can be identified.
SassijsExpression.method( 'getParts', function(){
  var split = this.string.split( " " );
  for( var i = 0; i < split.length; i++ ){
    if( split[ i ].length > 0 ){
      this.parts.push( split[ i ] );
    }
  }
  return this;
});

// Factory Pattern to spin the parts out to expression/part classes.
SassijsExpression.method( 'determineParts', function(){
  var identifiedParts = [];
  for( var i = 0; i < this.parts.length; i++ ){
    if( this.operators.hasElement( this.parts[ i ] ) ){
      this.identifiedParts.push( new SassijsExpressionOperator( this.parts[ i ] ) );
    } else if( term = new SassijsExpressionTerm( this.parts[ i ] ) ){
      this.identifiedParts.push( term );
    } else {
    // Raise error.
    }
  }
  return this;
});

// Factory Pattern to spin the parts out to expression/part classes.
SassijsExpression.method( 'getValue', function(){
  var identifiedParts = [];
  for( var i = 0; i < this.parts.length; i++ ){
    if( this.operators.hasElement( this.parts[ i ] ) ){
      this.identifiedParts.push( new SassijsExpressionOperator( this.parts[ i ] ) );
    } else if( term = new SassijsExpressionTerm( this.parts[ i ] ) ){
      this.identifiedParts.push( term );
    } else {
    // Raise error.
    }
  }
  return this;
});


