
$.fn.isDialog = function() {

  var _this = (typeof this.length === 'undefined') ? $(this) : this;

  if (_this.length >= 1) {
    if (_this[0].nodeName.toLowerCase() == 'dialog') {
      return true;
    }
    else {
      return $(_this[0]).hasClass('febsui-dialog');
    }
  }
  
  return false;
}

$.fn.dialogShow = function() {

  var _this = (typeof this.length === 'undefined') ? $(this) : this;

  for (var i = 0; i < _this.length; i++) {
    var ee = $(_this[i]);
    if (ee[0].nodeName.toLowerCase() == 'dialog') {
      ee = ee.parent();
    }
    if (ee.hasClass('febsui-dialog')) {

      if (!$('.febsui-mask').hasVisibile()) {
        ee.addClass('febsui-mask');
      }
      else {
        ee.removeClass('febsui-mask');
      }

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
    if (ee[0].nodeName.toLowerCase() == 'dialog') {
      ee = ee.parent();
    }
    if (ee.hasClass('febsui-dialog-init')) {
      ee.removeClass('febsui-visible').addClass('febsui-invisible');
    }
  }
  return this;
}