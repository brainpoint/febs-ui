
// require('es5-shim');
// require('es5-shim/es5-sham');
// require('console-polyfill');
// require('babel-polyfill');
// require('../third-party/bluebird.min.js');
// require('../third-party/bignumber.min.js');


( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
    // This accentuates the need for the creation of a real `window`.
    
    if (global.document) {
      if (!global['febs']) {
        throw new Error('febsui requires `febs` or `febs-browser` library; Please require `febs`/`febs-browser` before febsui');
      }
    }
    
    module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "febsui requires a window with a document" );
        }
        if (!w['febs']) {
          throw new Error('febsui requires `febs` or `febs-browser` library; Please require `febs`/`febs-browser` before febsui');
        }
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {


/**
 * jquery plugins.
 */
require('./plugins/isVisible');
require('./plugins/hasVisible');

var febsui = require('./controls');
window['febsui'] = febsui;


/**
 * jquery plugins.
 */
require('./plugins/disabled');

require('./plugins/actionsheet');
require('./plugins/dialog');
require('./plugins/popover');
require('./plugins/switch');
require('./plugins/swiper');
require('./plugins/uploader');
require('./plugins/radio');

return febsui;
}
);