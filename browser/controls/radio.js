
var domHelper = require('../domHelper');
var touchEventPrevent = require('../domHelper').mobile_preventTouchEvent;

exports.radio_init = radio_init;

/**
* @desc: 初始化radio控件.
*        对页面上 的所有 <input type="radio" class="febsui-radio"> 元素进行初始化.
*/
function radio_init(elem) {
  var elems = elem ? elem : $('.febsui-radio');
  for (var i = 0; i < elems.length; i++) {
    var dom = $(elems[i]);

    if (!dom.hasClass('febsui-radio')) {
      continue;
    }

    if (!dom.hasClass('febsui-radio-inited')) {

      dom.removeClass('febsui-radio');

      var dd = $("<div class='febsui-radio febsui-radio-inited'></div>");

      // copy attri.
      domHelper.copyAttrs(dom,dd, function(name){
        if ('style' == name) return true;
        return false;
      });

      // copy class.
      domHelper.copyClass(dom, dd);

      // 阻止事件传递.
      dom.click(function(env){
        if (env) {
          env.stopPropagation();
          env.cancelBubble = true;
        }
      });
      
      dd.insertBefore(dom);
      dd.append(dom);
      dd.append('<div class="febsui-radio-mark"></div>');
      
      touchEventPrevent(dd[0]);

      // ie. for checked.
      if (window.febs.utils.browserIsIE()) {
        dom.css('display', 'none');
        var mark = $(dd.children('.febsui-radio-mark')[0]);
        mark.click(function(env){
          var ee = $(env.target);
          ee = ee.prev('input');
          if (ee[0]) {
            ee[0].checked = !ee[0].checked;
            ee.parent().checkboxChange();
          }

          if (env) {
            env.stopPropagation();
            env.cancelBubble = true;
          }
        });
      } // if.

    }
  } // for.
}

