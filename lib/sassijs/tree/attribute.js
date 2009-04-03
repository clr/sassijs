SassijsTreeNodeAttribute = function( line ){
  this.species = 'attribute';
  this.line = line;
  // The regex that matches and extracts data from  attributes 
  // of the form <tt>:name attr</tt>.
  this.regex = /^:([^\s=:]+)\s*(=?)(?:\s+|$)(.*)/;
  // The regex that matches and extracts data from attributes 
  // of the form <tt>name: attr</tt>.
  this.regexAlternate = /^([^\s=:]+)(\s*=|:)(?:\s+|$)(.*)/;
};

SassijsTreeNodeAttribute.inherits( SassijsTreeNode );

SassijsTreeNodeAttribute.method( 'getParts', function(){
  if( this.parts != null ){ 
    return this.parts; 
  }
  this.parts = this.getLine().getSyntax().match( this.regex );
  // If we don't get a match, try the alternate syntax, which is much closer
  // to original CSS.  This is one of the only places where we may differ 
  // from the Ruby SASS implementation, because they don't appear to allow
  // mixing of the normal and alternate sytax.
  if( this.parts == null ){
    this.parts = this.getLine().getSyntax().match( this.regexAlternate );
  }
  return this.parts;
});

SassijsTreeNodeAttribute.method( 'getKey', function(){
  // Lazy load the key.
  if( this.key == null ){
    this.key = this.getParts()[1];
  }
  return this.key;
});

SassijsTreeNodeAttribute.method( 'getValue', function(){
  // The character that designates that an attribute should be assigned 
  // to a SassScript expression.
  var expressionChar = '!';

  // Lazy load the value.
  if( this.value != null ){
    return this.value;
  }
  if( this.getParts()[2] == expressionChar ){
// Expressions are for evaluation.
  } else {
    this.value = this.getParts()[3];
  }
  return this.value;
});

SassijsTreeNodeAttribute.method( 'getCss', function(){
  return this.getKey() + ": " + this.getValue() + ";";
});

