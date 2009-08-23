SassijsNodeMixinDefinition = function( syntax, tabCount, lineNumber ){ 
  this.nodeName = '#node';
  this.nodeValue = null;
  this.nodeType = 'sassijsNodeMixinDefinition';
  this.syntax = syntax;
  this.tabCount = tabCount;
  this.lineNumber = lineNumber;
  this.childNodes = [];
};
SassijsNodeMixinDefinition.inherits( SassijsNode );
