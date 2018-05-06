
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
      // ToDo: Support Multiple on any input? 
      // Just need a loop here..
      formData.append(fileObj[0].name, fileObj[0].files[0]);
    }

    options.data = formData;
  } else {
    throw new Error('only support multipart/form-data');
  }

  if (options.headers) {
    delete options.headers['Content-Type'];
  }

  return window.febs.net.ajax({
    url: options.url,
    type: options.method,
    headers: options.headers,
    data: options.data,
    timeout: options.timeout,
    withCredentials: options.credentials,
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
    progress: options.progress
  });
}