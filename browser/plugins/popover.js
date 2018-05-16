

function resizePopover() {
  $('.febsui-popover').popoverHide();
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
    _this = $(_this[0]);

    if (_this.hasClass('febsui-popover-container')) {
    // if (ee[0].nodeName.toLowerCase() == 'popover') {
      _this = _this.parent();
    }

    return _this.hasClass('febsui-popover');
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

    if (ee.hasClass('febsui-popover-container')) {
    // if (ee[0].nodeName.toLowerCase() == 'popover') {
      ee = ee.parent();
    }
    
    if (ee.hasClass('febsui-popover-inited')) {

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

      var eee = ee.children('.febsui-popover-container');
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


          var direction2;

          var arrow = ee.children('.febsui-popover-arrow');

          arrow.removeClass('febsui-popover-arrow-left');
          arrow.removeClass('febsui-popover-arrow-right');
          arrow.removeClass('febsui-popover-arrow-top');
          arrow.removeClass('febsui-popover-arrow-bottom');
          arrow.css('top', '');
          arrow.css('bottom', '');
          arrow.css('left', '');
          arrow.css('right', '');
          
          // auto.
          // data-direction
          if (attrDirection == 'auto')
          {

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

              arrow.css('display', 'none');
            }
            else {
              arrow.css('display', 'block');
            }

            eee.css('top', top+docoffset.top +'px');
            eee.css('left', left+docoffset.left +'px');

            arrow.addClass('febsui-popover-arrow-'+direction2);
            var eeeOffset = window.febs.dom.getElementOffset(eee);
            
            if (direction2 == 'top' || direction2 == 'bottom') {
              if (direction2 == 'top')
                arrow.css('top', eeeOffset.top+docoffset.top+'px');
              else
                arrow.css('top', eeeOffset.top+docoffset.top+eee[0].clientHeight-17+'px');
              direction2 = 'left';
              arrow.css(direction2, offset+eeeOffset.left+docoffset.left+'px');
            }
            else if (direction2 == 'left' || direction2 == 'right') {
              if (direction2 == 'left')
                arrow.css('left', eeeOffset.left+docoffset.left+'px');
              else
                arrow.css('left', eeeOffset.left+docoffset.left+eee[0].clientWidth-17+'px');
              direction2 = 'top';
              arrow.css(direction2, offset+eeeOffset.top+docoffset.top+'px');
            }

          }
          else {
            if (attrDirection == 'left') {
              top = parseInt(top + height/2 - dis) || 0;
              left = left + width + dis;
            }
            else if (attrDirection == 'right') {
              top = parseInt(top + height/2 - dis) || 0;
              left = left - dis - 24;
            }
            else if (attrDirection == 'top') {
              top = parseInt(top + height + dis) || 0;
              left = parseInt(left + width/2 - dis) || 0;
            }
            else if (attrDirection == 'bottom') {
              top = parseInt(top - dis - 24) || 0;
              left = parseInt(left + width/2 - dis) || 0;
            }
            // center.
            else {
              left = parseInt((viewport.width-width2)/2);
              top = parseInt((viewport.height-height2)/2);
            }

            arrow.addClass('febsui-popover-arrow-'+attrDirection);
            
            top += docoffset.top;
            left += docoffset.left;
            arrow.css('top', parseInt(top)+'px');
            arrow.css('left', parseInt(left)+'px');


            var top22 = top;
            var left22 = left;


            if (attrDirection == 'top' || attrDirection == 'bottom') {
              left22 -= width2/2-17;
              if (attrDirection == 'top') {
                // top22 += 16;
              }
              else {
                top22 -= height2-18;
              }

              if (offset < -(width2/2-17)) offset = -(width2/2-17);
              else if (offset > width2/2-17) offset = width2/2-17;
              left22 -= offset;
            }
            else if (attrDirection == 'left' || attrDirection == 'right') {
              top22 -= height2/2-17;
              if (attrDirection == 'left') {
                // left22 += 16;
              }
              else {
                left22 -= width2-18;
              }

              if (offset < -(height2/2-17)) offset = -(height2/2-17);
              else if (offset > height2/2-17) offset = height2/2-17;
              top22 -= offset;
            }

            if (attrDirection == 'center') {
              eee.css('top', top +'px');
              eee.css('left', left +'px');
              arrow.css('display', 'none');
            }
            else {
              var hideArrow = false;
              if (top22+height2/2 > docport.height - 17) { hideArrow = true; top22 = docport.height - 17 - height2/2; }
              else if (top22 < 17) { hideArrow = true;top22 = 17; }

              if (left22+width2/2 > docport.width - 17) { hideArrow = true;left22 = docport.width - 17 - width2/2; }
              else if (left22 < 17) { hideArrow = true; left22 = 17; }
              
              eee.css('top', parseInt(top22) +'px');
              eee.css('left', parseInt(left22) +'px');

              if (hideArrow) {
                arrow.css('display', 'none');
              } else {
                arrow.css('display', 'block');
              }
            } // if..else.

          } // if..else.

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

    if (ee.hasClass('febsui-popover-container')) {
    // if (ee[0].nodeName.toLowerCase() == 'popover') {
      ee = ee.parent();
    }
    if (ee.hasClass('febsui-popover-inited')) {
      // setTimeout(function(){
        ee.removeClass('febsui-visible').addClass('febsui-invisible');
      // }, 100);
    }
  }
  return this;
}
