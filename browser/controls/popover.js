import { EADDRNOTAVAIL } from 'constants';

var uuid = require('../uuid');
var domHelper = require('../domHelper');

exports.popover_init = popover_init;

/**
* @desc: 初始化popover控件.
*        对页面上 的所有 <popover> 元素进行初始化.
*/
function popover_init() {
  var elems = $('popover');
  for (var i = 0; i < elems.length; i++) {
    var dom = $(elems[i]);

    if (!dom.hasClass('febsui-popover-inited') && !dom.children().hasClass('febsui-popover-arrow')) {
      
      var dd = $("<div class='febsui-popover'></div>");
      
      // data-direction
      var direction = dom.attr('data-direction');
      direction = window.febs.string.isEmpty(direction) ? 'auto' : direction;
      direction = direction.toLowerCase();
      if (direction != 'auto') {
        var direction2;
        if (direction != 'top' && direction != 'left' && direction != 'right' && direction != 'bottom') {
          throw new Error('popover attribute data-direction only can be top/left/right/bottom');
        }

        // data-offset
        var offset = dom.attr('data-offset');
        offset = window.febs.string.isEmpty(offset) ? '10' : offset;
        if (parseInt(offset) != offset) {
          throw new Error('popover attribute data-offset only can be number');
        }

        var offset1 = window.febs.dom.getElementOffset(dom);
        var offset2 = window.febs.dom.getDocumentOffset();

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

      dom.addClass('febsui-popover-inited');

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

      dd.append(dom);
    }
  } // for.
}

