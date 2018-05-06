{/* <div class="febsui-uploader">
  <button onclick='$("#fileObj")[0].click()'>上传图片</button>
  <form id="fileForm" method="post" role="form" enctype="multipart/form-data" style="display:none">
    <input id="fileObj" type="file" name="file" onchange="javascript:SetupWebUploader('/api/users/upload_image', $('#fileForm'), $('#fileObj'))" multiple>
  </form>
  <div class="febsui-uploader-progress">
    <div class="febsui-uploader-progress-bg"></div>
    <span>10%</span>
    <div class="febsui-uploader-progress-cancel"><div class="febsui-icon febsui-icon-error"></div></div>
  </div>
</div> */}

var uuid = require('../uuid');
var upload = require('./upload');
var uploadErr = require('./upload.err');
var dialog = require('./dialog');

exports.uploader_init = uploader_init;

window['_Feb_fegegRRdefaultUploaderError'] = function(err) {
  if (febsui.uploadErr.nofile == err) {
    err = '未选择文件';
  } else if (febsui.uploadErr.sizeExceed == err) {
    err = '文件超出大小';
  } else if (febsui.uploadErr.crc32 == err) {
    err = '文件验证出错';
  } else if (febsui.uploadErr.net == err) {
    err = '网络错误';
  } else {
    err = '上传错误';
  }
  dialog.showAlert(err.toString());
};

window['_Feb_fegegRRdefaultUploaderFinishParam'] = null;


/**
* @desc: 初始化page控件.
* @param elem: 将控件插入到elem中, elem是一个jquery的对象.
* @param curPage: 当前页
* @param pageCount: 总页数
* @param totalCount: 总条数
* @param pageCallback: 页面跳转函数, function(page) {}
* @return: 
*/
function uploader_init() {
  var elems = $('uploader');
  for (var i = 0; i < elems.length; i++) {
    var dom = $(elems[i]);

    if (!dom.hasClass('febsui-uploader-init')) {
      dom.addClass('febsui-uploader-init');

      var dataAccept = dom.attr('data-accept');
      var dataFilename = dom.attr('data-filename');
      var dataApi = dom.attr('data-api');
      if (window.febs.string.isEmpty(dataApi)) {
        throw new Error("uploader need attribute: data-api");
      }


      var uid = 'febsui-uploader-'+uuid.uuid();

      var html = dom.html();
      dom.html('');

      var htmlForm = 
`<form id="${uid}-form" method="post" role="form" enctype="multipart/form-data" style="display:none">
  <input id="${uid}" type="file" name="file" multiple${dataAccept?' accept="'+dataAccept+'"': ''}>
</form>`;
      dom.append($(htmlForm));

      var html = `<label id="${uid}-label" for="${uid}" data-for="${uid}"><div class="btn">${html}</div>`;
      
      var htmlFilename = dataFilename==='true' ? `<span id="${uid}-filename" class="febsui-uploader-filename febsui-ellipsis"></span>` : '';

      var htmlPro = 
`<div id="${uid}-progress" class="febsui-uploader-progress" style="display:none;">
  <div class="febsui-uploader-progress-bg" style="width:0%;"></div>
  ${htmlFilename}<span${dataFilename==='true'?' class="febsui-uploader-right"':''}>10%</span>
</div>
</label>
<div class="febsui-uploader-progress-cancel"></div>
`;
      html += htmlPro;

//       var htmlPro = 
// `<div id="${uid}-progress" class="febsui-uploader-progress" style="display:none;">
//   <div class="febsui-uploader-progress-bg" style="width:0%;"></div>
//   ${htmlFilename}<span${dataFilename==='true'?' class="febsui-uploader-right"':''}>10%</span>
//   <div class="febsui-uploader-progress-cancel"><div class="febsui-icon febsui-icon-error"></div></div>
// </div>
// `;
      dom.append(html);


      //
      // event.
      //
      $('#'+uid).change(function(env){

        var uploader = $(this).parent().parent('uploader');

        var _uid = $(this).attr('id');

        if ($('#'+_uid)[0].files.length <= 0) {
          return;
        }

        var label = $('#'+_uid+'-label');
        var cancel = $(uploader.children('.febsui-uploader-progress-cancel')[0]);

        var progress = $('#'+_uid+'-progress');
        var progressBg = $(progress.children('.febsui-uploader-progress-bg')[0]);
        var progressSpan = progress.children('span');
        progressSpan = $(progressSpan[progressSpan.length-1]);

        label.attr('style', 'right:35px !important;');
        var labelFor = label.attr('for');
        label.removeAttr('for');

        var uploadHtml = $(label.children('div')[0]);
        uploadHtml.css('display', 'none');
        progress.css('display', 'inline-block');
        progressBg.css('width', '0%');
        progressSpan.html('0%');

        if ($('#'+_uid)[0].files) {

          var cancelControl;


          var uploader = $(this).parent().parent('uploader');

          var _dataApi = uploader.attr('data-api');
          var _dataMaxSize = uploader.attr('data-maxsize');
          var _dataFinish = uploader.attr('data-finish');
          var _dataError = uploader.attr('data-error');

          $(`#${_uid}-filename`).html($('#'+_uid)[0].files[0].name);

          // trim.
          if (_dataFinish) {
            _dataFinish = _dataFinish.replace(/(^\s*)|(\s*$)/g, "");
          }
          if (_dataError) {
            _dataError = _dataError.replace(/(^\s*)|(\s*$)/g, "");
          } else {
            _dataError = '_Feb_fegegRRdefaultUploaderError';
          }
          
          _dataMaxSize = _dataMaxSize ? parseInt(_dataMaxSize) : 0;

          // 取消.
          cancel.attr('style', 'display:inline !important;');
          cancel.one('click', function(){
            uploader.uploaderReset();
            _dataError = null;
            if (cancelControl) cancelControl.abort();
            cancelControl = null;
          });

          // 上传.
          upload.upload({
            formObj: $('#'+_uid+'-form'),
            fileObj: $('#'+_uid),
            uploadUrl: _dataApi,
            maxFileSize: _dataMaxSize,
            beginCB: function(uploader) { cancelControl = uploader; },
            finishCB: function(err, fileObj, serverData) {
              if (err) {

                cancel.removeAttr('style');
                label.removeAttr('style');
                label.attr('for', label.attr('data-for'));
                uploadHtml.css('display', 'inline-block');
                progress.css('display', 'none');

                if (err != uploadErr.nofile
                  && err != uploadErr.sizeExceed
                  && err != uploadErr.crc32
                  && err != uploadErr.net)
                {
                  console.log(err);
                }

                if (_dataError) {
                  var i = 0;
                  for (; i < _dataError.length; i++) {
                    if (!((_dataError[i] >= 'a' && _dataError[i] <= 'z')
                    || (_dataError[i] >= 'A' && _dataError[i] <= 'Z')
                    || _dataError[i] == '_')) {
                      break;
                    }
                  }
                  if (i >= _dataError.length) {
                    err = err.toString();
                    err = window.febs.string.replace(err, '"', '\"');
                    eval(_dataError+'("'+err+'")');
                  }
                  else {
                    eval(_dataError);
                  }
                }

                // reset.
                cancel.trigger('click');
                cancel.off('click');
              }
              // 上传成功.
              else
              {
                cancelControl = null;
                var percent = "100%"
                progressBg.css('width', percent);
                progressSpan.html(percent);

                cancel.removeAttr('style');
                label.removeAttr('style');
                label.attr('for', label.attr('data-for'));

                window['_Feb_fegegRRdefaultUploaderFinishParam'] = serverData;

                if (_dataFinish) {
                  var i = 0;
                  for (; i < _dataFinish.length; i++) {
                    if (!((_dataFinish[i] >= 'a' && _dataFinish[i] <= 'z')
                    || (_dataFinish[i] >= 'A' && _dataFinish[i] <= 'Z')
                    || _dataFinish[i] == '_')) {
                      break;
                    }
                  }
                  if (i >= _dataFinish.length) {
                    eval(_dataFinish+'(window["_Feb_fegegRRdefaultUploaderFinishParam"])');
                  }
                  else {
                    eval(_dataFinish);
                  }
                }
              }
            },
            progressCB: function(fileObj, percent) {
              percent = percent * 100 + "%"
              progressBg.css('width', percent);
              progressSpan.html(percent);
            }
          });
        } // if.
      });

    }
  } // for.
}

