Helper = function(){};

//    def self.handle_interpolation(str)
//      scan = StringScanner.new(str)
//      yield scan while scan.scan(/(.*?)(\\*)\#\{/)
//      scan.rest
//    end
Helper.method( 'handle_interpolation', function( string ){
  
});

// CAN'T FIND THIS METHOD BEING CALLED ANYWHERE
//    def self.balance(scanner, start, finish, count = 0)
//      str = ''
//      scanner = StringScanner.new(scanner) unless scanner.is_a? StringScanner
//      regexp = Regexp.new("(.*?)[\\#{start.chr}\\#{finish.chr}]", Regexp::MULTILINE)
//      while scanner.scan(regexp)
//        str << scanner.matched
//        count += 1 if scanner.matched[-1] == start
//        count -= 1 if scanner.matched[-1] == finish
//        return [str.strip, scanner.rest] if count == 0
//      end
//    end


// This is used to generate an error that reads something like "Inconsistent indentation: space
// used for indentation, but the rest of the document was indented using tab."
Helper.method( 'human_indentation', function( indentation, was ){
  was = ( was == true ) ? true : false;
  if( indentation.indexOf( '\t' ) == -1 ){
    noun = ' space';
  } else if( indentation.indexOf( ' ' ) == -1 ){
    noun = ' tab';
  } else {
    return "'" + indentation + ( was ? "' was" : "'" );
  }
  
  // Check and see how many spaces or tabs there were for verb agreement.
  singular = ( ( indentation.length == 1 ) ? true : false );
  if( was ){
    was = ( singular ? ' was' : ' were' );
  } else {
    was = '';
  }
  
  return ( indentation.length.toString() + noun + ( singular ? '' : 's' ) + was );
});

Sassij.prototype.helper = new Helper();

