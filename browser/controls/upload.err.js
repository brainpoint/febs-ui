/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */


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

var err_nofile = 'nofile error';  // 未选择文件.
var err_sizeExceed = 'sizeExceed error';  // 文件太大.
var err_crc32 = 'crc32 error';    // 计算本地文件hash值时错误.
var err_net = 'network error';    // ajax上传时出错.

return {
        nofile:err_nofile,
        sizeExceed: err_sizeExceed,
        crc32: err_crc32,
        net: err_net
       };
}
);