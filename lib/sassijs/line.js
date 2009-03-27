// This class populates an object that establishes the properties
// of one rule, and hints at some of its context in the tree.
SassijsLine = function( string, tab, lineNumber ){
  this.lineNumber = lineNumber;
  this.rule = '';
  this.tabCount = 0;
  
  // Count the tabs.
  findTab = new RegExp( "^" + tab );
  potentialRule = string;
  while( result = findTab.exec( potentialRule ) ){
    potentialRule = RegExp.rightContext;
    this.tabCount++;
  }

  // Strip extra whitespace from the rule.
  this.rule = string.replace( /[\s|\t]+/g, ' ' ).replace( /^\s+|\s+$/g, '' );
}

SassijsLine.method( 'getRule', function(){
  return this.rule;
});

SassijsLine.method( 'getTabCount', function(){
  return this.tabCount;
});

SassijsLine.method( 'getLineNumber', function(){
  return this.lineNumber;
});


