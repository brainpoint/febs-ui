var uuid = require('../uuid');

exports.popover_init = popover_init;


function resizePopover() {
  $('popover').popoverHide();
}

// 是否支持orientationchange事件
if ('orientation' in window && 'onorientationchange' in window)
{
  $(window).on('orientationchange', resizePopover);
}
else {
  $(window).on('resize', resizePopover);
}


$.fn.isPopover = function() {

  var _this = (typeof this.length === 'undefined') ? $(this) : this;

  if (_this.length >= 1) {
    if (_this[0].nodeName.toLowerCase() == 'popover') {
      return true;
    }
    else {
      return $(_this[0]).hasClass('febsui-popover');
    }
  }
  
  return false;
}

$.fn.popoverShow = function(mask, attachNode) {

  var _this = (typeof this.length === 'undefined') ? $(this) : this;

  for (var i = 0; i < _this.length; i++) {
    var ee = $(_this[i]);
    if (ee[0].nodeName.toLowerCase() == 'popover') {
      ee = ee.parent();
    }
    if (ee.hasClass('febsui-popover')) {

      if (ee.isVisibile())
        continue;

      ee.one('click', function(){
        $(this).popoverHide();
      });

      if (mask) {
        ee.addClass('febsui-mask');
      } else {
        ee.removeClass('febsui-mask');
      }

      ee.removeClass('febsui-invisible').addClass('febsui-visible');

      var eee = ee.children('popover');
      if (eee.length > 0) {
        // data-attach.
        var attrAttach = attachNode ? attachNode : $(eee[0]).attr('data-attach');
        var attach = $(attrAttach)[0];
        if (attach) {
          
          var top = (attach.offsetTop - attach.offsetParent.scrollTop);
          var left = (attach.offsetLeft - attach.offsetParent.scrollLeft);
          var width = attach.offsetWidth;
          var height = attach.offsetHeight;

          var width2 = eee[0].offsetWidth;
          var height2 = eee[0].offsetHeight;

          var offset = $(eee[0]).attr('data-offset');
          offset = window.febs.string.isEmpty(offset) ? 0 : parseInt(offset);

          var attrDirection = $(eee[0]).attr('data-direction');
          attrDirection = attrDirection ? attrDirection.toLowerCase() : 'auto';
          var dis2 = 11;
          var dis = dis2 + 4;
          
          if (attrDirection == 'left') {
            top = parseInt(top + height/2 - offset - dis);
            left = left + width + dis;
          }
          else if (attrDirection == 'right') {
            top = parseInt(top + height/2 - offset - dis);
            left = left - width2 - dis;
          }
          else if (attrDirection == 'top') {
            top = parseInt(top + height + dis);
            left = parseInt(left + width/2 - offset - dis);
          }
          else if (attrDirection == 'bottom') {
            top = parseInt(top - height2 - dis);
            left = parseInt(left + width/2 - offset - dis);
          }

          $(eee[0]).css('top', top+'px');
          $(eee[0]).css('left', left+'px');
        }
      }
    }
  }
  return this;
}

$.fn.popoverHide = function() {

  var _this = (typeof this.length === 'undefined') ? $(this) : this;

  for (var i = 0; i < _this.length; i++) {
    var ee = $(_this[i]);
    if (ee[0].nodeName.toLowerCase() == 'popover') {
      ee = ee.parent();
    }
    if (ee.hasClass('febsui-popover')) {
      ee.removeClass('febsui-visible').addClass('febsui-invisible');
    }
  }
  return this;
}

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

      dom.append('<div class="febsui-popover-arrow febsui-popover-arrow-'+direction+'" style="'+direction2+': '+offset+';"></div>');
      dom.addClass('febsui-popover-inited');

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

