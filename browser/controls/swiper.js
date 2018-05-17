
var touchEventPrevent = require('../domHelper').mobile_preventTouchEvent;

exports.swiper_init = swiper_init;


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
      $(target).removeClass('febsui-swiper-animation');

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
        target.style['transform'] = `translate3d(0px, ${-offset}px, 0px)`;
      }
      else {
        offset += (target.__swiper_touch-touch.clientX);
        target.style['transform'] = `translate3d(${-offset}px, 0px, 0px)`;
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
    var dataAuto = dom.attr('data-auto');

    dataShowDots = window.febs.string.isEmpty(dataShowDots) ? true : ('true' == dataShowDots);
    dataLoop = window.febs.string.isEmpty(dataLoop) ? true : ('true' == dataLoop);
    dataAuto = window.febs.string.isEmpty(dataAuto) ? 0 : parseInt(dataAuto);
    dataAuto = dataAuto === 0 ? 0 : (dataAuto ? dataAuto : 7000);

    var domChildren = dom.children();
    if (!domChildren.hasClass('febsui-swiper-pages')) {

      // pages.
      var pages = $("<div class='febsui-swiper-pages'></div>");
      var pagesCount = 0;
      var page1;
      var page0;
      for (var j = 0; j < domChildren.length; j++) {
        if ($(domChildren[j]).hasClass('febsui-swiper-page')) {
          $(domChildren[j]).attr('data-ispage', '1');
          if (!page1) {
            page1 = domChildren[j];
          }
          page0 = domChildren[j];
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
      if (dataActiveIndex != 0)
        dom.swiperTo(dataActiveIndex, false);

      if (dom.hasClass('febsui-swiper-vertical')) {
        pages[0].__swiper_vertical = true;
      }

      setTimeout(function(){
        this.addClass('febsui-swiper-animation');
      }.bind(pages), 10);

      if (dataAuto) {
        setInterval(function(){
          this.swiperNext(true);
        }.bind(dom), dataAuto);
      }

      //
      // event.
      pages = pages[0];
      if (pages) {
        if (typeof pages.ontouchstart !== 'undefined') {
          if (pages.addEventListener) {
            pages.removeEventListener('touchstart', mobile_onTouchstart);
            pages.removeEventListener('touchmove', mobile_onTouchmove);
            pages.removeEventListener('touchend', mobile_onTouchend);
            pages.removeEventListener('touchcancel', mobile_onTouchcancel);

            pages.addEventListener('touchstart', mobile_onTouchstart, true);
            pages.addEventListener('touchmove', mobile_onTouchmove, true);
            pages.addEventListener('touchend', mobile_onTouchend, true);
            pages.addEventListener('touchcancel', mobile_onTouchcancel, true);
          }
          else {
            pages.detachEvent('ontouchstart', mobile_onTouchstart);
            pages.detachEvent('ontouchmove', mobile_onTouchmove);
            pages.detachEvent('ontouchend', mobile_onTouchend);
            pages.detachEvent('ontouchcancel', mobile_onTouchcancel);

            pages.attachEvent('ontouchstart', mobile_onTouchstart);
            pages.attachEvent('ontouchmove', mobile_onTouchmove);
            pages.attachEvent('ontouchend', mobile_onTouchend);
            pages.attachEvent('ontouchcancel', mobile_onTouchcancel);
          }
        }
        else {
          if (pages.addEventListener) {
            pages.removeEventListener('mousedown', mobile_onTouchstart);
            pages.removeEventListener('mousemove', mobile_onTouchmove);
            pages.removeEventListener('mouseup', mobile_onTouchend);
            pages.removeEventListener('mouseout', mobile_onTouchcancel);

            pages.addEventListener('mousedown', mobile_onTouchstart, true);
            pages.addEventListener('mousemove', mobile_onTouchmove, true);
            pages.addEventListener('mouseup', mobile_onTouchend, true);
            pages.addEventListener('mouseout', mobile_onTouchcancel, true);
          }
          else {
            pages.detachEvent('onmousedown', mobile_onTouchstart);
            pages.detachEvent('onmousemove', mobile_onTouchmove);
            pages.detachEvent('onmouseup', mobile_onTouchend);
            pages.detachEvent('onmouseout', mobile_onTouchcancel);

            pages.attachEvent('onmousedown', mobile_onTouchstart);
            pages.attachEvent('onmousemove', mobile_onTouchmove);
            pages.attachEvent('onmouseup', mobile_onTouchend);
            pages.attachEvent('onmouseout', mobile_onTouchcancel);
          }
        }
      } // if.
    }
  } // for.
}
