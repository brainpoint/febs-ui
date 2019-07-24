
exports.resizeDialog = resizeDialog;

var maskPrevent = require('../utils/domHelper').maskPreventEvent;
var dialogs = require('../controls/dialog');

var dialogAnimateDurtion = 300;

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
  $(window).off('resize', resizeDialog).on('resize', resizeDialog);
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

$.fn.dialogShow = function(cb) {

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
        ee.removeClass('febsui-invisible');
        ee = ee.parent();
      }

      if (!$('.febsui-mask').hasVisible()) {
        ee.addClass('febsui-mask');
      }
      else {
        ee.removeClass('febsui-mask');
      }

      // TODO: 临时关闭.
      // maskPrevent(ee);

      ee.removeClass('febsui-invisible').addClass('febsui-visible');
    }
  }

  if (cb) {
    if (_this.length > 0)
      setTimeout(cb, dialogAnimateDurtion+1);
    else
      cb();
  }

  resizeDialog();
  return this;
}

$.fn.dialogHide = function(cb) {

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
        ee = ee.parent();
      }
      
      ee.removeClass('febsui-visible').addClass('febsui-invisible');
    }
  }

  if (cb) {
    if (_this.length > 0)
      setTimeout(cb, dialogAnimateDurtion+1);
    else
      cb();
  }

  return this;
}