


$.fn.isRadio = function() {
  var _this = (typeof this.length === 'undefined') ? $(this) : this;

  if (_this.length >= 1) {
    var ee = $(this[0]);
    if (ee.hasClass('febsui-radio')
      || (ee[0].nodeName.toLowerCase() == 'input' && ee.attr('type') == 'radio')) {
      return true;
    }
  }
  
  return false;
}

$.fn.radioGetValue = function() {
  var _this = (typeof this.length === 'undefined') ? $(this) : this;

  _this = $(_this[0]);
  if (_this.isRadio()) {

    if (_this.hasClass('febsui-radio')) {
      _this = $(_this.children('input')[0]);
    }

    var elem = $('input[name="'+_this.attr('name')+'"]');
    for (var i = 0; i < elem.length; i++) {
      if (elem[i].checked) {
        return elem[i].value;
      }
    }
  }

  return '';
}


$.fn.radioSetValue = function(value, trigger) {
  var _this = (typeof this.length === 'undefined') ? $(this) : this;

  var o = {};
  for (var i = 0; i < _this.length; i++) {
    var ee = $(_this[i]);
    if (ee.isRadio()) {
      
      if (ee.hasClass('febsui-radio')) {
        ee = $(ee.children('input')[0]);
      }

      var group = ee.attr('name');
      if (o[group])
        continue;
      o[group] = true;
      var elem = $('input[name="'+group+'"]');
      for (var i = 0; i < elem.length; i++) {
        if (elem[i].value == value) {
          if (!elem[i].checked)
            elem[i].checked = true;
          if (trigger) {
            ee.trigger('change');
          }
          break;
        }
      }
    }
  }
  return this;
}

$.fn.radioChecked = function(checked, trigger) {
  var _this = (typeof this.length === 'undefined') ? $(this) : this;

  var o = {};
  for (var i = 0; i < _this.length; i++) {
    var ee = $(_this[i]);
    if (ee.isRadio()) {
      
      if (ee.hasClass('febsui-radio')) {
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