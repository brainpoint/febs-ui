
exports.resizeDialog = resizeDialog;

var maskPrevent = require('../domHelper').maskPreventEvent;
var dialogs = require('../controls/dialog');


/**
* @desc: 屏幕旋转事件.
*/
function resizeDialog(){
  var elem = $('.febsui-dialog-container');

  var viewport = window.febs.dom.getViewPort();
  for (var i = 0; i < elem.length; i++) {
    $(elem[i]).css('margin-top', parseInt((viewport.height - elem[i].clientHeight) / 2) - 30 + 'px');
  }
}

// 是否支持orientationchange事件
// if ('orientation' in window && 'onorientationchange' in window)
// {
//   $(window).on('orientationchange', resizeDialog);
// }
// else {
  $(window).on('resize', resizeDialog);
// }

$.fn.isDialog = function() {

  var _this = (typeof this.length === 'undefined') ? $(this) : this;

  if (_this.length >= 1) {
    _this = $(_this[0]);

    if (_this.hasClass('febsui-dialog-container')) {
      _this = _this.parent();
    }

    return _this.hasClass('febsui-dialog');
  }
  
  return false;
}

$.fn.dialogShow = function() {

  var _this = (typeof this.length === 'undefined') ? $(this) : this;
  dialogs.dialog_init(_this);

  for (var i = 0; i < _this.length; i++) {
    var ee = $(_this[i]);
    if (ee.hasClass('febsui-dialog-container')) {
      ee = ee.parent();
    }

    if (ee.hasClass('febsui-dialog-init')) {

      var domid = ee.attr('id');
      if (!febs.string.isEmpty(domid)) {
        ee = $('.febsui-dialog[data-id="'+domid+'"]');
        if (!ee[0])
          continue;
      }

      if (!$('.febsui-mask').hasVisible()) {
        ee.addClass('febsui-mask');
      }
      else {
        ee.removeClass('febsui-mask');
      }

      maskPrevent(ee);

      ee.removeClass('febsui-invisible').addClass('febsui-visible');
    }
  }

  resizeDialog();
  return this;
}

$.fn.dialogHide = function() {

  var _this = (typeof this.length === 'undefined') ? $(this) : this;

  for (var i = 0; i < _this.length; i++) {
    var ee = $(_this[i]);
    if (ee.hasClass('febsui-dialog-container')) {
      ee = ee.parent();
    }
    if (ee.hasClass('febsui-dialog-init')) {

      var domid = ee.attr('id');
      if (!febs.string.isEmpty(domid)) {
        ee = $('.febsui-dialog[data-id="'+domid+'"]');
        if (!ee[0])
          continue;
      }
      
      ee.removeClass('febsui-visible').addClass('febsui-invisible');
    }
  }
  return this;
}