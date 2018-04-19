/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */
var escape = require('../escape');
var dom = require('../dom');

function escape_string(str) {
  // 转义.
  if (str) {
    str =  escape(str);
  }
  return str;
}

( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "febs-ui requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

'use strict';

const loading_tag_name = 'febsui_loading_span_s23153dd12ax1';
var control_loading_index = 0;
var control_loading_timer;
var control_loading_text_elemFunc;
var control_loading_text_hideFunc;
var control_loading_text_array;

var controls = {};

/**
* @desc: 当前是否显示.
*/
controls.loading_isVisiable = function() {
  if (control_loading_timer)
    return true;
  
  var e1 = dom.getElementById(loading_tag_name);
  var ee = e1 ? e1.innerHTML : null;
  return ee && ee.length>0;
}


/**
* @desc: 使用延时显示加载框.
* @param text: 提示文本.
* @param timeout: 延时显示, 默认为0.
* @return: 
*/
function loading_show(text, timeout) {

  text = escape_string(text);

  {
    var _body = dom.getElementsByTagName('body')[0];
    if (!dom.getElementById(loading_tag_name)) {
      var elem = dom.createElement('span');
      dom.setAttribute(elem, 'id', loading_tag_name);
      dom.prependChild(_body, elem);
    }
  }
  // var e = $('body').children('#' + loading_tag_name);
  // if (!e || e.length == 0) {
  //   $('body').prepend(('<span id="' + loading_tag_name + '"></span>'));
  // }

  if (control_loading_timer)
    window.clearInterval(control_loading_timer);
  if (timeout) {
    control_loading_timer = window.setInterval(function () {
      loading_show(text);
    }, timeout);
  }
  else {
    {
      var elem = dom.getElementById(loading_tag_name);
      if (elem) {
        elem.innerHTML = '<div class="febsui-loading-c"><div class="febsui-loading"><div class="febsui-loading-spin"></div><p style="margin-left:auto;margin-right:auto;text-align:center;max-width:200px;">' + (text ? text : '') + '</p></div></div>';
      }
    }
    // $('#' + loading_tag_name).html('<div class="febsui-loading-c"><div class="febsui-loading"><div class="febsui-loading-spin"></div><p style="margin-left:auto;margin-right:auto;text-align:center;max-width:200px;">' + (text ? text : '') + '</p></div></div>');
  }
}
controls.loading_show = loading_show;

/**
* @desc: 通过每500ms改变文本的方式显示加载框; 例如显示 3,2,1,3,2,1循环显示.
* @param textArray: 变化的文本数组.
* @param changeTextCB: 当前显示文本的回调. function(text).
* @param hideCB:  隐藏加载框时的设置文本的函数. function().
* @return: 
*/
controls.loading_show_text = function(textArray, changeTextCB, hideCB) {

  {
    var _body = dom.getElementsByTagName('body')[0];
    if (!dom.getElementById(loading_tag_name)) {
      var elem = dom.createElement('span');
      dom.setAttribute(elem, 'id', loading_tag_name);
      dom.prependChild(_body, elem);
    }
  }
  // var e = $('body').children('#' + loading_tag_name);
  // if (!e || e.length == 0) {
  //   $('body').prepend(('<span id="' + loading_tag_name + '"></span>'));
  // }

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
controls.loading_hide = function() {
  {
    var _body = dom.getElementsByTagName('body')[0];
    if (!dom.getElementById(loading_tag_name)) {
      var elem = dom.createElement('span');
      dom.setAttribute(elem, 'id', loading_tag_name);
      dom.prependChild(_body, elem);
    }
  }
  // var e = $('body').children('#' + loading_tag_name);
  // if (!e || e.length == 0) {
  //   $('body').prepend(('<span id="' + loading_tag_name + '"></span>'));
  // }

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

  {
    var elem = dom.getElementById(loading_tag_name);
    if (elem) {
      elem.innerHTML = '';
    }
  }
  // $('#' + loading_tag_name).html('');
}

return controls;
}
);