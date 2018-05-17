var touchEventPrevent = require('../domHelper').mobile_preventTouchEvent;

var uuid = require('../uuid');
var domHelper = require('../domHelper');

exports.popover_init = popover_init;

/**
* @desc: 初始化popover控件.
*        对页面上 的所有 <.febsui-popover> 元素进行初始化.
*/
function popover_init(elem) {
  var elems = elem ? elem : $('.febsui-popover');
  for (var i = 0; i < elems.length; i++) {
    var dom = $(elems[i]);
    
    if (!dom.hasClass('febsui-popover')) {
      continue;
    }

    if (!dom.hasClass('febsui-popover-inited') && !dom.children().hasClass('febsui-popover-arrow')) {
      
      var dd = $("<div class='febsui-popover febsui-popover-inited'></div>");
      
      // data-direction
      var direction = dom.attr('data-direction');
      direction = window.febs.string.isEmpty(direction) ? 'auto' : direction;
      direction = direction.toLowerCase();
      if (direction != 'auto') {
        var direction2;
        if (direction != 'top' && direction != 'left' && direction != 'right' && direction != 'bottom' && direction != 'center' && direction != 'auto') {
          throw new Error('popover attribute data-direction only can be top/left/right/bottom/center/auto');
        }

        // data-offset
        var offset = dom.attr('data-offset');
        offset = window.febs.string.isEmpty(offset) ? '10' : offset;
        if (parseInt(offset) != offset) {
          throw new Error('popover attribute data-offset only can be number');
        }
        offset = parseInt(offset);

        var offset1 = window.febs.dom.getElementOffset(dom);
        var offset2 = window.febs.dom.getDocumentOffset();
        offset1 = offset1 || {left:0, top:0};

        if (direction == 'top' || direction == 'bottom') {
          direction2 = 'left';
          offset += offset1.left + offset2.left;
        }
        if (direction == 'left' || direction == 'right') {
          direction2 = 'top';
          offset += offset1.top + offset2.top;
        }

        dd.prepend('<div class="febsui-popover-arrow febsui-popover-arrow-'+direction+'" style="'+direction2+': '+offset+'px;"></div>');
      }
      else {
        dd.prepend('<div class="febsui-popover-arrow"></div>');
      }

      dom.removeClass('febsui-popover').addClass('febsui-popover-container');

      // ie9.
      if (window.febs.utils.browserIEVer() <= 9) {
        var cells = dom.children('.febsui-popover-cell');
        for (var jj = 0; jj < cells.length-1; jj++) {
          $(cells[jj]).css('border-bottom','1px solid #eee');
        }
      }

      $('body').append(dd);
            
      // copy attri.
      domHelper.copyAttrs(dom, dd, function(name){
        if ('id' == name) return true;
        return name.indexOf('data-') == 0;
      });

      touchEventPrevent(dom[0]);

      dd.append(dom);
    }
  } // for.
}

