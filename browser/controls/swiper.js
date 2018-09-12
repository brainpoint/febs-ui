
var touchEventPrevent = require('../domHelper').mobile_preventTouchEvent;

exports.swiper_init = swiper_init;
exports.swiper_init_event = swiper_init_event;



var default_swiper_auto = 7000;

//
// event.
function mobile_onTouchstart(event) {
  event = event || window.event;

  var touch;
  if (event.touches) {
    touch = event.touches[0];
  }
  else {
    touch = {clientX: event.clientX, clientY: event.clientY};
  }

  var currentTarget = event.currentTarget;
  if (touch && currentTarget) {
    var target = currentTarget;
    target = $(currentTarget).children('.febsui-swiper-pages')[0];
    var target_t = $(target);
    var parentTarget = target_t.parent();

    var dataLoop = parentTarget.attr('data-loop');
    var isDataLoop = window.febs.string.isEmpty(dataLoop) ? true : ('true' == dataLoop);

    target_t.removeClass('febsui-swiper-animation');
    
    // 获取前一个和后一个page.
    var currentPage;
    currentPage = Number(parentTarget.attr('data-current')) || 0;
    var nextPage, prePage;
    nextPage = null;
    prePage = null;

    var allPage = target_t.children('.febsui-swiper-page');
    var totalPage = allPage.length;

    if (isDataLoop && totalPage > 1) { currentPage += 1; }

    if (target.__swiper_vertical) {
      var pageOffset = 0;
      var widthValue;
      for (var i = 0; i < currentPage; i++) {
        widthValue = $(allPage[i]).css('height');
        pageOffset += parseFloat((widthValue.substring(0, widthValue.length-2)||allPage[i].clientHeight));
      }

      if (currentPage > 0) {
        widthValue = $(allPage[currentPage-1]).css('height');
        prePage = pageOffset - parseFloat((widthValue.substring(0, widthValue.length-2)||allPage[currentPage-1].clientHeight));
      }

      if (currentPage < totalPage-1) {
        widthValue = $(allPage[currentPage+1]).css('height');
        nextPage = pageOffset + parseFloat((widthValue.substring(0, widthValue.length-2)||allPage[currentPage+1].clientHeight));  
      }
    }
    else {
      var pageOffset = 0;
      var widthValue;
      for (var i = 0; i < currentPage; i++) {
        widthValue = $(allPage[i]).css('width');
        pageOffset += parseFloat((widthValue.substring(0, widthValue.length-2)||allPage[i].clientWidth));
      }

      if (currentPage > 0) {
        widthValue = $(allPage[currentPage-1]).css('width');
        prePage = pageOffset - parseFloat((widthValue.substring(0, widthValue.length-2)||allPage[currentPage-1].clientWidth));
      }

      if (currentPage < totalPage-1) {
        widthValue = $(allPage[currentPage+1]).css('width');
        nextPage = pageOffset + parseFloat((widthValue.substring(0, widthValue.length-2)||allPage[currentPage+1].clientWidth));  
      }
    } // if..else.

    // 记录前后的宽高.
    if (target.__swiper_vertical) {
      target.__swiper_currentSize = allPage[currentPage].clientHeight;
    } else {
      target.__swiper_currentSize = allPage[currentPage].clientWidth;
    }

    target.__swiper_currentPage = currentPage;
    target.__swiper_totalPage = totalPage;
    target.__offsetCurrent = pageOffset;
    target.__offsetPre = prePage;
    target.__offsetNext = nextPage;

    target.__swiper_start = true;
    delete target.__swiper_start_scroll;

    if (target.__swiper_vertical) {
      target.__swiper_touch = touch.clientY;
      target.__swiper_touch1 = touch.clientX;
    }
    else {
      target.__swiper_touch = touch.clientX;
      target.__swiper_touch1 = touch.clientY;
    }

    target.__swiper_touch_at = Date.now();

    // pc.
    if (typeof event.currentTarget.ontouchstart === 'undefined') {
      target.__swiper_pc = true;
      window.febs.dom.removeEventListener(event.currentTarget, 'mousemove', mobile_onTouchmove, true);
      window.febs.dom.removeEventListener(event.currentTarget, 'mouseup', mobile_onTouchend, true);
      window.febs.dom.removeEventListener(event.currentTarget, 'mouseout', mobile_onTouchcancel, true);

      window.febs.dom.addEventListener(event.currentTarget, 'mousemove', mobile_onTouchmove, true);
      window.febs.dom.addEventListener(event.currentTarget, 'mouseup', mobile_onTouchend, true);
      window.febs.dom.addEventListener(event.currentTarget, 'mouseout', mobile_onTouchcancel, true);
    }
  }
}
function mobile_onTouchmove(event) {
  event = event || window.event;

  var touch;
  if (event.touches) {
    touch = event.touches[0];
  }
  else {
    touch = {clientX: event.clientX, clientY: event.clientY};
  }
  
  var currentTarget = event.currentTarget;
  if (touch && currentTarget) {
    var target = currentTarget;
    target = $(currentTarget).children('.febsui-swiper-pages')[0];
    if (!target.__swiper_start)
      return;

    if (!target.__swiper_start_scroll) {
      var span1;
      var span2;

      if (target.__swiper_vertical) {
        // span1 = Math.abs(target.__swiper_touch-touch.clientY);
        // span2 = Math.abs(target.__swiper_touch1-touch.clientX);

        // 垂直不允许滚动.
        target.__swiper_start_scroll = true;
        
        event.cancelBubble = true;
        event.stopPropagation();
        event.preventDefault();
        return false;
      }
      else {
        span1 = Math.abs(target.__swiper_touch-touch.clientX);
        span2 = Math.abs(target.__swiper_touch1-touch.clientY);
      }

      if (span1 > span2) {
        if (span1 > 30) {
          target.__swiper_start_scroll = true;

          if (target.__swiper_vertical) {
            target.__swiper_touch = touch.clientY;
            target.__swiper_touch1 = touch.clientX;
          }
          else {
            target.__swiper_touch = touch.clientX;
            target.__swiper_touch1 = touch.clientY;
          }

          event.cancelBubble = true;
          event.stopPropagation();
          event.preventDefault();
          return false;
        }
      } else {
        if (span2 > 30) {
          delete target.__swiper_start;
          return;
        }
      }

      // pc 不允许事件传递下去.
      if (target.__swiper_pc) {
        event.cancelBubble = true;
        event.stopPropagation();
        event.preventDefault();
        return false;
      }

      return;
    }

    var offset = target.getAttribute('data-offset');
    offset = parseFloat(offset) || 0;
    
    var off;
    if (target.__swiper_vertical) {
      off = (target.__swiper_touch-touch.clientY);
    }
    else {
      off = (target.__swiper_touch-touch.clientX);
    }

    // 超出小幅移动.
    if (!target.__swiper_loop) {
      // if (off <=0 && target.__swiper_currentPage == 0 || off>=0 && target.__swiper_currentPage >= target.__swiper_totalPage-1)
      // if (off <=0 && offset+off <= 0 || off >= 0 && offset+off >= target.__swiper_maxOffset)
      // {
      //   off /= 3;
      // }
      if (off <=0 && offset+off <= 0)
      {
        off = (offset+off) / 3;
        offset = 0;
      }
      else if (off >= 0 && offset+off >= target.__swiper_maxOffset)
      {
        off = (offset+off - target.__swiper_maxOffset) / 3;
        offset = target.__swiper_maxOffset;
      }
    }

    if (target.__swiper_vertical) {
      offset += off;
      target.style['-webkit-transform'] = `translate3d(0px, ${-offset}px, 0px)`;
      target.style['-moz-transform'] = `translate3d(0px, ${-offset}px, 0px)`;
      target.style['-ms-transform'] = `translateY(${-offset}px)`;
      target.style['transform'] = `translate3d(0px, ${-offset}px, 0px)`;
    }
    else {
      offset += off;
      target.style['-webkit-transform'] = `translate3d(${-offset}px, 0px, 0px)`;
      target.style['-moz-transform'] = `translate3d(${-offset}px, 0px, 0px)`;
      target.style['-ms-transform'] = `translateX(${-offset}px)`;
      target.style['transform'] = `translate3d(${-offset}px, 0px, 0px)`;
    }

    if (target.parentNode.__swiperMoving) {
      if (offset < target.__offsetCurrent && target.__offsetPre !== null) {
        target.parentNode.__swiperMoving( (offset-target.__offsetCurrent) / (target.__offsetCurrent-target.__offsetPre) );
      }
      else if (offset > target.__offsetCurrent && target.__offsetNext !== null) {
        target.parentNode.__swiperMoving( (offset-target.__offsetCurrent) / (target.__offsetNext-target.__offsetCurrent) );
      }
    }
    // console.log(target.__swiper_touch.toFixed(2), off.toFixed(2), -offset.toFixed(2));
    
    event.cancelBubble = true;
    event.stopPropagation();
    event.preventDefault();
    return false;
  }
}

function get_mobile_touchend_right_pos(current, currentRight, swipeSpan, allPage, vertical, loop) {
  var toNext = swipeSpan > 0? true: false;

  if (allPage.length == 1)
    currentRight = 0;

  var backSpan = 20;
  // 仅第一个会回弹, 其他的只要超过20就划过.
  var swipeIndex = current;
  if (toNext) {
    swipeSpan -= (vertical?allPage[currentRight].clientHeight:allPage[currentRight].clientWidth)/2;
    if (swipeSpan >= 0) {
      swipeSpan -= (vertical?allPage[currentRight].clientHeight:allPage[currentRight].clientWidth)/2;
      if (swipeSpan < 0) {
        swipeIndex = current+1;
      }
      else {
        swipeIndex = current+1;
        for (var i = currentRight+1; i < allPage.length; i++) {
          swipeSpan -= backSpan; // 未超过20回弹.
          if (swipeSpan <= 0) break;
          swipeIndex ++;
          swipeSpan -= ((vertical?allPage[i].clientHeight:allPage[i].clientWidth)-backSpan);
          if (swipeSpan <= 0) break;
        }
      }
    } // if.
    if (swipeIndex == current) swipeIndex = current+1;
  } else {
    currentRight--;
    if (currentRight < 0)
      return swipeIndex;
      
    swipeSpan += (vertical?allPage[currentRight].clientHeight:allPage[currentRight].clientWidth)/2;
    if (swipeSpan <= 0) {
      swipeSpan += (vertical?allPage[currentRight].clientHeight:allPage[currentRight].clientWidth)/2;
      if (swipeSpan > 0) {
        swipeIndex = current-1;
      }
      else {
        swipeIndex = current-1;
        for (var i = currentRight-1; i >= 0; i--) {
          swipeSpan += backSpan; // 未超过20回弹.
          if (swipeSpan >= 0) break;
          swipeIndex --;
          swipeSpan += ((vertical?allPage[i].clientHeight:allPage[i].clientWidth)-backSpan);
          if (swipeSpan >= 0) break;
        }
      }
    } // if.

    if (swipeIndex == current) swipeIndex = current-1;
  } // if..else.

  if (!loop) {
    if (swipeIndex >= allPage.length) {
      swipeIndex = allPage.length-1;
    } else if (swipeIndex < 0) {
      swipeIndex = 0;
    }
  }

  return swipeIndex;
}

function mobile_onTouchend(event) {
  event = event || window.event;

  // mouseout特殊处理.
  if (event.type === 'mouseout') {
    if (event.toElement) {
      if (event.currentTarget) {
        var tt = event.toElement;
        while (tt) {
          if (tt.isSameNode(event.currentTarget)) {
            event.cancelBubble = true;
            event.stopPropagation();
            event.preventDefault();
            return false;
          }
          tt = tt.parentNode;
        }
      }
    }
  } // if.

  var touch;
  if (event.changedTouches) {
    touch = event.changedTouches[0];
  }
  else {
    touch = {clientX: event.clientX, clientY: event.clientY};
  }

  var currentTarget = event.currentTarget;
  if (touch && currentTarget) {
    var target = currentTarget;
    target = $(currentTarget).children('.febsui-swiper-pages')[0];
    $(target).addClass('febsui-swiper-animation');

    var targetPage = target;
    if (!targetPage.__swiper_start_scroll) {
      // pc.
      if (typeof event.currentTarget.ontouchstart === 'undefined') {
        window.febs.dom.removeEventListener(event.currentTarget, 'mousemove', mobile_onTouchmove, true);
        window.febs.dom.removeEventListener(event.currentTarget, 'mouseup', mobile_onTouchend, true);
        window.febs.dom.removeEventListener(event.currentTarget, 'mouseout', mobile_onTouchcancel, true);
      }
      return;
    }

    delete targetPage.__swiper_start;
    delete targetPage.__swiper_start_scroll;
    delete targetPage.__offsetCurrent;
    delete targetPage.__offsetPre;
    delete targetPage.__offsetNext;

    var allPage = $(target).children('.febsui-swiper-page');
    target = target.parentNode;
    var current = parseInt(target.getAttribute('data-current')||0);
    var currentRight = parseInt(targetPage.__swiper_loop? current+1: current);

    var swipeSpan = 0;
    if (targetPage.__swiper_vertical) {
      swipeSpan = Math.abs(targetPage.__swiper_touch-touch.clientY);
    }
    else {
      swipeSpan = Math.abs(targetPage.__swiper_touch-touch.clientX);
    }

    var swipe = swipeSpan > 80 || Date.now()-targetPage.__swiper_touch_at < 200 && swipeSpan > 30;

    if (targetPage.__swiper_vertical) {
      if (swipe || swipeSpan >= targetPage.__swiper_currentSize/2) {
        swipeSpan = targetPage.__swiper_touch-touch.clientY;
        if (swipeSpan > 0) {
          var swipeIndex = get_mobile_touchend_right_pos(current, currentRight, swipeSpan, allPage, targetPage.__swiper_vertical, targetPage.__swiper_loop);
          $(target).swiperTo(swipeIndex, true, true, true);
          // $(target).swiperNext(true);
        }
        else {
          var swipeIndex = get_mobile_touchend_right_pos(current, currentRight, swipeSpan, allPage, targetPage.__swiper_vertical, targetPage.__swiper_loop);
          $(target).swiperTo(swipeIndex, true, true, false);
          // $(target).swiperPre(true);
        }
      }
      else {
        $(target).swiperTo(current, true, true);
      }      
    }
    else {
      if (swipe || swipeSpan >= targetPage.__swiper_currentSize/2) {
        swipeSpan = targetPage.__swiper_touch-touch.clientX;
        if (swipeSpan > 0) {
          var swipeIndex = get_mobile_touchend_right_pos(current, currentRight, swipeSpan, allPage, targetPage.__swiper_vertical, targetPage.__swiper_loop);
          $(target).swiperTo(swipeIndex, true, true, true);
          // $(target).swiperNext(true);
        }
        else {
          var swipeIndex = get_mobile_touchend_right_pos(current, currentRight, swipeSpan, allPage, targetPage.__swiper_vertical, targetPage.__swiper_loop);
          $(target).swiperTo(swipeIndex, true, true, false);
          // $(target).swiperPre(true);
        }
      }
      else {
        $(target).swiperTo(current, true, true);
      }
    }

    // pc.
    if (typeof event.currentTarget.ontouchstart === 'undefined') {
      window.febs.dom.removeEventListener(event.currentTarget, 'mousemove', mobile_onTouchmove, true);
      window.febs.dom.removeEventListener(event.currentTarget, 'mouseup', mobile_onTouchend, true);
      window.febs.dom.removeEventListener(event.currentTarget, 'mouseout', mobile_onTouchcancel, true);
    }

    event.cancelBubble = true;
    event.stopPropagation();
    event.preventDefault();
    return false;
  }
  
  // pc.
  if (typeof event.currentTarget.ontouchstart === 'undefined') {
    window.febs.dom.removeEventListener(event.currentTarget, 'mousemove', mobile_onTouchmove, true);
    window.febs.dom.removeEventListener(event.currentTarget, 'mouseup', mobile_onTouchend, true);
    window.febs.dom.removeEventListener(event.currentTarget, 'mouseout', mobile_onTouchcancel, true);
  }
  return;
}
var mobile_onTouchcancel = mobile_onTouchend;

function swiper_animation() {
  if (this.children('.febsui-swiper-pages')[0].__swiper_start !== true) {
    this.swiperNext(true);
  }

  var dataAutotick = this.attr('data-auto');
  dataAutotick = window.febs.string.isEmpty(dataAutotick) ? 0 : parseInt(dataAutotick);
  dataAutotick = dataAutotick === 0 ? 0 : (dataAutotick ? dataAutotick : default_swiper_auto);
  if (dataAutotick > 0 && this.isVisible()) { // un visible can't do next.
    setTimeout(swiper_animation.bind(this), dataAutotick);
  }
}


/**
* @desc: 对元素注册初始化事件.
*/
function swiper_init_event(dom) {

  if (!dom)
    return;

  var dataAuto = dom.attr('data-auto');
  // var dataLoop = dom.attr('data-loop');

  dataAuto = window.febs.string.isEmpty(dataAuto) ? 0 : parseInt(dataAuto);
  dataAuto = dataAuto === 0 ? 0 : (dataAuto ? dataAuto : default_swiper_auto);

  // dataLoop = window.febs.string.isEmpty(dataLoop) ? true : ('true' == dataLoop);

  var pageLength = dom.children('.febsui-swiper-pages');
  pageLength = $(pageLength[0]);
  pageLength = pageLength.children('.febsui-swiper-page').length;
  // if (dataLoop)
  //   pageLength -= 2;

  if (dataAuto > 0 && pageLength > 1) {
    if (!dom.hasClass('febsui-swiper-animate-timer')) {
      setTimeout(swiper_animation.bind(dom), dataAuto);
      dom.addClass('febsui-swiper-animate-timer');
    }
  }

  //
  // event.
  var pages = dom[0]; // dom.children('.febsui-swiper-pages')[0];
  if (pages) {
    let namestart, namemove, nameend, namecancel;
    if (typeof pages.ontouchstart !== 'undefined') {
      namestart = 'touchstart';
      namemove = 'touchmove';
      nameend = 'touchend';
      namecancel = 'touchcancel';

      window.febs.dom.removeEventListener(pages, namestart, mobile_onTouchstart);
      window.febs.dom.removeEventListener(pages, namemove, mobile_onTouchmove);
      window.febs.dom.removeEventListener(pages, nameend, mobile_onTouchend);
      window.febs.dom.removeEventListener(pages, namecancel, mobile_onTouchcancel);

      window.febs.dom.addEventListener(pages, namestart, mobile_onTouchstart);
      window.febs.dom.addEventListener(pages, namemove, mobile_onTouchmove);
      window.febs.dom.addEventListener(pages, nameend, mobile_onTouchend);
      window.febs.dom.addEventListener(pages, namecancel, mobile_onTouchcancel);
    } else {
      namestart = 'mousedown';
      namemove = 'mousemove';
      nameend = 'mouseup';
      namecancel = 'mouseout';

      window.febs.dom.removeEventListener(pages, namestart, mobile_onTouchstart, true);
      window.febs.dom.removeEventListener(pages, namemove, mobile_onTouchmove, true);
      window.febs.dom.removeEventListener(pages, nameend, mobile_onTouchend, true);
      window.febs.dom.removeEventListener(pages, namecancel, mobile_onTouchcancel, true);

      window.febs.dom.addEventListener(pages, namestart, mobile_onTouchstart, true);
      // window.febs.dom.addEventListener(pages, namemove, mobile_onTouchmove);
      // window.febs.dom.addEventListener(pages, nameend, mobile_onTouchend);
      // window.febs.dom.addEventListener(pages, namecancel, mobile_onTouchcancel);
    }
  } // if.

  // 触发一次事件.
  dom.trigger('swiper');
}


/**
* @desc: 初始化swiper控件.
*/
function swiper_init(elem) {
  var elems = elem ? elem : $('.febsui-swiper');
  for (var i = 0; i < elems.length; i++) {
    var dom = $(elems[i]);
    
    if (!dom.hasClass('febsui-swiper')) {
      continue;
    }

    if (dom.hasClass('febsui-swiper-inited')) {
      continue;
    }

    dom.addClass('febsui-swiper-inited');

    // attri data.
    var dataActiveIndex = parseInt(dom.attr('data-current')) || 0;
    var dataShowDots = dom.attr('data-dots');
    var dataLoop = dom.attr('data-loop');
    var dataDotColor = dom.attr('data-dot-color');
    var dataAlign = dom.attr('data-align');

    if (!window.febs.string.isEmpty(dataAlign)) {
      if (dataAlign != 'center' && parseInt(dataAlign).toString() != dataAlign) {
        throw new Error('swiper data-align only can be "center" or integer');
      }
    } else {
      dataAlign = 'center';
    }

    dataShowDots = window.febs.string.isEmpty(dataShowDots) ? true : ('true' == dataShowDots);
    dataLoop = window.febs.string.isEmpty(dataLoop) ? true : ('true' == dataLoop);

    var domChildren = dom.children();
    {

      // pages.
      var pages;
      var pagesCount;
      var page1;
      var page0;

      var needDealLoopPage = true;

      if (domChildren.hasClass('febsui-swiper-pages')) {
        pages = $(domChildren[0]);
        domChildren = domChildren.children();
        needDealLoopPage = false;
      } else {
        pages = $("<div class='febsui-swiper-pages'></div>");
      }

      pagesCount = 0;
      page1 = null;
      page0 = null;

      for (var j = 0; j < domChildren.length; j++) {
        if ($(domChildren[j]).hasClass('febsui-swiper-page')) {
          // $(domChildren[j]).attr('data-ispage', '1');
          if (!page1) {
            page1 = domChildren[j];
          }
          page0 = domChildren[j];
          var page0Obj = $(page0);
          // 解决小数问题.
          var pageSize;
          pageSize = page0Obj.attr('data-size-height');
          if (!window.febs.string.isEmpty(pageSize)) {
            page0Obj.css('height', pageSize);
          }
          else {
            if (!needDealLoopPage) {
              page0Obj.css('height', dom[0].clientHeight+'px');
            } else {
              var pageCssHeight = page0Obj.css('height');
              if (window.febs.string.isEmpty(pageCssHeight)) {
                page0Obj.css('height', dom[0].clientHeight+'px');
              } else {
                page0Obj.attr('data-size-height', pageCssHeight);
              }
            }
          }
          
          pageSize = page0Obj.attr('data-size-width');
          if (!window.febs.string.isEmpty(pageSize)) {
            page0Obj.css('width', pageSize);
          }
          else {
            if (!needDealLoopPage) {
              page0Obj.css('width', dom[0].clientWidth+'px');
            } else {
              var pageCssWidth = page0Obj.css('width');
              if (window.febs.string.isEmpty(pageCssWidth)) {
                page0Obj.css('width', dom[0].clientWidth+'px');
              } else {
                page0Obj.attr('data-size-width', pageCssWidth);
              }
            }
          }

          if (needDealLoopPage) {
            pages.append(domChildren[j]);
          }
          pagesCount ++;
        }
      }

      if (!needDealLoopPage && dataLoop) {
        pagesCount -= 2;
      }

      // loop.
      if (needDealLoopPage && pagesCount > 1 && dataLoop) {
        pages.prepend(page0.cloneNode(true));
        pages.append(page1.cloneNode(true));
      }

      if (needDealLoopPage) {
        // dots.
        if (pagesCount == 0) {
          dataActiveIndex = 0;
        }
        else {
          dataActiveIndex %= pagesCount;
          dataActiveIndex = dataActiveIndex < 0 ? pagesCount+dataActiveIndex : dataActiveIndex
        }

        if (pagesCount == 1) {
          dataShowDots = false;
        }
        var dots = dataShowDots ? ("<div class='febsui-swiper-dots'></div>") : ("<div class='febsui-swiper-dots febsui-invisible'></div>");
        dots = $(dots);

        for (var j = 0; j < pagesCount; j++) {
          if (j == dataActiveIndex) {
            dots.append('<span class="febsui-swiper-dot-active"></span>');
          }
          else {
            dots.append('<span></span>');
          }
        }

        if (dataDotColor) {
          dots.children('span').css('background-color', dataDotColor);
        }

        dom.html('');
        dom.append(pages);
        dom.append(dots);
        dom.attr('data-current', 0);

        if (dom.hasClass('febsui-swiper-vertical')) {
          pages[0].__swiper_vertical = true;
          pages.css('touch-action', 'pan-y');
          dom.css('touch-action', 'pan-y');
        } else {
          // dom.css('touch-action', 'pan-x');
        }

        setTimeout(function(){
          this.addClass('febsui-swiper-animation');
        }.bind(pages), 10);

        swiper_init_event(dom);
      } // if.


      // 记录最大的偏移位置.
      var maxOffset = 0;
      var pageChildren = pages.children('.febsui-swiper-page');
      var pagesLength = dataLoop? pageChildren.length-1: pageChildren.length;
      if (dom.hasClass('febsui-swiper-vertical')) {
        for (var j = 0; j < pagesLength; j++) {
          maxOffset += pageChildren[j].clientHeight;
        }
        maxOffset -= dom[0].clientHeight;
      }
      else {
        for (var j = 0; j < pagesLength; j++) {
          maxOffset += pageChildren[j].clientWidth;
        }
        maxOffset -= dom[0].clientWidth;
      } // if.
 
      if (maxOffset < 0) {
        maxOffset = 0;
      }

      if (dataAlign != 'center') {
        maxOffset += parseInt(dataAlign);
      }
      dom[0].__swiper_maxOffset = maxOffset;
      pages[0].__swiper_maxOffset = maxOffset;

      if (needDealLoopPage) {
        dom.swiperTo(dataActiveIndex, false);
        pages[0].__swiper_loop = !!dataLoop;
      }
    }
  } // for.
}
