
var maskPrevent = require('../domHelper').maskPreventEvent;
var actionsheet = require('../controls/actionsheet');

// function resizeActionsheet() {
//   var ee = $('actionsheet');
//   for (var i = 0; i < ee.length; i++) {
//     var e = $(ee[i]);

//     e.css('margin-top', parseInt((document.body.clientHeight - e[0].clientHeight) - 5) + 'px');
//   }
// }

// 是否支持orientationchange事件
// if ('orientation' in window && 'onorientationchange' in window)
// {
//   $(window).on('orientationchange', resizeActionsheet);
// }
// else {
//   $(window).off('resize', resizeActionsheet).on('resize', resizeActionsheet);
// }

$.fn.isActionsheet = function() {

  var _this = (typeof this.length === 'undefined') ? $(this) : this;

  if (_this.length >= 1) {
    _this = $(_this[0]);

    if (_this.hasClass('febsui-actionsheet-container')) {
    // if (ee[0].nodeName.toLowerCase() == 'actionsheet') {
      _this = _this.parent();
    }

    return _this.hasClass('febsui-actionsheet');
  }
  
  return false;
}


$.fn.actionsheetIsVisible = function() {

  var _this = (typeof this.length === 'undefined') ? $(this) : this;

  if (_this[0]) {
    var ee = $(_this[0]);
    
    if (ee.hasClass('febsui-actionsheet-container')) {
    // if (ee[0].nodeName.toLowerCase() == 'actionsheet') {
      ee = ee.parent();
    }

    if (ee.hasClass('febsui-actionsheet-inited')) {

      var domid = ee.attr('id');
      if (febs.string.isEmpty(domid)) {
        return ee._isVisible();
      }

      ee = $('.febsui-actionsheet[data-id="'+domid+'"]');
      if (!ee[0])
        return false;
      
      return ee._isVisible();
    }
  }

  return false;
}

$.fn.actionsheetShow = function() {

  var _this = (typeof this.length === 'undefined') ? $(this) : this;
  actionsheet.actionsheet_init(_this);

  for (var i = 0; i < _this.length; i++) {
    var ee = $(_this[i]);
    
    if (ee.hasClass('febsui-actionsheet-container')) {
    // if (ee[0].nodeName.toLowerCase() == 'actionsheet') {
      ee = ee.parent();
    }

    if (ee.hasClass('febsui-actionsheet-inited')) {

      var domid = ee.attr('id');
      if (!febs.string.isEmpty(domid)) {
        ee = $('.febsui-actionsheet[data-id="'+domid+'"]');
        if (!ee[0])
          continue;
      }

      if (ee._isVisible())
        continue;

      var mask = '';
      if (!$('.febsui-mask').hasVisible()) {
        ee.addClass('febsui-mask');
      }
      else {
        ee.removeClass('febsui-mask');
      }

      maskPrevent(ee);

      ee.one('click', function(){
        $(this).actionsheetHide();
      });

      ee.removeClass('febsui-invisible').addClass('febsui-visible');
    }
  }

  // resizeActionsheet();
  return this;
}

$.fn.actionsheetHide = function() {

  var _this = (typeof this.length === 'undefined') ? $(this) : this;

  for (var i = 0; i < _this.length; i++) {
    var ee = $(_this[i]);
    
    if (ee.hasClass('febsui-actionsheet-container')) {
    // if (ee[0].nodeName.toLowerCase() == 'actionsheet') {
      ee = ee.parent();
    }
    if (ee.hasClass('febsui-actionsheet-inited')) {

      var domid = ee.attr('id');
      if (!febs.string.isEmpty(domid)) {
        ee = $('.febsui-actionsheet[data-id="'+domid+'"]');
        if (!ee[0])
          continue;
      }

      // setTimeout(function(){
        ee.removeClass('febsui-visible').addClass('febsui-invisible');
      // }, 100);
    }
  }
  return this;
}