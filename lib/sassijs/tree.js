// This class takes a sass template and breaks it down into children nodes.
SassijsTree = function( template ){
  this.template = template.replace( /\r|\n|\r\n/g, "\n");
  this.root = new SassijsTreeNode();
  this.determineTab();
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
      this.tab = firstTab[0];
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
    this.lines.push( new SassijsLine( lines[ i ], this.getTab(), ( i + 1 ), this ) );
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
          // Get the Parent by procedural induction.
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

