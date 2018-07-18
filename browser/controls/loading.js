
var maskPrevent = require('../domHelper').maskPreventEvent;

/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */
function escape_string(str) {
  // 转义.
  if (str) {
    str =  window.febs.string.escapeHtml(str||'');
  }
  return str;
}

var is_IE9 = window.febs.utils.browserIEVer() <= 9;

'use strict';

const loading_tag_name = 'febsui_loading_span_s23153dd12ax1';
var control_loading_index = 0;
var control_loading_timer;
var control_loading_text_elemFunc;
var control_loading_text_hideFunc;
var control_loading_text_array;

/**
* @desc: 当前是否显示.
*/
exports.loading_isVisiable = function() {
  if (control_loading_timer)
    return true;
  
  var ee = $('#'+loading_tag_name).html();
  return ee && ee.length>0;

  // var e1 = dom.getElementById(loading_tag_name);
  // var ee = e1 ? e1.innerHTML : null;
  // return ee && ee.length>0;
}


/**
* @desc: 使用延时显示加载框.
* @param text: 提示文本.
* @param timeout: 延时显示, 默认为0.
* @param spinLeft: 是否在左侧显示spin. 
* @param spinClass: 默认为 febsui-icon-spin1-white
* @param whiteBg: 使用白色背景
* @return: 
*/
function loading_show(text, timeout, spinClass, spinLeft, whiteBg) {

  var defaultSpinClass = whiteBg ? '' : '-white';

  if (is_IE9)
    spinClass = spinClass||('febsui-icon-spin3'+defaultSpinClass);
  else
    spinClass = spinClass||('febsui-icon-spin1'+defaultSpinClass);

  text = escape_string(text);

  var e = $('body').children('#' + loading_tag_name);
  if (!e || e.length == 0) {
    $('body').prepend(('<span id="' + loading_tag_name + '"></span>'));
  }

  if (control_loading_timer)
    window.clearInterval(control_loading_timer);
  if (timeout) {
    control_loading_timer = window.setInterval(function () {
      loading_show(text);
    }, timeout);
  }
  else {
    spinLeft = spinLeft ? ' febsui-loading-left' : '';
    if (whiteBg) {
      spinLeft += ' febsui-loading-white';
    }
    var ee = $('#' + loading_tag_name);
    if (window.febs.string.isEmpty(ee.html())) {
      ee.html('<div class="febsui-loading-c"><div class="febsui-loading'+spinLeft+'"><div class="' + spinClass + ' febsui-animation-spin febsui-loading-spin"></div><p>' + (text ? text : '') + '</p></div></div>');
    } else {
      var eee = $(ee.children('.febsui-loading-c')[0]);
      eee = $(eee.children('.febsui-loading')[0]);
      eee = $(eee.children('p')[0]);
      eee.html((text ? text : ''));
    }

    maskPrevent($(ee.children('.febsui-loading-c')[0]));

    // for ie9.
    exports.spin_init();
  }
}
exports.loading_show = loading_show;

/**
* @desc: 通过每500ms改变文本的方式显示加载框; 例如显示 3,2,1,3,2,1循环显示.
* @param textArray: 变化的文本数组.
* @param changeTextCB: 当前显示文本的回调. function(text).
* @param hideCB:  隐藏加载框时的设置文本的函数. function().
* @return: 
*/
exports.loading_show_text = function(textArray, changeTextCB, hideCB) {

  var e = $('body').children('#' + loading_tag_name);
  if (!e || e.length == 0) {
    $('body').prepend(('<span id="' + loading_tag_name + '"></span>'));
  }

  if (control_loading_text_elemFunc) {
    if (control_loading_text_hideFunc) control_loading_text_hideFunc();
    control_loading_text_hideFunc = null;
    control_loading_text_elemFunc = null;
    control_loading_text_array = null;
    if (control_loading_timer) {
      window.clearInterval(control_loading_timer);
      control_loading_timer = null;
    }
  }

  for (var i = 0; i < textArray.length; i++) {
    textArray[i] = escape_string(textArray[i]);
  }

  control_loading_text_array = textArray;
  control_loading_text_hideFunc = hideCB;
  control_loading_text_elemFunc = changeTextCB;
  control_loading_index = 0;
  control_loading_timer = window.setInterval(function () {
    control_loading_text_elemFunc(control_loading_text_array[(control_loading_index++) % control_loading_text_array.length]);
  }, 500);
}

/**
* @desc: 隐藏加载对话框
* @return: 
*/
exports.loading_hide = function() {
  var e = $('body').children('#' + loading_tag_name);
  if (!e || e.length == 0) {
    $('body').prepend(('<span id="' + loading_tag_name + '"></span>'));
  }

  if (control_loading_timer) {
    window.clearInterval(control_loading_timer);
    control_loading_timer = null;
  }

  if (control_loading_text_elemFunc) {
    if (control_loading_text_hideFunc) control_loading_text_hideFunc();
    control_loading_text_hideFunc = null;
    control_loading_text_elemFunc = null;
    control_loading_text_array = null;
    if (control_loading_timer) {
      window.clearInterval(control_loading_timer);
      control_loading_timer = null;
    }
  }

  $('#' + loading_tag_name).html('');

  // for ie9.
  exports.spin_init();
}


// ie9.
var ie9Spins;
var spinTotal = 0;
var spinTimer;
var spinFoo;
if (is_IE9) {
  var now = Date.now();
  var timeSpan = 2000;
  
  spinFoo = function(tm) {
    if (ie9Spins) {
      var now2 = Date.now();
      spinTotal += now2-now;
      now = now2;

      spinTotal = spinTotal%timeSpan;

      var deg = 360*(spinTotal/timeSpan);
      deg = 'rotate('+deg+'deg)';

      ie9Spins.css('-ms-transform', deg);
    }
    spinTimer = requestAnimationFrame(spinFoo);
  }
} // ie9.

/**
* @desc: for spin.
* @return: 
*/
exports.spin_init = function() {
  // ie9.
  if (is_IE9) {
    ie9Spins = $('.febsui-animation-spin');
    if (ie9Spins.length > 0) {
      spinTimer = requestAnimationFrame(spinFoo);
    } else {
      if (spinTimer) {
        cancelAnimationFrame(spinTimer);
        spinTimer = null;
      }
    }
  }
}