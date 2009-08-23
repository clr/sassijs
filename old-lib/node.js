Node = function( line, newOptions ){ 
  this.nodeName = '#node';
  this.nodeValue = null;
  this.nodeType = 'node';
  this.parentNode = null;
  this.childNodes = [];
  this.firstChild = null;
  this.lastChild = null;
  this.previousSibling = null;
  this.nextSibling = null; 

  if( newOptions ){
    this.options = newOptions;
  } else {
    this.options = { style: 'none' };
  }
  this.style = this.options.style;
  this.line = line;
};

/**
 * Add node at end of children array.
 *
 * @param {Node} new child node
 * @return {Node} this
 */
Node.method( 'appendChild', function( child ){
  this.childNodes.push( child );
  child.parentNode = this;
  return this.balanceChildNodes();
});

/**
 * Reset the previousSibling and nextSibling for each
 * of the children, and then reset firstChild and lastChild
 * for this node.
 *
 * @param {}

 */
Node.method( 'balanceChildNodes', function(){
  var length = this.childNodes.length;
  for( var i = 0; i < length; i++ ){
    var child = this.childNodes[ i ];
    if( i == 0){
      this.firstChild = child;
      child.previousSibling = null;
      child.nextSibling = this.childNodes[ i + 1 ];
    } else if( i == ( length - 1 ) ){
      this.lastChild = child;
      child.previousSibling = this.childNodes[ i - 1 ];
      child.nextSibling = null;
    } else {
      child.previousSibling = this.childNodes[ i - 1 ];
      child.nextSibling = this.childNodes[ i + 1 ];
    }
  }
  return this;
});

/**
 * Duplicate the Node and return it.
 *
 * @param {}
 * @return {Node} new copy
 */
Node.method( 'cloneNode', function(){
  newNode = new Node();
  newNode.nodeName = this.nodeName;
  newNode.nodeType = this.nodeType;
  newNode.nodeValue = this.nodeValue;
  return newNode;
});

/**
 * Ask if this node has any children.
 *
 * @param {}
 * @return {Boolean}
 */
Node.method( 'hasChildNodes', function(){
  return ( this.childNodes.length > 0 );
});

/**
 * Add a child, but stick it in front of another child.
 *
 * @param {Node, Node} newChild, placeHolderChild
 * @return {Node} this
 */
Node.method( 'insertBefore', function( newChild, placeHolderChild ){
  var placeHolderIndex = this.childNodes.indexOf( placeHolderChild );
  if( !placeHolderIndex ){
    return null;
  }
  this.childNodes.splice( placeHolderIndex, 0, newChild );
  return this.balanceChildNodes();
});

/**
 * Find this child and remove it.
 *
 * @param {Node} oldChild
 * @return {Node} this
 */
Node.method( 'removeChild', function( oldChild ){
  return this.replaceChild( null, oldChild );
});  

/**
 * Remove this node and return it.
 *
 * @param {}
 * @return {Node} this
 */


/**
 * Replace one child node with another.
 *
 * @param {Node, Node} oldChild, newChild
 * @return {Node} this
 */
Node.method( 'replaceChild', function( newChild, oldChild ){
  var oldIndex = this.childNodes.indexOf( oldChild );
  if( !oldIndex ){
    return null;
  }
  if( !newChild ){
    this.childNodes.splice( oldIndex, 1 );
  } else {
    this.childNodes.splice( oldIndex, 1, newChild );
  }
  return this.balanceChildNodes();
});
