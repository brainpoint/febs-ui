
var touchEventPrevent = require('../utils/domHelper').mobile_preventTouchEvent;

exports.button_init = button_init;
exports.button_init_event = button_init_event;


/**
* @desc: 对元素注册初始化事件.
*/
function button_init_event(dom) {
  touchEventPrevent(dom);
}

/**
* @desc: 初始化botton控件. 防止mobile端事件穿透.
*/
function button_init() {
  var elems = $('button');
  for (var i = 0; i < elems.length; i++) {
    var dom = $(elems[i]);
    if (!dom.hasClass('febsui-button-inited')) {
      dom.addClass('febsui-button-inited');
      dom = dom[0];

      button_init_event(dom);
    }
  } // for.
}
