
/**
 * @param options: {
 *                   url: url,
 *                   success: function() {},
 *                   error: function(err) {},
 *                   progress: function(percent) {},
 *                   method: 'post',
 *                   headers: {},
 *                   timeout: 5000,
 *                   withCredentials: true,
 *                   crossDomain: true,
 *                   sliceOffset:  this.sliceOffset,
 *                   sliceLength:  this.sliceLength,
 *                 }
 */
exports.ajaxSubmit = function ajaxSubmit(formObj, fileObj, options) {

  var default_options = {
    success: options.success,
    method: options.method || 'POST',
    url: options.url,
    mode: (options.crossDomain === false) ? 'same-origin' : 'cors',
    timeout: (options.timeout || 5000)
  };

  options = $.extend(default_options, options || {});

  if (!!formObj.attr('enctype') && formObj.attr('enctype').toLowerCase() === 'multipart/form-data') {

    var formData = new FormData();

    if ('files' in fileObj[0] && fileObj[0].files.length > 0) {
      var blobSlice = File.prototype.mozSlice || File.prototype.webkitSlice || File.prototype.slice;

      // ToDo: Support Multiple on any input? 
      // Just need a loop here..
      formData.append(fileObj[0].name, blobSlice.call(fileObj[0].files[0], options.sliceOffset, options.sliceOffset+options.sliceLength));
    }

    options.data = formData;
  } else {
    throw new Error('only support multipart/form-data');
  }

  var headers;
  if (options.headers) {
    // delete options.headers['Content-Type'];
    headers = options.headers;
  }
  else {
    headers = {};
  }

  headers['Content-Type'] = false;

  return window.febs.net.ajax({
    url: options.url,
    type: options.method,
    headers: headers,
    processData: false,
    data: options.data,
    timeout: options.timeout,
    withCredentials: options.withCredentials,
    success: function(data) {
      if (options.success) {
        options.success(data);
      }
    },
    error: function(xhr, statusText, err) {
      if (options.error) {
        options.error(err);
      }
    },
    complete: options.complete,
    progress: options.progress
  });
}