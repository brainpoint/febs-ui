

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

  var viewport = window.febs.dom.getViewPort();
  var docport = window.febs.dom.getDocumentPort();
  var docoffset = window.febs.dom.getDocumentOffset();

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

      ee.css('height', docport.height+'px');
      ee.css('width', docport.width+'px');

      if (mask) {
        ee.addClass('febsui-mask');
      } else {
        ee.removeClass('febsui-mask');
      }

      var eee = ee.children('popover');
      if (eee.length > 0) {
        eee = $(eee[0]);
        // data-attach.
        var attrAttach = attachNode ? attachNode : eee.attr('data-attach');
        var attach = $(attrAttach)[0];
        if (attach) {
          
          var attachOffset = window.febs.dom.getElementOffset(attach);
          
          var top = attachOffset.top;
          var left = attachOffset.left;
          var width = attach.offsetWidth;
          var height = attach.offsetHeight;

          var width2 = eee[0].offsetWidth;
          var height2 = eee[0].offsetHeight;

          var offset = eee.attr('data-offset');
          offset = window.febs.string.isEmpty(offset) ? 0 : parseInt(offset);

          var attrDirection = eee.attr('data-direction');
          attrDirection = attrDirection ? attrDirection.toLowerCase() : 'auto';
          
          var dis2 = 11;
          var dis = dis2 + 4;

          // auto.
          // data-direction
          if (attrDirection == 'auto')
          {
            var direction2;

            // if (attrDirection == 'bottom') {
              if (!direction2) {
                top = parseInt(attachOffset.top - height2 - dis);
                if (top > dis2) {
                  left = parseInt(attachOffset.left + width/2 - width2/2);
                  if (left > dis2 && left+width2 < viewport.width-dis2) {
                    direction2 = 'bottom';
                    offset = parseInt(width2/2-dis2);
                  } else if (attachOffset.left > dis2 && dis2 + width2 < viewport.width) {
                    left = dis2;
                    if (left + width2 < attachOffset.left+width)
                      left = attachOffset.left+width-width2;
                    if (left + width2 < viewport.width-dis2) {
                      direction2 = 'bottom';
                      offset = parseInt(attachOffset.left - left + width/2-dis2);
                    }
                  }
                }
              }
            // }

            // else if (attrDirection == 'top') {
              if (!direction2) {
                top = parseInt(attachOffset.top + height + dis);
                if (top + height2 < viewport.height-dis2) {
                  left = parseInt(attachOffset.left + width/2 - width2/2);
                  if (left > dis2 && left+width2 < viewport.width-dis2) {
                    direction2 = 'top';
                    offset = parseInt(width2/2-dis2);
                  } else if (attachOffset.left > dis2 && dis2 + width2 < viewport.width) {
                    left = dis2;
                    if (left + width2 < attachOffset.left+width)
                      left = attachOffset.left+width-width2;
                    
                    if (left + width2 < viewport.width-dis2) {
                      direction2 = 'top';
                      offset = parseInt(attachOffset.left - left + width/2-dis2);
                    }
                  }
                }
              }
            // }

            // else if (attrDirection == 'left') {
              if (!direction2) {
                left = attachOffset.left + width + dis;
                if (left+width2 < viewport.width-dis2) {
                  top = parseInt(attachOffset.top + height/2 - height2/2 - dis);
                  if (top > dis2) {
                    direction2 = 'left';
                    offset = parseInt(height2/2);
                  } else if (attachOffset.top > dis2 && dis2 + height2 < viewport.height) {
                    top = dis2;
                    direction2 = 'left';
                    offset = parseInt(attachOffset.top+height/2 - top-dis);
                  }
                }
              }
            // }

            // else if (attrDirection == 'right') {
              if (!direction2) {
                left = attachOffset.left - width2 - dis;
                if (left > dis2) {
                  top = parseInt(attachOffset.top + height/2 - height2/2 - dis);
                  if (top > dis2) {
                    direction2 = 'right';
                    offset = parseInt(height2/2);
                  } else if (attachOffset.top > dis2 && dis2 + height2 < viewport.height) {
                    top = dis2;
                    direction2 = 'right';
                    offset = parseInt(attachOffset.top+height/2 - top-dis);
                  }
                }
              }
            // }

            // center.
            if (!direction2) {
              left = parseInt((viewport.width-width2)/2);
              top = parseInt((viewport.height-height2)/2);
              direction2 = 'bottom';
              offset = parseInt(width2/2-dis);
            }

            var arrow = eee.children('.febsui-popover-arrow');

            arrow.removeClass('febsui-popover-arrow-left');
            arrow.removeClass('febsui-popover-arrow-right');
            arrow.removeClass('febsui-popover-arrow-top');
            arrow.removeClass('febsui-popover-arrow-bottom');
            arrow.addClass('febsui-popover-arrow-'+direction2);
            
            if (direction2 == 'top' || direction2 == 'bottom') {
              direction2 = 'left';
            }
            else if (direction2 == 'left' || direction2 == 'right') {
              direction2 = 'top';
            }
            arrow.css('top', '');
            arrow.css('bottom', '');
            arrow.css('left', '');
            arrow.css('right', '');
            arrow.css(direction2, offset+'px');
          }
          else {
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
          }

          eee.css('top', top+docoffset.top +'px');
          eee.css('left', left+docoffset.left+'px');
        }
      }

      ee.removeClass('febsui-invisible').addClass('febsui-visible');
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
