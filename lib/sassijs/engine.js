//  This is the class where all the parsing and processing of the Sass
//  template begins. It can be directly used by the user by creating a
//  new instance and calling <tt>render</tt> to render the template. For example:
//  
//    template = File.load('stylesheets/sassy.sass')
//    sass_engine = Sass::Engine.new(template)
//    output = sass_engine.render
//    puts output
SassijEngine = function( newTemplate, vars ){
  
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
  
  newOptions = {};
  newOptions.style = 'nested';
  newOptions.loadPaths = [ '.' ];
  this.options = newOptions;
  this.template = newTemplate;
}

SassijEngine.prototype.environment = new SassijEnvironment();
SassijEngine.prototype.environment.important = new SassijScriptString( "!important" );

SassijEngine.method( 'render', function(){
  return 'test';
});

//SassijEngine.method( 'toSassij', function(){
//  return dslString;
//});

// We interpret the syntax as a tree, with each indentation representing a new leaf.
SassijEngine.method( 'renderToTree', function(){ 
  root = new SassijTreeNode( this.options );
  root.appendChildren( this.tree( this.tabulate( this.template ) )[0], true );
  return root;
});

SassijEngine.method( 'tabulate', function( string ){
  var tabString = nil;
  var first = true;
  var lines = string.replace( /\r|\n|\r\n|\r\n/g, "\n" ).split( /^.*?$/ );
  for( i = 0; i < lines.length; i++ ){
    i++
    if( line.indexOf( /\w/ ) || line.indexOf( /^\/\// ) ){ 
      var lineTabString = line.search( /^\s*/ );
      if( lineTabString.length > 0 ){
        if( tabString == nil ){
          tabString = lineTabSting;
          if( first ){
            new SassijError( "Indenting at the beginning of the document is illegal.", i );
          }
          
          if( tabString.search( /\s/ ) && tabString.search( /\t/ ) ) {
            new SassijError( "Indentation can't use both tabs and spaces.", i );
          }
        }
      }
    }
  }
})
/*
    def tabulate(string)
      tab_str = nil
      first = true
      string.gsub(, "\n").scan(/^.*?$/).enum_with_index.map do |line, index|
        index += 1
        next if line.strip.empty? || line =~ /^\/\//

        line_tab_str = line[/^\s* /]
        unless line_tab_str.empty?
          tab_str ||= line_tab_str

          raise SyntaxError.new("Indenting at the beginning of the document is illegal.", index) if first
          if tab_str.include?(?\s) && tab_str.include?(?\t)
            raise SyntaxError.new("Indentation can't use both tabs and spaces.", index)
          end
        end
        first &&= !tab_str.nil?
        next Line.new(line.strip, 0, index, 0, @options[:filename], []) if tab_str.nil?

        line_tabs = line_tab_str.scan(tab_str).size
        raise SyntaxError.new(<<END.strip.gsub("\n", ' '), index) if tab_str * line_tabs != line_tab_str
Inconsistent indentation: #{Haml::Shared.human_indentation line_tab_str, true} used for indentation,
but the rest of the document was indented using #{Haml::Shared.human_indentation tab_str}.
END
        Line.new(line.strip, line_tabs, index, tab_str.size, @options[:filename], [])
      end.compact
    end


// This puts the lines in an extended array.
SassijEngine.method( 'tree', function( lines, i ){
  if( i = undefined ){
    i = 0;
  }
  if( ( lines[ i ] == undefined ) || ( lines[ i ] == null ) ){
    return [ [], i ];
  }
  var base = lines[ i ].tabs;
  var nodes = [];
  while( ( var line = lines[ i ] ) && ( line.tabs >= base ) ){
    if( line.tabs > base ){
      if( line.tabs > ( base + 1 ) ){
        new SassijError( "The line was indented " + ( line.tabs - base ) + " levels deeper than the previous line.", line.index );
      }
      var tree = this.tree( lines, i );
      nodes[ ( nodes.length - 1 ) ].children = tree[0];
      i = tree[1];
    } else {
      nodes << line
      i++;
    }
  }
  return [ nodes, i ];
});
*/
