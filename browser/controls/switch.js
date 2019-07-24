
var touchEventPrevent = require('../utils/domHelper').mobile_preventTouchEvent;

exports.switch_init = switch_init;
exports.switch_init_event = switch_init_event;


/**
* @desc: 对switch元素注册初始化事件.
*/
function switch_init_event(dom) {
  if (!dom) return;
  
  window.febs.dom.addEventListener(dom[0], 'click', function(event) {
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

    if (event) {
      event.stopPropagation();
      event.cancelBubble = true;
      return false;
    }
  });

  touchEventPrevent(dom[0]);
}

/**
* @desc: 初始化switch控件.
*        对页面上 class 为 febsui-switch-on 以及 febsui-switch-off 的所有元素初始化为switch控件.
*/
function switch_init(elem) {
  var elems = elem ? elem : $('.febsui-switch');
  // elems.append("<span class='febsui-switch-slider'></span>");
  for (var i = 0; i < elems.length; i++) {
    var dom = $(elems[i]);
    
    if (!dom.hasClass('febsui-switch')) {
      continue;
    }

    if (!dom.children().hasClass('febsui-switch-slider')) {
      dom.append("<span class='febsui-switch-slider'></span>");
      
      switch_init_event(dom);
    }
  } // for.
}
