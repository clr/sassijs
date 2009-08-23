/*
 * This class implements a Factory Pattern to return the correct species of SassijsNode.
 */
SassijsNodeFactory = function( tab ){ 
  this.tab = tab;
};

/*
 * Use the beginning characters of the template syntax to determine
 * what tye of SassijsNode we want.
 *
 * @param {String} templateText
 * @return {Function} type of SassijsNode of which we will create an instance
 */
SassijsNodeFactory.method( 'determineNode', function( templateText ){
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
  
  switch( templateText[0] ){
    case attributeChar:
      // CSS3 pseudo-elements begin with '::'
      if( templateText[1] != ':' ){
        return SassijsNodeAttribute;
      } else {
        return SassijsNodeRule;
      }
//    case expressionChar:
//      return SassijsNodeScript;
    case variableChar:
      return SassijsNodeVariable;
    case commentChar:
      // Two kinds of comments: SASS comments and CSS comments.
      if( templateText[1] == sassCommentChar ){
        return null;
      } else if( templateText[1] == cssCommentChar ){
        return SassijsNodeComment;
      } else {
        return SassijsNodeRule;
      }
    case directiveChar:
      return SassijsNodeDirective;
    case escapeChar:
//???       return new SassijsTreeNodeEscape();
//      when ESCAPE_CHAR
//        Tree::RuleNode.new(line.text[1..-1], @options)
    case mixinDefinitionChar:
      return SassijsNodeMixinDefinition;
    case mixinIncludeChar:
//????
//        if line.text[1].nil?
//          Tree::RuleNode.new(line.text, @options)
//        else
//          parse_mixin_include(line, root)
//        end
      return SassijsNodeMixinInclude;
    default:
      if( templateText.match( attributeAlternateMatcher ) ){
        return SassijsNodeAttribute;
//???          parse_attribute(line, ATTRIBUTE_ALTERNATE)
      } else {
        return SassijsNodeRule;
      }
  }
});
/*
 * Take a line of text, find the SASS syntax in it, and return the 
 * appropriate node.
 *
 * @param {String, Integer} templateText, lineNumber
 * @return {SassijsNode} prefilled with what it can presume.
 */
SassijsNodeFactory.method( 'getNode', function( templateText, lineNumber ){
  var tabCount = 0;
  
  // Count the tabs.
  findTab = new RegExp( "^" + this.tab );
  var potentialSyntax = templateText;
  while( result = findTab.exec( potentialSyntax ) ){
    potentialSyntax = RegExp.rightContext;
    tabCount++;
  }

  // Strip extra whitespace from the rule.
  var syntax = templateText.replace( /[\s|\t]+/g, ' ' ).replace( /^\s+|\s+$/g, '' );
  var species = this.determineNode( syntax );
  if( species ){
    return new species( syntax, tabCount, lineNumber );
  } else {
    return null;
  }
});

/*
 * We need a kind of generic super-node to attach a tree to.
 *
 * @param {}
 * @return {SassijsNode} root
 */
SassijsNodeFactory.method( 'getRoot', function(){
  var root = new SassijsNode( '', 0, -1 );
  root.nodeType = 'sassijsNodeRoot';
  return root;
});
