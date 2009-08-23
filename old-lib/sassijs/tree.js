// This class takes a sass template and breaks it down into children nodes.
SassijsTree = function( template ){
//  this.template = template.replace( /\r|\n|\r\n/g, "\n");
//  this.determineTab();
//  var rootLine = new SassijsLine( '', this.getTab(), 0 );
//  this.root = rootLine.determineNode();
//  this.variables = {};
//  this.determineLines();
//  this.determineNodes();
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

SassijsTree.method( 'getVariable', function( hashName ){
  return this.variables[ hashName ];
});

SassijsTree.method( 'setVariable', function( hashName, newValue ){
  this.variables[ hashName ] = newValue;
  return this;
});


/*
 * The tab is the form of indentation, which can be tabs or spaces,
 * or any consistant combination thereof.
 * 
 * @param {String} template
 * @return {String} tab
 */
SassijsTree.method( 'determineTab', function( template ){
  var lines = this.determineTemplateLines( template );
  for( var i = 0; i < lines.length; i++ ){
    var firstTab = lines[ i ].match( /^(\s|\t)+/ );
    if( firstTab ){
      return firstTab[0];
    }
  }
});

/*
 * Line breaks [and soon semi-colons] in the template text 
 * correspond to potential nodes in the Sassijs tree.
 *
 * @param {String} template
 * @return {String} lines
 */
SassijsTree.method( 'determineTemplateLines', function( template ){
console.log( template );
  return template.split( /\r|\n|\r\n/ );
});

/*
 * We preprocess the template text as SassitjsLine objects first.
 * We will convert them into SassijsNodes later.
 *
 * @param {String} template
 * @return {Array} array of SassijsLines
 */
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
      var newNode = line.determineNode( this );
      // Variables are evaluated procedurally, so they should appear at the beginning
      // of a document.  Not sure if this is how we always want to do it, but it 
      // makes sense for Jessie.
      if( newNode.getSpecies() == 'variable' ){
        this.setVariable( newNode.getKey(), newNode.getValue() );
      }

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
// Here we iterate through all of the nodes, and if we find a Node
// of species Variable, we take the value and stick it in the 
// tree's hash for reference later.
SassijsTree.method( 'determineVariables', function( node ){
  if( node == null ){
    var node = this.getRoot();
  }
  // We will just implement a traditional recursion here.
  var childrenToThisNode = node.getChildren();
  for( var i = 0; i < childrenToThisNode.length; i++ ){
    this.determineVariables( childrenToThisNode[ i ] );
  }
});

// Here we iterate through all of the nodes again, and 
// substitute for any variables.
SassijsTree.method( 'solveVariables', function( node ){
  if( node == null ){
    var node = this.getRoot();
  }
  if( node.getSpecies() == 'variable' ){
    this.setVariable( node.getKey(), node.getValue() );
  }
  // We will just implement a traditional recursion here.
  var childrenToThisNode = node.getChildren();
  for( var i = 0; i < childrenToThisNode.length; i++ ){
    this.determineVariables( childrenToThisNode[ i ] );
  }
});

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
