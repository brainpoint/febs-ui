

$.fn.isActionsheet = function() {

  var _this = (typeof this.length === 'undefined') ? $(this) : this;

  if (_this.length >= 1) {
    if (_this[0].nodeName.toLowerCase() == 'actionsheet') {
      return true;
    }
    else {
      return $(_this[0]).hasClass('febsui-actionsheet');
    }
  }
  
  return false;
}

$.fn.actionsheetShow = function() {

  var _this = (typeof this.length === 'undefined') ? $(this) : this;

  for (var i = 0; i < _this.length; i++) {
    var ee = $(_this[i]);
    if (ee[0].nodeName.toLowerCase() == 'actionsheet') {
      ee = ee.parent();
    }
    if (ee.hasClass('febsui-actionsheet')) {

      if (ee.isVisibile())
        continue;

      var mask = '';
      if (!$('.febsui-mask').hasVisibile()) {
        ee.addClass('febsui-mask');
      }
      else {
        ee.removeClass('febsui-mask');
      }

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
    if (ee[0].nodeName.toLowerCase() == 'actionsheet') {
      ee = ee.parent();
    }
    if (ee.hasClass('febsui-actionsheet')) {
      ee.removeClass('febsui-visible').addClass('febsui-invisible');
    }
  }
  return this;
}