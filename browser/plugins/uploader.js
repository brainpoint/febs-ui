

/**
 * jquery plugin.
 */

$.fn.uploaderReset = function() {
  var _this = (typeof this.length === 'undefined') ? $(this) : this;
  if (_this[0] && _this[0].nodeName.toLowerCase() == 'uploader') {
    for (var i = 0; i < _this.length; i++) {
      var ee = $(_this[i]);
      var form = ee.children('form')[0];
      if (form) {
        var input = $(form).children('input')[0];
        if (input) {
          input.value = '';
        }
      }

      var label = ee.children('label')[0];
      if (label) {
        label = $(label)
        label.removeAttr('style');
        label.attr('for', label.attr('data-for'));

        var htmlUpload = label.children('div')[0];
        if (htmlUpload) {
          $(htmlUpload).css('display', 'inline-block');
        }

        var progress = label.children('.febsui-uploader-progress')[0];
        if (progress) {
          progress = $(progress);
          var filename = progress.children('.febsui-uploader-filename')[0];
          if (filename) {
            $(filename).html('');
          }
          progress.css('display', 'none');
        }
      }

      var cancel = ee.children('.febsui-uploader-progress-cancel')[0];
      if (cancel) {
        cancel = $(cancel)
        cancel.removeAttr('style');
      }
    }
  } // if.

  return this;
}

