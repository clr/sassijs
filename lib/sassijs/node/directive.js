SassijsNodeDirective = function( syntax, tabCount, lineNumber ){ 
  this.nodeName = '#node';
  this.nodeValue = null;
  this.nodeType = 'sassijsNodeDirective';
  this.syntax = syntax;
  this.tabCount = tabCount;
  this.lineNumber = lineNumber;
  this.childNodes = [];
};
SassijsNodeDirective.inherits( SassijsNode );

