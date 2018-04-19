
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
					throw new Error( "febs-ui requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

'use strict';

if ( !window.febs ) {
  throw new Error( "febs-ui requires febs" );
}

var stringUtils = window.febs.string;

function escape_string(str) {
  // 转义.
  str = stringUtils.replace(str, '<', '&lt;');
  str = stringUtils.replace(str, '>', '&gt;');
  return str;
}

return escape_string;

}
);