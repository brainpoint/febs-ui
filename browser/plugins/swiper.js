
var swiper_init = require('../controls/swiper').swiper_init;
var swiper_is_in_init = false;

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
        obj.obj.css('-ms-transform', obj.vertical ? 'translateY('+obj.offset+'px)' : 'translateX('+obj.offset+'px)');
      }
      ie9_animation_obj = [];
      ie9_animation_frame = null;
      return;
    } // if.

    for (var i = 0; i < ie9_animation_obj.length; i++) {
      var obj = ie9_animation_obj[i];

      var offset = obj.offsetCur + (obj.offset-obj.offsetCur) * elpase / ie9_animation_durtion;
      obj.obj.css('-ms-transform', obj.vertical ? 'translateY('+offset+'px)' : 'translateX('+offset+'px)');
    } // for.

    ie9_animation_frame = requestAnimationFrame(ie9_animation_foo);
  };
} // for ie9.


function resizeSwiper() {

  $('.febsui-swiper').removeClass('febsui-swiper-inited');

  // 延迟.5s后重新初始化. 保证父控件宽度变化完成.
  setTimeout(function(){
    if (!swiper_is_in_init) {
      swiper_is_in_init = true;
      swiper_init();

      var elems = $('.febsui-swiper');

      // 等待宽度变化完成.
      setTimeout(function(){
        for (var i = 0; i < elems.length; i++) {
          var elem = $(elems[i]);    
          elem.swiperTo(elem.swiperCurrent(), false);
        }
      }, 210);
      swiper_is_in_init = false;
    }
  }, 500);
}

// 是否支持orientationchange事件
if ('orientation' in window && 'onorientationchange' in window)
{
  $(window).off('orientationchange', resizeSwiper).on('orientationchange', resizeSwiper);
}
else {
  $(window).off('resize', resizeSwiper).on('resize', resizeSwiper);
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

$.fn.swiperMoving = function(foo) {
  var _this = (typeof this.length === 'undefined') ? $(this) : this;

  for (var i = 0; i < _this.length; i++) {
    var elem = $(_this[i]);

    if (elem.hasClass('febsui-swiper')) {
      elem[0].__swiperMoving = foo;
    }
  } // for.

  return this;
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

  for (var i = 0; i < _this.length; i++) {
    var elem = $(_this[i]);

    if (elem.hasClass('febsui-swiper')) {
      var index = elem.attr('data-current');
      var loop = elem.attr('data-loop');
      loop = window.febs.string.isEmpty(loop) ? true : ('true' == loop);

      index = (parseInt(index)||0) - 1;

      if (loop || index >= 0) {
        elem.swiperTo(index, true, trigger, false);
      }
      else {
        elem.swiperTo(0, true, trigger, false);  
      }
    }
  } // for.

  return this;
}

$.fn.swiperNext = function(trigger) {

  var _this = (typeof this.length === 'undefined') ? $(this) : this;

  for (var i = 0; i < _this.length; i++) {
    var elem = $(_this[i]);

    if (elem.hasClass('febsui-swiper')) {
      var index = elem.attr('data-current');
      var loop = elem.attr('data-loop');
      loop = window.febs.string.isEmpty(loop) ? true : ('true' == loop);

      index = (parseInt(index)||0) + 1;

      var length = elem.children('.febsui-swiper-dots').children('span').length;

      if (loop || index < length) {
        elem.swiperTo(index, true, trigger, true);
      }
      else {
        elem.swiperTo(length-1 < 0? 0: length-1, true, trigger, true);  
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

/**
* @desc: 
* @param directNext: 方向是否为next. 
*/
$.fn.swiperTo = function(index, animation, trigger, directNext) {

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
      obj.obj.css('-ms-transform', obj.vertical ? 'translateY('+obj.offset+'px)' : 'translateX('+obj.offset+'px)');
    }
  }

  ie9_animation_start_at = Date.now();
  ie9_animation_obj = [];

  for (var i = 0; i < _this.length; i++) {
    var elem = $(_this[i]);

    if (elem.hasClass('febsui-swiper')) {
    // if (_this[0].nodeName.toLowerCase() == 'swiper') {

      // 偏移位置.
      var align = elem.attr('data-align');
      if (window.febs.string.isEmpty(align)) {
        align = 'center';
      }
      if (align != 'center') {
        align = parseInt(align);
      }

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
          if (nindex-1 == current) {  // 仅大一个数.
            if (false === directNext) {
              indexp = 0;
              resetPostion = true;
            }
          } else {
            indexp = 0;
            resetPostion = true;
          }
        }
        else if (current == dots.length-1 && nindex == 0) {
          if (nindex+1 == current) {  // 仅大一个数.
            if (true === directNext) {
              indexp = pages.length-1;
              resetPostion = true;
            }
          } else {
            indexp = pages.length-1;
            resetPostion = true;
          }
        }
      }
      else {
        indexp = nindex;
      }

      if (pages.length < indexp+1) {
        continue;
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
          if (align == 'center') {
            offset -= (elem[0].clientHeight - (pages[indexp]&&pages[indexp].clientHeight)||0) / 2;
          } else {
            if (offset > elem[0].__swiper_maxOffset) {
              offset = elem[0].__swiper_maxOffset;
            } else {
              offset -= align;
            }
          }
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
          if (align == 'center') {
            offset -= (elem[0].clientWidth - (pages[indexp]&&pages[indexp].clientWidth)||0) / 2;
          } else {
            if (offset > elem[0].__swiper_maxOffset) {
              offset = elem[0].__swiper_maxOffset;
            } else {
              offset -= align;
            }
          }
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
          if (align == 'center') {
            offset -= (elem[0].clientHeight - (pages[indexp]&&pages[indexp].clientHeight)||0) / 2.0;
          } else {
            if (offset > elem[0].__swiper_maxOffset) {
              offset = elem[0].__swiper_maxOffset;
            } else {
              offset -= align;
            }
          }
          pagesContainer.css('-webkit-transform', 'translate3d(0px, '+(-offset||0)+'px, 0px)');
          pagesContainer.css('-moz-transform', 'translate3d(0px, '+(-offset||0)+'px, 0px)');
          pagesContainer.css('-ms-transform', 'translateY('+(-offset||0)+'px)');
          pagesContainer.css('transform', 'translate3d(0px, '+(-offset||0)+'px, 0px)');
        }
        else {
          if (align == 'center') {
            offset -= (elem[0].clientWidth - (pages[indexp]&&pages[indexp].clientWidth)||0) / 2.0;
          } else {
            if (offset > elem[0].__swiper_maxOffset) {
              offset = elem[0].__swiper_maxOffset;
            } else {
              offset -= align;
            }
          }
          pagesContainer.css('-webkit-transform', 'translate3d('+(-offset||0)+'px, 0px, 0px)');
          pagesContainer.css('-moz-transform', 'translate3d('+(-offset||0)+'px, 0px, 0px)');
          pagesContainer.css('-ms-transform', 'translateX('+(-offset||0)+'px)');
          pagesContainer.css('transform', 'translate3d('+(-offset||0)+'px, 0px, 0px)');
        }
      } // if.

      pagesContainer.attr('data-offset', offset);

      if (!animation) {
        setTimeout(function() {
          this.addClass('febsui-swiper-animation');
        }.bind(pagesContainer), 30);
      }

      // 重置正确的位置.
      if (resetPostion && pages.length > 1) {
        setTimeout(function() {
          var current = parseInt(this.attr('data-current')) || 0;
          this.swiperTo(current, false);
        }.bind(elem), 310);
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
