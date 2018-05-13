
var domHelper = require('../domHelper');
var touchEventPrevent = require('../domHelper').mobile_preventTouchEvent;

exports.checkbox_init = checkbox_init;

/**
* @desc: 初始化checkbox控件.
*        对页面上 的所有 <input type="checkbox" class="febsui-checkbox"> 元素进行初始化.
*/
function checkbox_init() {
  var elems = $('.febsui-checkbox');
  for (var i = 0; i < elems.length; i++) {
    var dom = $(elems[i]);

    if (!dom.hasClass('febsui-checkbox-inited')) {

      dom.removeClass('febsui-checkbox');

      var dd = $("<div class='febsui-checkbox febsui-checkbox-inited '></div>");

      // copy attri.
      domHelper.copyAttrs(dom,dd, function(name){
        if ('style' == name) return true;
        return false;
      });

      // copy class.
      domHelper.copyClass(dom, dd);

      dd.insertBefore(dom);
      dd.append(dom);
      dd.append('<div class="febsui-checkbox-mark"></div>');
      
      touchEventPrevent(dd[0]);

      // ie. for checked.
      if (window.febs.utils.browserIsIE()) {
        dom.css('display', 'none');
        var mark = $(dd.children('.febsui-checkbox-mark')[0]);
        mark.click(function(env){
          var ee = $(env.target);
          ee = ee.prev('input');
          if (ee[0]) {
            ee[0].checked = !ee[0].checked;
            ee.parent().checkboxChange();
          }
        });
      } // if.

    }
  } // for.
}

