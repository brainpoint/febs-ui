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

var crypt = window.febs.crypt;
var err = require('./upload.err');
var ajaxSubmit = require('../ajaxSubmit').ajaxSubmit;


/**
 * post方式上传文件 
 * 使用 multipart/form-data 方式, 适合大文件. 速度快.
 * @param cfg:  object, 其中
 *              {
 *                data:       , // 上传到服务器的任意字符串数据.
 *                formObj:    , // 含有enctype="multipart/form-data"的form
 *                fileObj:    , // form中的file对象
 *                uploadUrl:  , // 上传文件内容的url. 系统将自动使用 uploadUrl?crc32=&size=的方式来上传.
 *                maxFileSize:    , // 允许上传的最大文件.0表示无限制.默认为0
 *                fileType:     , // 允许的文件类型.  如: image/gif,image/jpeg,image/x-png
 *                beginCB:     , // 上传开始的回调. function(uploader); 调用uploader.abort() 可以停止上传.
 *                finishCB:    , // 上传完成后的回调. function(err, fileObj, serverData)
 *                               //                   err:  - uploadErr.nofile      未选择文件.
 *                               //                         - uploadErr.sizeExceed  文件太大.
 *                               //                         - uploadErr.crc32       计算本地文件hash值时错误.
 *                               //                         - uploadErr.net         ajax上传时出错.
 *                               //                   serverData: 服务器返回的数据.
 *                progressCB:  , // 上传进度的回调. function(fileObj, percent),
 *                headers: {     // 设置request headers
 *                  'customHeader': 'value'
 *                },
 *                crossDomain: true,     // 跨域, 默认为true
 *                withCredentials: true, // 是否附带cookie, 默认为true
 *              }
 */

function upload(cfg) {
  var control_upload_cb = cfg.finishCB;
  var control_upload_progress_cb = cfg.progressCB;
  var control_upload_begin_cb = cfg.beginCB;
  var control_upload_url = cfg.uploadUrl;
  var control_upload_maxFileSize = (!cfg.maxFileSize) ? Infinity : cfg.maxFileSize;

  cfg.fileObj = $(cfg.fileObj);
  cfg.formObj = $(cfg.formObj);
  
  if (cfg.fileType)
  {
    cfg.fileObj.attr("accept", cfg.fileType);
  }

  if (!cfg.fileObj[0].files[0])
  {
    if (control_upload_cb)  control_upload_cb(err.nofile, cfg.fileObj, null);
    return;
  }
  if (cfg.fileObj[0].files[0].size > control_upload_maxFileSize)
  {
    if (control_upload_cb)  control_upload_cb(err.sizeExceed, cfg.fileObj, null);
    return;
  }

  var urlQueryIndex = control_upload_url.indexOf('?');
  if (urlQueryIndex < 0) {
    control_upload_url += '?';
  } else if (urlQueryIndex < control_upload_url.length-1) {
    control_upload_url += '&';
  }

  var formObj = cfg.formObj;
  var fileObj = cfg.fileObj;

  crypt.crc32_file(fileObj[0].files[0], function(crc){
    if (crc) {
      try {
        var con = ajaxSubmit(formObj, fileObj, {
          method:       'POST',
          url:          control_upload_url + 'crc32=' + crc + '&size=' + fileObj[0].files[0].size + (cfg.data ? '&data='+cfg.data : ''),
          progress:     function(percentComplete){ if (control_upload_progress_cb) control_upload_progress_cb(fileObj, percentComplete?percentComplete.toFixed(1):0 ); },
          error:        function(){ if (control_upload_cb)  control_upload_cb(err.net, fileObj, null); },
          success:      function(r) {
            try {
              r = JSON.parse(r);
            } catch(e) {}

            if (control_upload_cb)  control_upload_cb(null, fileObj, r);
          },
          crossDomain:cfg.crossDomain, 
          headers: cfg.headers,
          withCredentials: cfg.withCredentials
        });
        if (control_upload_begin_cb) control_upload_begin_cb(con);
      } catch (e) {
        if (control_upload_cb)  control_upload_cb(e, fileObj, null);
      }
    } else {
      if (control_upload_cb)  control_upload_cb(err.crc32, fileObj, null);
    }
  });
}


return {upload:upload};

}
);