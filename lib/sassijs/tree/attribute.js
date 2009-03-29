SassijsTreeNodeAttribute = function( line ){
  this.species = 'attribute';
  this.line = line;
};

SassijsTreeNodeAttribute.inherits( SassijsTreeNode );

SassijsTreeNodeAttribute.method( 'getCss', function(){
    // The regex that matches and extracts data from
    // attributes of the form <tt>:name attr</tt>.
  var attribute                 = /^:([^\s=:]+)\s*(=?)(?:\s+|$)(.*)/;
    // The regex that matches attributes of the form <tt>name: attr</tt>.
  var attributeAlternateMatcher = /^[^\s:]+\s*[=:](\s|$)/;
    // The regex that matches and extracts data from
    // attributes of the form <tt>name: attr</tt>.
  var attributeAlternate        = /^([^\s=:]+)(\s*=|:)(?:\s+|$)(.*)/;

//      if @options[:attribute_syntax] == :normal &&
//          attribute_regx == ATTRIBUTE_ALTERNATE
//        raise SyntaxError.new("Illegal attribute syntax: can't use alternate syntax when :attribute_syntax => :normal is set.")
//      elsif @options[:attribute_syntax] == :alternate &&
//          attribute_regx == ATTRIBUTE
//        raise SyntaxError.new("Illegal attribute syntax: can't use normal syntax when :attribute_syntax => :alternate is set.")
//      end
// ":color blue".match( /^:([^\s=:]+)\s*(=?)(?:\s+|$)(.*)/ )
  parts = this.getLine().getRule().match( attribute );
  css = parts[1] + ': ' + parts[3] + ';'
  return css;
//      name, eq, value = line.text.scan(attribute_regx)[0]

//      if name.nil? || value.nil?
//        raise SyntaxError.new("Invalid attribute: \"#{line.text}\".", @line)
//      end
//      expr = if (eq.strip[0] == SCRIPT_CHAR)
//        parse_script(value, :offset => line.offset + line.text.index(value))
//      else
//        value
//      end
//      Tree::AttrNode.new(name, expr, @options)
//    end

});

/*
 = function( newOptions ){ 
  
  if( newOptions ){
    this.options = newOptions;
  } else {
    this.options = { style: 'none' };
  }
  this.style = this.options.style;
  this.children = [];

  this.line = function(){
  
  }
  this.filename = function(){
  
  }
};

module Sass::Tree
  class AttrNode < Node
    attr_accessor :name, :value
    
    def initialize(name, value, options)
      @name = name
      @value = value
      super(options)
    end
    
    def to_s(tabs, parent_name = nil)
      if value[-1] == ?;
        raise Sass::SyntaxError.new("Invalid attribute: #{declaration.dump} (This isn't CSS!).", @line)
      end
      real_name = name
      real_name = "#{parent_name}-#{real_name}" if parent_name
      
      if value.empty? && children.empty?
        raise Sass::SyntaxError.new("Invalid attribute: #{declaration.dump}.", @line)
      end
      
      join_string = case @style
                    when :compact; ' '
                    when :compressed; ''
                    else "\n"
                    end
      spaces = '  ' * (tabs - 1)
      to_return = ''
      if !value.empty?
        to_return << "#{spaces}#{real_name}:#{@style == :compressed ? '' : ' '}#{value};#{join_string}"
      end
      
      children.each do |kid|
        to_return << "#{kid.to_s(tabs, real_name)}" << join_string
      end
      
      (@style == :compressed && parent_name) ? to_return : to_return[0...-1]
    end

    protected
    
    def perform!(environment)
      @name = interpolate(@name, environment)
      @value = @value.is_a?(String) ? interpolate(@value, environment) : @value.perform(environment).to_s
      super
    end

    private

    def declaration
      ":#{name} #{value}"
    end

    def invalid_child?(child)
      if !child.is_a?(AttrNode) && !child.is_a?(CommentNode)
        "Illegal nesting: Only attributes may be nested beneath attributes."
      end
    end
  end
end

*/
