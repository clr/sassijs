SassijsTreeNode = function( line, newOptions ){ 
  this.children = [];
  if( newOptions ){
    this.options = newOptions;
  } else {
    this.options = { style: 'none' };
  }
  this.style = this.options.style;
  this.line = line;
  this.filename = function(){
  
  }
};

// It's an odd kind of tree, but we can only traverse out,
// and these poor children will never know their parents.
SassijsTreeNode.method( 'getChildren', function(){
  return this.children;
});

SassijsTreeNode.method( 'getLine', function(){
  return this.line;
});

SassijsTreeNode.method( 'setChildren', function( newValue ){
  this.children = newValue;
  return this;
});

SassijsTreeNode.method( 'appendChild', function( child ){
  if( error = this.isInvalidChild( child ) ) {
    throw( new SassijError( error, child.line ) );
  }
  this.children.push( child );
  return this;
});
  
SassijsTreeNode.method( 'lastChild', function() {
  return this.getChildren()[ this.getChildren().length - 1 ];
});

SassijsTreeNode.method( 'toS', function() {
  result = "";
  for( child in this.getChildren() ){
    if( child.isType( AttrNode ) ){
      throw( new SassijError( 'Attributes aren\'t allowed at the root of a document.', child.line ) );
    } else {
      //    result << "#{child.to_s(1)}" + (@style == :compressed ? '' : "\n")
      // need to add a @style indicator at some point
      result += child.toS( 1 );
    }
  }
      // @style == :compressed ? result+"\n" : result[0...-1]
  return result;
});
  
  // This method should be overridden by subclasses to return an error message
  // if the given child node is invalid,
  // and false or nil otherwise.
SassijsTreeNode.method( 'isInvalidChild', function( child ){
  return false;
});


//      def perform(environment)
//        _perform(environment)
//      rescue Sass::SyntaxError => e
//        e.sass_line ||= line
//        raise e
//      end
// Casey says: I don't really know what this function pretends to do.
// I think this is just a wrapper to catch errors on evaluating the node.
SassijsTreeNode.method( 'perform', function( environment ){
  try{
    _perform( environment );
  } catch( error ) {
    throw( new SassijError( error, 'unknown' ) );
  }
});

//      def _perform(environment)
//        node = dup
//        node.perform!(environment)
//        node
//      end
SassijsTreeNode.method( '_perform', function( environment ){
  node = this.clone();
  node.performBang( environment );
  return node;
});

//      def perform!(environment)
//        self.children = perform_children(Environment.new(environment))
//      end
// This function actually evaluates the node, and then recurses to 
// the children for evaluation with performChildren().
SassijsTreeNode.method( 'performBang', function( environment ){
  this.setChildren( this.performChildren( new SassijEnvironment( environment ) ) );
});


//      def perform_children(environment)
//        children.map {|c| c.perform(environment)}.flatten
//      end
// Casey says: js function for flatten()?  Not sure why that would ever be needed.
SassijsTreeNode.method( 'performChildren', function( environment ){
  childrenMap = [];
  for( child in this.getChildren() ){
    childrenMap.push( child.perform( environment ) );
  }
  return childrenMap;
});
  
//      def interpolate(text, environment)
//        res = ''
//        rest = Haml::Shared.handle_interpolation text do |scan|
//          escapes = scan[2].size
//          res << scan.matched[0...-2 - escapes]
//          if escapes % 2 == 1
//            res << "\\" * (escapes - 1) << '#{'
//          else
//            res << "\\" * [0, escapes - 1].max
//            res << Script::Parser.new(scan, line, scan.pos - scan.matchedsize, filename).
//              parse_interpolated.perform(environment).to_s
//          end
//        end
//        res + rest
//      end
  // From what I can tell, this function handles the escapes for ruby-style inline
  // string evaluation.  We'll come back to this.
//  this.interpolate = function( text, environment ){
//    res = "";
//    scanner = new Shared.handle_interpolate( text );
//    while( var scan = scanner.scan( /(.*?)(\\*)\#\{/ ) ){
//      if escapes = 
//      res += 
//      
//    }
//    escapes = rest[2].length;
//    res += rest.matched[]
//    //something else goes here!!!!!

//    // Append the rest of the original string.
//    return res += scanner.getCurrent();
//  }

// CAN'T FIND THIS METHOD CALLED ANYWHERE
//      def balance(*args)
//        res = Haml::Shared.balance(*args)
//        return res if res
//        raise Sass::SyntaxError.new("Unbalanced brackets.", line)
//      end
//  this.balance( args ){
//    if( res = HamlijShared.balance( args ) ){
//      return res;
//    };
//    throw( new SassijError( 'Unbalanced brackets.', 'unknown' ) );
//  }

