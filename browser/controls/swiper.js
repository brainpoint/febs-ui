
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

  if (touch) {
    if (event.target.getAttribute('data-ispage') === '1') {
      var target = event.target.parentNode;
      var target_t = $(target);
      var parentTarget = target_t.parent();

      var dataLoop = parentTarget.attr('data-loop');
      var isDataLoop = window.febs.string.isEmpty(dataLoop) ? true : ('true' == dataLoop);

      target_t.removeClass('febsui-swiper-animation');
      
      // 获取前一个和后一个page.
      var currentPage;
      currentPage = Number(parentTarget.attr('data-current'));
      var nextPage, prePage;
      nextPage = null;
      prePage = null;

      var allPage = target_t.children('.febsui-swiper-page');
      var totalPage = allPage.length;

      if (isDataLoop) { currentPage += 1; }

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
      return true;
    }
    else {
      return true;
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
  
  if (touch) {
    var target = event.target;
    if (target.getAttribute('data-ispage') === '1') {
      target = target.parentNode;
      if (!target.__swiper_start)
        return;

      if (!target.__swiper_start_scroll) {
        var span1;
        var span2;

        if (target.__swiper_vertical) {
          span1 = Math.abs(target.__swiper_touch-touch.clientY);
          span2 = Math.abs(target.__swiper_touch1-touch.clientX);
        }
        else {
          span1 = Math.abs(target.__swiper_touch-touch.clientX);
          span2 = Math.abs(target.__swiper_touch1-touch.clientY);
        }

        if (span1 > span2) {
          if (span1 > 30) {
            target.__swiper_start_scroll = true;
          }
        } else {
          if (span2 > 30) {
            delete target.__swiper_start;
          }
        }

        return;
      }

      var offset = target.getAttribute('data-offset');
      offset = parseFloat(offset) || 0;
      
      if (target.__swiper_vertical) {
        offset += (target.__swiper_touch-touch.clientY);
        target.style['-webkit-transform'] = `translate3d(0px, ${-offset}px, 0px)`;
        target.style['-moz-transform'] = `translate3d(0px, ${-offset}px, 0px)`;
        target.style['-ms-transform'] = `translateY(${-offset}px)`;
        target.style['transform'] = `translate3d(0px, ${-offset}px, 0px)`;
      }
      else {
        offset += (target.__swiper_touch-touch.clientX);
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
    }
  }

  event.preventDefault();
}
function mobile_onTouchend(event) {
  event = event || window.event;

  var touch;
  if (event.changedTouches) {
    touch = event.changedTouches[0];
  }
  else {
    touch = {clientX: event.clientX, clientY: event.clientY};
  }

  if (touch) {
    var target = event.target;
    if (target.getAttribute('data-ispage') === '1') {
      $(target.parentNode).addClass('febsui-swiper-animation');

      var targetPage = target.parentNode;
      if (!targetPage.__swiper_start)
        return;

      delete targetPage.__swiper_start;
      delete targetPage.__offsetCurrent;
      delete targetPage.__offsetPre;
      delete targetPage.__offsetNext;

      target = target.parentNode.parentNode;
      var current = target.getAttribute('data-current');


      var swipeSpan = 0;
      if (targetPage.__swiper_vertical) {
        swipeSpan = Math.abs(targetPage.__swiper_touch-touch.clientY);
      }
      else {
        swipeSpan = Math.abs(targetPage.__swiper_touch-touch.clientX);
      }

      var swipe = swipeSpan > 140 || Date.now()-targetPage.__swiper_touch_at < 200 && swipeSpan > 30;

      if (targetPage.__swiper_vertical) {
        if (swipe || swipeSpan >= target.offsetHeight/2) {
          if (targetPage.__swiper_touch>touch.clientY)
            $(target).swiperNext(true);
          else
            $(target).swiperPre(true);
        }
        else {
          $(target).swiperTo(current, true, true);
        }      
      }
      else {
        if (swipe || swipeSpan >= target.offsetWidth/2) {
          if (targetPage.__swiper_touch>touch.clientX)
            $(target).swiperNext(true);
          else
            $(target).swiperPre(true);
        }
        else {
          $(target).swiperTo(current, true, true);
        }
      }
    }
  }
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

  dataAuto = window.febs.string.isEmpty(dataAuto) ? 0 : parseInt(dataAuto);
  dataAuto = dataAuto === 0 ? 0 : (dataAuto ? dataAuto : default_swiper_auto);

  if (dataAuto > 0) {
    setTimeout(swiper_animation.bind(dom), dataAuto);
  }

  // 触发一次事件.
  dom.trigger('swiper');

  //
  // event.
  var pages = dom.children('.febsui-swiper-pages')[0];
  if (pages) {
    let namestart, namemove, nameend, namecancel;
    if (typeof pages.ontouchstart !== 'undefined') {
      namestart = 'touchstart';
      namemove = 'touchmove';
      nameend = 'touchend';
      namecancel = 'touchcancel';
    } else {
      namestart = 'mousedown';
      namemove = 'mousemove';
      nameend = 'mouseup';
      namecancel = 'mouseout';
    }

    if (pages.addEventListener) {
      pages.removeEventListener(namestart, mobile_onTouchstart);
      pages.removeEventListener(namemove, mobile_onTouchmove);
      pages.removeEventListener(nameend, mobile_onTouchend);
      pages.removeEventListener(namecancel, mobile_onTouchcancel);

      pages.addEventListener(namestart, mobile_onTouchstart, true);
      pages.addEventListener(namemove, mobile_onTouchmove, true);
      pages.addEventListener(nameend, mobile_onTouchend, true);
      pages.addEventListener(namecancel, mobile_onTouchcancel, true);
    }
    else {
      pages.detachEvent('on'+namestart, mobile_onTouchstart);
      pages.detachEvent('on'+namemove, mobile_onTouchmove);
      pages.detachEvent('on'+nameend, mobile_onTouchend);
      pages.detachEvent('on'+namecancel, mobile_onTouchcancel);

      pages.attachEvent('on'+namestart, mobile_onTouchstart);
      pages.attachEvent('on'+namemove, mobile_onTouchmove);
      pages.attachEvent('on'+nameend, mobile_onTouchend);
      pages.attachEvent('on'+namecancel, mobile_onTouchcancel);
    }
  } // if.
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

    // attri data.
    var dataActiveIndex = parseInt(dom.attr('data-current')) || 0;
    var dataShowDots = dom.attr('data-dots');
    var dataLoop = dom.attr('data-loop');
    var dataDotColor = dom.attr('data-dot-color');

    dataShowDots = window.febs.string.isEmpty(dataShowDots) ? true : ('true' == dataShowDots);
    dataLoop = window.febs.string.isEmpty(dataLoop) ? true : ('true' == dataLoop);

    var domChildren = dom.children();
    if (!domChildren.hasClass('febsui-swiper-pages')) {

      // pages.
      var pages;
      var pagesCount;
      var page1;
      var page0;

      pages = $("<div class='febsui-swiper-pages'></div>");
      pagesCount = 0;
      page1 = null;
      page0 = null;

      for (var j = 0; j < domChildren.length; j++) {
        if ($(domChildren[j]).hasClass('febsui-swiper-page')) {
          $(domChildren[j]).attr('data-ispage', '1');
          if (!page1) {
            page1 = domChildren[j];
          }
          page0 = domChildren[j];
          // 解决小数问题.
          $(page0).css('height', dom[0].clientHeight+'px');
          $(page0).css('width', dom[0].clientWidth+'px');
          pages.append(domChildren[j]);
          pagesCount ++;
        }
      }

      // loop.
      if (pagesCount > 1 && dataLoop) {
        pages.prepend(page0.cloneNode(true));
        pages.append(page1.cloneNode(true));
      }
      
      // dots.
      if (pagesCount == 0) {
        dataActiveIndex = 0;
      }
      else {
        dataActiveIndex %= pagesCount;
        dataActiveIndex = dataActiveIndex < 0 ? pagesCount+dataActiveIndex : dataActiveIndex
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
      dom.swiperTo(dataActiveIndex, false);

      if (dom.hasClass('febsui-swiper-vertical')) {
        pages[0].__swiper_vertical = true;
        dom.css('touch-action', 'pan-y');
      } else {
        dom.css('touch-action', 'pan-x');
      }

      setTimeout(function(){
        this.addClass('febsui-swiper-animation');
      }.bind(pages), 10);

      swiper_init_event(dom);
    }
  } // for.
}
