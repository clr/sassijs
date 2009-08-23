/*
 * This class holds the original text of the sass template.
 */
SassijsTemplate = function( templateText ){
  this.rawText = templateText;
//.replace( /\r|\n|\r\n/g, "\n");
//  this.determineTab();
//  var rootLine = new SassijsLine( '', this.getTab(), 0 );
//  this.root = rootLine.determineNode();
//  this.variables = {};
//  this.determineLines();
//  this.determineNodes();
}

/*
 * The template is the original SASS text.
 *
 * @param {}
 * @return {String} template
 */
SassijsTemplate.method( 'getRawText', function(){
  return this.rawText;
});

/*
 * The tab is the form of indentation, which can be tabs or spaces,
 * or any consistant combination thereof.
 * 
 * @param {String} template
 * @return {String} tab
 */
SassijsTemplate.method( 'determineTab', function( template ){
  var lines = this.getLines();
  for( var i = 0; i < lines.length; i++ ){
    var firstTab = lines[ i ].match( /^(\s|\t)+/ );
    if( firstTab ){
      this.tab = firstTab[0];
      return this;
    }
  }
});
/*
 * Get the tab that sets the tab delineation for this template.
 *
 * @param {}
 * @return {String} tab
 */
SassijsTemplate.method( 'getTab', function(){
  if( this.tab == null ){
    this.determineTab();
  }
  return this.tab;
});

/*
 * Line breaks [and soon semi-colons] in the template text 
 * correspond to potential nodes in the Sassijs tree.
 *
 * @param {}
 * @return {SassijsTemplate} this
 */
SassijsTemplate.method( 'determineLines', function(){
  this.lines = this.getRawText().split( /\r|\n|\r\n/ );
  return this;
});
/*
 * Get the lines in the template.
 *
 * @param {}
 * @return {Array} lines
 */
SassijsTemplate.method( 'getLines', function(){
  if( this.lines == null ){
    this.determineLines();
  }
  return this.lines;
});

// These are just the individual lines of the syntax template.  The
// lines themselves determine their own Node Species before being 
// converted to Nodes.
SassijsTemplate.method( 'determineSassijsLines', function(){
  this.lines = new Array();
  var lines = this.getTemplateLines();
  for( var i = 0; i < lines.length; i++ ){
    this.lines.push( new SassijsLine( lines[ i ], this.getTab(), ( i + 1 ) ) );
  }
});

