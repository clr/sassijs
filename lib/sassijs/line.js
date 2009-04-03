// This class populates an object that establishes the properties
// of one rule, and hints at some of its context in the tree.
SassijsLine = function( string, tab, lineNumber, sassijs ){
  this.lineNumber = lineNumber;
  this.rule = '';
  this.tabCount = 0;
  // A reference to our context.
  this.sassijs = sassijs;
  
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

SassijsLine.method( 'getSyntax', function(){
  return this.rule;
});

SassijsLine.method( 'getSassijs', function(){
  return this.sassijs;
});

SassijsLine.method( 'getTabCount', function(){
  return this.tabCount;
});

SassijsLine.method( 'getLineNumber', function(){
  return this.lineNumber;
});

// This method implements the Factory Pattern that determines
// what kind of Node we are dealing with.
SassijsLine.method( 'determineNode', function(){
    // The character that begins a CSS attribute.
  var attributeChar        = ':';     
    // The character that designates that an node SassijsExpression.
  var variableChar           = '!';
    // The character that designates the beginning of a comment, either Sass or CSS.
  var commentChar          = '/';
    // The character that follows the general COMMENT_CHAR and designates a Sass comment,
    // which is not output as a CSS comment.
  var sassCommentChar     = '/';
    // The character that follows the general COMMENT_CHAR and designates a CSS comment,
    // which is embedded in the CSS document.
  var cssCommentChar      = '*';
    // The character used to denote a compiler directive.
  var directiveChar        = '@';
    // Designates a non-parsed rule.
  var escapeChar           = '\\';
    // Designates block as mixin definition rather than CSS rules to output
  var mixinDefinitionChar = '=';
    // Includes named mixin declared using MIXIN_DEFINITION_CHAR
  var mixinIncludeChar    = '+';
    // The regex that matches attributes of the form <tt>name: attr</tt>.
  var attributeAlternateMatcher = /^[^\s:]+\s*[=:](\s|$)/;
  
  switch( this.getSyntax()[0] ){
    case attributeChar:
      // CSS3 pseudo-elements begin with '::'
      if( this.getSyntax()[1] != ':' ){
        return new SassijsTreeNodeAttribute( this );
      } else {
        return new SassijsTreeNodeRule( this );
      }
//    case expressionChar:
//      return new SassijsScript( this );
    case variableChar:
      return new SassijsTreeNodeVariable( this );
    case commentChar:
      // Two kinds of comments: SASS comments and CSS comments.
      if( this.getSyntax()[ 1 ] == sassCommentChar ){
        return null;
      } else if( this.getSyntax()[ 1 ] == cssCommentChar ){
        return new SassijsTreeNodeComment( this );
      } else {
        return new SassijsTreeNodeRule( this );
      }
    case directiveChar:
      return new SassijsTreeNodeDirective( this );
    case escapeChar:
//???       return new SassijsTreeNodeEscape();
//      when ESCAPE_CHAR
//        Tree::RuleNode.new(line.text[1..-1], @options)
    case mixinDefinitionChar:
      return new SassijsTreeNodeMixinDefinition( this );
    case mixinIncludeChar:
//????
//        if line.text[1].nil?
//          Tree::RuleNode.new(line.text, @options)
//        else
//          parse_mixin_include(line, root)
//        end
      return new SassijsTreeNodeMixinInclude( this );
    default:
      if( this.getSyntax().match( attributeAlternateMatcher ) ){
        return new SassijsTreeNodeAttribute( this );
//???          parse_attribute(line, ATTRIBUTE_ALTERNATE)
      } else {
        return new SassijsTreeNodeRule( this );
      }
   }
});


