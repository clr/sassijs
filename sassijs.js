/*
 * sassijs 0.4.71 - Syntactically Awesome StyleSheets in JavaScript
 *
 * Copyright (c) 2009 Casey Rosenthal (github.net/clr)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * $Date: 2009-04-25 Sat Apr 25 15:11:12 -0400 2009 $
 * $Rev: 1 more than last time $
 */
// This file contains various helper methods.


// Sugar functions follow, some of which were ispired by
// [ http://www.crockford.com/javascript/inheritance.html ]
Function.prototype.method = function( name, lambda ){
  this.prototype[name] = lambda;
  return this;
};

// To be used as in ChildClass.inherits( ParentClass )
Function.method( 'inherits', function( parent ) {
  var d = {};
  var p = ( this.prototype = new parent() );

  this.method( '_super', function _super( name ){
    if( !( name in d ) ){
      d[name] = 0;
    }        
    var f, r, t = d[name];
    var v = parent.prototype;
    if( t ){
      while( t ){
        v = v.constructor.prototype;
        t -= 1;
      }
      f = v[name];
    } else {
      f = p[name];
      if( f == this[name] ){
        f = v[name];
      }
    }
    d[name] += 1;
    r = f.apply( this, Array.prototype.slice.apply( arguments, [1] ) );
    d[name] -= 1;
    return r;
  });
  return this;
});

Function.method( 'swiss', function( parent ){
  for( var i = 1; i < arguments.length; i++ ){
    var name = arguments[i];
    this.prototype[name] = parent.prototype[name];
  }
  return this;
});

Function.prototype.bind = function( object ){
  var method = this;
  var temp = function() {
    return method.apply( object, arguments );
   };
  return temp;
} 

// Camel case is useful for generating dynamic functions.
String.method( 'toCamelCase', function(){
  if( this.length < 1 ){
    return this;
  }
  var newString = '';
  var parts = this.split( /[^a-zA-Z0-9]/ );
  for( var i = 0; i < parts.length; i++ ){
    var part = parts[i];
    if( part.length > 0 ){
      newString += ( part[0].toUpperCase() + part.slice( 1 ) );
    }
  }
  return newString;
});

// This is just to test to make sure that my Psuedo-class structure is sound.
DummyPepperClass = function(){
  this.dummyAttr = null;
};
DummyPepperClass.method( 'getDummyAttr', function(){
  return this.dummyAttr;
});
DummyPepperClass.method( 'setDummyAttr', function( newValue ){
  this.dummyAttr = newValue;
  return this;
});

// Surprised that javascript doesn't have a function like .includes?()
Array.method( 'hasElement', function ( element ){
  for( var i = 0; i < this.length; i++ ){
    if( element == this[i] ){
      return true;
    }
  }
  return false;
});
Sassijs = function( template ){
  this.template = template;
};

Sassijs.method( 'getTree', function(){
  // Lazy-load.
  if( this.tree == null ){
    this.determineTree();
  }
  return this.tree;
});

Sassijs.method( 'getTemplate', function(){
  return this.template;
});

Sassijs.method( 'determineTree', function(){
  this.tree = new SassijsTree( this.getTemplate() );
});

Sassijs.method( 'getCss', function(){
  return this.getTree().getRoot().getCss().join( '\n' );
});

Sassijs.method( 'getStyleElement', function(){
  return '<style type="text/css"><!--\n' + this.getCss() + '\n--></style>';
});

Sassijs.method( 'writeToDocument', function(){
  var style = document.createElement( 'style' );
  var definition = this.getTree().getRoot().getCss().join( '\n' );
  style.setAttribute( "type", "text/css" );
  if( style.styleSheet ){
    // IE
    style.styleSheet.cssText = definition;
  } else {
    // Good browsers.
    var text = document.createTextNode( definition );
    style.appendChild( text );
  }
  document.getElementsByTagName('head')[0].appendChild( style );
});

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

Sassijs.prototype.helper = new Helper();

// This class is inspired by the Ruby class of the same name.  Essentially, this
// is a string which keeps track of an index and only scans the remainder of the
// string from that index forward.  Think of a StringIO.
StringScanner = function( string ){
  this.original = string;
  this.index = 0;
};

StringScanner.method( 'advanceIndex', function( advance ){
  this.index = this.index + advance;
  return this;
});

StringScanner.method( 'getCurrent', function(){
  return this.original.slice( this.index );
});

StringScanner.method( 'scan', function( pattern ){
  var newIndex = this.getCurrent().search( pattern );
  if( newIndex >= 0 ){
    var result = this.getCurrent().match( pattern );
    this.advanceIndex( newIndex + result.toString().length );
    return result.toString();
  }
  return false;
});

StringScanner.method( 'scanIndex', function( pattern ){
  var newIndex = this.getCurrent().search( pattern );
  if( newIndex >= 0 ){
    var result = this.getCurrent().match( pattern );
    this.advanceIndex( newIndex + result.toString().length );
    return this.index;
  }
  return false;
});
SassijError = function( newComment, newLineNumber, supressRaise ){
  this.setComment( newComment == undefined ? "Unspecified Error" : newComment );
  this.setLineNumber( newLineNumber == undefined ? "None" : newLineNumber  );
  
  if( supressRaise != true ){
    throw( this.toString() );
  }
}

SassijError.method( 'getComment', function(){
  return this.comment;
});

SassijError.method( 'getLineNumber', function(){
  return this.lineNumber;
});

SassijError.method( 'setComment', function( newValue ){
  this.comment = newValue;
  return this;
});

SassijError.method( 'setLineNumber', function( newValue ){
  this.lineNumber = newValue;
  return this;
});

SassijError.method( 'shout', function(){
  alert( this.toString() );
});

SassijError.method( 'toString', function(){
  return ( this.getComment() + ": " + this.getLineNumber() );
});
SassijEnvironment = function(){
  this.parent = null;
  this.vars = null;
  this.mixins = null;
}
SassijsTreeNode = function( line, newOptions ){ 
  this.children = [];
  if( newOptions ){
    this.options = newOptions;
  } else {
    this.options = { style: 'none' };
  }
  this.style = this.options.style;
  this.line = line;
};

// It's an odd kind of tree, but we can only traverse out,
// and these poor children will never know their parents.
SassijsTreeNode.method( 'getChildren', function(){
  return this.children;
});

// It's an odd kind of tree, but we can only traverse out,
// and these poor children will never know their parents.
SassijsTreeNode.method( 'hasChildren', function(){
  return( this.children.length > 0 );
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
  
SassijsTreeNode.method( 'getLastChild', function() {
  return this.getChildren()[ this.getChildren().length - 1 ];
});


SassijsTreeNode.method( 'getSpecies', function(){
  return this.species;
});
  
// This method should be overridden by subclasses to return an error message
// if the given child node is invalid,
// and false or nil otherwise.
SassijsTreeNode.method( 'isInvalidChild', function( child ){
  return false;
});

// This is a funny function, because it has to take the tree and flip
// it around into an array such that each leaf is a new array entry,
// with its lineage prepended.  The catch is that nodes don't know
// their parents, so this has to be done in one large recursive crawl.
SassijsTreeNode.method( 'getCss', function(){
  var css = '';
  var ruleChildren = [];
  var attributeChildren = [];
  for( var i = 0; i < this.getChildren().length; i++ ){
    switch( this.getChildren()[ i ].getSpecies() ){
      case 'rule':
        ruleChildren = ruleChildren.concat( this.getChildren()[ i ].getCss() );
        break;
      case 'attribute':
        attributeChildren.push( this.getChildren()[ i ].getCss() );
        break;
      default:
        break;
    }
  }
  if( attributeChildren.length > 0 ){
    ruleChildren.unshift( "{ " + attributeChildren.join( ' ' ) + " }" );
  }
  if( ruleChildren.length > 0 ){
    // Rules should always have ruleChildren, either as subchildren or as 
    // a collection of attributes.
    for( var i = 0; i < ruleChildren.length; i++ ){
      prefixRule = this.getLine().getSyntax();
      if( prefixRule.length > 0 ){
        // Sometimes CSS rules are compressed like 'a span, a div' and we
        // need to expand those children here and prepend the parent to 
        // both sub-rules, span and div in the above example.
        if( ruleChildren[ i ].indexOf( ',' ) ){
          ruleChildrenParts = ruleChildren[ i ].split( ', ' );
          for( var j = 0; j < ruleChildrenParts.length; j++ ){
            ruleChildrenParts[ j ] = prefixRule + " " + ruleChildrenParts[ j ];
          }
          ruleChildren[ i ] = ruleChildrenParts.join( ', ' );
        } else {
          ruleChildren[ i ] = prefixRule + " " + ruleChildren[ i ];
        }
      }
    }
    return ruleChildren;
  } else {
    // This is returned by an attribute.
//    return this.getLine().getSyntax();
  }
});


// There are several cases where the children of a node are compressed
// in a short-hand.  When this node is a Rule, it needs to have its
// children duplicated and appended to the split Rule in order to be 
// uncompressed.
SassijsTreeNode.method( 'expandChildren', function(){
  
});
SassijsTreeNodeAttribute = function( line ){
  this.children = [];
  this.species = 'attribute';
  this.line = line;
  // The regex that matches and extracts data from  attributes 
  // of the form <tt>:name attr</tt>.
  this.regex = /^:([^\s=:]+)\s*(=?)(?:\s+|$)(.*)/;
  // The regex that matches and extracts data from attributes 
  // of the form <tt>name: attr</tt>.
  this.regexAlternate = /^([^\s=:]+)(\s*=|:)(?:\s+|$)(.*)/;
};

SassijsTreeNodeAttribute.inherits( SassijsTreeNode );

SassijsTreeNodeAttribute.method( 'getParts', function(){
  if( this.parts != null ){ 
    return this.parts; 
  }
  this.parts = this.getLine().getSyntax().match( this.regex );
  // If we don't get a match, try the alternate syntax, which is much closer
  // to original CSS.  This is one of the only places where we may differ 
  // from the Ruby SASS implementation, because they don't appear to allow
  // mixing of the normal and alternate sytax.
  if( this.parts == null ){
    this.parts = this.getLine().getSyntax().match( this.regexAlternate );
  }
  return this.parts;
});

SassijsTreeNodeAttribute.method( 'getKey', function(){
  // Lazy load the key.
  if( this.key == null ){
    this.key = this.getParts()[1];
  }
  return this.key;
});

SassijsTreeNodeAttribute.method( 'getValue', function(){
  // The character that designates that an attribute should be assigned 
  // to a SassScript expression.
  var expressionChar = '!';

  // Lazy load the value.
  if( this.value != null ){
    return this.value;
  }
  if( this.getParts()[2] == expressionChar ){
// Expressions are for evaluation.
  } else {
    this.value = this.getParts()[3];
  }
  return this.value;
});

SassijsTreeNodeAttribute.method( 'getCss', function(){
  // If an Attribute node has children, then those children have
  // to be Attribute nodes as well, because that means that this
  // node is a family definition of attributes, like font-size, 
  // font-weight, font-style, etc.
  if( this.hasChildren() ){
    var attributeChildren = [];
    for( var i = 0; i < this.getChildren().length; i++ ){
      var child = this.getChildren()[ i ];
      if( child.getSpecies() != 'attribute' ){
        // Raise error.
      }
      attributeChildren.push( this.getKey() + "-" + child.getKey() + ": " + child.getValue() + ";" );
    }
    return attributeChildren.join( ' ' );
  } else {
    return this.getKey() + ": " + this.getValue() + ";";
  }
});

SassijsTreeNodeComment = function( line ){
  this.children = [];
  this.species = 'comment';
  this.line = line;
};

SassijsTreeNodeComment.inherits( SassijsTreeNode );

SassijsTreeNodeComment.method( 'getCss', function(){
  var css = this.getLine().getSyntax() + " */";
  return css; 
});

SassijsTreeNodeDirective = function( line ){
  this.children = [];
  this.species = 'directive';
  this.line = line;
};

SassijsTreeNodeDirective.inherits( SassijsTreeNode );

SassijsTreeNodeDirective.method( 'getCss', function(){
    // directives of the form <tt>@import file</tt>.
  var directive = /^@([^\s=:]+)\s*(=?)(?:\s+|$)(.*)/;

  parts = this.getLine().getSyntax().match( directive );
  // If we don't get a match, we should raise an error?
  if( parts == null ){
    //raise error, I guess;
  }
  var css = '@' + parts[1] + ' url(' + parts[3] + '.css);';
  return css;
});

SassijsTreeNodeMixinDefinition = function( line ){
  this.species = 'mixinDefinition';
  this.line = line;
};

SassijsTreeNodeMixinDefinition.inherits( SassijsTreeNode );

// In this special case, we want the node to return its children
// rendered as CSS.  This node will be removed from the tree
// root in pre-processing.
SassijsTreeNodeMixinDefinition.method( 'getCss', function(){
  var css = '';
  var children = this.getChildren();
  for( i = 0; i < children.length; i++ ){
    css += children[ i ].getCss();
  }
  return css;
});

SassijsTreeNodeMixinInclude = function( ){
  this.species = 'mixinInclude';
};

SassijsTreeNodeMixinInclude.inherits( SassijsTreeNode );

SassijsTreeNodeRule = function( line ){
  this.children = [];
  this.species = 'rule';
  this.line = line;
};

SassijsTreeNodeRule.inherits( SassijsTreeNode );

SassijsTreeNodeRule.method( 'determineMitosis', function(){
  var css = '';
  var attributes = [];
  for( var i = 0; i < this.getChildren().length; i++ ){
    switch( this.getChildren()[ i ].getSpecies() ){
      case 'rule':
        css += this.getLine().getSyntax() + ' ' + this.getChildren()[ i ].getCss();
      case 'attribute':
        attributes.push( this.getChildren()[ i ].getCss() );
    }
  }
  if( attributes.length > 0 ){
    return this.getLine().getSyntax() + " { " + attributes.join( '; ' ) + " }";
  } else {
    return css;
  }
});

/*
SassijsTreeNodeRule.method( 'getCss', function(){
  var css = '';
  var attributes = [];
  for( var i = 0; i < this.getChildren().length; i++ ){
    switch( this.getChildren()[ i ].getSpecies() ){
      case 'rule':
        css += this.getLine().getSyntax() + ' ' + this.getChildren()[ i ].getCss();
      case 'attribute':
        attributes.push( this.getChildren()[ i ].getCss() );
    }
  }
  if( attributes.length > 0 ){
    return this.getLine().getSyntax() + " { " + attributes.join( '; ' ) + " }";
  } else {
    return css;
  }
});

*/
SassijsTreeNodeVariable = function( line ){
  this.children = [];
  this.species = 'variable';
  this.line = line;
  // The regex that matches and extracts data from attributes
  // of the form <tt>!name = value</tt>.
  this.regex = /^!([^\s=:]+)\s*(=?)(?:\s+|$)(.*)/;
};

SassijsTreeNodeVariable.inherits( SassijsTreeNode );

SassijsTreeNodeVariable.method( 'getParts', function(){
  if( this.parts != null ){ 
    return this.parts; 
  }
  this.parts = this.getLine().getSyntax().match( this.regex );
  // If we don't get a match, try the alternate syntax, which is much closer
  // to original CSS.  This is one of the only places where we may differ 
  // from the Ruby SASS implementation, because they don't appear to allow
  // mixing of the normal and alternate sytax.
  if( this.parts == null ){
    this.parts = this.getLine().getSyntax().match( this.regexAlternate );
  }
  return this.parts;
});

SassijsTreeNodeVariable.method( 'getKey', function(){
  // Lazy load the key.
  if( this.key == null ){
    this.key = this.getParts()[1];
  }
  return this.key;
});

// Should this method discriminate between text and expressions, or
// just pass it to an expression and let that evaluate it as text?
SassijsTreeNodeVariable.method( 'getValue', function(){
  // The character that designates that an attribute should be assigned 
  // to a SassScript expression.
  var expressionChar = '!';

  // Lazy load the value.
  if( this.value != null ){
    return this.value;
  }
  if( this.getParts()[2] == expressionChar ){
// Expressions are for evaluation.
  } else {
    this.value = this.getParts()[3];
  }
  return this.value;
});

// BIG TODO: Figure out wtf to do with em and ens.
SassijsExpressionUnit = function( string ){
  this.unit = string;
  this.acceptableChars = [ '\\*', '\\/', '\\%', '\\+', '\\-', '\\(', '\\)', '\\=\\=', '\\!\\=', '\\>\\=', '\\<\\=', '\\>', '\\<' ];
  this.sizeSpecies = [ 'in', 'cm', 'pc', 'mm', 'pt', 'px' ];
  this.sizeConversion_table = [
    [ 1,                2.54,         6,            25.4,        72,          72         ], // in
    [ null,             1,            2.36220473,   10,          28.3464567,  28.3464567 ], // cm
    [ null,             null,         1,            4.23333333,  12,          12         ], // pc
    [ null,             null,         null,         1,           2.83464567,  2.83464567 ], // mm
    [ null,             null,         null,         null,        1,           1          ], // pt
    [ null,             null,         null,         null,        null,        1          ]  // px
  ];
  this.sizeConversionToPoints = { in: 72, cm: 28.3464567, pc: 12, mm: 2.83464567, px: 1, pt: 1 };
  this.termRegex = /([\d\.]+)([\w]*)/;
  this.termsAndOperatorsRegex = /[\d\.\w]+|\+|\*|\/|%|-|\(|\)|==|!=|>=|<=|>|</g;
};

SassijsExpressionUnit.method( 'getSpecies', function( sample ){
  // Break the sample into terms, and look at the first one to 
  // determine what unit type.  The default is text.
  terms = sample.match( /(\w|\d|\.)+/g );
  firstTerm = terms[0];
  sizeRegex = new RegExp( '(\d|\.)+' + this.sizeSpecies.join( '|' ) );
  if( sizeRegex.exec( firstTerm ) ){
    return 'size';
  }
});

// This function assumes that we have already identified the unit as a size.
SassijsExpressionUnit.method( 'getSizeInPoints', function( term ){
  var unitAndSpecies = term.match( this.termRegex );
  if( !unitAndSpecies ){
    return false;
  }
  var unit = unitAndSpecies[1];
  var species = unitAndSpecies[2];
  return( unit * this.sizeConversionToPoints[ species ] );
});


// You kids mess around too much.  Just convert everything into points.
// This function assumes that we have already identified the expression in size.
SassijsExpressionUnit.method( 'getNormalizedSize', function( sample ){
  // Break the sample into terms, and look at the first one to 
  // determine what unit type.  The default is text.
//  var termsAndOperatorsRegex = new RegExp( '(\\d|\\.|\\w)+|' + this.acceptableChars.join( '|' ) );
//var termsAndOperatorsRegex = /(\d|\.|\w)+|\*|\/|%|\+|-|\(|\)|==|!=|>=|<=|>|</g;
  var termsAndOperators = sample.match( this.termsAndOperatorsRegex );
  var normalized = [];
  for( var i = 0; i < termsAndOperators.length; i++ ){
    var unitInPoints = this.getSizeInPoints( termsAndOperators[ i ] );
    if( unitInPoints ){
      normalized.push( unitInPoints );
    } else {
      normalized.push( termsAndOperators[ i ] );
    }
  }
  return normalized.join( ' ' ); // Just for readability in development.
});


// This class evaluates variables and expressions, but not 
// mixins, which are appended to trees at an earlier stage
// in pre-processing.
SassijsExpression = function( string, variables ){
  this.string = string;
  // variables are the databank prepolated with SassijsVariables.
  this.variables = variables;
  this.parts = [];
  this.identifiedParts = [];
  this.acceptableChars = [ '*', '/', '%', '+', '-', '(', ')', '==', '!=', '>=', '<=', '>', '<' ];
  this.operators = [ '*', '/', '%', '+', '-' ];
  this.first_operators = [ '*', '/', '%' ];
  this.second_operators = [ '+', '-' ];
};

SassijsExpression.method( 'getExpression', function(){
  return this.string.slice( 1, ( this.string.length ) );
});

SassijsExpression.method( 'getValue', function(){
  var sassijsExpressionUnit = new SassijsExpressionUnit();
  var species = sassijsExpressionUnit.getSpecies( this.getExpression() );
  switch( species ){
    case 'size':
      var expressionString = sassijsExpressionUnit.getNormalizedSize( this.getExpression() );
      var points = eval( expressionString );
      return points + 'pt';
    default:
      return this.getExpression();
  }
  
});



// This class wraps Sassijs and simply loads a file into the template variable.  We
// assume the presence of a loading DOM element 'document'.
SassijsFile = function( url, async ){
  this.loaded = false;
  this.template = null;
  this.fetch( url, async );
}

SassijsFile.inherits( Sassijs );

SassijsFile.method( 'isLoaded', function(){
  return this.loaded;
});

SassijsFile.method( 'fetch', function( url, async ){
  // Asynchronous transfer is the default.
  if( async != false ){
    async = true;
  }
  if( window.XMLHttpRequest ){
    req = new XMLHttpRequest();
  } else if( window.ActiveXObject ){
    req = new ActiveXObject("Microsoft.XMLHTTP");
  }
  // This is an asynch call that won't freeze up the browser.
  if( ( async ) && ( req != undefined ) ){
    var that = this;
    req.onreadystatechange = function(){ 
      if( req.readyState == 4 ) { // only if req is "loaded"
        if( ( req.status == 200 ) || ( req.status == 0 ) ) { // only if "OK" (0 is status for locally served files)
          this.loaded = true;
          this.template = req.responseText;
        } else {
          this.loaded = false;
        }
      }
    };
    req.open( "GET", url );
    req.send( "" );
  // This is a synchronous call that holds up the browser, which is 
  // necessary for qUnit to work properly, for example.
  } else {
    var that = this;
    req.open( "GET", url, false );
    req.send( "" );
    if( req.readyState == 4 ) { // only if req is "loaded"
      if( ( req.status == 200 ) || ( req.status == 0 ) ) { // only if "OK" (0 is status for locally served files)
        this.loaded = true;
        this.template = req.responseText;
      } else {
        this.loaded = false;
      }
    }
  }
});

// This class populates an object that establishes the properties
// of one syntax element, and hints at some of its context in the tree.
SassijsLine = function( string, tab, lineNumber ){
  this.lineNumber = lineNumber;
  this.syntax = '';
  this.tabCount = 0;
  // A reference to our context.
//  this.sassijs = sassijs;
  
  // Count the tabs.
  findTab = new RegExp( "^" + tab );
  var potentialSyntax = string;
  while( result = findTab.exec( potentialSyntax ) ){
    potentialSyntax = RegExp.rightContext;
    this.tabCount++;
  }

  // Strip extra whitespace from the rule.
  this.syntax = string.replace( /[\s|\t]+/g, ' ' ).replace( /^\s+|\s+$/g, '' );
}

SassijsLine.method( 'getSyntax', function(){
  return this.syntax;
});

//SassijsLine.method( 'getSassijs', function(){
//  return this.sassijs;
//});

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


// This class takes a sass template and breaks it down into children nodes.
SassijsTree = function( template ){
  this.template = template.replace( /\r|\n|\r\n/g, "\n");
  this.determineTab();
  var rootLine = new SassijsLine( '', this.getTab(), 0 );
  this.root = rootLine.determineNode();
  this.determineLines();
  this.determineNodes();
}

SassijsTree.method( 'getTab', function(){
  return this.tab;
});

SassijsTree.method( 'setTab', function( newValue ){
  this.tab = newValue;
  return this;
});

SassijsTree.method( 'getRoot', function(){
  return this.root;
});

SassijsTree.method( 'getLines', function(){
  return this.lines;
});

SassijsTree.method( 'getTemplate', function(){
  return this.template;
});

SassijsTree.method( 'getTemplateLines', function(){
  return this.getTemplate().split( '\n' );
});

// The tab is the form of indentation, which can be tabs or spaces,
// but not both.
SassijsTree.method( 'determineTab', function(){
  var lines = this.getTemplateLines();
  for( var i = 0; i < lines.length; i++ ){
    var firstTab = lines[ i ].match( /^(\s|\t)+/ );
    if( firstTab ){
      this.setTab( firstTab[0] );
      break;
    }
  }
});

// These are just the individual lines of the syntax template.  The
// lines themselves determine their own Node Species before being 
// converted to Nodes.
SassijsTree.method( 'determineLines', function(){
  this.lines = new Array();
  var lines = this.getTemplateLines();
  for( var i = 0; i < lines.length; i++ ){
    this.lines.push( new SassijsLine( lines[ i ], this.getTab(), ( i + 1 ) ) );
  }
});

// Here we take the previously determined lines and parse them into a 
// tree of nodes based on the tab length and context relative to previous
// nodes.  This function is currently not optimized.  We would have to 
// take a few cases and compare parsing speed in a for-loop, string-
// scanner style parsing, and while-loop, etc.
SassijsTree.method( 'determineNodes', function(){
  var previousTabCount = 0;
  var previousNode = this.getRoot();
  for( var i = 0; i < this.getLines().length; i++ ){
    var line = this.getLines()[ i ];
    // Dump empty rules.
    if( line.getSyntax().length > 0 ){
      var newNode = line.determineNode();
      // Comments don't return anything that we want in our tree.
      if( newNode != null ){
        // This node is a sibling to the previous node.
        if( line.getTabCount() == previousTabCount ){
          // Get the Parent by procedural induction.  The last node at the
          // previous depth is the parent.
          parent = this.getRoot();
          for( var j = 0; j < previousTabCount; j++ ){
            var parent = parent.getLastChild();
          }
          parent.appendChild( newNode );
        }
        // This node is a child to the previous node.
        if( line.getTabCount() > previousTabCount ){
          // Insert error check here that it can't be more than 1 tab count greater.
          previousNode.appendChild( newNode );
        }
        // This node is a child to something above the previous node.
        if( line.getTabCount() < previousTabCount ){
          // Get the Parent by procedural induction.
          parent = this.getRoot();
          for( var j = 0; j < line.getTabCount(); j++ ){
            var parent = parent.getLastChild();
          }
          parent.appendChild( newNode );
        }
        previousTabCount = newNode.getLine().getTabCount();
        previousNode = newNode;
      }
    }
  }
});
/*

SassijsTreeNodeRule.method( 'getCss', function(){
  var cssLines = [];
  for( var i = 0; i < this.root.getChildren().length; i++ ){
    switch( this.getChildren()[ i ].getSpecies() ){
      case 'rule':
        css += this.getLine().getSyntax() + ' ' + this.getChildren()[ i ].getCss();
      case 'attribute':
        attributes.push( this.getChildren()[ i ].getCss() );
    }
  }
  if( attributes.length > 0 ){
    return this.getLine().getSyntax() + " { " + attributes.join( '; ' ) + " }";
  } else {
    return css;
  }
});

*/
SassijsAutoloader = {

  getTemplates: function(){
    var sassLinks = [];
    var potentialSass = document.getElementsByTagName( 'link' );
    for( var i = 0; i < potentialSass.length; i++ ){
      if( potentialSass[ i ].getAttribute( 'type' ) == 'text/sass' ){
        sassLinks.push( potentialSass[ i ].getAttribute( 'href' ) );
      }
    }
    return sassLinks;
  },
  
  run: function(){
    var sassLinks = SassijsAutoloader.getTemplates();
    for( var i = 0; i < sassLinks.length; i++ ){
      sassijs = new SassijsFile( sassLinks[ i ], false );
      sassijs.writeToDocument();
    }
  }

}

window.onload = function(){ SassijsAutoloader.run(); };
