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

Function.method( 'attr', function( valueName, initialValue ){
  var that = this;
  if( this.prototype[valueName] == undefined ) {
    this.prototype[valueName] = initialValue;
  }
  
  // Create a getter.
  this.method( ( 'get' + valueName.toCamelCase() ), function(){
    return that.prototype[valueName];
  } );

  // Create a setter.
  this.method( 'set' + valueName.toCamelCase(), function( newValue ){
    that.prototype[valueName] = newValue;
    return that;
  });

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
  var parts = this.split( /[^a-zA-Z]/ );
  for( var i = 0; i < parts.length; i++ ){
    var part = parts[i];
    if( part.length > 0 ){
      newString += ( part[0].toUpperCase() + part.slice( 1 ) );
    }
  }
  return newString;
});

