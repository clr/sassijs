SassijsNodeMixinInclude = function( syntax, tabCount, lineNumber ){ 
  this.nodeName = '#node';
  this.nodeValue = null;
  this.nodeType = 'sassijsNodeMixinInclude';
  this.syntax = syntax;
  this.tabCount = tabCount;
  this.lineNumber = lineNumber;
  this.childNodes = [];
};
SassijsNodeMixinInclude.inherits( SassijsNode );
