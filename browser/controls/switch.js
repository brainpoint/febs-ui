

exports.switch_init = switch_init;

$.fn.isSwitch = function() {
  var _this = (typeof this.length === 'undefined') ? $(this) : this;

  if (_this.length >= 1) {
    var elem = _this[0]._swtichEvents;
    if (!!elem) {
      return true;
    }

    if (_this[0].nodeName.toLowerCase() == 'switch') {
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
      var elem = _this[i];
  
      if (elem._swtichEvents) {
        elem._swtichEvents.push(cb);
      } // if.
    } // for.
  }
  // trigger.
  else {
    for (var i = 0; i < _this.length; i++) {
      var elem = _this[i];
      var ee = elem._swtichEvents;
      if (ee) {
        for (var i = 0; i < ee.length; i++) {
          ee[i].bind(elem)();
        }
      }
    } // for.
  } // if..else.
  return this;
}

$.fn.switchOn = function(isOn, trigger) {

  var _this = (typeof this.length === 'undefined') ? $(this) : this;

  for (var i = 0; i < _this.length; i++) {
    var elem = _this[i];

    if (elem._swtichEvents) {
      if (isOn) {
        if (elem.hasClass("febsui-switch-off")) {
          elem.removeClass("febsui-switch-off").addClass("febsui-switch-on");
          if (trigger) {
            elem.switch();
          }
        }
      } else {
        if (!elem.hasClass("febsui-switch-off")) {
          elem.removeClass("febsui-switch-on").addClass("febsui-switch-off");
          if (trigger) {
            elem.switch();
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
    var elem = _this[i];

    if (elem._swtichEvents) {
      if (isDisable)
        elem.addClass("febsui-switch-disabled");
      else
        elem.removeClass("febsui-switch-disabled");
    } // if.
  } // for.
  return this;
}


/**
* @desc: 初始化switch控件.
*        对页面上 class 为 febsui-switch-on 以及 febsui-switch-off 的所有元素初始化为switch控件.
*/
function switch_init() {
  var elems = $('switch');
  // elems.append("<span class='febsui-switch-slider'></span>");
  for (var i = 0; i < elems.length; i++) {
    var dom = $(elems[i]);
    if (!dom.children().hasClass('febsui-switch-slider')) {
      dom.append("<span class='febsui-switch-slider'></span>");
      dom.click(function() {
        var ee = $(this);
        if (ee.hasClass("febsui-switch-disabled")) {
          return;
        }
        if (!ee.hasClass("febsui-switch-off")) {
          ee.removeClass("febsui-switch-on").addClass("febsui-switch-off");
        } else {
          ee.removeClass("febsui-switch-off").addClass("febsui-switch-on");
        }

        ee.switch();
      });

      elems[i]._swtichEvents = elems[i]._swtichEvents||[];
    }
  } // for.
}
