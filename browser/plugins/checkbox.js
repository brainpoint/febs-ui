


$.fn.isCheckbox = function() {
  var _this = (typeof this.length === 'undefined') ? $(this) : this;

  if (_this.length >= 1) {
    var ee = $(this[0]);
    if (ee.hasClass('febsui-checkbox')
      || (ee[0].nodeName.toLowerCase() == 'input' && ee.attr('type') == 'checkbox')) {
      return true;
    }
  }
  
  return false;
}

$.fn.checkboxChecked = function(checked, trigger) {
  var _this = (typeof this.length === 'undefined') ? $(this) : this;

  var o = {};
  for (let i = 0; i < _this.length; i++) {
    var ee = $(_this[i]);
    if (ee.isCheckbox()) {
      
      if (ee.hasClass('febsui-checkbox')) {
        ee = $(ee.children('input')[0]);
      }

      if (ee[0]) {
        if (window.febs.utils.isNull(checked)) {
          return ee[0].checked;
        }
        else {
          if ((!!checked) ^ ee[0].checked) {
            ee[0].checked = checked;
            if (trigger) {
              ee.trigger('change');
            }
          }
        }
      }
    } // if.
  } // for.
  return this;
}