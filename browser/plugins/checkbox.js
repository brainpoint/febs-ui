

function isCheckboxInput(ee) {
  return ee[0].nodeName == 'INPUT' && ee.attr('type') == 'checkbox';
}

$.fn.isCheckbox = function() {
  var _this = (typeof this.length === 'undefined') ? $(this) : this;

  if (_this.length >= 1) {
    if (!_this.hasClass('febsui-checkbox')) {
      var ee = $(_this[0]);
      if (isCheckboxInput(ee)) {
        return true;
      }
    } else {
      return true;
    }
  }
  
  return false;
}

$.fn.checkboxIsChecked = function() {
  var _this = (typeof this.length === 'undefined') ? $(this) : this;

  if (_this.length >= 1) {
    var ee = $(_this[0]);
    if (_this.hasClass('febsui-checkbox')) {
      return $(ee.children('input')[0])[0].checked;
    }
    else if (isCheckboxInput(ee)) { 
      return ee[0].checked;
    }
  }
  return false;
}

$.fn.checkboxChange = function(cb) {

  var _this = (typeof this.length === 'undefined') ? $(this) : this;

  if (cb) {
    for (var i = 0; i < _this.length; i++) {
      var elem = $(_this[i]);
      if (elem.hasClass('febsui-checkbox')) {
        $(elem.children('input')[0]).change(cb);
      }
      else if (isCheckboxInput(elem)) {
        elem.change(cb);
      }
    } // for.
  }
  // trigger.
  else {
    for (var i = 0; i < _this.length; i++) {
      var elem = $(_this[i]);
      if (elem.hasClass('febsui-checkbox')) {
        $(elem.children('input')[0]).trigger('change');
      }
      else if (isCheckboxInput(elem)) {
        elem.trigger('change');
      }
    } // for.
  } // if..else.
  return this;
}

$.fn.checkboxChecked = function(checked, trigger) {

  var _this = (typeof this.length === 'undefined') ? $(this) : this;

  for (var i = 0; i < _this.length; i++) {
    var elem = $(_this[i]);

    if (elem.hasClass('febsui-checkbox')) {
      var ee = $(elem.children('input')[0])[0];
      if (ee.checked != checked) {
        ee.checked = checked;
        if (trigger) {
          elem.checkboxChange();
        }
      }
    }
    else if (isCheckboxInput(elem)) {
      if (elem[0].checked != checked) {
        elem[0].checked = checked;
        if (trigger) {
          elem.checkboxChange();
        }
      }
    }
  } // for.
  return this;
};

$.fn.checkboxIsDisabled = function() {
  var _this = (typeof this.length === 'undefined') ? $(this) : this;

  if (this.length > 0) {
    var ee = $(this[0]);
    if (this.hasClass('febsui-checkbox')) {
      return $(ee.children('input')[0]).hasAttr('disabled');
    }
    else if (isCheckboxInput(ee)) {
      return ee.hasAttr('disabled');
    }
  }

  return false;
}

$.fn.checkboxDisabled = function(isDisable) {

  var _this = (typeof this.length === 'undefined') ? $(this) : this;

  for (var i = 0; i < _this.length; i++) {
    var elem = $(_this[i]);
    if (elem.hasClass('febsui-checkbox')) {
      if (isDisable) {
        $(elem.children('input')[0]).attr('disabled', 'disabled');
      }
      else {
        $(elem.children('input')[0]).removeAttr('disabled');  
      }
    }
    else if (isCheckboxInput(elem)) {
      if (isDisable) {
        elem.attr('disabled', 'disabled');
      }
      else {
        elem.removeAttr('disabled');  
      }
    }
  } // for.
  return this;
}

