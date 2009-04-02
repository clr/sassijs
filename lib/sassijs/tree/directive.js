SassijsTreeNodeDirective = function( line ){
  this.species = 'directive';
  this.line = line;
};

SassijsTreeNodeDirective.inherits( SassijsTreeNode );

SassijsTreeNodeDirective.method( 'getCss', function(){
    // directives of the form <tt>@import file</tt>.
  var directive = /^@([^\s=:]+)\s*(=?)(?:\s+|$)(.*)/;

  parts = this.getLine().getRule().match( directive );
  // If we don't get a match, we should raise an error?
  if( parts == null ){
    //raise error, I guess;
  }
  var css = '@' + parts[1] + ' url(' + parts[3] + '.css);';
  return css;
});
