SassijsNodeRule = function( syntax, tabCount, lineNumber ){ 
  this.nodeName = '#node';
  this.nodeValue = null;
  this.nodeType = 'sassijsNodeRule';
  this.syntax = syntax;
  this.tabCount = tabCount;
  this.lineNumber = lineNumber;
  this.childNodes = [];
};
SassijsNodeRule.inherits( SassijsNode );
