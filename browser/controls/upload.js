/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */

'use strict';

var crypt = window.febs.crypt;
var err = require('./upload.err');
var ajaxSubmit = require('../ajaxSubmit').ajaxSubmit;

// var responseText = $('iframe')[0].contentDocument.body.textContent;
//     var responseData = JSON.parse(responseText) || {};
//     if (responseData.isSuccess == true || responseData.code == 200) {
//         //success
//     } else {
//         //error   
//     }


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
 *                beginCB:     , // 上传开始的回调. function(fieObj, uploader); 调用uploader.abort() 可以停止上传.
 *                finishCB:    , // 上传完成后的回调. function(err, fileObj, serverData, xhr=null)
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
 *                withCredentials: true, // 是否附带cookie, 默认为true,
 *                checkoutCrc32: true,   // 是否上传 crc32,size,ajaxmark(防止chrome优化) 三个参数.
 *                timeout,
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
  
  // ie9.
  var uid = 'febsuifile' + febs.crypt.uuid();
  uid = window.febs.string.replace(uid, '-', '');
  var is_IE9 = window.febs.utils.browserIEVer() <= 9;
  if (is_IE9) {
    cfg.formObj.attr('target', uid);
    cfg.formObj.attr('action', control_upload_url);
    cfg.formObj.attr('method', 'post');

    var iframeDom = `<iframe id="${uid}" name="${uid}" style="display:none;"></iframe>`;
    $('body').prepend(iframeDom);

    $('#'+uid).on('load', function() {
      var responseText = $('#'+uid)[0].contentDocument.body.textContent;
      var r;
      try {
        r = JSON.parse(responseText);
      } catch(e) { r = {}; }

      if (r.isSuccess == true || r.code == 200) {
          //success
          if (control_upload_cb)  control_upload_cb(null, cfg.fileObj, r);
      } else {
          //error   
          if (control_upload_cb)  control_upload_cb(err.net, cfg.fileObj, null);
      }

      cfg.formObj.removeAttr('target');
      cfg.fileObj[0].value="";
      $('#'+uid).remove();
    });

    if (control_upload_begin_cb) control_upload_begin_cb(cfg.fileObj, {abort:function(){ $('#'+uid).remove(); cfg.fileObj[0].value=""; }});

    var inputs = cfg.formObj.children('input');
    $(inputs[inputs.length-1]).click();
  }
  else {

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
    var timeout = cfg.timeout;

    function uploadFile() {
      var urlpath;
      if (this.checkoutCrc32) {
        urlpath = this.control_upload_url + 'crc32=' + this.crc + '&size=' + this.fileObj[0].files[0].size + (this.data ? '&data='+this.data : '');
      }
      else {
        urlpath = this.control_upload_url + 'size=' + this.fileObj[0].files[0].size;
      }

      try {
        var ctx = this;
        var con = ajaxSubmit(this.formObj, this.fileObj, {
          timeout:      this.timeout,
          method:       'POST',
          url:          urlpath,
          progress:     function(percentComplete){ if (ctx.control_upload_progress_cb) ctx.control_upload_progress_cb(ctx.fileObj, percentComplete?percentComplete.toFixed(1):0 ); },
          error:        function(){ if (ctx.control_upload_cb)  ctx.control_upload_cb(err.net, ctx.fileObj, null); ctx.fileObj[0].value=""; },
          success:      function(r) {
            try {
              r = JSON.parse(r);
            } catch(e) { r = {}; }

            if (ctx.control_upload_cb)  ctx.control_upload_cb(null, ctx.fileObj, r);
            ctx.fileObj[0].value="";
          },
          complete:     function(xhr, responseText) {
            if (xhr.status != 200) {
              try {
                if (ctx.control_upload_cb)  ctx.control_upload_cb(err.net, ctx.fileObj, responseText, xhr); ctx.fileObj[0].value="";
              }
              catch (e) {}
            }
          },
          crossDomain:this.crossDomain, 
          headers: this.headers,
          withCredentials: this.withCredentials
        });
        if (this.control_upload_begin_cb) this.control_upload_begin_cb(this.fileObj, con);
      } catch (e) {
        if (this.control_upload_cb)  this.control_upload_cb(e, this.fileObj, null);
        this.fileObj[0].value="";
      }
    } // function.
  
    if (cfg.checkoutCrc32) {
      crypt.crc32_file(fileObj[0].files[0], function(crc){
        if (crc) {
          uploadFile.bind(window.febs.utils.mergeMap(this, {crc:crc}))();
        } else {
          if (this.control_upload_cb)  this.control_upload_cb(err.crc32, this.fileObj, null);
          this.fileObj[0].value="";
        }
      }.bind({
        timeout:      timeout,
        checkoutCrc32: cfg.checkoutCrc32,
        control_upload_url: control_upload_url,
        fileObj: cfg.fileObj,
        data: cfg.data,
        formObj: cfg.formObj,
        control_upload_progress_cb: control_upload_progress_cb,
        control_upload_cb: control_upload_cb,
        crossDomain: cfg.crossDomain,
        headers: cfg.headers,
        withCredentials: cfg.withCredentials,
        control_upload_begin_cb: control_upload_begin_cb,
      }));
    }
    else {
      uploadFile.bind({
        timeout:      timeout,
        checkoutCrc32: cfg.checkoutCrc32,
        control_upload_url: control_upload_url,
        fileObj: cfg.fileObj,
        data: cfg.data,
        formObj: cfg.formObj,
        control_upload_progress_cb: control_upload_progress_cb,
        control_upload_cb: control_upload_cb,
        crossDomain: cfg.crossDomain,
        headers: cfg.headers,
        withCredentials: cfg.withCredentials,
        control_upload_begin_cb: control_upload_begin_cb,
      })();
    }
  } // if..else.
}

exports.upload = upload;