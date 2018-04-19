

( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "febsui requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

  /**
   * getElemsByClassName
   */
  function getElementsByClassName(className) {
    return window.document.getElementsByClassName(className);
  }

  /**
   * getElementsByTagName
   */
  function getElementsByTagName(name) {
    return window.document.getElementsByTagName(name);
  }

  /**
   * getElemsByClassName
   */
  function getElementById(idName) {
    return window.document.getElementById(idName);
  }

  /**
   * hasClass
   */
  function hasClass( element, cName ){  
    return !!element.className.match( new RegExp( "(\\s|^)" + cName + "(\\s|$)") ); // ( \\s|^ ) 判断前面是否有空格 （\\s | $ ）判断后面是否有空格 两个感叹号为转换为布尔值 以方便做判断  
  }

  /**
   * addClass
   */
  function addClass( element,cName ){  
    if( !hasClass( element,cName ) ){  
      element.className += " " + cName;  
    };  
  } 
  
  /**
   * removeClass
   */
  function removeClass( element, cName ){  
    if( hasClass( element,cName ) ){  
      element.className = element.className.replace( new RegExp( "(\\s|^)" + cName + "(\\s|$)" )," " ); // replace方法是替换  
    };  
  }
  /**
   * removeElement
   */
  function removeElement(element){
    var _parentElement = element.parentNode;
    if(_parentElement){
        _parentElement.removeChild(element);  
    }
  }

  /**
   * appendChild
   */
  function appendChild(element, node) {
    element.appendChild(node);
  }

  function prependChild(element,node){ 
    if(element.hasChildNodes()){ 
      element.insertBefore(node, element.firstChild); 
    } else{ 
      element.appendChild(node); 
    } 
  }

  /**
   * setAttribute
   */
  function setAttribute(element, name, value) {
    element.setAttribute(name, value);
  }

  /**
   * createElement
   */
  function createElement(tag) {
    return window.document.createElement(tag);
  }

  /**
   * createTextNode
   */
  function createTextNode(text) {
    return window.document.createTextNode(text);
  }

  return {
    getElementsByClassName: getElementsByClassName,
    getElementsByTagName: getElementsByTagName,
    getElementById: getElementById,
    hasClass: hasClass,
    addClass: addClass,
    removeClass: removeClass,
    removeElement: removeElement,
    appendChild: appendChild,
    prependChild: prependChild,
    setAttribute: setAttribute,
    createElement: createElement,
    createTextNode: createTextNode,
  };
}
);