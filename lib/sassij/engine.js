//  This is the class where all the parsing and processing of the Sass
//  template is done. It can be directly used by the user by creating a
//  new instance and calling <tt>render</tt> to render the template. For example:
//  
//    template = File.load('stylesheets/sassy.sass')
//    sass_engine = Sass::Engine.new(template)
//    output = sass_engine.render
//    puts output
SassijEngine = function( vars ){
  
  var dslString = vars;
    // The character that begins a CSS attribute.
  var attributeChar        = ':';     
    // The character that designates that an attribute should be assigned to a SassScript,
    // expression.
  var scriptChar           = '=';
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
    // The regex that matches and extracts data from
    // attributes of the form <tt>:name attr</tt>.
  var attribute             = new RegExp( "^:([^\s=:]+)\s*(=?)(?:\s+|$)(.*)" );
    // The regex that matches attributes of the form <tt>name: attr</tt>.
  var attributeAlternateMatcher = new RegExp( "^[^\s:]+\s*[=:](\s|$)" );
    // The regex that matches and extracts data from
    // attributes of the form <tt>name: attr</tt>.
  var attributeAltornate   = new RegExp( "^([^\s=:]+)(\s*=|:)(?:\s+|$)(.*)" );
  
  newOptions.style = 'nested';
  newOptions.loadPaths = [ '.' ];
  this.options = newOptions;
  this.template = template;
}

SassijTreeNode.attr( 'environment', new SassijEnvironment() );
SassijTreeNode.prototype.environment.important = new SassijScriptString( "!important" );

SassijEngine.method( 'render', function(){
  return 'test';
});

SassijEngine.method( 'toSassij', function(){
  return dslString;
});

// We interpret the syntax as a tree, with each indentation representing a new leaf.
SassijEngine.method( 'renderToTree', function(){ 
  root = new SassijTreeNode();
  root.appendChildren( tree( tabulate( this.toSassij() ) );
  return root;
});


Sassij.prototype.engine = new SassijEngine();

