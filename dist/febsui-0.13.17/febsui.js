/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.getComputedStyle = function (element, att) {
  //特性侦测
  if (window.getComputedStyle) {
    //优先使用W3C规范
    return att ? window.getComputedStyle(element)[att] : window.getComputedStyle(element);
  } else {
    //针对IE9以下兼容
    return att ? element.currentStyle[att] : element.currentStyle;
  }
};

/**
 * @desc: 复制属性. 不会复制class属性.
 * @param matchCB: function(attrName): boolean; 返回true表明允许复制.
 *                 null表示全部复制.
 * @return: 
 */
exports.copyAttrs = function (from, to, matchCB) {
  matchCB = matchCB || function () {
    return true;
  };

  // copy attri.
  var attris = from[0].attributes;
  if (attris) {
    for (var j = 0; j < attris.length; j++) {
      var name = attris[j].nodeName.toLowerCase();
      if (name != 'class' && matchCB(name)) {
        to.attr(name, from.attr(name));
        if (attris[j].nodeName == 'id') {
          from.removeAttr('id');
        }
      }
    }
  }
};

/**
 * @desc: 复制类.
 * @return: 
 */
exports.copyClass = function (from, to) {
  // copy class.
  var classDom = from.attr('class');
  if (!window.febs.string.isEmpty(classDom)) {
    classDom = classDom.split(' ');
    for (var jjj = 0; jjj < classDom.length; jjj++) {
      if (!to.hasClass(classDom[jjj])) {
        to.addClass(classDom[jjj]);
      }
    }
  }
};

function maskPreventHandler(event) {
  // if (event.target == event.currentTarget) {
  event.preventDefault();
  return false;
  // }
}

// event.
exports.maskPreventEvent = function (ee) {
  if (window.febs.utils.browserIsMobile()) {
    window.febs.dom.removeEventListener(ee[0], 'touchmove', maskPreventHandler);
    window.febs.dom.addEventListener(ee[0], 'touchmove', maskPreventHandler);
  } else {
    // window.febs.dom.removeEventListener(ee[0], 'mousewheel', maskPreventHandler);
    // window.febs.dom.addEventListener(ee[0], 'mousewheel', maskPreventHandler);
  }
};

//
// prevent mobile event.
function mobile_onTouchstart(event) {
  event = event || window.event;
  event.target.__touchstart_at = Date.now();
}

function mobile_onTouchmove(event) {
  event = event || window.event;
  if (event.target.__touchstart_at && Date.now() - event.target.__touchstart_at > 450) {
    event.preventDefault();
    // return false;
  } else {
    delete event.target.__touchstart_at;
  }
}

function mobile_onTouchend(event) {
  event = event || window.event;
  delete event.target.__touchstart_at;
}
var mobile_onTouchcancel = mobile_onTouchend;

/**
 * @desc: 
 * @param dom: HtmlElement.
 */
exports.mobile_preventTouchEvent = function (dom) {
  if (window.febs.utils.browserIsMobile()) {
    window.febs.dom.removeEventListener(dom, 'touchstart', mobile_onTouchstart);
    window.febs.dom.removeEventListener(dom, 'touchmove', mobile_onTouchmove);
    window.febs.dom.removeEventListener(dom, 'touchend', mobile_onTouchend);
    window.febs.dom.removeEventListener(dom, 'touchcancel', mobile_onTouchcancel);

    window.febs.dom.addEventListener(dom, 'touchstart', mobile_onTouchstart, true);
    window.febs.dom.addEventListener(dom, 'touchmove', mobile_onTouchmove, true);
    window.febs.dom.addEventListener(dom, 'touchend', mobile_onTouchend, true);
    window.febs.dom.addEventListener(dom, 'touchcancel', mobile_onTouchcancel, true);
  } // if.
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var resizeDialog = __webpack_require__(8).resizeDialog;
var maskPrevent = __webpack_require__(0).maskPreventEvent;

exports.hide = hide;
exports.showAlert = showAlert;
exports.showConfirm = showConfirm;
exports.showConfirmEdit = showConfirmEdit;

var isIE9 = window.febs.utils.browserIEVer();
var styleBorder = '';
// ie9.
if (isIE9 <= 9) {
  styleBorder = 'border-top:1px solid #eee;';
}

function escape_string(ctx) {
  // 转义.
  if (ctx.title) {
    ctx.title = window.febs.string.escapeHtml(ctx.title);
  }
  if (ctx.content) {
    ctx.content = window.febs.string.escapeHtml(ctx.content);
  }
  if (ctx.msg) {
    ctx.msg = window.febs.string.escapeHtml(ctx.msg);
  }
  if (ctx.editText) {
    ctx.editText = window.febs.string.escapeHtml(ctx.editText);
  }
  if (ctx.okText) {
    ctx.okText = window.febs.string.escapeHtml(ctx.okText);
  }
  if (ctx.cancelText) {
    ctx.cancelText = window.febs.string.escapeHtml(ctx.cancelText);
  }
}

function hide(selector, finishCb) {
  if (selector) {
    setTimeout(function () {
      $(selector).removeClass('febsui-visible').addClass('febsui-invisible');
      if ($(selector)[0]) {

        // 移除临时弹出的窗口.
        if ($(selector).hasClass('febsui-dialog-init-sys')) {
          setTimeout(function () {
            $(selector).remove();
            if (finishCb) finishCb();
          }, 300);
        } else {
          if (finishCb) {
            setTimeout(function () {
              finishCb();
            }, 300);
          }
        }
      }
    }, 100);
  } else {
    var ee = $('.febsui-dialog');
    ee.removeClass('febsui-visible').addClass('febsui-invisible');

    var ees = [];
    // 移除临时弹出的窗口.
    for (var i = 0; i < ee.length; i++) {
      var eee = $(ee[i]);
      if (eee.hasClass('febsui-dialog-init-sys')) {
        ees.push(eee);
      }
    } // for.

    setTimeout(function () {
      for (var i = 0; i < ees.length; i++) {
        ees[i].remove();
      }
      if (finishCb) {
        finishCb();
      }
    }, 300);
  }
}

// add keyup.
// (document).addEventListener('keyup', function (event) {
//   if (event.which == '27') {
//     hide();
//   }
// });

/**
* ctx.title:    标题.
* ctx.blackBg:  使用黑色背景.
* ctx.cssClass: 自定义扩展样式.
* ctx.content:	内容文字.
* ctx.contentHtml: 使用html方式的内容.
* ctx.confirm: function(){}	// 点击确认键的回调.
* ctx.okText
*/
function showAlert(ctx) {

  if ((typeof ctx === 'undefined' ? 'undefined' : _typeof(ctx)) !== 'object') {
    ctx = { content: ctx && ctx.toString() };
  }

  ctx.contentHtml = ctx.contentHtml ? ctx.contentHtml : '';

  if (!ctx.okText) ctx.okText = "确认";
  escape_string(ctx);

  // if ($('.febsui-dialog').length > 0) {
  // 	$('.febsui-dialog').remove();
  // }

  var uid = 'febs-' + febs.crypt.uuid();

  var mask = '';
  if (!$('.febsui-mask').hasVisible()) {
    mask = ' febsui-mask';
  }

  if (ctx.cssClass) {
    mask += ' ' + ctx.cssClass;
  }

  var blackBgClass = ctx.blackBg ? ' febsui-dialog-container-black' : '';

  var htmlElem = '<div' + ' id="' + uid + '" class="febsui-dialog febsui-dialog-init-sys febsui-dialog-init' + mask + '" role="alert"><div class="febsui-dialog-container' + blackBgClass + '">';
  htmlElem += ctx.title ? '<div class="febsui-dialog-title">' + ctx.title + '</div>' : '';
  htmlElem += ctx.content || ctx.contentHtml ? '<div class="febsui-dialog-content">' + (ctx.content ? ctx.content : ctx.contentHtml) + '</div>' : '';
  htmlElem += '<ul class="febsui-dialog-buttons"><li style="width:100%;' + styleBorder + '"><button class="febsui-dialog-cancel">' + ctx.okText + '</button></li></ul></div></div>';

  $("body").append($(htmlElem));
  resizeDialog();

  var eee = $('#' + uid);
  maskPrevent(eee);
  maskPrevent(eee.children('.febsui-dialog-container'));

  setTimeout(function () {
    eee.addClass('febsui-visible');
  }, 10);

  //close popup
  var ele = eee;
  ele.on('click', function (event) {
    if ($(event.target).hasClass('febsui-dialog-cancel') /*|| $(event.target).hasClass('febsui-dialog')*/) {
        event.preventDefault();
        if (ctx.confirm) ctx.confirm.bind(ele)();
        hide(ele);
      }
  });

  //close popup when clicking the esc keyboard button
  // (document).addEventListener('keyup', function (event) {
  // 	if (event.which == '27') {
  // 		hide();
  // 	}
  // });
  // $(document).keyup(function (event) {
  // 	if (event.which == '27') {
  // 		hide();
  // 	}
  // });
}

/**
* ctx.title:    标题.
* ctx.blackBg:  使用黑色背景.
* ctx.cssClass: 自定义扩展样式.
* ctx.content:		 内容文字.
* ctx.contentHtml: html方式的内容.
* ctx.confirm: function(){}	// 点击确认键的回调.
* ctx.cancel:  function(){} // 点击取消键的回调.
* ctx.okText:
* ctx.cancelText:
*/
function showConfirm(ctx) {

  if ((typeof ctx === 'undefined' ? 'undefined' : _typeof(ctx)) !== 'object') {
    ctx = { content: ctx && ctx.toString() };
  }

  if (!ctx.okText) ctx.okText = "确认";
  if (!ctx.cancelText) ctx.cancelText = "取消";

  ctx.contentHtml = ctx.contentHtml ? ctx.contentHtml : '';

  escape_string(ctx);

  // if ($('.febsui-dialog').length > 0) {
  // 	$('.febsui-dialog').remove();
  // }

  var uid = 'febs-' + febs.crypt.uuid();

  var mask = '';
  if (!$('.febsui-mask').hasVisible()) {
    mask = ' febsui-mask';
  }

  if (ctx.cssClass) {
    mask += ' ' + ctx.cssClass;
  }

  var blackBgClass = ctx.blackBg ? ' febsui-dialog-container-black' : '';

  var htmlElem = '<div' + ' id="' + uid + '" class="febsui-dialog febsui-dialog-init-sys febsui-dialog-init' + mask + '" role="alert"><div class="febsui-dialog-container' + blackBgClass + '">';
  htmlElem += ctx.title ? '<div class="febsui-dialog-title">' + ctx.title + '</div>' : '';
  htmlElem += ctx.content || ctx.contentHtml ? '<div class="febsui-dialog-content">' + (ctx.content ? ctx.content : ctx.contentHtml) + '</div>' : '';
  htmlElem += '<ul class="febsui-dialog-buttons"><li' + (isIE9 ? ' style="' + styleBorder + '"' : '') + '><button class="febsui-dialog-cancel">' + ctx.cancelText + '</button></li><li' + (isIE9 ? ' style="' + styleBorder + '"' : '') + '><button class="febsui-dialog-ok">' + ctx.okText + '</button></li></ul></div></div>';

  $("body").append($(htmlElem));
  resizeDialog();

  maskPrevent($('#' + uid));

  setTimeout(function () {
    $('#' + uid).addClass('febsui-visible');
  }, 10);

  //close popup
  var ele = $('#' + uid);
  ele.on('click', function (event) {
    if ($(event.target).hasClass('febsui-dialog-ok')) {
      event.preventDefault();
      if (ctx.confirm) ctx.confirm.bind(ele)();
    } else if ($(event.target).hasClass('febsui-dialog-cancel')) {
      event.preventDefault();
      if (ctx.cancel) ctx.cancel.bind(ele)();
      hide(ele);
    }
  });

  //close popup when clicking the esc keyboard button
  // (document).addEventListener('keyup', function (event) {
  // 	if (event.which == '27') {
  //     hide();
  //     if (ctx.cancel) ctx.cancel();
  //     (document).removeEventListener('keyup', this);
  // 	}
  // });
  // $(document).one('keyup', function (event) {
  // 	if (event.which == '27') {
  // 		if (ctx.cancel) ctx.cancel.bind(ele)();
  // 		hide(ele);
  // 	}
  // });
}

/**
* ctx.title:    标题.
* ctx.blackBg:  使用黑色背景.
* ctx.cssClass: 自定义扩展样式.
* ctx.content:		 内容文字.
* ctx.contentHtml: html方式的内容.
* ctx.editText:		 输入框文字.
* ctx.confirm: function(text){}	// 点击确认键的回调.
* ctx.cancel:  function(){} // 点击取消键的回调.
* ctx.okText:
* ctx.cancelText:
*/
function showConfirmEdit(ctx) {

  if ((typeof ctx === 'undefined' ? 'undefined' : _typeof(ctx)) !== 'object') {
    ctx = { content: ctx && ctx.toString() };
  }

  if (!ctx.okText) ctx.okText = "确认";
  if (!ctx.cancelText) ctx.cancelText = "取消";

  ctx.contentHtml = ctx.contentHtml ? ctx.contentHtml : '';

  // 转义.
  escape_string(ctx);

  // if ($('.febsui-dialog').length > 0) {
  // 	$('.febsui-dialog').remove();
  // }

  var uid = 'febs-' + febs.crypt.uuid();

  var mask = '';
  if (!$('.febsui-mask').hasVisible()) {
    mask = ' febsui-mask';
  }

  if (ctx.cssClass) {
    mask += ' ' + ctx.cssClass;
  }

  var blackBgClass = ctx.blackBg ? ' febsui-dialog-container-black' : '';

  var elems = '<div' + ' id="' + uid + '" class="febsui-dialog febsui-dialog-init-sys febsui-dialog-init' + mask + '" role="alert"><div class="febsui-dialog-container' + blackBgClass + '">';
  elems += ctx.title ? '<div class="febsui-dialog-title">' + ctx.title + '</div>' : '';
  elems += ctx.content || ctx.contentHtml ? '<div class="febsui-dialog-content">' + (ctx.content ? ctx.content : ctx.contentHtml) + '</div>' : '';
  elems += '<div class="febsui-dialog-edit"><input class="febsui-input-text-noborder" type="text" value="' + (ctx.editText ? ctx.editText : '') + '">' + '</div>';
  elems += '<ul class="febsui-dialog-buttons"><li' + (isIE9 ? ' style="' + styleBorder + '"' : '') + '><button class="febsui-dialog-cancel">' + ctx.cancelText + '</button></li><li' + (isIE9 ? ' style="' + styleBorder + '"' : '') + '><button class="febsui-dialog-ok">' + ctx.okText + '</button></li></ul></div></div>';

  $("body").append($(elems));
  resizeDialog();

  maskPrevent($('#' + uid));

  setTimeout(function () {
    $('#' + uid).addClass('febsui-visible');
  }, 10);

  //close popup
  var ele = $('#' + uid);
  ele.on('click', function (event) {
    if ($(event.target).hasClass('febsui-dialog-ok')) {
      event.preventDefault();
      if (ctx.confirm) ctx.confirm.bind(ele)($('#' + uid + ' .febsui-dialog-edit .febsui-input-text-noborder').val());
    } else if ($(event.target).hasClass('febsui-dialog-cancel')) {
      event.preventDefault();
      if (ctx.cancel) ctx.cancel.bind(ele)();
      hide(ele);
    }
  });

  //close popup when clicking the esc keyboard button
  // (document).addEventListener('keyup', function (event) {
  // 	if (event.which == '27') {
  //     hide();
  //     if (ctx.cancel) ctx.cancel();
  //     (document).removeEventListener('keyup', this);
  // 	}
  // });
  // $(document).one('keyup', function (event) {
  // 	if (event.which == '27') {
  // 		if (ctx.cancel) ctx.cancel.bind(ele)();
  // 		hide(ele);
  // 	}
  // });
}

/**
 * jquery plugin.
 */

exports.dialog_init = dialog_init;

/**
* @desc: 初始化dialog控件.
*        对页面上 的所有 <dialog> 元素进行初始化.
*/
function dialog_init(elem) {
  var elems = elem ? elem : $('.febsui-dialog');
  for (var i = 0; i < elems.length; i++) {
    var dom = $(elems[i]);

    if (!dom.hasClass('febsui-dialog')) {
      continue;
    }

    if (!dom.hasClass('febsui-dialog-init')) {
      dom.addClass('febsui-dialog-container').removeClass('febsui-dialog');

      // 内容.
      var content = dom.children('.febsui-dialog-content');
      var title = dom.children('.febsui-dialog-title');

      var contentWrap = title[0] ? '<div class="febsui-dialog-content-wrap febsui-dialog-content-wrap-title"></div>' : '<div class="febsui-dialog-content-wrap"></div>';
      dom.prepend($(contentWrap).append(content));
      if (title[0]) {
        dom.prepend(title);
      }

      // 判断是否有按钮.
      if (!dom.children('.febsui-dialog-buttons')[0]) {
        dom.addClass('febsui-dialog-container-noButtons');
      }

      var domid = dom.attr('id');
      if (febs.string.isEmpty(domid)) {
        throw new Error('must have a "id" attribute in custom febsui-dialog');
      }

      // var ddd = $("<div class='febsui-dialog febsui-dialog-init' style='display:none !important;'></div>");
      // ddd.insertBefore(dom);

      var maskZIndex = dom.attr('data-mask-zindex');

      $('.febsui-dialog[data-id="' + domid + '"]').remove();
      var dd = $("<div class='febsui-dialog febsui-dialog-init febsui-dialog-custom" + ' id-' + domid + "' role='alert' data-id='" + domid + "'></div>");
      if (!isNaN(parseInt(maskZIndex))) {
        dd.css('z-index', parseInt(maskZIndex));
      }
      $('body').append(dd);
      dd.append(dom);

      //close popup
      dom.on('click', function (event) {
        if ($(event.target).hasClass('febsui-dialog-cancel')) {
          event.preventDefault();
          hide($(event.target).parents('.febsui-dialog'));
        }
      });

      if (dom.attr('data-mask-close') == 'true') {
        dd.on('click', function (event) {
          if (event.currentTarget == event.target) {
            event.preventDefault();
            hide($(event.target));
          }
        });
      }
    }
  } // for.
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */



var err_nofile = 'nofile error'; // 未选择文件.
var err_sizeExceed = 'sizeExceed error'; // 文件太大.
var err_crc32 = 'crc32 error'; // 计算本地文件hash值时错误.
var err_net = 'network error'; // ajax上传时出错.

module.exports = {
  nofile: err_nofile,
  sizeExceed: err_sizeExceed,
  crc32: err_crc32,
  net: err_net
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var domHelper = __webpack_require__(0);

exports.actionsheet_init = actionsheet_init;

/**
* @desc: 初始化actionsheet控件.
*        对页面上 的所有 <.febsui-actionsheet> 元素进行初始化.
*/
function actionsheet_init(elem) {
  var elems = elem ? elem : $('.febsui-actionsheet');
  for (var i = 0; i < elems.length; i++) {
    var dom = $(elems[i]);

    if (!dom.hasClass('febsui-actionsheet')) {
      continue;
    }

    if (!dom.hasClass('febsui-actionsheet-inited')) {

      // data-blackBg
      var blackBg = dom.attr('data-blackBg');
      blackBg = window.febs.string.isEmpty(blackBg) ? false : 'true' == blackBg;

      var domid = dom.attr('id');
      if (febs.string.isEmpty(domid)) {
        throw new Error('must have a "id" attribute in febsui-actionsheet');
      }

      var ddd = $("<div class='febsui-actionsheet febsui-actionsheet-inited' style='display:none !important;'></div>");
      if (blackBg) {
        ddd.addClass('febsui-actionsheet-black');
      }
      ddd.insertBefore(dom);
      // dom.removeAttr('id');

      var domChildren = dom.children();
      var ddChildren;
      if (domChildren[0]) {
        ddChildren = $("<div class='febsui-actionsheet-group'></div>");
        ddChildren.append(domChildren);
        dom.append(ddChildren);
      }

      if (ddChildren) {
        var domCancel = ddChildren.children('.febsui-actionsheet-cancel');
        if (domCancel[0]) {
          domCancel.addClass('febsui-actionsheet-cell');
          var ddCancel = $("<div class='febsui-actionsheet-group' style='margin-top:5px;'></div>");
          ddCancel.append(domCancel);
          dom.append(ddCancel);
        }
      }

      // ie9.
      if (window.febs.utils.browserIEVer() <= 9) {
        var groups = dom.children('.febsui-actionsheet-group');
        for (var jj = 0; jj < groups.length; jj++) {
          var cells = $(groups[jj]).children('.febsui-actionsheet-cell');
          for (var jjj = 0; jjj < cells.length - 1; jjj++) {
            $(cells[jjj]).css('border-bottom', '1px solid #eee');
          }
        }
      }

      $('.febsui-actionsheet[data-id="' + domid + '"]').remove();

      var dd = $("<div class='febsui-actionsheet febsui-actionsheet-inited" + ' id-' + domid + "'" + ' data-id="' + domid + '"' + "></div>");
      if (blackBg) {
        dd.addClass('febsui-actionsheet-black');
      }
      $('body').append(dd);

      // copy attri.
      domHelper.copyAttrs(dom, dd, function (name) {
        // if ('id' == name) return true;
        return name.indexOf('data-') == 0;
      });

      dom.removeClass('febsui-actionsheet').addClass('febsui-actionsheet-container');
      dd.append(dom);

      // // 动画设置.
      // dom.css('-webkit-transform', 'translateY('+dom[0].clientHeight+'px)');
      // dom.css('-moz-transform', 'translateY('+dom[0].clientHeight+'px)');
      // dom.css('-ms-transform', 'translateY('+dom[0].clientHeight+'px)');
      // dom.css('-o-transform', 'translateY('+dom[0].clientHeight+'px)');
      // dom.css('transform', 'translateY('+dom[0].clientHeight+'px)');
    }
  } // for.
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var maskPrevent = __webpack_require__(0).maskPreventEvent;

/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */
function escape_string(str) {
  // 转义.
  if (str) {
    str = window.febs.string.escapeHtml(str || '');
  }
  return str;
}

var is_IE9 = window.febs.utils.browserIEVer() <= 9;

'use strict';

var loading_tag_name = 'febsui_loading_span_s23153dd12ax1';
var control_loading_index = 0;
var control_loading_timer;
var control_loading_text_elemFunc;
var control_loading_text_hideFunc;
var control_loading_text_array;

/**
* @desc: 当前是否显示.
*/
exports.loading_isVisiable = function () {
  if (control_loading_timer) return true;

  var ee = $('#' + loading_tag_name).html();
  return ee && ee.length > 0;

  // var e1 = dom.getElementById(loading_tag_name);
  // var ee = e1 ? e1.innerHTML : null;
  // return ee && ee.length>0;
};

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

  if (is_IE9) spinClass = spinClass || 'febsui-icon-spin3' + defaultSpinClass;else spinClass = spinClass || 'febsui-icon-spin1' + defaultSpinClass;

  text = escape_string(text);

  var e = $('body').children('#' + loading_tag_name);
  if (!e || e.length == 0) {
    $('body').prepend('<span id="' + loading_tag_name + '"></span>');
  }

  if (control_loading_timer) window.clearInterval(control_loading_timer);
  if (timeout) {
    control_loading_timer = window.setInterval(function () {
      loading_show(text);
    }, timeout);
  } else {
    spinLeft = spinLeft ? ' febsui-loading-left' : '';
    if (whiteBg) {
      spinLeft += ' febsui-loading-white';
    }
    var ee = $('#' + loading_tag_name);
    if (window.febs.string.isEmpty(ee.html())) {
      ee.html('<div class="febsui-loading-c"><div class="febsui-loading' + spinLeft + '"><div class="' + spinClass + ' febsui-animation-spin febsui-loading-spin"></div><p>' + (text ? text : '') + '</p></div></div>');
    } else {
      var eee = $(ee.children('.febsui-loading-c')[0]);
      eee = $(eee.children('.febsui-loading')[0]);
      eee = $(eee.children('p')[0]);
      eee.html(text ? text : '');
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
exports.loading_show_text = function (textArray, changeTextCB, hideCB) {

  var e = $('body').children('#' + loading_tag_name);
  if (!e || e.length == 0) {
    $('body').prepend('<span id="' + loading_tag_name + '"></span>');
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
    control_loading_text_elemFunc(control_loading_text_array[control_loading_index++ % control_loading_text_array.length]);
  }, 500);
};

/**
* @desc: 隐藏加载对话框
* @return: 
*/
exports.loading_hide = function () {
  var e = $('body').children('#' + loading_tag_name);
  if (!e || e.length == 0) {
    $('body').prepend('<span id="' + loading_tag_name + '"></span>');
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
};

// ie9.
var ie9Spins;
var spinTotal = 0;
var spinTimer;
var _spinFoo;
if (is_IE9) {
  var now = Date.now();
  var timeSpan = 2000;

  _spinFoo = function spinFoo(tm) {
    if (ie9Spins) {
      var now2 = Date.now();
      spinTotal += now2 - now;
      now = now2;

      spinTotal = spinTotal % timeSpan;

      var deg = 360 * (spinTotal / timeSpan);
      deg = 'rotate(' + deg + 'deg)';

      ie9Spins.css('-ms-transform', deg);
    }
    spinTimer = requestAnimationFrame(_spinFoo);
  };
} // ie9.

/**
* @desc: for spin.
* @return: 
*/
exports.spin_init = function () {
  // ie9.
  if (is_IE9) {
    ie9Spins = $('.febsui-animation-spin');
    if (ie9Spins.length > 0) {
      spinTimer = requestAnimationFrame(_spinFoo);
    } else {
      if (spinTimer) {
        cancelAnimationFrame(spinTimer);
        spinTimer = null;
      }
    }
  }
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var touchEventPrevent = __webpack_require__(0).mobile_preventTouchEvent;

var domHelper = __webpack_require__(0);

exports.popover_init = popover_init;

/**
* @desc: 初始化popover控件.
*        对页面上 的所有 <.febsui-popover> 元素进行初始化.
*/
function popover_init(elem) {
  var elems = elem ? elem : $('.febsui-popover');
  for (var i = 0; i < elems.length; i++) {
    var dom = $(elems[i]);

    if (!dom.hasClass('febsui-popover')) {
      continue;
    }

    if (!dom.hasClass('febsui-popover-inited') && !dom.children().hasClass('febsui-popover-arrow')) {

      var domid = dom.attr('id');
      if (febs.string.isEmpty(domid)) {
        throw new Error('must have a "id" attribute in febsui-popover');
      }

      var ddd = $("<div class='febsui-popover febsui-popover-inited' style='display:none !important;'></div>");
      ddd.insertBefore(dom);
      // dom.removeAttr('id');

      $('.febsui-popover[data-id="' + domid + '"]').remove();
      var dd = $("<div class='febsui-popover febsui-popover-inited" + ' id-' + domid + "' data-id='" + domid + "'></div>");

      // data-direction
      var direction = dom.attr('data-direction');
      // data-blackBg
      var blackBg = dom.attr('data-blackBg');
      blackBg = window.febs.string.isEmpty(blackBg) ? false : 'true' == blackBg;

      if (blackBg) {
        dd.addClass('febsui-popover-black');
      }

      direction = window.febs.string.isEmpty(direction) ? 'auto' : direction;
      direction = direction.toLowerCase();
      if (direction != 'auto') {
        var direction2;
        if (direction != 'top' && direction != 'left' && direction != 'right' && direction != 'bottom' && direction != 'center' && direction != 'auto') {
          throw new Error('popover attribute data-direction only can be top/left/right/bottom/center/auto');
        }

        // data-offset
        var offset = dom.attr('data-offset');
        offset = window.febs.string.isEmpty(offset) ? '10' : offset;
        if (parseInt(offset) != offset) {
          throw new Error('popover attribute data-offset only can be number');
        }
        offset = parseInt(offset);

        var offset1 = window.febs.dom.getElementOffset(dom);
        var offset2 = window.febs.dom.getDocumentOffset();
        offset1 = offset1 || { left: 0, top: 0 };

        if (direction == 'top' || direction == 'bottom') {
          direction2 = 'left';
          offset += offset1.left + offset2.left;
        }
        if (direction == 'left' || direction == 'right') {
          direction2 = 'top';
          offset += offset1.top + offset2.top;
        }

        dd.prepend('<div class="febsui-popover-arrow febsui-popover-arrow-' + direction + '" style="' + direction2 + ': ' + offset + 'px;"></div>');
      } else {
        dd.prepend('<div class="febsui-popover-arrow"></div>');
      }

      dom.removeClass('febsui-popover').addClass('febsui-popover-container');

      // ie9.
      if (window.febs.utils.browserIEVer() <= 9) {
        var cells = dom.children('.febsui-popover-cell');
        for (var jj = 0; jj < cells.length - 1; jj++) {
          $(cells[jj]).css('border-bottom', '1px solid #eee');
        }
      }

      $('body').append(dd);

      // copy attri.
      domHelper.copyAttrs(dom, dd, function (name) {
        // if ('id' == name) return true;
        return name.indexOf('data-') == 0;
      });

      touchEventPrevent(dom[0]);

      dd.append(dom);
    }
  } // for.
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var touchEventPrevent = __webpack_require__(0).mobile_preventTouchEvent;

exports.swiper_init = swiper_init;
exports.swiper_init_event = swiper_init_event;

var default_swiper_auto = 7000;

// 当前操作的swiper元素.
var swipre_current_capture = null;

//
// event.
function mobile_onTouchstart(event) {
  event = event || window.event;

  var touch;
  if (event.touches) {
    touch = event.touches[0];
  } else {
    touch = { clientX: event.clientX, clientY: event.clientY };
  }

  var currentTarget = event.currentTarget;
  if (touch && currentTarget) {
    var target = currentTarget;

    // capture.
    if (typeof target.ontouchstart === 'undefined') {
      if (swipre_current_capture) {
        return;
      }
      swipre_current_capture = target;
    }

    target = $(currentTarget).children('.febsui-swiper-pages')[0];
    var target_t = $(target);
    var parentTarget = target_t.parent();

    var dataLoop = parentTarget.attr('data-loop');
    var isDataLoop = window.febs.string.isEmpty(dataLoop) ? true : 'true' == dataLoop;

    target_t.removeClass('febsui-swiper-animation');

    // 获取前一个和后一个page.
    var currentPage;
    currentPage = Number(parentTarget.attr('data-current')) || 0;
    var nextPage, prePage;
    nextPage = null;
    prePage = null;

    var allPage = target_t.children('.febsui-swiper-page');
    var totalPage = allPage.length;

    if (isDataLoop && totalPage > 1) {
      currentPage += 1;
    }

    if (target.__swiper_vertical) {
      var pageOffset = 0;
      var widthValue;
      for (var i = 0; i < currentPage; i++) {
        widthValue = $(allPage[i]).css('height');
        pageOffset += parseFloat(widthValue.substring(0, widthValue.length - 2) || allPage[i].clientHeight);
      }

      if (currentPage > 0) {
        widthValue = $(allPage[currentPage - 1]).css('height');
        prePage = pageOffset - parseFloat(widthValue.substring(0, widthValue.length - 2) || allPage[currentPage - 1].clientHeight);
      }

      if (currentPage < totalPage - 1) {
        widthValue = $(allPage[currentPage + 1]).css('height');
        nextPage = pageOffset + parseFloat(widthValue.substring(0, widthValue.length - 2) || allPage[currentPage + 1].clientHeight);
      }
    } else {
      var pageOffset = 0;
      var widthValue;
      for (var i = 0; i < currentPage; i++) {
        widthValue = $(allPage[i]).css('width');
        pageOffset += parseFloat(widthValue.substring(0, widthValue.length - 2) || allPage[i].clientWidth);
      }

      if (currentPage > 0) {
        widthValue = $(allPage[currentPage - 1]).css('width');
        prePage = pageOffset - parseFloat(widthValue.substring(0, widthValue.length - 2) || allPage[currentPage - 1].clientWidth);
      }

      if (currentPage < totalPage - 1) {
        widthValue = $(allPage[currentPage + 1]).css('width');
        nextPage = pageOffset + parseFloat(widthValue.substring(0, widthValue.length - 2) || allPage[currentPage + 1].clientWidth);
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
    } else {
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
  } else {
    touch = { clientX: event.clientX, clientY: event.clientY };
  }

  var currentTarget = event.currentTarget;
  if (touch && currentTarget) {
    var target = currentTarget;

    // capture.
    if (typeof target.ontouchstart === 'undefined') {
      if (swipre_current_capture && !swipre_current_capture.isSameNode(target)) {
        return;
      }
    }

    target = $(currentTarget).children('.febsui-swiper-pages')[0];
    if (!target.__swiper_start) return;

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
      } else {
        span1 = Math.abs(target.__swiper_touch - touch.clientX);
        span2 = Math.abs(target.__swiper_touch1 - touch.clientY);
      }

      if (span1 > span2) {
        if (span1 > 30) {
          target.__swiper_start_scroll = true;

          if (target.__swiper_vertical) {
            target.__swiper_touch = touch.clientY;
            target.__swiper_touch1 = touch.clientX;
          } else {
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
      off = target.__swiper_touch - touch.clientY;
    } else {
      off = target.__swiper_touch - touch.clientX;
    }

    // 超出小幅移动.
    if (!target.__swiper_loop) {
      // if (off <=0 && target.__swiper_currentPage == 0 || off>=0 && target.__swiper_currentPage >= target.__swiper_totalPage-1)
      // if (off <=0 && offset+off <= 0 || off >= 0 && offset+off >= target.__swiper_maxOffset)
      // {
      //   off /= 3;
      // }
      if (off <= 0 && offset + off <= 0) {
        off = (offset + off) / 3;
        offset = 0;
      } else if (off >= 0 && offset + off >= target.__swiper_maxOffset) {
        off = (offset + off - target.__swiper_maxOffset) / 3;
        offset = target.__swiper_maxOffset;
      }
    }

    if (target.__swiper_vertical) {
      offset += off;
      target.style['-webkit-transform'] = 'translate3d(0px, ' + -offset + 'px, 0px)';
      target.style['-moz-transform'] = 'translate3d(0px, ' + -offset + 'px, 0px)';
      target.style['-ms-transform'] = 'translateY(' + -offset + 'px)';
      target.style['transform'] = 'translate3d(0px, ' + -offset + 'px, 0px)';
    } else {
      offset += off;
      target.style['-webkit-transform'] = 'translate3d(' + -offset + 'px, 0px, 0px)';
      target.style['-moz-transform'] = 'translate3d(' + -offset + 'px, 0px, 0px)';
      target.style['-ms-transform'] = 'translateX(' + -offset + 'px)';
      target.style['transform'] = 'translate3d(' + -offset + 'px, 0px, 0px)';
    }

    if (target.parentNode.__swiperMoving) {
      if (offset < target.__offsetCurrent && target.__offsetPre !== null) {
        target.parentNode.__swiperMoving((offset - target.__offsetCurrent) / (target.__offsetCurrent - target.__offsetPre));
      } else if (offset > target.__offsetCurrent && target.__offsetNext !== null) {
        target.parentNode.__swiperMoving((offset - target.__offsetCurrent) / (target.__offsetNext - target.__offsetCurrent));
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
  var toNext = swipeSpan > 0 ? true : false;

  if (allPage.length == 1) currentRight = 0;

  var backSpan = 20;
  // 仅第一个会回弹, 其他的只要超过20就划过.
  var swipeIndex = current;
  if (toNext) {
    swipeSpan -= (vertical ? allPage[currentRight].clientHeight : allPage[currentRight].clientWidth) / 2;
    if (swipeSpan >= 0) {
      swipeSpan -= (vertical ? allPage[currentRight].clientHeight : allPage[currentRight].clientWidth) / 2;
      if (swipeSpan < 0) {
        swipeIndex = current + 1;
      } else {
        swipeIndex = current + 1;
        for (var i = currentRight + 1; i < allPage.length; i++) {
          swipeSpan -= backSpan; // 未超过20回弹.
          if (swipeSpan <= 0) break;
          swipeIndex++;
          swipeSpan -= (vertical ? allPage[i].clientHeight : allPage[i].clientWidth) - backSpan;
          if (swipeSpan <= 0) break;
        }
      }
    } // if.
    if (swipeIndex == current) swipeIndex = current + 1;
  } else {
    currentRight--;
    if (currentRight < 0) return swipeIndex;

    swipeSpan += (vertical ? allPage[currentRight].clientHeight : allPage[currentRight].clientWidth) / 2;
    if (swipeSpan <= 0) {
      swipeSpan += (vertical ? allPage[currentRight].clientHeight : allPage[currentRight].clientWidth) / 2;
      if (swipeSpan > 0) {
        swipeIndex = current - 1;
      } else {
        swipeIndex = current - 1;
        for (var i = currentRight - 1; i >= 0; i--) {
          swipeSpan += backSpan; // 未超过20回弹.
          if (swipeSpan >= 0) break;
          swipeIndex--;
          swipeSpan += (vertical ? allPage[i].clientHeight : allPage[i].clientWidth) - backSpan;
          if (swipeSpan >= 0) break;
        }
      }
    } // if.

    if (swipeIndex == current) swipeIndex = current - 1;
  } // if..else.

  if (!loop) {
    if (swipeIndex >= allPage.length) {
      swipeIndex = allPage.length - 1;
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

            if (swipre_current_capture && swipre_current_capture.isSameNode(event.currentTarget)) {
              swipre_current_capture = null;
            }

            window.febs.dom.removeEventListener(event.currentTarget, 'mousemove', mobile_onTouchmove, true);
            window.febs.dom.removeEventListener(event.currentTarget, 'mouseup', mobile_onTouchend, true);
            window.febs.dom.removeEventListener(event.currentTarget, 'mouseout', mobile_onTouchcancel, true);
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
  } else {
    touch = { clientX: event.clientX, clientY: event.clientY };
  }

  var currentTarget = event.currentTarget;
  if (touch && currentTarget) {
    var target = currentTarget;

    // capture.
    if (typeof target.ontouchstart === 'undefined') {
      if (swipre_current_capture && swipre_current_capture.isSameNode(target)) {
        swipre_current_capture = null;
      }
    }

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
    var current = parseInt(target.getAttribute('data-current') || 0);
    var currentRight = parseInt(targetPage.__swiper_loop ? current + 1 : current);

    var swipeSpan = 0;
    if (targetPage.__swiper_vertical) {
      swipeSpan = Math.abs(targetPage.__swiper_touch - touch.clientY);
    } else {
      swipeSpan = Math.abs(targetPage.__swiper_touch - touch.clientX);
    }

    var swipe = swipeSpan > 80 || Date.now() - targetPage.__swiper_touch_at < 200 && swipeSpan > 30;

    if (targetPage.__swiper_vertical) {
      if (swipe || swipeSpan >= targetPage.__swiper_currentSize / 2) {
        swipeSpan = targetPage.__swiper_touch - touch.clientY;
        if (swipeSpan > 0) {
          var swipeIndex = get_mobile_touchend_right_pos(current, currentRight, swipeSpan, allPage, targetPage.__swiper_vertical, targetPage.__swiper_loop);
          $(target).swiperTo(swipeIndex, true, true, true);
          // $(target).swiperNext(true);
        } else {
          var swipeIndex = get_mobile_touchend_right_pos(current, currentRight, swipeSpan, allPage, targetPage.__swiper_vertical, targetPage.__swiper_loop);
          $(target).swiperTo(swipeIndex, true, true, false);
          // $(target).swiperPre(true);
        }
      } else {
        $(target).swiperTo(current, true, true);
      }
    } else {
      if (swipe || swipeSpan >= targetPage.__swiper_currentSize / 2) {
        swipeSpan = targetPage.__swiper_touch - touch.clientX;
        if (swipeSpan > 0) {
          var swipeIndex = get_mobile_touchend_right_pos(current, currentRight, swipeSpan, allPage, targetPage.__swiper_vertical, targetPage.__swiper_loop);
          $(target).swiperTo(swipeIndex, true, true, true);
          // $(target).swiperNext(true);
        } else {
          var swipeIndex = get_mobile_touchend_right_pos(current, currentRight, swipeSpan, allPage, targetPage.__swiper_vertical, targetPage.__swiper_loop);
          $(target).swiperTo(swipeIndex, true, true, false);
          // $(target).swiperPre(true);
        }
      } else {
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
  dataAutotick = dataAutotick === 0 ? 0 : dataAutotick ? dataAutotick : default_swiper_auto;
  if (dataAutotick > 0 && this.isVisible()) {
    // un visible can't do next.
    setTimeout(swiper_animation.bind(this), dataAutotick);
  } else {
    this.removeClass('febsui-swiper-animate-timer');
  }
}

/**
* @desc: 对元素注册初始化事件.
*/
function swiper_init_event(dom) {

  if (!dom) return;

  var dataAuto = dom.attr('data-auto');
  // var dataLoop = dom.attr('data-loop');

  dataAuto = window.febs.string.isEmpty(dataAuto) ? 0 : parseInt(dataAuto);
  dataAuto = dataAuto === 0 ? 0 : dataAuto ? dataAuto : default_swiper_auto;

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
    var namestart, namemove, nameend, namecancel;
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

      window.febs.dom.removeEventListener(pages, namestart, mobile_onTouchstart);
      window.febs.dom.removeEventListener(pages, namemove, mobile_onTouchmove, true);
      window.febs.dom.removeEventListener(pages, nameend, mobile_onTouchend, true);
      window.febs.dom.removeEventListener(pages, namecancel, mobile_onTouchcancel, true);

      window.febs.dom.addEventListener(pages, namestart, mobile_onTouchstart);
      // window.febs.dom.addEventListener(pages, namemove, mobile_onTouchmove, true);
      // window.febs.dom.addEventListener(pages, nameend, mobile_onTouchend, true);
      // window.febs.dom.addEventListener(pages, namecancel, mobile_onTouchcancel, true);
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

    dataShowDots = window.febs.string.isEmpty(dataShowDots) ? true : 'true' == dataShowDots;
    dataLoop = window.febs.string.isEmpty(dataLoop) ? true : 'true' == dataLoop;

    dom.children('.febsui-swiper-dots').remove();
    var domChildren = dom.children();
    {

      // pages.
      var pages;
      var pagesCount;
      var page1;
      var page0;

      var needDealLoopPage = true;
      var reInit = false;

      if (domChildren.hasClass('febsui-swiper-pages')) {
        pages = $(domChildren[0]);

        var loopPage = pages.children('.febsui-swiper-page-loop');
        loopPage.remove();

        domChildren = pages.children();
        // needDealLoopPage = false;
        needDealLoopPage = true;
        reInit = true;
      } else {
        pages = $("<div class='febsui-swiper-pages'></div>");
      }

      pagesCount = 0;
      page1 = null;
      page0 = null;

      for (var j = 0; j < domChildren.length; j++) {
        var domChildrendom = $(domChildren[j]);
        if (domChildrendom.hasClass('febsui-swiper-page')) {
          // $(domChildren[j]).attr('data-ispage', '1');
          if (!page1) {
            page1 = domChildren[j];
          }
          page0 = domChildren[j];
          var page0Obj = $(page0);

          if (needDealLoopPage && !reInit) {
            pages.append(domChildren[j]);
            domChildrendom.addClass('febsui-invisible');
          }

          pagesCount++;
        }
      }

      if (!needDealLoopPage && dataLoop) {
        pagesCount -= 2;
      }

      // loop.
      if (needDealLoopPage && pagesCount > 1 && dataLoop) {
        pages.prepend($(page0.cloneNode(true)).addClass('febsui-swiper-page-loop'));
        pages.append($(page1.cloneNode(true)).addClass('febsui-swiper-page-loop'));
      }

      if (needDealLoopPage) {
        // dots.
        if (pagesCount == 0) {
          dataActiveIndex = 0;
        } else {
          dataActiveIndex %= pagesCount;
          dataActiveIndex = dataActiveIndex < 0 ? pagesCount + dataActiveIndex : dataActiveIndex;
        }

        if (pagesCount == 1) {
          dataShowDots = false;
        }
        var dots = dataShowDots ? "<div class='febsui-swiper-dots'></div>" : "<div class='febsui-swiper-dots febsui-invisible'></div>";
        dots = $(dots);

        for (var j = 0; j < pagesCount; j++) {
          if (j == dataActiveIndex) {
            dots.append('<span class="febsui-swiper-dot-active"></span>');
          } else {
            dots.append('<span></span>');
          }
        }

        if (dataDotColor) {
          dots.children('span').css('background-color', dataDotColor);
        }

        // 解决小数问题.
        var swiperPageArray = pages.children('.febsui-swiper-page');

        (function () {
          for (var j = 0; j < this.childPages.length; j++) {
            if ($(this.childPages[j]).hasClass('febsui-swiper-page')) {
              var page0Obj = $(this.childPages[j]);
              // 解决小数问题.
              var pageSize;
              pageSize = page0Obj.attr('data-size-height');
              if (!window.febs.string.isEmpty(pageSize)) {
                if (this.childDom[0].clientHeight != 0) {
                  page0Obj.css('height', pageSize);
                }
              } else {
                if (!this.childNeedDealLoopPage) {
                  page0Obj.css('height', this.childDom[0].clientHeight + 'px');
                } else {
                  var pageCssHeight = page0Obj.css('height');
                  if (window.febs.string.isEmpty(pageCssHeight)) {
                    page0Obj.css('height', this.childDom[0].clientHeight + 'px');
                  } else {
                    if (pageCssHeight != '0px' && pageCssHeight != '0') {
                      page0Obj.attr('data-size-height', pageCssHeight);
                    } else {
                      page0Obj.attr('data-size-height', '100%');
                    }
                  }
                }
              }

              pageSize = page0Obj.attr('data-size-width');
              if (!window.febs.string.isEmpty(pageSize)) {
                page0Obj.css('width', pageSize);
              } else {
                if (!this.childNeedDealLoopPage) {
                  if (this.childDom[0].clientWidth != 0) {
                    page0Obj.css('width', this.childDom[0].clientWidth + 'px');
                  }
                } else {
                  var pageCssWidth = page0Obj.css('width');
                  if (window.febs.string.isEmpty(pageCssWidth)) {
                    page0Obj.css('width', this.childDom[0].clientWidth + 'px');
                  } else {
                    if (pageCssWidth != '0px' && pageCssWidth != '0') {
                      page0Obj.attr('data-size-width', pageCssWidth);
                    } else {
                      page0Obj.attr('data-size-width', '100%');
                    }
                  }
                }
              }
            }
          }
        }).bind({ childPages: swiperPageArray, childNeedDealLoopPage: needDealLoopPage, childDom: dom })();

        if (!reInit) dom.html('');
        if (!reInit) {
          dom.append(pages);
        }
        dom.append(dots);
        dom.attr('data-current', 0);

        if (dom.hasClass('febsui-swiper-vertical')) {
          pages[0].__swiper_vertical = true;
          pages.css('touch-action', 'pan-y');
          dom.css('touch-action', 'pan-y');
        } else {
          // dom.css('touch-action', 'pan-x');
        }

        setTimeout(function () {
          this.addClass('febsui-swiper-animation');
        }.bind(pages), 10);

        swiper_init_event(dom);
      } // if.

      // if (dataLoop) {
      dom.swiperTo(dataActiveIndex, false, false);
      // }
      dom.addClass('febsui-swiper-inited');

      // 记录最大的偏移位置.
      setTimeout(function () {
        var maxOffset = 0;
        var pageChildren = this.pages.children('.febsui-swiper-page');
        var pagesLength = this.dataLoop ? pageChildren.length - 1 : pageChildren.length;
        if (this.dom.hasClass('febsui-swiper-vertical')) {
          for (var j = 0; j < pagesLength; j++) {
            maxOffset += pageChildren[j].clientHeight;
          }
          maxOffset -= this.dom[0].clientHeight;
        } else {
          for (var j = 0; j < pagesLength; j++) {
            maxOffset += pageChildren[j].clientWidth;
          }
          maxOffset -= this.dom[0].clientWidth;
        } // if.

        if (maxOffset < 0) {
          maxOffset = 0;
        }

        if (this.dataAlign != 'center') {
          maxOffset += parseInt(this.dataAlign);
        }
        this.dom[0].__swiper_maxOffset = maxOffset;
        this.pages[0].__swiper_maxOffset = maxOffset;

        // if (needDealLoopPage) {
        this.pages[0].__swiper_loop = !!this.dataLoop;

        setTimeout(function () {
          this.dom.swiperTo(this.dataActiveIndex, false);
          this.dom.children('.febsui-swiper-pages').children('.febsui-swiper-page').removeClass('febsui-invisible').addClass('febsui-visible');
        }.bind({ dom: this.dom, dataActiveIndex: this.dataActiveIndex }), 100);
        // }
      }.bind({ dom: dom, pages: pages, dataLoop: dataLoop, dataAlign: dataAlign, dataActiveIndex: dataActiveIndex }), 1);
    }
  } // for.
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */



var crypt = window.febs.crypt;
var err = __webpack_require__(2);
var ajaxSubmit = __webpack_require__(31).ajaxSubmit;

// var responseText = $('iframe')[0].contentDocument.body.textContent;
//     var responseData = JSON.parse(responseText) || {};
//     if (responseData.isSuccess == true || responseData.code == 200) {
//         //success
//     } else {
//         //error   
//     }


/**
 * post方式上传文件 
 * 使用 multipart/form-data 方式, 适合大文件. 速度快.
 * @param cfg:  object, 其中
 *              {
 *                data:       , // 上传到服务器的任意字符串数据.
 *                formObj:    , // 含有enctype="multipart/form-data"的form
 *                fileObj:    , // form中的file对象
 *                uploadUrl:  , // 上传文件内容的url. 系统将自动使用 uploadUrl?crc32=&size=的方式来上传.
 *                maxFileSize:    , // 允许上传的最大文件.0表示无限制.默认为0
 *                fileType:     , // 允许的文件类型.  如: image/gif,image/jpeg,image/x-png
 *                beginCB:     , // 上传开始的回调. function(fieObj, uploader); 调用uploader.abort() 可以停止上传.
 *                finishCB:    , // 上传完成后的回调. function(err, fileObj, serverData)
 *                               //                   err:  - uploadErr.nofile      未选择文件.
 *                               //                         - uploadErr.sizeExceed  文件太大.
 *                               //                         - uploadErr.crc32       计算本地文件hash值时错误.
 *                               //                         - uploadErr.net         ajax上传时出错.
 *                               //                   serverData: 服务器返回的数据.
 *                progressCB:  , // 上传进度的回调. function(fileObj, percent),
 *                headers: {     // 设置request headers
 *                  'customHeader': 'value'
 *                },
 *                crossDomain: true,     // 跨域, 默认为true
 *                withCredentials: true, // 是否附带cookie, 默认为true,
 *                checkoutCrc32: true,   // 是否上传 crc32,size,ajaxmark(防止chrome优化) 三个参数.
 *                timeout,
 *              }
 */

function upload(cfg) {
  var control_upload_cb = cfg.finishCB;
  var control_upload_progress_cb = cfg.progressCB;
  var control_upload_begin_cb = cfg.beginCB;
  var control_upload_url = cfg.uploadUrl;
  var control_upload_maxFileSize = !cfg.maxFileSize ? Infinity : cfg.maxFileSize;

  cfg.fileObj = $(cfg.fileObj);
  cfg.formObj = $(cfg.formObj);

  if (cfg.fileType) {
    cfg.fileObj.attr("accept", cfg.fileType);
  }

  // ie9.
  var uid = 'febsuifile' + febs.crypt.uuid();
  uid = window.febs.string.replace(uid, '-', '');
  var is_IE9 = window.febs.utils.browserIEVer() <= 9;
  if (is_IE9) {
    cfg.formObj.attr('target', uid);
    cfg.formObj.attr('action', control_upload_url);
    cfg.formObj.attr('method', 'post');

    var iframeDom = '<iframe id="' + uid + '" name="' + uid + '" style="display:none;"></iframe>';
    $('body').prepend(iframeDom);

    $('#' + uid).on('load', function () {
      var responseText = $('#' + uid)[0].contentDocument.body.textContent;
      var r;
      try {
        r = JSON.parse(responseText);
      } catch (e) {
        r = {};
      }

      if (r.isSuccess == true || r.code == 200) {
        //success
        if (control_upload_cb) control_upload_cb(null, cfg.fileObj, r);
      } else {
        //error   
        if (control_upload_cb) control_upload_cb(err.net, cfg.fileObj, null);
      }

      cfg.formObj.removeAttr('target');
      cfg.fileObj[0].value = "";
      $('#' + uid).remove();
    });

    if (control_upload_begin_cb) control_upload_begin_cb(cfg.fileObj, { abort: function abort() {
        $('#' + uid).remove();cfg.fileObj[0].value = "";
      } });

    var inputs = cfg.formObj.children('input');
    $(inputs[inputs.length - 1]).click();
  } else {
    var uploadFile = function uploadFile() {
      var urlpath;
      if (this.checkoutCrc32) {
        urlpath = this.control_upload_url + 'crc32=' + this.crc + '&size=' + this.fileObj[0].files[0].size + (this.data ? '&data=' + this.data : '');
      } else {
        urlpath = this.control_upload_url + 'size=' + this.fileObj[0].files[0].size;
      }

      try {
        var ctx = this;
        var con = ajaxSubmit(this.formObj, this.fileObj, {
          timeout: this.timeout,
          method: 'POST',
          url: urlpath,
          progress: function progress(percentComplete) {
            if (ctx.control_upload_progress_cb) ctx.control_upload_progress_cb(ctx.fileObj, percentComplete ? percentComplete.toFixed(1) : 0);
          },
          error: function error() {
            if (ctx.control_upload_cb) ctx.control_upload_cb(err.net, ctx.fileObj, null);ctx.fileObj[0].value = "";
          },
          success: function success(r) {
            try {
              r = JSON.parse(r);
            } catch (e) {
              r = {};
            }

            if (ctx.control_upload_cb) ctx.control_upload_cb(null, ctx.fileObj, r);
            ctx.fileObj[0].value = "";
          },
          crossDomain: this.crossDomain,
          headers: this.headers,
          withCredentials: this.withCredentials
        });
        if (this.control_upload_begin_cb) this.control_upload_begin_cb(this.fileObj, con);
      } catch (e) {
        if (this.control_upload_cb) this.control_upload_cb(e, this.fileObj, null);
        this.fileObj[0].value = "";
      }
    }; // function.

    if (!cfg.fileObj[0].files[0]) {
      if (control_upload_cb) control_upload_cb(err.nofile, cfg.fileObj, null);
      return;
    }
    if (cfg.fileObj[0].files[0].size > control_upload_maxFileSize) {
      if (control_upload_cb) control_upload_cb(err.sizeExceed, cfg.fileObj, null);
      return;
    }

    var urlQueryIndex = control_upload_url.indexOf('?');
    if (urlQueryIndex < 0) {
      control_upload_url += '?';
    } else if (urlQueryIndex < control_upload_url.length - 1) {
      control_upload_url += '&';
    }

    var formObj = cfg.formObj;
    var fileObj = cfg.fileObj;
    var timeout = cfg.timeout;

    if (cfg.checkoutCrc32) {
      crypt.crc32_file(fileObj[0].files[0], function (crc) {
        if (crc) {
          uploadFile.bind(window.febs.utils.mergeMap(this, { crc: crc }))();
        } else {
          if (this.control_upload_cb) this.control_upload_cb(err.crc32, this.fileObj, null);
          this.fileObj[0].value = "";
        }
      }.bind({
        timeout: timeout,
        checkoutCrc32: cfg.checkoutCrc32,
        control_upload_url: control_upload_url,
        fileObj: cfg.fileObj,
        data: cfg.data,
        formObj: cfg.formObj,
        control_upload_progress_cb: control_upload_progress_cb,
        control_upload_cb: control_upload_cb,
        crossDomain: cfg.crossDomain,
        headers: cfg.headers,
        withCredentials: cfg.withCredentials,
        control_upload_begin_cb: control_upload_begin_cb
      }));
    } else {
      uploadFile.bind({
        timeout: timeout,
        checkoutCrc32: cfg.checkoutCrc32,
        control_upload_url: control_upload_url,
        fileObj: cfg.fileObj,
        data: cfg.data,
        formObj: cfg.formObj,
        control_upload_progress_cb: control_upload_progress_cb,
        control_upload_cb: control_upload_cb,
        crossDomain: cfg.crossDomain,
        headers: cfg.headers,
        withCredentials: cfg.withCredentials,
        control_upload_begin_cb: control_upload_begin_cb
      })();
    }
  } // if..else.
}

exports.upload = upload;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.resizeDialog = resizeDialog;

var maskPrevent = __webpack_require__(0).maskPreventEvent;
var dialogs = __webpack_require__(1);

var dialogAnimateDurtion = 300;

/**
* @desc: 屏幕旋转事件.
*/
function resizeDialog() {
  var elem = $('.febsui-dialog-container');

  var viewport = window.febs.dom.getViewPort();
  for (var i = 0; i < elem.length; i++) {
    $(elem[i]).css('margin-top', parseInt((viewport.height - elem[i].clientHeight) / 2) - 30 + 'px');
  }
}

// 是否支持orientationchange事件
// if ('orientation' in window && 'onorientationchange' in window)
// {
//   $(window).on('orientationchange', resizeDialog);
// }
// else {
$(window).off('resize', resizeDialog).on('resize', resizeDialog);
// }

$.fn.isDialog = function () {

  var _this = typeof this.length === 'undefined' ? $(this) : this;

  if (_this.length >= 1) {
    _this = $(_this[0]);

    if (_this.hasClass('febsui-dialog-container')) {
      _this = _this.parent();
    }

    return _this.hasClass('febsui-dialog');
  }

  return false;
};

$.fn.dialogShow = function (cb) {

  var _this = typeof this.length === 'undefined' ? $(this) : this;
  dialogs.dialog_init(_this);

  for (var i = 0; i < _this.length; i++) {
    var ee = $(_this[i]);
    if (ee.hasClass('febsui-dialog-container')) {
      ee = ee.parent();
    }

    if (ee.hasClass('febsui-dialog-init')) {

      var domid = ee.attr('id');
      if (!febs.string.isEmpty(domid)) {
        ee = $('.febsui-dialog[data-id="' + domid + '"]');
        if (!ee[0]) continue;
        ee.removeClass('febsui-invisible');
        ee = ee.parent();
      }

      if (!$('.febsui-mask').hasVisible()) {
        ee.addClass('febsui-mask');
      } else {
        ee.removeClass('febsui-mask');
      }

      // TODO: 临时关闭.
      // maskPrevent(ee);

      ee.removeClass('febsui-invisible').addClass('febsui-visible');
    }
  }

  if (cb) {
    if (_this.length > 0) setTimeout(cb, dialogAnimateDurtion + 1);else cb();
  }

  resizeDialog();
  return this;
};

$.fn.dialogHide = function (cb) {

  var _this = typeof this.length === 'undefined' ? $(this) : this;

  for (var i = 0; i < _this.length; i++) {
    var ee = $(_this[i]);
    if (ee.hasClass('febsui-dialog-container')) {
      ee = ee.parent();
    }
    if (ee.hasClass('febsui-dialog-init')) {

      var domid = ee.attr('id');
      if (!febs.string.isEmpty(domid)) {
        ee = $('.febsui-dialog[data-id="' + domid + '"]');
        if (!ee[0]) continue;
        ee = ee.parent();
      }

      ee.removeClass('febsui-visible').addClass('febsui-invisible');
    }
  }

  if (cb) {
    if (_this.length > 0) setTimeout(cb, dialogAnimateDurtion + 1);else cb();
  }

  return this;
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {


// require('es5-shim');
// require('es5-shim/es5-sham');
// require('console-polyfill');
// require('babel-polyfill');
// require('../third-party/bluebird.min.js');
// require('../third-party/bignumber.min.js');

( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
    // This accentuates the need for the creation of a real `window`.
    
    if (global.document) {
      if (!global['febs']) {
        throw new Error('febsui requires `febs` or `febs-browser` library; Please require `febs`/`febs-browser` before febsui');
      }
    }
    
    module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "febsui requires a window with a document" );
        }
        if (!w['febs']) {
          throw new Error('febsui requires `febs` or `febs-browser` library; Please require `febs`/`febs-browser` before febsui');
        }
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {


/**
 * jquery plugins.
 */
__webpack_require__(25);
__webpack_require__(24);

var febsui = __webpack_require__(14);

febsui.preventEvent = __webpack_require__(0).maskPreventEvent;

window['febsui'] = febsui;


/**
 * jquery plugins.
 */
__webpack_require__(23);

__webpack_require__(21);
__webpack_require__(22);
__webpack_require__(8);
__webpack_require__(26);
__webpack_require__(29);
__webpack_require__(28);
__webpack_require__(30);
__webpack_require__(27);

return febsui;
}
);

/***/ }),
/* 10 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {


// require('es5-shim');
// require('es5-shim/es5-sham');
// require('console-polyfill');
// require('babel-polyfill');
// require('../third-party/bluebird.min.js');
// require('../third-party/bignumber.min.js');

__webpack_require__(10);
__webpack_require__(9);


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var touchEventPrevent = __webpack_require__(0).mobile_preventTouchEvent;

exports.button_init = button_init;
exports.button_init_event = button_init_event;

/**
* @desc: 对元素注册初始化事件.
*/
function button_init_event(dom) {
  touchEventPrevent(dom);
}

/**
* @desc: 初始化botton控件. 防止mobile端事件穿透.
*/
function button_init() {
  var elems = $('button');
  for (var i = 0; i < elems.length; i++) {
    var dom = $(elems[i]);
    if (!dom.hasClass('febsui-button-inited')) {
      dom.addClass('febsui-button-inited');
      dom = dom[0];

      button_init_event(dom);
    }
  } // for.
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var domHelper = __webpack_require__(0);
var touchEventPrevent = __webpack_require__(0).mobile_preventTouchEvent;

exports.checkbox_init = checkbox_init;
exports.checkbox_init_event = checkbox_init_event;

/**
* @desc: 对元素注册初始化事件.
*/
function checkbox_init_event(dom) {
  if (!dom) return;

  // 阻止事件传递.
  window.febs.dom.addEventListener(dom[0], 'click', function (env) {
    if (env) {
      env.stopPropagation();
      env.cancelBubble = true;
      return false;
    }
  });

  touchEventPrevent(dom[0]);

  // ie. for checked.
  if (window.febs.utils.browserIsIE()) {
    var mark = $(dom.children('.febsui-checkbox-mark')[0]);
    mark.click(function (env) {
      var ee = $(env.target);
      ee = ee.prev('input');
      if (ee[0]) {
        ee[0].checked = !ee[0].checked;
        ee.trigger('change');
      }
      if (env) {
        env.stopPropagation();
        env.cancelBubble = true;
      }
    });
  } // if.
}

/**
* @desc: 初始化checkbox控件.
*        对页面上 的所有 <input type="checkbox" class="febsui-checkbox"> 元素进行初始化.
*/
function checkbox_init(elem) {
  var elems = elem ? elem : $('.febsui-checkbox');
  for (var i = 0; i < elems.length; i++) {
    var dom = $(elems[i]);

    if (!dom.hasClass('febsui-checkbox')) {
      continue;
    }

    if (!dom.hasClass('febsui-checkbox-inited')) {

      dom.removeClass('febsui-checkbox');

      var dd = $("<div class='febsui-checkbox febsui-checkbox-inited '></div>");

      // copy attri.
      domHelper.copyAttrs(dom, dd, function (name) {
        if ('style' == name) return true;
        return false;
      });

      // copy class.
      domHelper.copyClass(dom, dd);

      dd.insertBefore(dom);
      dd.append(dom);
      dd.append('<div class="febsui-checkbox-mark"></div>');

      // ie. for checked.
      if (window.febs.utils.browserIEVer() <= 9) {
        dom.css('display', 'none');
      } // if.

      checkbox_init_event(dd);
    }
  } // for.
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// import { $ } from 'febs-browser';

// require('febs-browser');

if (!$) {
  throw new Error('must import febs first');
}

var loading = __webpack_require__(4);
exports.loading_isVisiable = loading.loading_isVisiable;
exports.loading_show = loading.loading_show;
exports.loading_show_text = loading.loading_show_text;
exports.loading_hide = loading.loading_hide;

exports.page_init = __webpack_require__(15).page_init;
exports.uploadBase64 = __webpack_require__(19).uploadBase64;
exports.upload = __webpack_require__(7).upload;
exports.uploadErr = __webpack_require__(2);

var toast = __webpack_require__(18);
exports.toast = toast.showToast;
exports.toast_hide = toast.hideToast;

var dialog = __webpack_require__(1);
exports.dialog_hide = dialog.hide;
exports.dialog_showAlert = dialog.showAlert;
exports.dialog_showConfirm = dialog.showConfirm;
exports.dialog_showConfirmEdit = dialog.showConfirmEdit;

var switcha = __webpack_require__(17);
exports.ui_switch_init = switcha.switch_init;
exports.ui_switch_init_event = switcha.switch_init_event;

var popovera = __webpack_require__(5);
exports.ui_popover_init = popovera.popover_init;

var dialoga = __webpack_require__(1);
exports.ui_dialog_init = dialoga.dialog_init;

var actionsheeta = __webpack_require__(3);
exports.ui_actionsheet_init = actionsheeta.actionsheet_init;

var uploadera = __webpack_require__(20);
exports.ui_uploader_init = uploadera.uploader_init;

var checkboxa = __webpack_require__(13);
exports.ui_checkbox_init = checkboxa.checkbox_init;
exports.ui_checkbox_init_event = checkboxa.checkbox_init_event;

var radioa = __webpack_require__(16);
exports.ui_radio_init = radioa.radio_init;
exports.ui_radio_init_event = radioa.radio_init_event;

var loadinga = __webpack_require__(4);
exports.ui_spin_init = loadinga.spin_init;

var buttona = __webpack_require__(12);
exports.ui_button_init = buttona.button_init;
exports.ui_button_init_event = buttona.button_init_event;

var swipera = __webpack_require__(6);
exports.ui_swiper_init = swipera.swiper_init;
exports.ui_swiper_init_event = swipera.swiper_init_event;

/**
* @desc: 初始化所有ui
* @return: 
*/
exports.ui_init = function () {
  swipera.swiper_init();
  switcha.switch_init();
  popovera.popover_init();
  dialoga.dialog_init();
  actionsheeta.actionsheet_init();
  uploadera.uploader_init();
  checkboxa.checkbox_init();
  radioa.radio_init();
  loadinga.spin_init();
  buttona.button_init();
};

// for mobile active.
$(document).on('touchstart', function () {});

$(document).ready(function () {
  // init.
  exports.ui_init();
});

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */
var touchEventPrevent = __webpack_require__(0).mobile_preventTouchEvent;

'use strict';

window['febscontrolspage_map'] = {};

/**
* @desc: 初始化page控件.
* @param elem: 将控件插入到elem中, elem是一个jquery的对象.
* @param curPage: 当前页
* @param pageCount: 总页数
* @param totalCount: 总条数
* @param pageCallback: 页面跳转函数, function(page) {}
* @return: 
*/
function page_init(elem, curPage, pageCount, totalCount, pageCallback) {

  elem = $(elem);

  var foo = 'page' + febs.crypt.uuid();
  window['febscontrolspage_map'][foo] = pageCallback;
  foo = 'javascript:window[\'febscontrolspage_map\'][\'' + foo + '\']';

  var pagePre = '';
  if (curPage > 0) {
    var stp = Math.min(curPage, 5);
    for (var i = 1; i < 5 && curPage > i; i++) {
      pagePre += '<li class="febsui-paginItem"><a href="' + foo + '(' + (i + curPage - stp) + ')">' + (i + curPage - stp) + '</a></li>';
    }
  }

  var pageNext = '';
  if (pageCount > curPage) {
    var pages = febs.utils.browserIsPhone() ? 2 : 5;
    var i = 1 + curPage;
    for (; i < pages + curPage && i <= pageCount; i++) {
      pageNext += '<li class="febsui-paginItem"><a href="' + foo + '(' + i + ')">' + i + '</a></li>';
    }
    if (i < pageCount) {
      pageNext += '<li class="febsui-paginItem"><a href="' + foo + '(' + i + ')">...</a></li>';
    }
  }

  var urlPrePage = curPage > 1 ? foo + '(' + (curPage - 1) + ')' : 'javascript:;';
  var urlPrePageClass = curPage > 1 ? 'febsui-pagepre febsui-icon-arrow-left' : 'febsui-pagepre febsui-icon-arrow-left-gray';
  var urlNextPage = curPage < pageCount ? foo + '(' + (curPage + 1) + ')' : 'javascript:;';
  var urlNextPageClass = curPage < pageCount ? 'febsui-pagenxt febsui-icon-arrow-right' : 'febsui-pagenxt febsui-icon-arrow-right-gray';

  var e = elem.children('.febsui-pagin');
  if (e && e.length > 0) {
    $(e[0]).remove();
  }

  elem.append('<div class="febsui-pagin">\
  <div class="febsui-paginMessage">\
    共<i class="blue">' + totalCount + '</i>条记录，当前显示第&nbsp;<i class="blue">' + curPage + '&nbsp;</i>页\
  </div>\
  <ul class="febsui-paginList">\
    <li class="febsui-paginItem">\
      <a href="' + urlPrePage + '">\
        <span style="display: block" class="' + urlPrePageClass + '"></span>\
      </a>\
    </li>' + pagePre + '<li class="febsui-paginItem febsui-pagin-current">\
      <a href="javascript:;">' + curPage + '</a>\
    </li>' + pageNext + '<li class="febsui-paginItem">\
      <a href="' + urlNextPage + '">\
        <span style="display: block" class="' + urlNextPageClass + '"></span>\
      </a>\
    </li>\
  </ul>\
</div>');

  touchEventPrevent(elem[0]);
}

exports.page_init = page_init;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var domHelper = __webpack_require__(0);
var touchEventPrevent = __webpack_require__(0).mobile_preventTouchEvent;

exports.radio_init = radio_init;
exports.radio_init_event = radio_init_event;

/**
* @desc: 对元素注册初始化事件.
*/
function radio_init_event(dom) {
  if (!dom) return;

  // 阻止事件传递.
  window.febs.dom.addEventListener(dom[0], 'click', function (env) {
    if (env) {
      env.stopPropagation();
      env.cancelBubble = true;
      return false;
    }
  });

  touchEventPrevent(dom[0]);

  // ie. for checked.
  if (window.febs.utils.browserIsIE()) {
    var mark = $(dom.children('.febsui-radio-mark')[0]);
    mark.click(function (env) {
      var ee = $(env.target);
      ee = ee.prev('input');
      if (ee[0]) {
        ee[0].checked = !ee[0].checked;
        ee.trigger('change');
      }

      if (env) {
        env.stopPropagation();
        env.cancelBubble = true;
      }
    });
  } // if.
}

/**
* @desc: 初始化radio控件.
*        对页面上 的所有 <input type="radio" class="febsui-radio"> 元素进行初始化.
*/
function radio_init(elem) {
  var elems = elem ? elem : $('.febsui-radio');
  for (var i = 0; i < elems.length; i++) {
    var dom = $(elems[i]);

    if (!dom.hasClass('febsui-radio')) {
      continue;
    }

    if (!dom.hasClass('febsui-radio-inited')) {

      dom.removeClass('febsui-radio');

      var dd = $("<div class='febsui-radio febsui-radio-inited'></div>");

      // copy attri.
      domHelper.copyAttrs(dom, dd, function (name) {
        if ('style' == name) return true;
        return false;
      });

      // copy class.
      domHelper.copyClass(dom, dd);

      dd.insertBefore(dom);
      dd.append(dom);
      dd.append('<div class="febsui-radio-mark"></div>');

      // ie. for checked.
      if (window.febs.utils.browserIEVer() <= 9) {
        dom.css('display', 'none');
      } // if.

      radio_init_event(dd);
    }
  } // for.
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var touchEventPrevent = __webpack_require__(0).mobile_preventTouchEvent;

exports.switch_init = switch_init;
exports.switch_init_event = switch_init_event;

/**
* @desc: 对switch元素注册初始化事件.
*/
function switch_init_event(dom) {
  if (!dom) return;

  window.febs.dom.addEventListener(dom[0], 'click', function (event) {
    var ee = $(this);
    if (ee.hasClass("febsui-switch-disabled")) {
      return;
    }
    if (!ee.hasClass("febsui-switch-off")) {
      ee.removeClass("febsui-switch-on").addClass("febsui-switch-off");
    } else {
      ee.removeClass("febsui-switch-off").addClass("febsui-switch-on");
    }

    ee['switch']();

    if (event) {
      event.stopPropagation();
      event.cancelBubble = true;
      return false;
    }
  });

  touchEventPrevent(dom[0]);
}

/**
* @desc: 初始化switch控件.
*        对页面上 class 为 febsui-switch-on 以及 febsui-switch-off 的所有元素初始化为switch控件.
*/
function switch_init(elem) {
  var elems = elem ? elem : $('.febsui-switch');
  // elems.append("<span class='febsui-switch-slider'></span>");
  for (var i = 0; i < elems.length; i++) {
    var dom = $(elems[i]);

    if (!dom.hasClass('febsui-switch')) {
      continue;
    }

    if (!dom.children().hasClass('febsui-switch-slider')) {
      dom.append("<span class='febsui-switch-slider'></span>");

      switch_init_event(dom);
    }
  } // for.
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var toastHideTimer;

exports.showToast = showToast;
exports.hideToast = hideToast;

function escape_string(ctx) {
  // 转义.
  if (ctx.title) {
    ctx.title = window.febs.string.escapeHtml(ctx.title);
  }
  if (ctx.content) {
    ctx.content = window.febs.string.escapeHtml(ctx.content);
  }
  if (ctx.msg) {
    ctx.msg = window.febs.string.escapeHtml(ctx.msg);
  }
  if (ctx.editText) {
    ctx.editText = window.febs.string.escapeHtml(ctx.editText);
  }
  if (ctx.okText) {
    ctx.okText = window.febs.string.escapeHtml(ctx.okText);
  }
  if (ctx.cancelText) {
    ctx.cancelText = window.febs.string.escapeHtml(ctx.cancelText);
  }
}

/**
 * ctx.content
 * ctx.durable
 * ctx.icon  // "ok" "warn" "error" 默认null, 没有图标
 * ctx.callback  function(){}	// 对话框消失后的回调.
 * ctx.center: 默认为false; 是否使用居中的显示方式.
 */
function showToast(ctx) {

  if ((typeof ctx === 'undefined' ? 'undefined' : _typeof(ctx)) !== 'object') {
    ctx = { content: ctx && ctx.toString() };
  }

  escape_string(ctx);

  ctx.center = !!ctx.center;

  ctx.msg = ctx.content;

  if ($('.febsui-toast').length > 0) {
    $('.febsui-toast').remove();
  }

  var html = '<div class="febsui-toast' + (ctx.center ? ' febsui-toast-center' : '') + '" style="display:none" role="alert"><div class="febsui-toast-container">';
  if (null != ctx.icon) {
    html += "<div class='febsui-icon febsui-icon-" + ctx.icon + "'></div>";

    if (ctx.center) {
      html += '<div class="febsui-dialog-msg">' + ctx.msg + '</div></div></div>';
    } else {
      html += '<div class="febsui-dialog-msg" style="padding-left:30px;">' + ctx.msg + '</div></div></div>';
    }
  } else {
    html += '<div class="febsui-dialog-msg">' + ctx.msg + '</div></div></div>';
  }
  $("body").append($(html));

  if (typeof $(".febsui-toast").fadeIn !== 'function') {
    // console.log('febs-ui controls need function fadeIn/fadeOut');
    $(".febsui-toast").css("display", "inherit");
    $(".febsui-toast").removeClass('febsui-invisible').addClass('febsui-visible');
  } else {
    $(".febsui-toast").fadeIn(200);
  }

  var t = 3000;
  if (parseInt(ctx.durable) > 0) {
    t = parseInt(ctx.durable);
  }
  if (t > 0) {
    if (toastHideTimer) {
      clearTimeout(toastHideTimer);
    }

    toastHideTimer = setTimeout(function () {
      toastHideTimer = null;
      hideToast(ctx.callback);
    }, t);
  }
}

function hideToast(cb) {
  if (typeof $(".febsui-toast").fadeOut !== 'function') {
    // console.log('febs-ui controls need function fadeIn/fadeOut');
    // $("#febsui-dialog-cd-toast").css("display", "none");
    $(".febsui-toast").removeClass('febsui-visible').addClass('febsui-invisible');
  } else {
    $(".febsui-toast").fadeOut(200);
  }

  if (null != cb) {
    cb();
  }

  if (toastHideTimer) {
    clearTimeout(toastHideTimer);
    toastHideTimer = null;
  }
}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */



var net = window.febs.net;
var utils = window.febs.utils;
var crypt = window.febs.crypt;
var err = __webpack_require__(2);

/**
 * post方式上传文件.
 * 使用文件流片段的方式. 每个片段进行验证.速度稍慢
 * @param cfg:  object, 其中
 *              {
 *                data:       , // 上传到服务器的任意字符串数据,将在发送请求时发送.
 *                fileBase64Str:  , // 文件的base64格式字符串
 *                headerUrl:  , // 上传开始前的header请求地址.
 *                uploadUrl:  , // 上传文件内容的url.
 *                timeout:   5000, // 网络超时.
 *                chunkSize:  1024*20,  // 每次上传的块大小.默认20kb
 *                beginCB:     , // 上传开始的回调. function(uploader); 调用uploader.abort() 可以停止上传.
 *                finishCB:    , // 上传完成后的回调. function(err, serverData)
 *                               //                   err:  - uploadErr.nofile      未选择文件.
 *                               //                         - uploadErr.sizeExceed  文件太大.
 *                               //                         - uploadErr.crc32       计算本地文件hash值时错误.
 *                               //                         - uploadErr.net         ajax上传时出错.
 *                               //                   serverData: 服务器返回的数据. 至少包含一个filename
 *                progressCB:  , // 上传进度的回调. function(percent),
 *                headers: {     // 设置request headers
 *                  'customHeader': 'value'
 *                },
 *                crossDomain: true,     // 跨域, 默认为true
 *                withCredentials: true, // 是否附带cookie, 默认为true
 *              }
 */
exports.uploadBase64 = function uploadBase64(cfg) {
  cfg.timeout = cfg.timeout || 5000;
  var control_uploadSeg_cb = cfg.finishCB;
  var control_uploadSeg_progress_cb = cfg.progressCB;
  var control_uploadSeg_begin_cb = cfg.beginCB;
  var control_uploadSeg_header_url = cfg.headerUrl;
  var control_uploadSeg_url = cfg.uploadUrl;
  var control_uploadSeg_chunkSize = cfg.chunkSize || 1024 * 20;

  if (!cfg.fileBase64Str) {
    if (control_uploadSeg_cb) control_uploadSeg_cb(err.nofile, null);
    return;
  }

  var urlQueryIndex = control_uploadSeg_url.indexOf('?');
  if (urlQueryIndex < 0) {
    control_uploadSeg_url += '?';
  } else if (urlQueryIndex < control_uploadSeg_url.length - 1) {
    control_uploadSeg_url += '&';
  }
  control_uploadSeg_url += 'crc32=';

  var stop = false;
  function abort() {
    stop = true;
  }
  if (control_uploadSeg_begin_cb) control_uploadSeg_begin_cb({ abort: abort });

  if (control_uploadSeg_progress_cb) control_uploadSeg_progress_cb(0.0);

  var control_uploadSeg_file = cfg.fileBase64Str;

  var control_uploadSeg_chunks = Math.ceil(control_uploadSeg_file.length / control_uploadSeg_chunkSize);
  var control_uploadSeg_currentChunk = 0;

  // console.log({filesize:control_uploadSeg_file.length, chunks:control_uploadSeg_chunks, data:cfg.data});


  // 上传文件头.
  net.fetch(control_uploadSeg_header_url, {
    method: 'post',
    mode: cfg.crossDomain ? 'cors' : null,
    headers: utils.mergeMap(cfg.headers, {
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({ filesize: control_uploadSeg_file.length, chunks: control_uploadSeg_chunks, data: cfg.data }),
    timeout: cfg.timeout,
    credentials: cfg.withCredentials ? 'include' : null
  }).then(function (response) {
    return response.json();
  }).then(function (r) {
    if (r && r.err == 0) {
      var control_uploadSegs_begin = function control_uploadSegs_begin() {
        var control_uploadSeg_data = control_uploadSeg_file.substr(control_uploadSeg_currentChunk * control_uploadSeg_chunkSize, control_uploadSeg_currentChunk * control_uploadSeg_chunkSize + control_uploadSeg_chunkSize > control_uploadSeg_file.length ? control_uploadSeg_file.length - control_uploadSeg_currentChunk * control_uploadSeg_chunkSize : control_uploadSeg_chunkSize);

        var control_uploadSeg_crc = crypt.crc32(control_uploadSeg_data);

        if (control_uploadSeg_progress_cb) control_uploadSeg_progress_cb(control_uploadSeg_currentChunk / control_uploadSeg_chunks);

        // 上传数据.
        net.fetch(control_uploadSeg_url + control_uploadSeg_crc, {
          method: 'post',
          mode: cfg.crossDomain ? 'cors' : null,
          headers: utils.mergeMap(cfg.headers, {
            'Content-Type': 'application/octet-stream'
          }),
          body: control_uploadSeg_data,
          timeout: cfg.timeout,
          credentials: cfg.withCredentials ? 'include' : null
        }).then(function (response) {
          return response.json();
        }).then(function (r) {
          if (r && r.err == 0) {
            if (stop) {
              return;
            }

            if (++control_uploadSeg_currentChunk == control_uploadSeg_chunks) {
              if (control_uploadSeg_cb) control_uploadSeg_cb(null, r);
            } else {
              control_uploadSeg_errorCount = 0;
              control_uploadSegs_begin();
            }
          } else {
            if (control_uploadSeg_cb) control_uploadSeg_cb(err.net, r);
          }
        })['catch'](function (err) {
          if (err == 'timeout') {
            if (control_uploadSeg_errorCount++ < 10) {
              if (stop) {
                return;
              }
              control_uploadSegs_begin();
            } else {
              if (control_uploadSeg_cb) control_uploadSeg_cb(err.net, null);
            }
          } else if (control_uploadSeg_cb) control_uploadSeg_cb(err, null);
        });
      };

      if (stop) {
        return;
      }

      var control_uploadSeg_errorCount = 0;

      control_uploadSegs_begin();
    } else {
      if (control_uploadSeg_cb) control_uploadSeg_cb(err.net, r);
    }
  })['catch'](function (err) {
    if (err == 'timeout') {
      if (control_uploadSeg_cb) control_uploadSeg_cb(err.net, null);
    } else {
      if (control_uploadSeg_cb) control_uploadSeg_cb(err, null);
    }
  });
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


{/* <div class="febsui-uploader">
   <button onclick='$("#fileObj")[0].click()'>上传图片</button>
   <form id="fileForm" method="post" role="form" enctype="multipart/form-data" style="display:none">
     <input id="fileObj" type="file" name="file" onchange="javascript:SetupWebUploader('/api/users/upload_image', $('#fileForm'), $('#fileObj'))" multiple>
   </form>
   <div class="febsui-uploader-progress">
     <div class="febsui-uploader-progress-bg"></div>
     <span>10%</span>
     <div class="febsui-uploader-progress-cancel"><div class="febsui-icon febsui-icon-error"></div></div>
   </div>
  </div> */}
var touchEventPrevent = __webpack_require__(0).mobile_preventTouchEvent;
var escape_string = __webpack_require__(32).escape_string;

var upload = __webpack_require__(7);
var uploadErr = __webpack_require__(2);
var dialog = __webpack_require__(1);

// ie9.
var is_IE9 = window.febs.utils.browserIEVer() <= 9;

exports.uploader_init = uploader_init;

window['_Feb_fegegRRdefaultUploaderError'] = function (err) {
  if (febsui.uploadErr.nofile == err) {
    err = '未选择文件';
  } else if (febsui.uploadErr.sizeExceed == err) {
    err = '文件超出大小';
  } else if (febsui.uploadErr.crc32 == err) {
    err = '文件验证出错';
  } else if (febsui.uploadErr.net == err) {
    err = '网络错误';
  } else {
    err = '上传错误';
  }
  dialog.showAlert(err.toString());
};

/**
* @desc: 初始化uploader控件.
* @return: 
*/
function uploader_init(elem) {
  var elems = elem ? elem : $('.febsui-uploader');
  for (var i = 0; i < elems.length; i++) {
    var dom = $(elems[i]);

    if (!dom.hasClass('febsui-uploader')) {
      continue;
    }

    if (!dom.hasClass('febsui-uploader-init')) {
      dom.addClass('febsui-uploader-init');

      var dataAccept = dom.attr('data-accept');
      var dataFilename = dom.attr('data-filename');
      var dataApi = dom.attr('data-api');
      var dataMultiple = dom.attr('data-multiple');
      dataMultiple = dataMultiple == 'false' ? ' ' : ' multiple="multiple" ';

      if (window.febs.string.isEmpty(dataApi)) {
        throw new Error("uploader need attribute: data-api");
      }

      var uid = 'febsui-uploader-' + febs.crypt.uuid();

      var html = dom.html();
      dom.html('');

      var submitHtml = '';
      if (is_IE9) {
        submitHtml = '<input type="submit" value="submit">';
      }

      var htmlForm = '<form id="' + uid + '-form" method="post" role="form" enctype="multipart/form-data" style="display:none">\n  <input id="' + uid + '" type="file" name="file"' + dataMultiple + (dataAccept ? ' accept="' + dataAccept + '"' : '') + '>\n  ' + submitHtml + '\n</form>';
      dom.append($(htmlForm));

      var html = '<label id="' + uid + '-label" for="' + uid + '" data-for="' + uid + '"><div class="btn">' + html + '</div>';

      var htmlFilename = dataFilename === 'true' ? '<span id="' + uid + '-filename" class="febsui-uploader-filename febsui-ellipsis"></span>' : '';

      var htmlPro = '<div id="' + uid + '-progress" class="febsui-uploader-progress" style="display:none;">\n  ' + htmlFilename + '<div class="febsui-uploader-progress-bg" style="width:0%;"></div>\n  <span' + (dataFilename === 'true' ? ' class="febsui-uploader-right"' : '') + '>10%</span>\n</div>\n</label>\n<div class="febsui-uploader-progress-cancel"></div>\n';
      html += htmlPro;

      //       var htmlPro = 
      // `<div id="${uid}-progress" class="febsui-uploader-progress" style="display:none;">
      //   <div class="febsui-uploader-progress-bg" style="width:0%;"></div>
      //   ${htmlFilename}<span${dataFilename==='true'?' class="febsui-uploader-right"':''}>10%</span>
      //   <div class="febsui-uploader-progress-cancel"><div class="febsui-icon febsui-icon-error"></div></div>
      // </div>
      // `;
      dom.append(html);
      touchEventPrevent(dom[0]);

      //
      // event.
      //
      $('#' + uid).change(function (env) {

        var uploader = $(this).parent().parent('.febsui-uploader');

        var _uid = $(this).attr('id');

        if (window.febs.string.isEmpty(this.value) || $('#' + _uid)[0].files && $('#' + _uid)[0].files.length <= 0) {
          return;
        }

        window['febsui-uploader-controller-' + _uid] = uploader;

        var label = $('#' + _uid + '-label');
        var cancel = $(uploader.children('.febsui-uploader-progress-cancel')[0]);

        var progress = $('#' + _uid + '-progress');
        var progressBg = $(progress.children('.febsui-uploader-progress-bg')[0]);
        var progressSpan = progress.children('span');
        progressSpan = $(progressSpan[progressSpan.length - 1]);

        label.attr('style', 'right:35px !important;');
        var labelFor = label.attr('for');
        label.removeAttr('for');

        var uploadHtml = $(label.children('div')[0]);
        uploadHtml.css('display', 'none');
        progress.css('display', 'inline-block');
        progressBg.css('width', '0%');
        progressSpan.html('0%');

        var uploader = $(this).parent().parent('.febsui-uploader');

        var _dataApi = uploader.attr('data-api');
        var _dataMaxSize = uploader.attr('data-maxsize');
        var _dataBegin = uploader.attr('data-begin');
        var _dataFinish = uploader.attr('data-finish');
        var _dataError = uploader.attr('data-error');
        var _dataProgress = uploader.attr('data-progress');
        var _dataTimeout = parseInt(uploader.attr('data-timeout')) || 5000;

        // if ($('#'+_uid)[0].files) {

        var cancelControl;

        // trim.
        if (_dataFinish) {
          _dataFinish = _dataFinish.replace(/(^\s*)|(\s*$)/g, "");
        }
        if (_dataError) {
          _dataError = _dataError.replace(/(^\s*)|(\s*$)/g, "");
        } else {
          _dataError = '_Feb_fegegRRdefaultUploaderError';
        }
        if (_dataProgress) {
          _dataProgress = _dataProgress.replace(/(^\s*)|(\s*$)/g, "");
        }
        if (_dataBegin) {
          _dataBegin = _dataBegin.replace(/(^\s*)|(\s*$)/g, "");
        }

        _dataMaxSize = _dataMaxSize ? parseInt(_dataMaxSize) : 0;

        // 取消.
        cancel.attr('style', 'display:inline !important;');
        cancel.one('click', function () {
          var __uploader = $(this).parent('.febsui-uploader');
          __uploader.uploaderReset();
          _dataError = null;
          if (cancelControl) cancelControl.abort();
          cancelControl = null;
          delete window["febsui-uploader-controller-" + _uid];
        });

        // 上传.
        upload.upload({
          formObj: $('#' + _uid + '-form'),
          fileObj: $('#' + _uid),
          uploadUrl: _dataApi,
          maxFileSize: _dataMaxSize,
          timeout: _dataTimeout,
          beginCB: function beginCB(fileObj, uploader) {
            cancelControl = uploader;

            var uid = fileObj.attr('id');

            var filename = '';

            if (is_IE9) {
              var indexsp = fileObj[0].value.lastIndexOf('\\');
              if (indexsp > 0) {
                indexsp = fileObj[0].value.substr(indexsp + 1);
              } else {
                indexsp = fileObj[0].value.lastIndexOf('/');
                if (indexsp < 0) {
                  console.log('can\'t find filename');indexsp = '';
                } else indexsp = fileObj[0].value.substr(indexsp + 1);
              }

              filename = indexsp;
              filename = escape_string(filename);
              $('#' + _uid + '-filename').html(filename);
            } else {
              filename = $('#' + _uid)[0].files[0].name;
              filename = escape_string(filename);
              $('#' + _uid + '-filename').html(filename);
            }
            filename = window.febs.string.replace(filename, '"', '\"');

            if (_dataBegin) {
              var i = 0;
              for (; i < _dataBegin.length; i++) {
                if (!(_dataBegin[i] >= 'a' && _dataBegin[i] <= 'z' || _dataBegin[i] >= 'A' && _dataBegin[i] <= 'Z' || _dataBegin[i] == '_')) {
                  break;
                }
              }
              if (i >= _dataBegin.length) {
                var controlId = 'febsui-cancel-' + febs.crypt.uuid();

                eval(_dataBegin + ('(window["febsui-uploader-controller-' + uid + '"], "' + filename + '")'));
              } else {
                eval(_dataBegin);
              }
            }

            if (window["febsui-uploader-controller-" + uid]) {
              window["febsui-uploader-controller-" + uid].trigger('uploadBegin', { filename: filename });
            }
          },
          finishCB: function finishCB(err, fileObj, serverData) {
            if (err) {

              cancel.removeAttr('style');
              label.removeAttr('style');
              label.attr('for', label.attr('data-for'));
              uploadHtml.css('display', 'inline-block');
              progress.css('display', 'none');

              if (err != uploadErr.nofile && err != uploadErr.sizeExceed && err != uploadErr.crc32 && err != uploadErr.net) {
                console.log(err);
              }

              var uid = fileObj.attr('id');

              if (_dataError) {
                var i = 0;
                for (; i < _dataError.length; i++) {
                  if (!(_dataError[i] >= 'a' && _dataError[i] <= 'z' || _dataError[i] >= 'A' && _dataError[i] <= 'Z' || _dataError[i] == '_')) {
                    break;
                  }
                }

                if (i >= _dataError.length) {
                  err = err.toString();
                  err = window.febs.string.replace(err, '"', '\"');
                  eval(_dataError + ('(window["febsui-uploader-controller-' + uid + '"], "') + err + '")');
                } else {
                  eval(_dataError);
                }
              }

              if (window["febsui-uploader-controller-" + uid]) {
                window["febsui-uploader-controller-" + uid].trigger('uploadError', { err: err });
                delete window["febsui-uploader-controller-" + uid];
              }
              // reset.
              cancel.trigger('click');
              cancel.off('click');
            }
            // 上传成功.
            else {
                cancelControl = null;
                var percent = "100%";
                progressBg.css('width', percent);
                progressSpan.html(percent);

                cancel.removeAttr('style');
                label.removeAttr('style');
                label.attr('for', label.attr('data-for'));

                var uid = fileObj.attr('id');

                if (_dataFinish) {
                  var i = 0;
                  for (; i < _dataFinish.length; i++) {
                    if (!(_dataFinish[i] >= 'a' && _dataFinish[i] <= 'z' || _dataFinish[i] >= 'A' && _dataFinish[i] <= 'Z' || _dataFinish[i] == '_')) {
                      break;
                    }
                  }

                  if (i >= _dataFinish.length) {

                    var finishData = 'febsui-finish-' + febs.crypt.uuid();
                    window[finishData] = serverData;

                    eval(_dataFinish + ('(window["febsui-uploader-controller-' + uid + '"], window["' + finishData + '"])'));
                    delete window[finishData];
                  } else {
                    eval(_dataFinish);
                  }
                }

                window["febsui-uploader-controller-" + uid].trigger('uploadFinish', { responseData: serverData });
                delete window["febsui-uploader-controller-" + uid];
              }

            fileObj[0].value = "";
          },
          progressCB: function progressCB(fileObj, percent) {
            var pp = percent;
            percent = percent * 100 + "%";
            progressBg.css('width', percent);
            progressSpan.html(percent);

            var uid = fileObj.attr('id');

            if (_dataProgress) {
              var i = 0;
              for (; i < _dataProgress.length; i++) {
                if (!(_dataProgress[i] >= 'a' && _dataProgress[i] <= 'z' || _dataProgress[i] >= 'A' && _dataProgress[i] <= 'Z' || _dataProgress[i] == '_')) {
                  break;
                }
              }

              if (i >= _dataProgress.length) {
                eval(_dataProgress + ('(window["febsui-uploader-controller-' + uid + '"], parseFloat(' + pp + '))'));
              } else {
                eval(_dataProgress);
              }
            }

            if (window["febsui-uploader-controller-" + uid]) {
              window["febsui-uploader-controller-" + uid].trigger('uploadProgress', { progress: parseFloat(pp) });
            }
          }
        });
        // } // if.
      });
    }
  } // for.
}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var maskPrevent = __webpack_require__(0).maskPreventEvent;
var actionsheet = __webpack_require__(3);

// function resizeActionsheet() {
//   var ee = $('actionsheet');
//   for (var i = 0; i < ee.length; i++) {
//     var e = $(ee[i]);

//     e.css('margin-top', parseInt((document.body.clientHeight - e[0].clientHeight) - 5) + 'px');
//   }
// }

// 是否支持orientationchange事件
// if ('orientation' in window && 'onorientationchange' in window)
// {
//   $(window).on('orientationchange', resizeActionsheet);
// }
// else {
//   $(window).off('resize', resizeActionsheet).on('resize', resizeActionsheet);
// }

$.fn.isActionsheet = function () {

  var _this = typeof this.length === 'undefined' ? $(this) : this;

  if (_this.length >= 1) {
    _this = $(_this[0]);

    if (_this.hasClass('febsui-actionsheet-container')) {
      // if (ee[0].nodeName.toLowerCase() == 'actionsheet') {
      _this = _this.parent();
    }

    return _this.hasClass('febsui-actionsheet');
  }

  return false;
};

$.fn.actionsheetIsVisible = function () {

  var _this = typeof this.length === 'undefined' ? $(this) : this;

  if (_this[0]) {
    var ee = $(_this[0]);

    if (ee.hasClass('febsui-actionsheet-container')) {
      // if (ee[0].nodeName.toLowerCase() == 'actionsheet') {
      ee = ee.parent();
    }

    if (ee.hasClass('febsui-actionsheet-inited')) {

      var domid = ee.attr('id');
      if (febs.string.isEmpty(domid)) {
        return ee._isVisible();
      }

      ee = $('.febsui-actionsheet[data-id="' + domid + '"]');
      if (!ee[0]) return false;

      return ee._isVisible();
    }
  }

  return false;
};

$.fn.actionsheetShow = function () {

  var _this = typeof this.length === 'undefined' ? $(this) : this;
  actionsheet.actionsheet_init(_this);

  for (var i = 0; i < _this.length; i++) {
    var ee = $(_this[i]);

    if (ee.hasClass('febsui-actionsheet-container')) {
      // if (ee[0].nodeName.toLowerCase() == 'actionsheet') {
      ee = ee.parent();
    }

    if (ee.hasClass('febsui-actionsheet-inited')) {

      var domid = ee.attr('id');
      if (!febs.string.isEmpty(domid)) {
        ee = $('.febsui-actionsheet[data-id="' + domid + '"]');
        if (!ee[0]) continue;
      }

      if (ee._isVisible()) continue;

      var mask = '';
      if (!$('.febsui-mask').hasVisible()) {
        ee.addClass('febsui-mask');
      } else {
        ee.removeClass('febsui-mask');
      }

      maskPrevent(ee);

      ee.one('click', function () {
        $(this).actionsheetHide();
      });

      ee.removeClass('febsui-invisible').addClass('febsui-visible');
    }
  }

  // resizeActionsheet();
  return this;
};

$.fn.actionsheetHide = function () {

  var _this = typeof this.length === 'undefined' ? $(this) : this;

  for (var i = 0; i < _this.length; i++) {
    var ee = $(_this[i]);

    if (ee.hasClass('febsui-actionsheet-container')) {
      // if (ee[0].nodeName.toLowerCase() == 'actionsheet') {
      ee = ee.parent();
    }
    if (ee.hasClass('febsui-actionsheet-inited')) {

      var domid = ee.attr('id');
      if (!febs.string.isEmpty(domid)) {
        ee = $('.febsui-actionsheet[data-id="' + domid + '"]');
        if (!ee[0]) continue;
      }

      // setTimeout(function(){
      ee.removeClass('febsui-visible').addClass('febsui-invisible');
      // }, 100);
    }
  }
  return this;
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


$.fn.isCheckbox = function () {
  var _this = typeof this.length === 'undefined' ? $(this) : this;

  if (_this.length >= 1) {
    var ee = $(this[0]);
    if (ee.hasClass('febsui-checkbox') || ee[0].nodeName.toLowerCase() == 'input' && ee.attr('type') == 'checkbox') {
      return true;
    }
  }

  return false;
};

$.fn.checkboxChecked = function (checked, trigger) {
  var _this = typeof this.length === 'undefined' ? $(this) : this;

  var o = {};
  for (var i = 0; i < _this.length; i++) {
    var ee = $(_this[i]);
    if (ee.isCheckbox()) {

      if (ee.hasClass('febsui-checkbox')) {
        ee = $(ee.children('input')[0]);
      }

      if (ee[0]) {
        if (window.febs.utils.isNull(checked)) {
          return ee[0].checked;
        } else {
          if (!!checked ^ ee[0].checked) {
            ee[0].checked = checked;
            if (trigger) {
              ee.trigger('change');
            }
          }
        }
      }
    } // if.
  } // for.
  return this;
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * 仅返回第一个元素的情况.
 */
$.fn.isDisable = function () {
  var _this = typeof this.length === 'undefined' ? $(this) : this;

  if (_this.length > 0) {
    // switch.
    if (_this.isSwitch && _this.isSwitch()) return _this.switchIsDisabled();

    // checkbox.
    if (_this.isCheckbox && _this.isCheckbox()) {
      return _this.checkboxIsDisabled();
    }

    var dis = _this.attr('disabled');
    return !!dis;
  }
};

$.fn.setDisable = function (isDisable) {

  var _this = typeof this.length === 'undefined' ? $(this) : this;
  if (_this.length > 0) {

    // switch.
    if (_this.isSwitch()) return _this.switchDisabled(isDisable);

    // checkbox.
    if (_this.isCheckbox()) return _this.checkboxDisabled(isDisable);

    if (isDisable) {
      _this.attr('disabled', 'disabled');
    } else {
      _this.removeAttr('disabled');
    }
  }
  return this;
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var domHelper = __webpack_require__(0);

/**
 * 元素中是否存在可见的.
 */
$.fn.hasVisible = function () {

  var _this = typeof this.length === 'undefined' ? $(this) : this;

  for (var i = 0; i < _this.length; i++) {
    if (!!!(_this[i].offsetWidth || _this[i].offsetHeight || _this[i].getClientRects().length)) {
      continue;
    } else {
      var style = domHelper.getComputedStyle(_this[i]);
      if (style.width !== 0 && style.height !== 0 && style.opacity !== 0 && style.display !== 'none' && style.visibility !== 'hidden') {
        return true;
      }
    }
  }

  return false;
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var domHelper = __webpack_require__(0);

/**
 * 仅返回第一个元素的情况.
 */
$.fn.isVisible = function () {

  var _this = typeof this.length === 'undefined' ? $(this) : this;

  if (_this.length > 0) {

    // actionsheet.
    if (_this.isActionsheet()) {
      return _this.actionsheetIsVisibile();
    }
    // popover.
    else if (_this.isPopover()) {
        return _this.popoverIsVisibile();
      }

    // other.
    if (!!!(_this[0].offsetWidth || _this[0].offsetHeight || _this[0].getClientRects().length)) {
      return false;
    } else {
      var style = domHelper.getComputedStyle(_this[0]);
      return style.width !== 0 && style.height !== 0 && style.opacity !== 0 && style.display !== 'none' && style.visibility !== 'hidden';
    }
  }

  return false;
};

// 单纯判断.
$.fn._isVisible = function () {

  var _this = typeof this.length === 'undefined' ? $(this) : this;

  if (_this.length > 0) {

    // other.
    if (!!!(_this[0].offsetWidth || _this[0].offsetHeight || _this[0].getClientRects().length)) {
      return false;
    } else {
      var style = domHelper.getComputedStyle(_this[0]);
      return style.width !== 0 && style.height !== 0 && style.opacity !== 0 && style.display !== 'none' && style.visibility !== 'hidden';
    }
  }

  return false;
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var maskPrevent = __webpack_require__(0).maskPreventEvent;
var popover = __webpack_require__(5);

function resizePopover() {
  $('.febsui-popover').popoverHide();
}

// 是否支持orientationchange事件
if ('orientation' in window && 'onorientationchange' in window) {
  $(window).off('orientationchange', resizePopover).on('orientationchange', resizePopover);
} else {
  $(window).off('resize', resizePopover).on('resize', resizePopover);
}

$.fn.isPopover = function () {

  var _this = typeof this.length === 'undefined' ? $(this) : this;

  if (_this.length >= 1) {
    _this = $(_this[0]);

    if (_this.hasClass('febsui-popover-container')) {
      // if (ee[0].nodeName.toLowerCase() == 'popover') {
      _this = _this.parent();
    }

    return _this.hasClass('febsui-popover');
  }

  return false;
};

$.fn.popoverIsVisible = function () {

  var _this = typeof this.length === 'undefined' ? $(this) : this;

  if (_this[0]) {
    var ee = $(_this[0]);

    if (ee.hasClass('febsui-popover-container')) {
      // if (ee[0].nodeName.toLowerCase() == 'actionsheet') {
      ee = ee.parent();
    }

    if (ee.hasClass('febsui-popover-inited')) {

      var domid = ee.attr('id');
      if (febs.string.isEmpty(domid)) {
        return ee._isVisible();
      }

      ee = $('.febsui-actionsheet[data-id="' + domid + '"]');
      if (!ee[0]) return false;

      return ee._isVisible();
    }
  }

  return false;
};

$.fn.popoverShow = function (mask, attachNode) {

  var _this = typeof this.length === 'undefined' ? $(this) : this;
  popover.popover_init(_this);

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

      var domid = ee.attr('id');
      if (!febs.string.isEmpty(domid)) {
        ee = $('.febsui-popover[data-id="' + domid + '"]');
        if (!ee[0]) continue;
      }

      if (ee._isVisible()) continue;

      ee.one('click', function () {
        $(this).popoverHide();
      });

      ee.css('height', docport.height + 'px');
      ee.css('width', docport.width + 'px');

      if (mask) {
        ee.addClass('febsui-mask');
      } else {
        ee.removeClass('febsui-mask');
      }

      if (window.febs.utils.browserIsMobile()) {
        maskPrevent(ee);
      }

      var eee = ee.children('.febsui-popover-container');
      if (eee.length > 0) {
        eee = $(eee[0]);
        // data-attach.
        var attrAttach = attachNode ? attachNode : eee.attr('data-attach');
        var attach = $(attrAttach)[0];

        var attrDirection = eee.attr('data-direction');
        attrDirection = attrDirection ? attrDirection.toLowerCase() : 'auto';

        var width, height, attachOffset;

        if (attach) {
          width = attach.offsetWidth;
          height = attach.offsetHeight;
          attachOffset = window.febs.dom.getElementOffset(attach);
        } else {
          width = 0;
          height = 0;
          attachOffset = { top: 0, left: 0 };
          attrDirection = 'center';
        }

        var top = attachOffset.top;
        var left = attachOffset.left;

        var width2 = eee[0].offsetWidth;
        var height2 = eee[0].offsetHeight;

        var offset = eee.attr('data-offset');
        offset = window.febs.string.isEmpty(offset) ? 0 : parseInt(offset);

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
        if (attrDirection == 'auto') {

          // if (attrDirection == 'bottom') {
          if (!direction2) {
            top = parseInt(attachOffset.top - height2 - dis);
            if (top > dis2) {
              left = parseInt(attachOffset.left + width / 2 - width2 / 2);
              if (left > dis2 && left + width2 < viewport.width - dis2) {
                direction2 = 'bottom';
                offset = parseInt(width2 / 2 - dis2);
              } else if (attachOffset.left > dis2 && dis2 + width2 < viewport.width) {
                left = dis2;
                if (left + width2 < attachOffset.left + width) left = attachOffset.left + width - width2;
                if (left + width2 < viewport.width - dis2) {
                  direction2 = 'bottom';
                  offset = parseInt(attachOffset.left - left + width / 2 - dis2);
                }
              }
            }
          }
          // }

          // else if (attrDirection == 'top') {
          if (!direction2) {
            top = parseInt(attachOffset.top + height + dis);
            if (top + height2 < viewport.height - dis2) {
              left = parseInt(attachOffset.left + width / 2 - width2 / 2);
              if (left > dis2 && left + width2 < viewport.width - dis2) {
                direction2 = 'top';
                offset = parseInt(width2 / 2 - dis2);
              } else if (attachOffset.left > dis2 && dis2 + width2 < viewport.width) {
                left = dis2;
                if (left + width2 < attachOffset.left + width) left = attachOffset.left + width - width2;

                if (left + width2 < viewport.width - dis2) {
                  direction2 = 'top';
                  offset = parseInt(attachOffset.left - left + width / 2 - dis2);
                }
              }
            }
          }
          // }

          // else if (attrDirection == 'left') {
          if (!direction2) {
            left = attachOffset.left + width + dis;
            if (left + width2 < viewport.width - dis2) {
              top = parseInt(attachOffset.top + height / 2 - height2 / 2 - dis);
              if (top > dis2) {
                direction2 = 'left';
                offset = parseInt(height2 / 2);
              } else if (attachOffset.top > dis2 && dis2 + height2 < viewport.height) {
                top = dis2;
                direction2 = 'left';
                offset = parseInt(attachOffset.top + height / 2 - top - dis);
              }
            }
          }
          // }

          // else if (attrDirection == 'right') {
          if (!direction2) {
            left = attachOffset.left - width2 - dis;
            if (left > dis2) {
              top = parseInt(attachOffset.top + height / 2 - height2 / 2 - dis);
              if (top > dis2) {
                direction2 = 'right';
                offset = parseInt(height2 / 2);
              } else if (attachOffset.top > dis2 && dis2 + height2 < viewport.height) {
                top = dis2;
                direction2 = 'right';
                offset = parseInt(attachOffset.top + height / 2 - top - dis);
              }
            }
          }
          // }

          // center.
          if (!direction2) {
            left = parseInt((viewport.width - width2) / 2);
            top = parseInt((viewport.height - height2) / 2);
            direction2 = 'bottom';
            offset = parseInt(width2 / 2 - dis);

            arrow.css('display', 'none');
          } else {
            arrow.css('display', 'block');
          }

          eee.css('top', top + docoffset.top + 'px');
          eee.css('left', left + docoffset.left + 'px');

          arrow.addClass('febsui-popover-arrow-' + direction2);
          var eeeOffset = window.febs.dom.getElementOffset(eee);

          if (direction2 == 'top' || direction2 == 'bottom') {
            if (direction2 == 'top') arrow.css('top', eeeOffset.top + docoffset.top + 'px');else arrow.css('top', eeeOffset.top + docoffset.top + eee[0].clientHeight - 17 + 'px');
            direction2 = 'left';
            arrow.css(direction2, offset + eeeOffset.left + docoffset.left + 'px');
          } else if (direction2 == 'left' || direction2 == 'right') {
            if (direction2 == 'left') arrow.css('left', eeeOffset.left + docoffset.left + 'px');else arrow.css('left', eeeOffset.left + docoffset.left + eee[0].clientWidth - 17 + 'px');
            direction2 = 'top';
            arrow.css(direction2, offset + eeeOffset.top + docoffset.top + 'px');
          }
        } else {
          if (attrDirection == 'left') {
            top = parseInt(top + height / 2 - dis) || 0;
            left = left + width + dis;
          } else if (attrDirection == 'right') {
            top = parseInt(top + height / 2 - dis) || 0;
            left = left - dis - 24;
          } else if (attrDirection == 'top') {
            top = parseInt(top + height + dis) || 0;
            left = parseInt(left + width / 2 - dis) || 0;
          } else if (attrDirection == 'bottom') {
            top = parseInt(top - dis - 24) || 0;
            left = parseInt(left + width / 2 - dis) || 0;
          }
          // center.
          else {
              left = parseInt((viewport.width - width2) / 2);
              top = parseInt((viewport.height - height2) / 2);
            }

          arrow.addClass('febsui-popover-arrow-' + attrDirection);

          top += docoffset.top;
          left += docoffset.left;
          arrow.css('top', parseInt(top) + 'px');
          arrow.css('left', parseInt(left) + 'px');

          var top22 = top;
          var left22 = left;

          if (attrDirection == 'top' || attrDirection == 'bottom') {
            left22 -= width2 / 2 - 17;
            if (attrDirection == 'top') {
              // top22 += 16;
            } else {
              top22 -= height2 - 18;
            }

            if (offset < -(width2 / 2 - 17)) offset = -(width2 / 2 - 17);else if (offset > width2 / 2 - 17) offset = width2 / 2 - 17;
            left22 -= offset;
          } else if (attrDirection == 'left' || attrDirection == 'right') {
            top22 -= height2 / 2 - 17;
            if (attrDirection == 'left') {
              // left22 += 16;
            } else {
              left22 -= width2 - 18;
            }

            if (offset < -(height2 / 2 - 17)) offset = -(height2 / 2 - 17);else if (offset > height2 / 2 - 17) offset = height2 / 2 - 17;
            top22 -= offset;
          }

          if (attrDirection == 'center') {
            eee.css('top', top + 'px');
            eee.css('left', left + 'px');
            arrow.css('display', 'none');
          } else {
            var hideArrow = false;
            if (top22 + height2 / 2 > docport.height - 17) {
              hideArrow = true;top22 = docport.height - 17 - height2 / 2;
            } else if (top22 < 17) {
              hideArrow = true;top22 = 17;
            }

            if (left22 + width2 / 2 > docport.width - 17) {
              hideArrow = true;left22 = docport.width - 17 - width2 / 2;
            } else if (left22 < 17) {
              hideArrow = true;left22 = 17;
            }

            eee.css('top', parseInt(top22) + 'px');
            eee.css('left', parseInt(left22) + 'px');

            if (hideArrow) {
              arrow.css('display', 'none');
            } else {
              arrow.css('display', 'block');
            }
          } // if..else.
        } // if..else.
      }

      ee.removeClass('febsui-invisible').addClass('febsui-visible');
    }
  }
  return this;
};

$.fn.popoverHide = function () {

  var _this = typeof this.length === 'undefined' ? $(this) : this;

  for (var i = 0; i < _this.length; i++) {
    var ee = $(_this[i]);

    if (ee.hasClass('febsui-popover-container')) {
      // if (ee[0].nodeName.toLowerCase() == 'popover') {
      ee = ee.parent();
    }
    if (ee.hasClass('febsui-popover-inited')) {

      var domid = ee.attr('id');
      if (!febs.string.isEmpty(domid)) {
        ee = $('.febsui-popover[data-id="' + domid + '"]');
        if (!ee[0]) continue;
      }

      // setTimeout(function(){
      ee.removeClass('febsui-visible').addClass('febsui-invisible');
      // }, 100);
    }
  }
  return this;
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


$.fn.isRadio = function () {
  var _this = typeof this.length === 'undefined' ? $(this) : this;

  if (_this.length >= 1) {
    var ee = $(this[0]);
    if (ee.hasClass('febsui-radio') || ee[0].nodeName.toLowerCase() == 'input' && ee.attr('type') == 'radio') {
      return true;
    }
  }

  return false;
};

$.fn.radioGetValue = function () {
  var _this = typeof this.length === 'undefined' ? $(this) : this;

  _this = $(_this[0]);
  if (_this.isRadio()) {

    if (_this.hasClass('febsui-radio')) {
      _this = $(_this.children('input')[0]);
    }

    var elem = $('input[name="' + _this.attr('name') + '"]');
    for (var i = 0; i < elem.length; i++) {
      if (elem[i].checked) {
        return elem[i].value;
      }
    }
  }

  return '';
};

$.fn.radioSetValue = function (value, trigger) {
  var _this = typeof this.length === 'undefined' ? $(this) : this;

  var o = {};
  for (var i = 0; i < _this.length; i++) {
    var ee = $(_this[i]);
    if (ee.isRadio()) {

      if (ee.hasClass('febsui-radio')) {
        ee = $(ee.children('input')[0]);
      }

      var group = ee.attr('name');
      if (o[group]) continue;
      o[group] = true;
      var elem = $('input[name="' + group + '"]');
      for (var i = 0; i < elem.length; i++) {
        if (elem[i].value == value) {
          if (!elem[i].checked) elem[i].checked = true;
          if (trigger) {
            ee.trigger('change');
          }
          break;
        }
      }
    }
  }
  return this;
};

$.fn.radioChecked = function (checked, trigger) {
  var _this = typeof this.length === 'undefined' ? $(this) : this;

  var o = {};
  for (var i = 0; i < _this.length; i++) {
    var ee = $(_this[i]);
    if (ee.isRadio()) {

      if (ee.hasClass('febsui-radio')) {
        ee = $(ee.children('input')[0]);
      }

      if (ee[0]) {
        if (window.febs.utils.isNull(checked)) {
          return ee[0].checked;
        } else {
          if (!!checked ^ ee[0].checked) {
            ee[0].checked = checked;
            if (trigger) {
              ee.trigger('change');
            }
          }
        }
      }
    } // if.
  } // for.
  return this;
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var swiper_init = __webpack_require__(6).swiper_init;
var swiper_is_in_init = false;

// ie9.
var is_IE9 = window.febs.utils.browserIEVer() <= 9;
var ie9_animation_durtion = 250;
var ie9_animation_start_at = 0;
var ie9_animation_obj = [];
var _ie9_animation_foo;
var ie9_animation_frame;
if (is_IE9) {
  _ie9_animation_foo = function ie9_animation_foo(tm) {

    var elpase = Date.now() - ie9_animation_start_at;
    if (elpase >= ie9_animation_durtion) {
      for (var i = 0; i < ie9_animation_obj.length; i++) {
        var obj = ie9_animation_obj[i];
        obj.obj.css('-ms-transform', obj.vertical ? 'translateY(' + obj.offset + 'px)' : 'translateX(' + obj.offset + 'px)');
      }
      ie9_animation_obj = [];
      ie9_animation_frame = null;
      return;
    } // if.

    for (var i = 0; i < ie9_animation_obj.length; i++) {
      var obj = ie9_animation_obj[i];

      var offset = obj.offsetCur + (obj.offset - obj.offsetCur) * elpase / ie9_animation_durtion;
      obj.obj.css('-ms-transform', obj.vertical ? 'translateY(' + offset + 'px)' : 'translateX(' + offset + 'px)');
    } // for.

    ie9_animation_frame = requestAnimationFrame(_ie9_animation_foo);
  };
} // for ie9.


function resizeSwiper() {

  $('.febsui-swiper').removeClass('febsui-swiper-inited');

  // 延迟.5s后重新初始化. 保证父控件宽度变化完成.
  setTimeout(function () {
    if (!swiper_is_in_init) {
      swiper_is_in_init = true;
      swiper_init();

      var elems = $('.febsui-swiper');

      // 等待宽度变化完成.
      setTimeout(function () {
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
if ('orientation' in window && 'onorientationchange' in window) {
  $(window).off('orientationchange', resizeSwiper).on('orientationchange', resizeSwiper);
} else {
  $(window).off('resize', resizeSwiper).on('resize', resizeSwiper);
}

$.fn.isSwiper = function () {
  var _this = typeof this.length === 'undefined' ? $(this) : this;

  if (_this.length >= 1) {
    if (_this.hasClass('febsui-swiper')) {
      // [0].nodeName.toLowerCase() == 'switch') {
      return true;
    }
  }

  return false;
};

$.fn.swiperMoving = function (foo) {
  var _this = typeof this.length === 'undefined' ? $(this) : this;

  for (var i = 0; i < _this.length; i++) {
    var elem = $(_this[i]);

    if (elem.hasClass('febsui-swiper')) {
      elem[0].__swiperMoving = foo;
    }
  } // for.

  return this;
};

$.fn.swiperDotColor = function (color) {

  var _this = typeof this.length === 'undefined' ? $(this) : this;

  for (var i = 0; i < _this.length; i++) {
    var elem = $(_this[i]);

    if (elem.hasClass('febsui-swiper')) {

      if (!color) {
        color = elem.attr('data-dot-color');
      }

      if (color) {
        elem.children('.febsui-swiper-dots').children('span').css('background-color', color);
      } else {
        elem.children('.febsui-swiper-dots').children('span').css('background-color');
      }
    }
  } // for.

  return this;
};

$.fn.swiperSpeed = function (ms) {

  var _this = typeof this.length === 'undefined' ? $(this) : this;

  ms = parseInt(ms);

  for (var i = 0; i < _this.length; i++) {
    var elem = $(_this[i]);

    if (elem.hasClass('febsui-swiper')) {
      elem.attr('data-auto', ms);
    }
  } // for.

  return this;
};

$.fn.swiperPre = function (trigger) {

  var _this = typeof this.length === 'undefined' ? $(this) : this;

  for (var i = 0; i < _this.length; i++) {
    var elem = $(_this[i]);

    if (elem.hasClass('febsui-swiper')) {
      var index = elem.attr('data-current');
      var loop = elem.attr('data-loop');
      loop = window.febs.string.isEmpty(loop) ? true : 'true' == loop;

      index = (parseInt(index) || 0) - 1;

      if (loop || index >= 0) {
        elem.swiperTo(index, true, trigger, false);
      } else {
        elem.swiperTo(0, true, trigger, false);
      }
    }
  } // for.

  return this;
};

$.fn.swiperNext = function (trigger) {

  var _this = typeof this.length === 'undefined' ? $(this) : this;

  for (var i = 0; i < _this.length; i++) {
    var elem = $(_this[i]);

    if (elem.hasClass('febsui-swiper')) {
      var index = elem.attr('data-current');
      var loop = elem.attr('data-loop');
      loop = window.febs.string.isEmpty(loop) ? true : 'true' == loop;

      index = (parseInt(index) || 0) + 1;

      var length = elem.children('.febsui-swiper-dots').children('span').length;

      if (loop || index < length) {
        elem.swiperTo(index, true, trigger, true);
      } else {
        elem.swiperTo(length - 1 < 0 ? 0 : length - 1, true, trigger, true);
      }
    }
  } // for.

  return this;
};

$.fn.swiperCurrent = function () {

  var _this = typeof this.length === 'undefined' ? $(this) : this;

  for (var i = 0; i < _this.length; i++) {
    var elem = $(_this[i]);

    if (elem.hasClass('febsui-swiper')) {
      return parseInt(elem.attr('data-current')) || 0;
    }
  }

  return -1;
};

$.fn.swiperTotal = function () {

  var _this = typeof this.length === 'undefined' ? $(this) : this;

  for (var i = 0; i < _this.length; i++) {
    var elem = $(_this[i]);

    if (elem.hasClass('febsui-swiper')) {
      var dots = $(elem.children('.febsui-swiper-dots')[0]).children('span');
      return dots.length;
    }
  }

  return -1;
};

/**
* @desc: 
* @param directNext: 方向是否为next. 
*/
$.fn.swiperTo = function (index, animation, trigger, directNext) {

  var _this = typeof this.length === 'undefined' ? $(this) : this;

  index = parseInt(index);

  if (typeof animation === 'undefined') {
    animation = true;
  }
  if (ie9_animation_frame) {
    cancelAnimationFrame(ie9_animation_frame);
    ie9_animation_frame = null;
    for (var i = 0; i < ie9_animation_obj.length; i++) {
      var obj = ie9_animation_obj[i];
      obj.obj.css('-ms-transform', obj.vertical ? 'translateY(' + obj.offset + 'px)' : 'translateX(' + obj.offset + 'px)');
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
      loop = window.febs.string.isEmpty(loop) ? true : 'true' == loop;

      var pagesContainer = $(elem.children('.febsui-swiper-pages')[0]);
      var pages = pagesContainer.children('.febsui-swiper-page');
      var dots = $(elem.children('.febsui-swiper-dots')[0]).children('span');

      if (pages.length == 0) {
        continue;
      }

      var nindex = index;
      nindex %= dots.length;
      nindex = nindex < 0 ? dots.length + nindex : nindex;

      var directionVertical = elem.hasClass('febsui-swiper-vertical');

      var resetPostion = false;

      var offset = 0;
      var indexp;
      if (loop) {
        indexp = nindex + 1;
        if (current == 0 && nindex == dots.length - 1) {
          if (nindex - 1 == current) {
            // 仅大一个数.
            if (false === directNext) {
              indexp = 0;
              resetPostion = true;
            }
          } else {
            indexp = 0;
            resetPostion = true;
          }
        } else if (current == dots.length - 1 && nindex == 0) {
          if (nindex + 1 == current) {
            // 仅大一个数.
            if (true === directNext) {
              indexp = pages.length - 1;
              resetPostion = true;
            }
          } else {
            indexp = pages.length - 1;
            resetPostion = true;
          }
        }
      } else {
        indexp = nindex;
      }

      if (pages.length < indexp + 1) {
        continue;
      }

      for (var j = 0; j < indexp; j++) {
        if (directionVertical) {
          offset += pages[j].clientHeight;
        } else {
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
          obj: pagesContainer
          // offsetCur,
          // offset,
          // vertical
        });

        if (directionVertical) {
          if (align == 'center') {
            offset -= (elem[0].clientHeight - (pages[indexp] && pages[indexp].clientHeight) || 0) / 2;
          } else {
            if (offset > elem[0].__swiper_maxOffset) {
              offset = elem[0].__swiper_maxOffset;
            } else {
              offset -= align;
            }
          }
          ie9_animation_obj[ie9_animation_obj.length - 1].offset = -offset;
          ie9_animation_obj[ie9_animation_obj.length - 1].vertical = true;

          var offsetCur = pagesContainer.css('-ms-transform');
          if (offsetCur) {
            offsetCur = window.febs.string.replace(offsetCur, 'translateY(', '');
            offsetCur = window.febs.string.replace(offsetCur, 'px)', '');
            offsetCur = parseFloat(offsetCur);
          } else {
            offsetCur = 0;
          }
          ie9_animation_obj[ie9_animation_obj.length - 1].offsetCur = offsetCur;
        } else {
          if (align == 'center') {
            offset -= (elem[0].clientWidth - (pages[indexp] && pages[indexp].clientWidth) || 0) / 2;
          } else {
            if (offset > elem[0].__swiper_maxOffset) {
              offset = elem[0].__swiper_maxOffset;
            } else {
              offset -= align;
            }
          }
          ie9_animation_obj[ie9_animation_obj.length - 1].offset = -offset;
          ie9_animation_obj[ie9_animation_obj.length - 1].vertical = false;

          var offsetCur = pagesContainer.css('-ms-transform');
          if (offsetCur) {
            offsetCur = window.febs.string.replace(offsetCur, 'translateX(', '');
            offsetCur = window.febs.string.replace(offsetCur, 'px)', '');
            offsetCur = parseFloat(offsetCur);
          } else {
            offsetCur = 0;
          }
          ie9_animation_obj[ie9_animation_obj.length - 1].offsetCur = offsetCur;
        }
      } else {
        if (directionVertical) {
          if (align == 'center') {
            offset -= (elem[0].clientHeight - (pages[indexp] && pages[indexp].clientHeight) || 0) / 2.0;
          } else {
            if (offset > elem[0].__swiper_maxOffset) {
              offset = elem[0].__swiper_maxOffset;
            } else {
              offset -= align;
            }
          }
          pagesContainer.css('-webkit-transform', 'translate3d(0px, ' + -offset + 'px, 0px)');
          pagesContainer.css('-moz-transform', 'translate3d(0px, ' + -offset + 'px, 0px)');
          pagesContainer.css('-ms-transform', 'translateY(' + -offset + 'px)');
          pagesContainer.css('transform', 'translate3d(0px, ' + -offset + 'px, 0px)');
        } else {
          if (align == 'center') {
            offset -= (elem[0].clientWidth - (pages[indexp] && pages[indexp].clientWidth) || 0) / 2.0;
          } else {
            if (offset > elem[0].__swiper_maxOffset) {
              offset = elem[0].__swiper_maxOffset;
            } else {
              offset -= align;
            }
          }
          pagesContainer.css('-webkit-transform', 'translate3d(' + -offset + 'px, 0px, 0px)');
          pagesContainer.css('-moz-transform', 'translate3d(' + -offset + 'px, 0px, 0px)');
          pagesContainer.css('-ms-transform', 'translateX(' + -offset + 'px)');
          pagesContainer.css('transform', 'translate3d(' + -offset + 'px, 0px, 0px)');
        }
      } // if.

      pagesContainer.attr('data-offset', offset);

      if (!animation) {
        setTimeout(function () {
          this.addClass('febsui-swiper-animation');
        }.bind(pagesContainer), 30);
      }

      // 重置正确的位置.
      if (resetPostion && pages.length > 1) {
        setTimeout(function () {
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
      ie9_animation_frame = requestAnimationFrame(_ie9_animation_foo);
    }
  }

  return this;
};

$.fn.swiper = function (cb) {

  var _this = typeof this.length === 'undefined' ? $(this) : this;

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
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


$.fn.isSwitch = function () {
  var _this = typeof this.length === 'undefined' ? $(this) : this;

  if (_this.length >= 1) {
    if (_this.hasClass('febsui-switch')) {
      // [0].nodeName.toLowerCase() == 'switch') {
      return true;
    }
  }

  return false;
};

$.fn.switchIsOn = function () {
  return !this.hasClass("febsui-switch-off");
};

$.fn['switch'] = function (cb) {

  var _this = typeof this.length === 'undefined' ? $(this) : this;

  if (cb) {
    for (var i = 0; i < _this.length; i++) {
      var elem = $(_this[i]);

      elem.on('switch', cb);
    } // for.
  }
  // trigger.
  else {
      _this.trigger('switch');
    } // if..else.
  return this;
};

$.fn.switchOn = function (isOn, trigger) {

  var _this = typeof this.length === 'undefined' ? $(this) : this;

  for (var i = 0; i < _this.length; i++) {
    var elem = $(_this[i]);

    if (elem.hasClass('febsui-switch')) {
      // if (_this[0].nodeName.toLowerCase() == 'switch') {
      if (isOn) {
        if (elem.hasClass("febsui-switch-off")) {
          elem.removeClass("febsui-switch-off").addClass("febsui-switch-on");
          if (trigger) {
            elem.trigger('switch');
          }
        }
      } else {
        if (!elem.hasClass("febsui-switch-off")) {
          elem.removeClass("febsui-switch-on").addClass("febsui-switch-off");
          if (trigger) {
            elem.trigger('switch');
          }
        }
      }
    } // if.
  } // for.
  return this;
};

$.fn.switchIsDisabled = function () {
  return this.hasClass("febsui-switch-disabled");
};

$.fn.switchDisabled = function (isDisable) {

  var _this = typeof this.length === 'undefined' ? $(this) : this;

  for (var i = 0; i < _this.length; i++) {
    var elem = $(_this[i]);

    if (elem.hasClass('febsui-switch')) {
      // if (_this[0].nodeName.toLowerCase() == 'switch') {
      if (isDisable) elem.addClass("febsui-switch-disabled");else elem.removeClass("febsui-switch-disabled");
    } // if.
  } // for.
  return this;
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * jquery plugin.
 */

$.fn.uploaderReset = function () {
  var _this = typeof this.length === 'undefined' ? $(this) : this;
  for (var i = 0; i < _this.length; i++) {
    var ee = $(_this[i]);
    if (ee.hasClass('febsui-uploader')) {
      var form = ee.children('form')[0];
      if (form) {
        var input = $(form).children('input')[0];
        if (input) {
          input.value = '';
        }
      }

      var label = ee.children('label')[0];
      if (label) {
        label = $(label);
        label.removeAttr('style');
        label.attr('for', label.attr('data-for'));

        var htmlUpload = label.children('div')[0];
        if (htmlUpload) {
          $(htmlUpload).css('display', 'inline-block');
        }

        var progress = label.children('.febsui-uploader-progress')[0];
        if (progress) {
          progress = $(progress);
          var filename = progress.children('.febsui-uploader-filename')[0];
          if (filename) {
            $(filename).html('');
          }
          progress.css('display', 'none');
        }
      }

      var cancel = ee.children('.febsui-uploader-progress-cancel')[0];
      if (cancel) {
        cancel = $(cancel);
        cancel.removeAttr('style');
      }
    } // if.
  } // for.

  return this;
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @param options: {
 *                   url: url,
 *                   success: function() {},
 *                   error: function(err) {},
 *                   progress: function(percent) {},
 *                   method: 'post',
 *                   headers: {},
 *                   timeout: 5000,
 *                   withCredentials: true,
 *                   crossDomain: true,
 *                 }
 */
exports.ajaxSubmit = function ajaxSubmit(formObj, fileObj, options) {

  var default_options = {
    success: options.success,
    method: options.method || 'POST',
    url: options.url,
    mode: options.crossDomain === false ? 'same-origin' : 'cors',
    timeout: options.timeout || 5000
  };

  options = $.extend(default_options, options || {});

  if (!!formObj.attr('enctype') && formObj.attr('enctype').toLowerCase() === 'multipart/form-data') {

    var formData = new FormData();

    if ('files' in fileObj[0] && fileObj[0].files.length > 0) {
      // ToDo: Support Multiple on any input? 
      // Just need a loop here..
      formData.append(fileObj[0].name, fileObj[0].files[0]);
    }

    options.data = formData;
  } else {
    throw new Error('only support multipart/form-data');
  }

  var headers;
  if (options.headers) {
    // delete options.headers['Content-Type'];
    headers = options.headers;
  } else {
    headers = {};
  }

  headers['Content-Type'] = false;

  return window.febs.net.ajax({
    url: options.url,
    type: options.method,
    headers: headers,
    processData: false,
    data: options.data,
    timeout: options.timeout,
    withCredentials: options.credentials,
    success: function success(data) {
      if (options.success) {
        options.success(data);
      }
    },
    error: function error(xhr, statusText, err) {
      if (options.error) {
        options.error(err);
      }
    },
    progress: options.progress
  });
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



var stringUtils = window.febs.string;

function escape_string(str) {
  // 转义.
  str = stringUtils.replace(str, '<', '&lt;');
  str = stringUtils.replace(str, '>', '&gt;');
  return str;
}

exports.escape_string = escape_string;

/***/ })
/******/ ]);
//# sourceMappingURL=febsui.js.map