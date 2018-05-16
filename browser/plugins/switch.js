


$.fn.isSwitch = function() {
  var _this = (typeof this.length === 'undefined') ? $(this) : this;

  if (_this.length >= 1) {
    if (_this.hasClass('febsui-switch')) {
    // [0].nodeName.toLowerCase() == 'switch') {
      return true;
    }
  }
  
  return false;
}

$.fn.switchIsOn = function() {
  return !this.hasClass("febsui-switch-off");
}

$.fn.switch = function(cb) {

  var _this = (typeof this.length === 'undefined') ? $(this) : this;

  if (cb) {
    for (var i = 0; i < _this.length; i++) {
      var elem = $(_this[i]);
  
      elem.on('switch', cb);
    } // for.
  }
  // trigger.
  else {
    _this.trigger('switch');
  } // if..else.
  return this;
}

$.fn.switchOn = function(isOn, trigger) {

  var _this = (typeof this.length === 'undefined') ? $(this) : this;

  for (var i = 0; i < _this.length; i++) {
    var elem = $(_this[i]);

    if (elem.hasClass('febsui-switch')) {
    // if (_this[0].nodeName.toLowerCase() == 'switch') {
      if (isOn) {
        if (elem.hasClass("febsui-switch-off")) {
          elem.removeClass("febsui-switch-off").addClass("febsui-switch-on");
          if (trigger) {
            elem.trigger('switch');
          }
        }
      } else {
        if (!elem.hasClass("febsui-switch-off")) {
          elem.removeClass("febsui-switch-on").addClass("febsui-switch-off");
          if (trigger) {
            elem.trigger('switch');
          }
        }
      }
    } // if.
  } // for.
  return this;
};

$.fn.switchIsDisabled = function() {
  return this.hasClass("febsui-switch-disabled");
}

$.fn.switchDisabled = function(isDisable) {

  var _this = (typeof this.length === 'undefined') ? $(this) : this;

  for (var i = 0; i < _this.length; i++) {
    var elem = $(_this[i]);

    if (elem.hasClass('febsui-switch')) {
    // if (_this[0].nodeName.toLowerCase() == 'switch') {
      if (isDisable)
        elem.addClass("febsui-switch-disabled");
      else
        elem.removeClass("febsui-switch-disabled");
    } // if.
  } // for.
  return this;
}

