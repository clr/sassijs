SassijsNodeComment = function( syntax, tabCount, lineNumber ){ 
  this.nodeName = '#node';
  this.nodeValue = null;
  this.nodeType = 'sassijsNodeComment';
  this.syntax = syntax;
  this.tabCount = tabCount;
  this.lineNumber = lineNumber;
  this.childNodes = [];
};
SassijsNodeComment.inherits( SassijsNode );
