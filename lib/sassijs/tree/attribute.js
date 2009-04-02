SassijsTreeNodeAttribute = function( line ){
  this.species = 'attribute';
  this.line = line;
};

SassijsTreeNodeAttribute.inherits( SassijsTreeNode );

SassijsTreeNodeAttribute.method( 'getCss', function(){
    // The regex that matches and extracts data from
    // attributes of the form <tt>:name attr</tt>.
  var attribute                 = /^:([^\s=:]+)\s*(=?)(?:\s+|$)(.*)/;
    // The regex that matches and extracts data from
    // attributes of the form <tt>name: attr</tt>.
  var attributeAlternate        = /^([^\s=:]+)(\s*=|:)(?:\s+|$)(.*)/;

  parts = this.getLine().getRule().match( attribute );
  // If we don't get a match, try the alternate syntax, which is much closer
  // to original CSS.  This is one of the only places where we may differ 
  // from the Ruby SASS implementation, because they don't appear to allow
  // mixing of the normal and alternate sytax.
  if( parts == null ){
    parts = this.getLine().getRule().match( attributeAlternate );
  }
  var css = parts[1] + ': ' + parts[3] + ';'
  return css;

});

