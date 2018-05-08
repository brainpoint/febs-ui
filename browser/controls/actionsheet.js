var uuid = require('../uuid');
var domHelper = require('../domHelper');

exports.actionsheet_init = actionsheet_init;

/**
* @desc: 初始化actionsheet控件.
*        对页面上 的所有 <actionsheet> 元素进行初始化.
*/
function actionsheet_init() {
  var elems = $('actionsheet');
  for (var i = 0; i < elems.length; i++) {
    var dom = $(elems[i]);

    if (!dom.hasClass('febsui-actionsheet-inited')) {

      dom.addClass('febsui-actionsheet-inited');

      var domChildren = dom.children();
      var ddChildren;
      if (domChildren[0]) {
        ddChildren = $("<div class='febsui-actionsheet-group'></div>");
        ddChildren.append(domChildren);
        dom.append(ddChildren);
      }

      if (ddChildren) {
        var domCancel = ddChildren.children('.febsui-actionsheet-cancel');
        if (domCancel[0]) {
          domCancel.addClass('febsui-actionsheet-cell');
          var ddCancel = $("<div class='febsui-actionsheet-group' style='margin-top:5px;'></div>");
          ddCancel.append(domCancel);
          dom.append(ddCancel);
        }
      }

      // ie9.
      if (window.febs.utils.browserIEVer() <= 9) {
        var groups = dom.children('.febsui-actionsheet-group');
        for (var jj = 0; jj < groups.length; jj++) {
          var cells = $(groups[jj]).children('.febsui-actionsheet-cell');
          for (var jjj = 0; jjj < cells.length-1; jjj++) {
            $(cells[jjj]).css('border-bottom','1px solid #eee');
          }
        }
      }

      var dd = $("<div class='febsui-actionsheet'></div>");
      $('body').append(dd);
      
      // copy attri.
      domHelper.copyAttrs(dom,dd, function(name){
        if ('id' == name) return true;
        return name.indexOf('data-') == 0;
      });

      dd.append(dom);

      // // 动画设置.
      // dom.css('-webkit-transform', 'translateY('+dom[0].clientHeight+'px)');
      // dom.css('-moz-transform', 'translateY('+dom[0].clientHeight+'px)');
      // dom.css('-ms-transform', 'translateY('+dom[0].clientHeight+'px)');
      // dom.css('-o-transform', 'translateY('+dom[0].clientHeight+'px)');
      // dom.css('transform', 'translateY('+dom[0].clientHeight+'px)');
    }
  } // for.
}

