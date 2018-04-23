

exports.switch_init = switch_init;


$.fn.isSwitchOn = function() {
  return !this.hasClass("febsui-switch-off");
}

$.fn.switch = function(cb) {
  if (cb) {
    if (this.length > 1) {
      for (var i = 0; i < this.length; i++) {
        var elem = this[i];
    
        if (elem._swtichEvents) {
          elem._swtichEvents.push(cb);
        } // if.
      } // for.
    }
    else {
      var elem = this._elem;
      if (elem._swtichEvents) {
        elem._swtichEvents.push(cb);
      } // if.
    }
  }
  // trigger.
  else {
    if (this.length > 1) {
      for (var i = 0; i < this.length; i++) {
        var elem = this[i];
        var ee = elem._swtichEvents;
        if (ee) {
          for (var i = 0; i < ee.length; i++) {
            ee[i].bind(elem)();
          }
        }
      } // for.
    }
    else {
      var elem = this._elem;
      var ee = elem._swtichEvents;
      if (ee) {
        for (var i = 0; i < ee.length; i++) {
          ee[i].bind(elem)();
        }
      }
    }
  } // if..else.
}

$.fn.isSwitchDisable = function() {
  return this.hasClass("febsui-switch-disabled");
}

$.fn.switchDisable = function(isDisable) {
  if (this.length > 1) {
    for (var i = 0; i < this.length; i++) {
      var elem = this[i];
  
      if (elem._swtichEvents) {
        if (isDisable)
          elem.addClass("febsui-switch-disabled");
        else
          elem.removeClass("febsui-switch-disabled");
      } // if.
    } // for.
  }
  else {
    var elem = this;
    if (elem._swtichEvents) {
      if (isDisable)
        elem.addClass("febsui-switch-disabled");
      else
        elem.removeClass("febsui-switch-disabled");
    } // if.
  }
}

$.fn.switchOn = function(isOn, trigger) {
  if (this.length > 1) {
    for (var i = 0; i < this.length; i++) {
      var elem = this[i];
  
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
  }
  else {
    var elem = this;
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
  }
};

/**
* @desc: 初始化switch控件.
*        对页面上 class 为 febsui-switch-on 已经 febsui-switch-off 的所有元素初始化为switch控件.
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

      // elems[i]._switchOn = elems[i].on;
      // elems[i].on = function(event, cb) {
      //   if (event == 'change') {
      //     $(this)._swtichEvents.push(cb);
      //   } else {
      //     $(this)._switchOn(event, cb);
      //   }
      // }.bind(elems[i]);
      // elems[i]._switchOff = elems[i].off;
      // elems[i].off = function(event, cb) {
      //   if (event == 'change') {
      //     var ee = $(this)._swtichEvents;
      //     if (!cb) {
      //       $(this)._swtichEvents = [];
      //     } else {
      //       for (var i = 0; i < ee.length; i++) {
      //         if (ee[i] === cb) {
      //           ee.splice(i, 1);
      //           break;
      //         }
      //       }
      //     }
      //   } else {
      //     $(this)._switchOff(event, cb);
      //   }
      // }.bind(elems[i]);

      // elems[i]._switchOn('change', function(e){
      //   var ee = $(this)._swtichEvents;
      //   for (var i = 0; o < ee.length; i++) {
      //     ee[i](e);
      //   }
      // });

      // elems[i]._switchTrigger = elems[i].trigger;
      // elems[i].trigger = function(event) {
      //   if (event == 'change') {
      //     $(this).switch(!$(this).isSwitchOn(), true);
      //   } else {
      //     $(this)._switchTrigger(event);
      //   }
      // }.bind(elems[i]);

    }
  } // for.
}
