var uuid = require('../uuid');

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
      
      // data-direction
      var direction = dom.attr('data-direction');
      direction = window.febs.string.isEmpty(direction) ? 'auto' : direction;
      direction = direction.toLowerCase();
      if (direction != 'auto') {
        var direction2;
        if (direction != 'top' && direction != 'left' && direction != 'right' && direction != 'bottom') {
          throw new Error('popover attribute data-direction only can be top/left/right/bottom');
        }
        if (direction == 'top' || direction == 'bottom') {
          direction2 = 'left';
        }
        if (direction == 'left' || direction == 'right') {
          direction2 = 'top';
        }

        // data-offset
        var offset = dom.attr('data-offset');
        offset = window.febs.string.isEmpty(offset) ? '10' : offset;
        if (parseInt(offset) != offset) {
          throw new Error('popover attribute data-offset only can be number');
        }

        dom.prepend('<div class="febsui-popover-arrow febsui-popover-arrow-'+direction+'" style="'+direction2+': '+offset+'px;"></div>');
      }
      else {
        dom.prepend('<div class="febsui-popover-arrow"></div>');
      }

      dom.addClass('febsui-popover-inited');

      // ie9.
      if (window.febs.utils.browserIEVer() <= 9) {
        var cells = dom.children('.febsui-popover-cell');
        for (var jj = 0; jj < cells.length-1; jj++) {
          $(cells[jj]).css('border-bottom','1px solid #eee');
        }
      }

      var dd = $("<div class='febsui-popover'></div>");
      $('body').append(dd);
      var did = dom.attr('id');
      if (did) {
        dd.attr('id', did);
        dom.removeAttr('id');
        // copy attri.
        var attris = dom[0].attributes;
        if (attris) {
          for (var j = 0; j < attris.length; j++) {
            if (attris[j].nodeName.indexOf('data-') == 0) {
              dd.attr(attris[j].nodeName, dom.attr(attris[j].nodeName));
            }
          }
        }
      }
      dd.append(dom);
    }
  } // for.
}

