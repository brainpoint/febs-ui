

// ie9.
var is_IE9 = window.febs.utils.browserIEVer() <= 9;
var ie9_animation_durtion = 250;
var ie9_animation_start_at = 0;
var ie9_animation_obj = [];
var ie9_animation_foo;
var ie9_animation_frame;
if (is_IE9) {
  ie9_animation_foo = function(tm) {
    
    var elpase = Date.now()-ie9_animation_start_at;
    if (elpase >= ie9_animation_durtion) {
      for (var i = 0; i < ie9_animation_obj.length; i++) {
        var obj = ie9_animation_obj[i];
        obj.obj.css('-ms-transform', obj.vertical ? `translateY(${obj.offset}px)` : `translateX(${obj.offset}px)`);
      }
      ie9_animation_obj = [];
      ie9_animation_frame = null;
      return;
    } // if.

    for (var i = 0; i < ie9_animation_obj.length; i++) {
      var obj = ie9_animation_obj[i];

      var offset = obj.offsetCur + (obj.offset-obj.offsetCur) * elpase / ie9_animation_durtion;
      obj.obj.css('-ms-transform', obj.vertical ? `translateY(${offset}px)` : `translateX(${offset}px)`);
    } // for.

    ie9_animation_frame = requestAnimationFrame(ie9_animation_foo);
  };
} // for ie9.


function resizeSwiper() {
  var elems = $('.febsui-swiper');
  for (var i = 0; i < elems.length; i++) {
    var elem = $(elems[i]);
    elem.swiperTo(elem.swiperCurrent(), false);
  }
}

// 是否支持orientationchange事件
if ('orientation' in window && 'onorientationchange' in window)
{
  $(window).on('orientationchange', resizeSwiper);
}
else {
  $(window).on('resize', resizeSwiper);
}


$.fn.isSwiper = function() {
  var _this = (typeof this.length === 'undefined') ? $(this) : this;

  if (_this.length >= 1) {
    if (_this.hasClass('febsui-swiper')) {
    // [0].nodeName.toLowerCase() == 'switch') {
      return true;
    }
  }
  
  return false;
}

$.fn.swiperDotColor = function(color) {

  var _this = (typeof this.length === 'undefined') ? $(this) : this;

  for (var i = 0; i < _this.length; i++) {
    var elem = $(_this[i]);

    if (elem.hasClass('febsui-swiper')) {

      if (!color) {
        color = elem.attr('data-dot-color');
      }

      if (color) {
        elem.children('.febsui-swiper-dots').children('span').css('background-color', color);
      }
      else {
        elem.children('.febsui-swiper-dots').children('span').css('background-color');
      }
    }
  } // for.

  return this;
}

$.fn.swiperSpeed = function(ms) {

  var _this = (typeof this.length === 'undefined') ? $(this) : this;

  ms = parseInt(ms);

  for (var i = 0; i < _this.length; i++) {
    var elem = $(_this[i]);

    if (elem.hasClass('febsui-swiper')) {
      elem.attr('data-auto', ms);
    }
  } // for.

  return this;
}

$.fn.swiperPre = function(trigger) {

  var _this = (typeof this.length === 'undefined') ? $(this) : this;

  index = parseInt(index);

  for (var i = 0; i < _this.length; i++) {
    var elem = $(_this[i]);

    if (elem.hasClass('febsui-swiper')) {
      var index = elem.attr('data-current');
      var loop = elem.attr('data-loop');
      loop = window.febs.string.isEmpty(loop) ? true : ('true' == loop);

      index = parseInt(index) - 1;

      if (loop || index >= 0) {
        elem.swiperTo(index, true, trigger);
      }
      else {
        elem.swiperTo(0, true, trigger);  
      }
    }
  } // for.

  return this;
}

$.fn.swiperNext = function(trigger) {

  var _this = (typeof this.length === 'undefined') ? $(this) : this;

  index = parseInt(index);

  for (var i = 0; i < _this.length; i++) {
    var elem = $(_this[i]);

    if (elem.hasClass('febsui-swiper')) {
      var index = elem.attr('data-current');
      var loop = elem.attr('data-loop');
      loop = window.febs.string.isEmpty(loop) ? true : ('true' == loop);

      index = parseInt(index) + 1;

      var length = elem.children('.febsui-swiper-dots').children('span').length;

      if (loop || index < length) {
        elem.swiperTo(index, true, trigger);
      }
      else {
        elem.swiperTo(length-1 < 0? 0: length-1, true, trigger);  
      }
    }
  } // for.

  return this;
}

$.fn.swiperCurrent = function() {

  var _this = (typeof this.length === 'undefined') ? $(this) : this;

  for (var i = 0; i < _this.length; i++) {
    var elem = $(_this[i]);

    if (elem.hasClass('febsui-swiper')) {
      return parseInt(elem.attr('data-current')) || 0;
    }
  }
  
  return -1;
}

$.fn.swiperTotal = function() {

  var _this = (typeof this.length === 'undefined') ? $(this) : this;

  for (var i = 0; i < _this.length; i++) {
    var elem = $(_this[i]);

    if (elem.hasClass('febsui-swiper')) {
      var dots = $(elem.children('.febsui-swiper-dots')[0]).children('span');
      return dots.length;
    }
  }
  
  return -1;
}

$.fn.swiperTo = function(index, animation, trigger) {

  var _this = (typeof this.length === 'undefined') ? $(this) : this;

  index = parseInt(index);

  if (typeof animation === 'undefined') {
    animation = true;
  }
  if (ie9_animation_frame) {
    cancelAnimationFrame(ie9_animation_frame);
    ie9_animation_frame = null;
    for (var i = 0; i < ie9_animation_obj.length; i++) {
      var obj = ie9_animation_obj[i];
      obj.obj.css('-ms-transform', obj.vertical ? `translateY(${obj.offset}px)` : `translateX(${obj.offset}px)`);
    }
  }

  ie9_animation_start_at = Date.now();
  ie9_animation_obj = [];

  for (var i = 0; i < _this.length; i++) {
    var elem = $(_this[i]);

    if (elem.hasClass('febsui-swiper')) {
    // if (_this[0].nodeName.toLowerCase() == 'swiper') {

      var current = parseInt(elem.attr('data-current')) || 0;
      var loop = elem.attr('data-loop');
      loop = window.febs.string.isEmpty(loop) ? true : ('true' == loop);

      var pagesContainer = $(elem.children('.febsui-swiper-pages')[0]);
      var pages = pagesContainer.children('.febsui-swiper-page');
      var dots = $(elem.children('.febsui-swiper-dots')[0]).children('span');

      if (pages.length == 0) {
        continue;
      }

      var nindex = index;
      nindex %= dots.length;
      nindex = nindex < 0 ? dots.length+nindex : nindex;

      var directionVertical = elem.hasClass('febsui-swiper-vertical');
      
      var resetPostion = false;

      var offset = 0;
      var indexp;
      if (loop) {
        indexp = nindex + 1;
        if (current == 0 && nindex == dots.length-1) {
          indexp = 0;
          resetPostion = true;
        }
        else if (current == dots.length-1 && nindex == 0) {
          indexp = pages.length-1;
          resetPostion = true;
        }
      }
      else {
        indexp = nindex;
      }

      for (var j = 0; j < indexp; j++) {
        if (directionVertical) {
          offset += pages[j].clientHeight;
        }
        else {
          offset += pages[j].clientWidth;
        }
      }

      dots.removeClass('febsui-swiper-dot-active');
      $(dots[nindex]).addClass('febsui-swiper-dot-active');
      elem.attr('data-current', nindex);

      if (!animation) {
        pagesContainer.removeClass('febsui-swiper-animation');
      }

      if (is_IE9 && animation) {

        ie9_animation_obj = [];
        ie9_animation_obj.push({
          obj: pagesContainer,
          // offsetCur,
          // offset,
          // vertical
        });

        if (directionVertical) {
          offset -= (elem[0].clientHeight - pages[indexp].clientHeight) / 2;
          ie9_animation_obj[ie9_animation_obj.length-1].offset = -offset;
          ie9_animation_obj[ie9_animation_obj.length-1].vertical = true;

          var offsetCur = pagesContainer.css('-ms-transform');
          if (offsetCur) {
            offsetCur = window.febs.string.replace(offsetCur, 'translateY(', '');
            offsetCur = window.febs.string.replace(offsetCur, 'px)', '');
            offsetCur = parseFloat(offsetCur);
          } else { offsetCur = 0; }
          ie9_animation_obj[ie9_animation_obj.length-1].offsetCur = offsetCur;
        }
        else {
          offset -= (elem[0].clientWidth - pages[indexp].clientWidth) / 2;
          ie9_animation_obj[ie9_animation_obj.length-1].offset = -offset;
          ie9_animation_obj[ie9_animation_obj.length-1].vertical = false;

          var offsetCur = pagesContainer.css('-ms-transform');
          if (offsetCur) {
            offsetCur = window.febs.string.replace(offsetCur, 'translateX(', '');
            offsetCur = window.febs.string.replace(offsetCur, 'px)', '');
            offsetCur = parseFloat(offsetCur);
          } else { offsetCur = 0; }
          ie9_animation_obj[ie9_animation_obj.length-1].offsetCur = offsetCur;
        }
      }
      else {
        if (directionVertical) {
          offset -= (elem[0].clientHeight - pages[indexp].clientHeight) / 2.0;
          pagesContainer.css('-webkit-transform', `translate3d(0px, ${-offset}px, 0px)`);
          pagesContainer.css('-moz-transform', `translate3d(0px, ${-offset}px, 0px)`);
          pagesContainer.css('-ms-transform', `translateY(${-offset}px)`);
          pagesContainer.css('transform', `translate3d(0px, ${-offset}px, 0px)`);
        }
        else {
          offset -= (elem[0].clientWidth - pages[indexp].clientWidth) / 2.0;
          pagesContainer.css('-webkit-transform', `translate3d(${-offset}px, 0px, 0px)`);
          pagesContainer.css('-moz-transform', `translate3d(${-offset}px, 0px, 0px)`);
          pagesContainer.css('-ms-transform', `translateX(${-offset}px)`);
          pagesContainer.css('transform', `translate3d(${-offset}px, 0px, 0px)`);
        }
      } // if.

      pagesContainer.attr('data-offset', offset);

      if (!animation) {
        setTimeout(function() {
          this.addClass('febsui-swiper-animation');
        }.bind(pagesContainer), 30);
      }

      // 重置正确的位置.
      if (resetPostion) {
        setTimeout(function() {
          var current = parseInt(this.attr('data-current')) || 0;
          this.swiperTo(current, false);
        }.bind(elem), 210);
      }

      if (trigger) {
        elem.trigger('swiper');
      }
    } // if.
  } // for.

  if (is_IE9 && animation) {
    if (ie9_animation_obj.length > 0) {
      ie9_animation_frame = requestAnimationFrame(ie9_animation_foo);
    }
  }

  return this;
};


$.fn.swiper = function(cb) {

  var _this = (typeof this.length === 'undefined') ? $(this) : this;

  if (cb) {
    for (var i = 0; i < _this.length; i++) {
      var elem = $(_this[i]);
  
      if (elem.hasClass('febsui-swiper')) {
        elem.on('swiper', cb);
      }
    } // for.
  }
  // trigger.
  else {
    _this.trigger('swiper');
  } // if..else.
  return this;
}
