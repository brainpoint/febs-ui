

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

      index %= dots.length;
      index = index < 0 ? dots.length+index : index;

      var directionVertical = elem.hasClass('febsui-swiper-vertical');
      
      var resetPostion = false;

      var offset = 0;
      var indexp;
      if (loop) {
        indexp = index + 1;
        if (current == 0 && index == dots.length-1) {
          indexp = 0;
          resetPostion = true;
        }
        else if (current == dots.length-1 && index == 0) {
          indexp = pages.length-1;
          resetPostion = true;
        }
      }
      else {
        indexp = index;
      }

      for (var j = 0; j < indexp; j++) {
        if (directionVertical) {
          offset += pages[j].offsetHeight;
        }
        else {
          offset += pages[j].offsetWidth;
        }
      }

      dots.removeClass('febsui-swiper-dot-active');
      $(dots[index]).addClass('febsui-swiper-dot-active');
      elem.attr('data-current', index);

      if (!animation) {
        pagesContainer.removeClass('febsui-swiper-animation');
      }

      if (directionVertical) {
        offset -= (elem[0].offsetHeight - pages[indexp].offsetHeight) / 2;
        pagesContainer.css('transform', `translate3d(0px, ${-offset}px, 0px)`);
      }
      else {
        offset -= (elem[0].offsetWidth - pages[indexp].offsetWidth) / 2;
        pagesContainer.css('transform', `translate3d(${-offset}px, 0px, 0px)`);
      }
      pagesContainer.attr('data-offset', offset);

      if (!animation) {
        setTimeout(function() {
          this.addClass('febsui-swiper-animation');
        }.bind(pagesContainer), 10);
      }

      // 重置正确的位置.
      if (resetPostion) {
        setTimeout(function() {
          var current = parseInt(this.attr('data-current')) || 0;
          this.swiperTo(current, false);
        }.bind(elem), 250);
      }

      if (trigger) {
        elem.trigger('swiper');
      }
    } // if.
  } // for.
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
