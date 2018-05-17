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
/******/ 	return __webpack_require__(__webpack_require__.s = 99);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
  event.preventDefault();
}

function maskPreventHandler2(event) {
  event.stopPropagation();
  // event.preventDefault();
}

// event.
exports.maskPreventEvent = function (ee) {

  var children = ee.children();

  if (window.febs.utils.browserIsMobile()) {
    children.off('touchmove', maskPreventHandler2);
    children.on('touchmove', maskPreventHandler2);
    ee.off('touchmove', maskPreventHandler);
    ee.on('touchmove', maskPreventHandler);
  } else {
    children.off('mousewheel', maskPreventHandler2);
    children.on('mousewheel', maskPreventHandler2);
    ee.off('mousewheel', maskPreventHandler);
    ee.on('mousewheel', maskPreventHandler);
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
    if (dom.addEventListener) {
      dom.removeEventListener('touchstart', mobile_onTouchstart);
      dom.removeEventListener('touchmove', mobile_onTouchmove);
      dom.removeEventListener('touchend', mobile_onTouchend);
      dom.removeEventListener('touchcancel', mobile_onTouchcancel);

      dom.addEventListener('touchstart', mobile_onTouchstart, true);
      dom.addEventListener('touchmove', mobile_onTouchmove, true);
      dom.addEventListener('touchend', mobile_onTouchend, true);
      dom.addEventListener('touchcancel', mobile_onTouchcancel, true);
    } else {
      dom.detachEvent('ontouchstart', mobile_onTouchstart);
      dom.detachEvent('ontouchmove', mobile_onTouchmove);
      dom.detachEvent('ontouchend', mobile_onTouchend);
      dom.detachEvent('ontouchcancel', mobile_onTouchcancel);

      dom.attachEvent('ontouchstart', mobile_onTouchstart);
      dom.attachEvent('ontouchmove', mobile_onTouchmove);
      dom.attachEvent('ontouchend', mobile_onTouchend);
      dom.attachEvent('ontouchcancel', mobile_onTouchcancel);
    }
  } // if.
};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 2 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.uuid = function () {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr(s[19] & 0x3 | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(12)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(6);
var createDesc = __webpack_require__(13);
module.exports = __webpack_require__(4) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(10);
var IE8_DOM_DEFINE = __webpack_require__(35);
var toPrimitive = __webpack_require__(27);
var dP = Object.defineProperty;

exports.f = __webpack_require__(4) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(67);
var defined = __webpack_require__(17);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(25)('wks');
var uid = __webpack_require__(14);
var Symbol = __webpack_require__(1).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(9);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 11 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.5' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 15 */
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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(57);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(56);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2['default'] === "function" && typeof _iterator2['default'] === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2['default'] === "function" && obj.constructor === _symbol2['default'] && obj !== _symbol2['default'].prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = typeof _symbol2['default'] === "function" && _typeof(_iterator2['default']) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2['default'] === "function" && obj.constructor === _symbol2['default'] && obj !== _symbol2['default'].prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 17 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 18 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(40);
var enumBugKeys = __webpack_require__(18);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 22 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(6).f;
var has = __webpack_require__(2);
var TAG = __webpack_require__(8)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(25)('keys');
var uid = __webpack_require__(14);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 26 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(9);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var core = __webpack_require__(11);
var LIBRARY = __webpack_require__(20);
var wksExt = __webpack_require__(29);
var defineProperty = __webpack_require__(6).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(8);


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = __webpack_require__(16)['default'];

var uuid = __webpack_require__(3);
var resizeDialog = __webpack_require__(31).resizeDialog;
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

function hide(selector) {
  if (selector) {
    setTimeout(function () {
      $(selector).removeClass('febsui-visible').addClass('febsui-invisible');
      if ($(selector)[0]) {

        // 移除临时弹出的窗口.
        if (!$(selector).hasClass('febsui-dialog-init')) {
          setTimeout(function () {
            $(selector).remove();
          }, 300);
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
      if (!eee.hasClass('febsui-dialog-init')) {
        ees.push(eee);
      }
    } // for.

    setTimeout(function () {
      for (var i = 0; i < ees.length; i++) {
        ees[i].remove();
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

  var uid = 'febs-' + uuid.uuid();

  var mask = '';
  if (!$('.febsui-mask').hasVisibile()) {
    mask = ' febsui-mask';
  }

  $("body").append($('<div' + ' id="' + uid + '" class="febsui-dialog febsui-dialog-init' + mask + '" role="alert"><div class="febsui-dialog-container">' + (ctx.title ? '<div class="febsui-dialog-title">' + ctx.title + '</div>' : '') + '<div class="febsui-dialog-content">' + (ctx.content ? ctx.content : ctx.contentHtml) + '</div><ul class="febsui-dialog-buttons"><li style="width:100%;' + styleBorder + '"><button class="febsui-dialog-cancel">' + ctx.okText + '</button></li></ul></div></div>'));
  resizeDialog();

  maskPrevent($('#' + uid));

  setTimeout(function () {
    $('#' + uid).addClass('febsui-visible');
  }, 10);

  //close popup
  var ele = $('#' + uid);
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
* ctx.content:		 内容文字.
* ctx.contentHtml: html方式的内容.
* ctx.confirm: function(){}	// 点击确认键的回调.
* ctx.cancel:  function(){} // 点击取消键的回调.
* ctx.okText:
* ctx.cancelText:
*/
function showConfirm(ctx) {
  if (!ctx.okText) ctx.okText = "确认";
  if (!ctx.cancelText) ctx.cancelText = "取消";

  ctx.contentHtml = ctx.contentHtml ? ctx.contentHtml : '';

  escape_string(ctx);

  // if ($('.febsui-dialog').length > 0) {
  // 	$('.febsui-dialog').remove();
  // }

  var uid = 'febs-' + uuid.uuid();

  var mask = '';
  if (!$('.febsui-mask').hasVisibile()) {
    mask = ' febsui-mask';
  }

  $("body").append($('<div' + ' id="' + uid + '" class="febsui-dialog febsui-dialog-init' + mask + '" role="alert"><div class="febsui-dialog-container">' + (ctx.title ? '<div class="febsui-dialog-title">' + ctx.title + '</div>' : '') + '<div class="febsui-dialog-content">' + (ctx.content ? ctx.content : ctx.contentHtml) + '</div><ul class="febsui-dialog-buttons"><li' + (isIE9 ? ' style="' + styleBorder + '"' : '') + '><button class="febsui-dialog-cancel">' + ctx.cancelText + '</button></li><li' + (isIE9 ? ' style="' + styleBorder + '"' : '') + '><button class="febsui-dialog-ok">' + ctx.okText + '</button></li></ul></div></div>'));
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
* ctx.content:		 内容文字.
* ctx.contentHtml: html方式的内容.
* ctx.editText:		 输入框文字.
* ctx.confirm: function(text){}	// 点击确认键的回调.
* ctx.cancel:  function(){} // 点击取消键的回调.
* ctx.okText:
* ctx.cancelText:
*/
function showConfirmEdit(ctx) {
  if (!ctx.okText) ctx.okText = "确认";
  if (!ctx.cancelText) ctx.cancelText = "取消";

  ctx.contentHtml = ctx.contentHtml ? ctx.contentHtml : '';

  // 转义.
  escape_string(ctx);

  // if ($('.febsui-dialog').length > 0) {
  // 	$('.febsui-dialog').remove();
  // }

  var uid = 'febs-' + uuid.uuid();

  var mask = '';
  if (!$('.febsui-mask').hasVisibile()) {
    mask = ' febsui-mask';
  }

  var elems = '<div' + ' id="' + uid + '" class="febsui-dialog febsui-dialog-init' + mask + '" role="alert"><div class="febsui-dialog-container">' + (ctx.title ? '<div class="febsui-dialog-title">' + ctx.title + '</div>' : '') + '<div class="febsui-dialog-content">' + (ctx.content ? ctx.content : ctx.contentHtml) + '</div>' + '<div class="febsui-dialog-edit"><input class="febsui-input-text-noborder" type="text" value="' + (ctx.editText ? ctx.editText : '') + '">' + '</div>' + '<ul class="febsui-dialog-buttons"><li' + (isIE9 ? ' style="' + styleBorder + '"' : '') + '><button class="febsui-dialog-cancel">' + ctx.cancelText + '</button></li><li' + (isIE9 ? ' style="' + styleBorder + '"' : '') + '><button class="febsui-dialog-ok">' + ctx.okText + '</button></li></ul></div></div>';

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

      var dd = $("<div class='febsui-dialog febsui-dialog-init febsui-dialog-custom' role='alert'></div>");
      $('body').append(dd);
      var did = dom.attr('id');
      if (did) {
        dd.attr('id', did);
        dom.removeAttr('id');
      }
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
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.resizeDialog = resizeDialog;

var maskPrevent = __webpack_require__(0).maskPreventEvent;

/**
* @desc: 屏幕旋转事件.
*/
function resizeDialog() {
  var elem = $('.febsui-dialog-container');

  var viewport = window.febs.dom.getViewPort();
  for (var i = 0; i < elem.length; i++) {
    $(elem[i]).css('margin-top', parseInt((viewport.height - elem[i].clientHeight) / 2) + 'px');
  }
}

// 是否支持orientationchange事件
// if ('orientation' in window && 'onorientationchange' in window)
// {
//   $(window).on('orientationchange', resizeDialog);
// }
// else {
$(window).on('resize', resizeDialog);
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

$.fn.dialogShow = function () {

  var _this = typeof this.length === 'undefined' ? $(this) : this;

  for (var i = 0; i < _this.length; i++) {
    var ee = $(_this[i]);
    if (ee.hasClass('febsui-dialog-container')) {
      ee = ee.parent();
    }
    if (ee.hasClass('febsui-dialog-init')) {

      if (!$('.febsui-mask').hasVisibile()) {
        ee.addClass('febsui-mask');
      } else {
        ee.removeClass('febsui-mask');
      }

      maskPrevent(ee);

      ee.removeClass('febsui-invisible').addClass('febsui-visible');
    }
  }

  resizeDialog();
  return this;
};

$.fn.dialogHide = function () {

  var _this = typeof this.length === 'undefined' ? $(this) : this;

  for (var i = 0; i < _this.length; i++) {
    var ee = $(_this[i]);
    if (ee.hasClass('febsui-dialog-container')) {
      ee = ee.parent();
    }
    if (ee.hasClass('febsui-dialog-init')) {
      ee.removeClass('febsui-visible').addClass('febsui-invisible');
    }
  }
  return this;
};

/***/ }),
/* 32 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(9);
var document = __webpack_require__(1).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var core = __webpack_require__(11);
var ctx = __webpack_require__(64);
var hide = __webpack_require__(5);
var has = __webpack_require__(2);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(4) && !__webpack_require__(12)(function () {
  return Object.defineProperty(__webpack_require__(33)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(20);
var $export = __webpack_require__(34);
var redefine = __webpack_require__(41);
var hide = __webpack_require__(5);
var Iterators = __webpack_require__(19);
var $iterCreate = __webpack_require__(69);
var setToStringTag = __webpack_require__(23);
var getPrototypeOf = __webpack_require__(75);
var ITERATOR = __webpack_require__(8)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(10);
var dPs = __webpack_require__(72);
var enumBugKeys = __webpack_require__(18);
var IE_PROTO = __webpack_require__(24)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(33)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(66).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(40);
var hiddenKeys = __webpack_require__(18).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 39 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(2);
var toIObject = __webpack_require__(7);
var arrayIndexOf = __webpack_require__(63)(false);
var IE_PROTO = __webpack_require__(24)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(5);


/***/ }),
/* 42 */
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
    str = window.febs.string.escapeHtml(str);
  }
  return str;
}

var ie9 = window.febs.utils.browserIEVer() <= 9;

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
* @param spinClass: 默认为 febsui-icon-spin1-white
* @return: 
*/
function loading_show(text, timeout, spinClass) {

  if (ie9) spinClass = spinClass || 'febsui-icon-spin3-white';else spinClass = spinClass || 'febsui-icon-spin1-white';

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
    var ee = $('#' + loading_tag_name);
    if (window.febs.string.isEmpty(ee.html())) {
      ee.html('<div class="febsui-loading-c"><div class="febsui-loading"><div class="' + spinClass + ' febsui-animation-spin febsui-loading-spin"></div><p>' + (text ? text : '') + '</p></div></div>');
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
if (ie9) {
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
  if (ie9) {
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
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */



var crypt = window.febs.crypt;
var err = __webpack_require__(15);
var ajaxSubmit = __webpack_require__(87).ajaxSubmit;
var uuid = __webpack_require__(3);

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
 *                withCredentials: true, // 是否附带cookie, 默认为true
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
  var uid = 'febsuifile' + uuid.uuid();
  uid = window.febs.string.replace(uid, '-', '');
  var ie99 = window.febs.utils.browserIEVer() <= 9;
  if (ie99) {
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

    crypt.crc32_file(fileObj[0].files[0], function (crc) {
      if (crc) {
        try {
          var con = ajaxSubmit(formObj, fileObj, {
            method: 'POST',
            url: control_upload_url + 'crc32=' + crc + '&size=' + fileObj[0].files[0].size + (cfg.data ? '&data=' + cfg.data : ''),
            progress: function progress(percentComplete) {
              if (control_upload_progress_cb) control_upload_progress_cb(fileObj, percentComplete ? percentComplete.toFixed(1) : 0);
            },
            error: function error() {
              if (control_upload_cb) control_upload_cb(err.net, fileObj, null);fileObj[0].value = "";
            },
            success: function success(r) {
              try {
                r = JSON.parse(r);
              } catch (e) {
                r = {};
              }

              if (control_upload_cb) control_upload_cb(null, fileObj, r);
              fileObj[0].value = "";
            },
            crossDomain: cfg.crossDomain,
            headers: cfg.headers,
            withCredentials: cfg.withCredentials
          });
          if (control_upload_begin_cb) control_upload_begin_cb(cfg.fileObj, con);
        } catch (e) {
          if (control_upload_cb) control_upload_cb(e, fileObj, null);
          fileObj[0].value = "";
        }
      } else {
        if (control_upload_cb) control_upload_cb(err.crc32, fileObj, null);
        fileObj[0].value = "";
      }
    });
  } // if..else.
}

exports.upload = upload;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// import { $ } from 'febs-browser';

// require('febs-browser');

if (!$) {
  throw new Error('must import febs first');
}

var loading = __webpack_require__(42);
exports.loading_isVisiable = loading.loading_isVisiable;
exports.loading_show = loading.loading_show;
exports.loading_show_text = loading.loading_show_text;
exports.loading_hide = loading.loading_hide;

exports.page_init = __webpack_require__(91).page_init;
exports.uploadBase64 = __webpack_require__(96).uploadBase64;
exports.upload = __webpack_require__(43).upload;
exports.uploadErr = __webpack_require__(15);

var toast = __webpack_require__(95);
exports.toast = toast.showToast;
exports.toast_hide = toast.hideToast;

var dialog = __webpack_require__(30);
exports.dialog_hide = dialog.hide;
exports.dialog_showAlert = dialog.showAlert;
exports.dialog_showConfirm = dialog.showConfirm;
exports.dialog_showConfirmEdit = dialog.showConfirmEdit;

var switcha = __webpack_require__(94);
exports.ui_switch_init = switcha.switch_init;

var popovera = __webpack_require__(92);
exports.ui_popover_init = popovera.popover_init;

var dialoga = __webpack_require__(30);
exports.ui_dialog_init = dialoga.dialog_init;

var actionsheeta = __webpack_require__(88);
exports.ui_actionsheet_init = actionsheeta.actionsheet_init;

var uploadera = __webpack_require__(97);
exports.ui_uploader_init = uploadera.uploader_init;

var checkboxa = __webpack_require__(90);
exports.ui_checkbox_init = checkboxa.checkbox_init;

var loadinga = __webpack_require__(42);
exports.ui_spin_init = loadinga.spin_init;

var buttona = __webpack_require__(89);
exports.ui_button_init = buttona.button_init;

var swipera = __webpack_require__(93);
exports.ui_swiper_init = swipera.swiper_init;

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
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var maskPrevent = __webpack_require__(0).maskPreventEvent;

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
//   $(window).on('resize', resizeActionsheet);
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

$.fn.actionsheetShow = function () {

  var _this = typeof this.length === 'undefined' ? $(this) : this;

  for (var i = 0; i < _this.length; i++) {
    var ee = $(_this[i]);

    if (ee.hasClass('febsui-actionsheet-container')) {
      // if (ee[0].nodeName.toLowerCase() == 'actionsheet') {
      ee = ee.parent();
    }

    if (ee.hasClass('febsui-actionsheet-inited')) {

      if (ee.isVisibile()) continue;

      var mask = '';
      if (!$('.febsui-mask').hasVisibile()) {
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
      // setTimeout(function(){
      ee.removeClass('febsui-visible').addClass('febsui-invisible');
      // }, 100);
    }
  }
  return this;
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function isCheckboxInput(ee) {
  return ee[0].nodeName == 'INPUT' && ee.attr('type') == 'checkbox';
}

$.fn.isCheckbox = function () {
  var _this = typeof this.length === 'undefined' ? $(this) : this;

  if (_this.length >= 1) {
    if (!_this.hasClass('febsui-checkbox')) {
      var ee = $(_this[0]);
      if (isCheckboxInput(ee)) {
        return true;
      }
    } else {
      return true;
    }
  }

  return false;
};

$.fn.checkboxIsChecked = function () {
  var _this = typeof this.length === 'undefined' ? $(this) : this;

  if (_this.length >= 1) {
    var ee = $(_this[0]);
    if (_this.hasClass('febsui-checkbox')) {
      return $(ee.children('input')[0])[0].checked;
    } else if (isCheckboxInput(ee)) {
      return ee[0].checked;
    }
  }
  return false;
};

$.fn.checkboxChange = function (cb) {

  var _this = typeof this.length === 'undefined' ? $(this) : this;

  if (cb) {
    for (var i = 0; i < _this.length; i++) {
      var elem = $(_this[i]);
      if (elem.hasClass('febsui-checkbox')) {
        $(elem.children('input')[0]).change(cb);
      } else if (isCheckboxInput(elem)) {
        elem.change(cb);
      }
    } // for.
  }
  // trigger.
  else {
      for (var i = 0; i < _this.length; i++) {
        var elem = $(_this[i]);
        if (elem.hasClass('febsui-checkbox')) {
          $(elem.children('input')[0]).trigger('change');
        } else if (isCheckboxInput(elem)) {
          elem.trigger('change');
        }
      } // for.
    } // if..else.
  return this;
};

$.fn.checkboxChecked = function (checked, trigger) {

  var _this = typeof this.length === 'undefined' ? $(this) : this;

  for (var i = 0; i < _this.length; i++) {
    var elem = $(_this[i]);

    if (elem.hasClass('febsui-checkbox')) {
      var ee = $(elem.children('input')[0])[0];
      if (ee.checked != checked) {
        ee.checked = checked;
        if (trigger) {
          elem.checkboxChange();
        }
      }
    } else if (isCheckboxInput(elem)) {
      if (elem[0].checked != checked) {
        elem[0].checked = checked;
        if (trigger) {
          elem.checkboxChange();
        }
      }
    }
  } // for.
  return this;
};

$.fn.checkboxIsDisabled = function () {
  var _this = typeof this.length === 'undefined' ? $(this) : this;

  if (this.length > 0) {
    var ee = $(this[0]);
    if (this.hasClass('febsui-checkbox')) {
      return $(ee.children('input')[0]).hasAttr('disabled');
    } else if (isCheckboxInput(ee)) {
      return ee.hasAttr('disabled');
    }
  }

  return false;
};

$.fn.checkboxDisabled = function (isDisable) {

  var _this = typeof this.length === 'undefined' ? $(this) : this;

  for (var i = 0; i < _this.length; i++) {
    var elem = $(_this[i]);
    if (elem.hasClass('febsui-checkbox')) {
      if (isDisable) {
        $(elem.children('input')[0]).attr('disabled', 'disabled');
      } else {
        $(elem.children('input')[0]).removeAttr('disabled');
      }
    } else if (isCheckboxInput(elem)) {
      if (isDisable) {
        elem.attr('disabled', 'disabled');
      } else {
        elem.removeAttr('disabled');
      }
    }
  } // for.
  return this;
};

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * 仅返回第一个元素的情况.
 */
$.fn.isDisabled = function () {

  var ee = this;

  // switch.
  if (ee.isSwitch()) return ee.switchIsDisabled();

  // checkbox.
  if (ee.isCheckbox()) {
    return ee.checkboxIsDisabled();
  }

  var dis = ee.attr('disabled');
  return !!dis;
};

$.fn.setDisabled = function (isDisable) {

  var ee = this;

  // switch.
  if (ee.isSwitch()) return ee.switchDisabled(isDisable);

  // checkbox.
  if (ee.isCheckbox()) return ee.checkboxDisabled(isDisable);

  if (isDisable) {
    ee.attr('disabled', 'disabled');
  } else {
    ee.removeAttr('disabled');
  }
  return this;
};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * 元素中是否存在可见的.
 */
$.fn.hasVisibile = function () {

  var _this = typeof this.length === 'undefined' ? $(this) : this;

  for (var i = 0; i < _this.length; i++) {
    if (!!!(_this[i].offsetWidth || _this[i].offsetHeight || _this[i].getClientRects().length)) {
      continue;
    } else {
      var style = window.getComputedStyle(_this[i]);
      if (style.width !== 0 && style.height !== 0 && style.opacity !== 0 && style.display !== 'none' && style.visibility !== 'hidden') {
        return true;
      }
    }
  }

  return false;
};

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * 仅返回第一个元素的情况.
 */
$.fn.isVisibile = function () {

  var _this = typeof this.length === 'undefined' ? $(this) : this;

  if (_this.length > 0) {
    if (!!!(_this[0].offsetWidth || _this[0].offsetHeight || _this[0].getClientRects().length)) {
      return false;
    } else {
      var style = window.getComputedStyle(_this[0]);
      return style.width !== 0 && style.height !== 0 && style.opacity !== 0 && style.display !== 'none' && style.visibility !== 'hidden';
    }
  }

  return false;
};

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function resizePopover() {
  $('.febsui-popover').popoverHide();
}

// 是否支持orientationchange事件
if ('orientation' in window && 'onorientationchange' in window) {
  $(window).on('orientationchange', resizePopover);
} else {
  $(window).on('resize', resizePopover);
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

$.fn.popoverShow = function (mask, attachNode) {

  var _this = typeof this.length === 'undefined' ? $(this) : this;

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

      if (ee.isVisibile()) continue;

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
      // setTimeout(function(){
      ee.removeClass('febsui-visible').addClass('febsui-invisible');
      // }, 100);
    }
  }
  return this;
};

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function resizeSwiper() {
  var elems = $('.febsui-swiper');
  for (var i = 0; i < elems.length; i++) {
    var elem = $(elems[i]);
    elem.swiperTo(elem.swiperCurrent(), false);
  }
}

// 是否支持orientationchange事件
if ('orientation' in window && 'onorientationchange' in window) {
  $(window).on('orientationchange', resizeSwiper);
} else {
  $(window).on('resize', resizeSwiper);
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

$.fn.swiperPre = function (trigger) {

  var _this = typeof this.length === 'undefined' ? $(this) : this;

  index = parseInt(index);

  for (var i = 0; i < _this.length; i++) {
    var elem = $(_this[i]);

    if (elem.hasClass('febsui-swiper')) {
      var index = elem.attr('data-current');
      var loop = elem.attr('data-loop');
      loop = window.febs.string.isEmpty(loop) ? true : 'true' == loop;

      index = parseInt(index) - 1;

      if (loop || index >= 0) {
        elem.swiperTo(index, true, trigger);
      } else {
        elem.swiperTo(0, true, trigger);
      }
    }
  } // for.

  return this;
};

$.fn.swiperNext = function (trigger) {

  var _this = typeof this.length === 'undefined' ? $(this) : this;

  index = parseInt(index);

  for (var i = 0; i < _this.length; i++) {
    var elem = $(_this[i]);

    if (elem.hasClass('febsui-swiper')) {
      var index = elem.attr('data-current');
      var loop = elem.attr('data-loop');
      loop = window.febs.string.isEmpty(loop) ? true : 'true' == loop;

      index = parseInt(index) + 1;

      var length = elem.children('.febsui-swiper-dots').children('span').length;

      if (loop || index < length) {
        elem.swiperTo(index, true, trigger);
      } else {
        elem.swiperTo(length - 1 < 0 ? 0 : length - 1, true, trigger);
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

$.fn.swiperTo = function (index, animation, trigger) {

  var _this = typeof this.length === 'undefined' ? $(this) : this;

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
      loop = window.febs.string.isEmpty(loop) ? true : 'true' == loop;

      var pagesContainer = $(elem.children('.febsui-swiper-pages')[0]);
      var pages = pagesContainer.children('.febsui-swiper-page');
      var dots = $(elem.children('.febsui-swiper-dots')[0]).children('span');

      if (pages.length == 0) {
        continue;
      }

      index %= dots.length;
      index = index < 0 ? dots.length + index : index;

      var directionVertical = elem.hasClass('febsui-swiper-vertical');

      var resetPostion = false;

      var offset = 0;
      var indexp;
      if (loop) {
        indexp = index + 1;
        if (current == 0 && index == dots.length - 1) {
          indexp = 0;
          resetPostion = true;
        } else if (current == dots.length - 1 && index == 0) {
          indexp = pages.length - 1;
          resetPostion = true;
        }
      } else {
        indexp = index;
      }

      for (var j = 0; j < indexp; j++) {
        if (directionVertical) {
          offset += pages[j].offsetHeight;
        } else {
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
        pagesContainer.css('transform', 'translate3d(0px, ' + -offset + 'px, 0px)');
      } else {
        offset -= (elem[0].offsetWidth - pages[indexp].offsetWidth) / 2;
        pagesContainer.css('transform', 'translate3d(' + -offset + 'px, 0px, 0px)');
      }
      pagesContainer.attr('data-offset', offset);

      if (!animation) {
        setTimeout(function () {
          this.addClass('febsui-swiper-animation');
        }.bind(pagesContainer), 10);
      }

      // 重置正确的位置.
      if (resetPostion) {
        setTimeout(function () {
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
/* 52 */
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
/* 53 */
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
/* 54 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(58), __esModule: true };

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(59), __esModule: true };

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(60), __esModule: true };

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(11);
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(83);
__webpack_require__(81);
__webpack_require__(84);
__webpack_require__(85);
module.exports = __webpack_require__(11).Symbol;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(82);
__webpack_require__(86);
module.exports = __webpack_require__(29).f('iterator');


/***/ }),
/* 61 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 62 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(7);
var toLength = __webpack_require__(78);
var toAbsoluteIndex = __webpack_require__(77);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(61);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(21);
var gOPS = __webpack_require__(39);
var pIE = __webpack_require__(22);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(1).document;
module.exports = document && document.documentElement;


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(32);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(32);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(37);
var descriptor = __webpack_require__(13);
var setToStringTag = __webpack_require__(23);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(5)(IteratorPrototype, __webpack_require__(8)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 70 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(14)('meta');
var isObject = __webpack_require__(9);
var has = __webpack_require__(2);
var setDesc = __webpack_require__(6).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(12)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(6);
var anObject = __webpack_require__(10);
var getKeys = __webpack_require__(21);

module.exports = __webpack_require__(4) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(22);
var createDesc = __webpack_require__(13);
var toIObject = __webpack_require__(7);
var toPrimitive = __webpack_require__(27);
var has = __webpack_require__(2);
var IE8_DOM_DEFINE = __webpack_require__(35);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(4) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(7);
var gOPN = __webpack_require__(38).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(2);
var toObject = __webpack_require__(79);
var IE_PROTO = __webpack_require__(24)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(26);
var defined = __webpack_require__(17);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(26);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(26);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(17);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(62);
var step = __webpack_require__(70);
var Iterators = __webpack_require__(19);
var toIObject = __webpack_require__(7);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(36)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 81 */
/***/ (function(module, exports) {



/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(76)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(36)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(1);
var has = __webpack_require__(2);
var DESCRIPTORS = __webpack_require__(4);
var $export = __webpack_require__(34);
var redefine = __webpack_require__(41);
var META = __webpack_require__(71).KEY;
var $fails = __webpack_require__(12);
var shared = __webpack_require__(25);
var setToStringTag = __webpack_require__(23);
var uid = __webpack_require__(14);
var wks = __webpack_require__(8);
var wksExt = __webpack_require__(29);
var wksDefine = __webpack_require__(28);
var enumKeys = __webpack_require__(65);
var isArray = __webpack_require__(68);
var anObject = __webpack_require__(10);
var isObject = __webpack_require__(9);
var toIObject = __webpack_require__(7);
var toPrimitive = __webpack_require__(27);
var createDesc = __webpack_require__(13);
var _create = __webpack_require__(37);
var gOPNExt = __webpack_require__(74);
var $GOPD = __webpack_require__(73);
var $DP = __webpack_require__(6);
var $keys = __webpack_require__(21);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(38).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(22).f = $propertyIsEnumerable;
  __webpack_require__(39).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(20)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(5)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(28)('asyncIterator');


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(28)('observable');


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(80);
var global = __webpack_require__(1);
var hide = __webpack_require__(5);
var Iterators = __webpack_require__(19);
var TO_STRING_TAG = __webpack_require__(8)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 87 */
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

  if (options.headers) {
    delete options.headers['Content-Type'];
  }

  return window.febs.net.ajax({
    url: options.url,
    type: options.method,
    headers: options.headers,
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
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var uuid = __webpack_require__(3);
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

      var dd = $("<div class='febsui-actionsheet febsui-actionsheet-inited'></div>");
      $('body').append(dd);

      // copy attri.
      domHelper.copyAttrs(dom, dd, function (name) {
        if ('id' == name) return true;
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
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var touchEventPrevent = __webpack_require__(0).mobile_preventTouchEvent;

exports.button_init = button_init;

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

      touchEventPrevent(dom);
    }
  } // for.
}

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var domHelper = __webpack_require__(0);
var touchEventPrevent = __webpack_require__(0).mobile_preventTouchEvent;

exports.checkbox_init = checkbox_init;

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

      touchEventPrevent(dd[0]);

      // ie. for checked.
      if (window.febs.utils.browserIsIE()) {
        dom.css('display', 'none');
        var mark = $(dd.children('.febsui-checkbox-mark')[0]);
        mark.click(function (env) {
          var ee = $(env.target);
          ee = ee.prev('input');
          if (ee[0]) {
            ee[0].checked = !ee[0].checked;
            ee.parent().checkboxChange();
          }
        });
      } // if.
    }
  } // for.
}

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */

var crypt = __webpack_require__(3);
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

  var foo = 'page' + crypt.uuid();
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
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var touchEventPrevent = __webpack_require__(0).mobile_preventTouchEvent;

var uuid = __webpack_require__(3);
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

      var dd = $("<div class='febsui-popover febsui-popover-inited'></div>");

      // data-direction
      var direction = dom.attr('data-direction');
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
        if ('id' == name) return true;
        return name.indexOf('data-') == 0;
      });

      touchEventPrevent(dom[0]);

      dd.append(dom);
    }
  } // for.
}

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var touchEventPrevent = __webpack_require__(0).mobile_preventTouchEvent;

exports.swiper_init = swiper_init;

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

  if (touch) {
    if (event.target.getAttribute('data-ispage') === '1') {
      var target = event.target.parentNode;
      $(target).removeClass('febsui-swiper-animation');

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
      return true;
    } else {
      return true;
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

  if (touch) {
    var target = event.target;
    if (target.getAttribute('data-ispage') === '1') {
      target = target.parentNode;
      if (!target.__swiper_start) return;

      if (!target.__swiper_start_scroll) {
        var span1;
        var span2;

        if (target.__swiper_vertical) {
          span1 = Math.abs(target.__swiper_touch - touch.clientY);
          span2 = Math.abs(target.__swiper_touch1 - touch.clientX);
        } else {
          span1 = Math.abs(target.__swiper_touch - touch.clientX);
          span2 = Math.abs(target.__swiper_touch1 - touch.clientY);
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
        offset += target.__swiper_touch - touch.clientY;
        target.style['transform'] = 'translate3d(0px, ' + -offset + 'px, 0px)';
      } else {
        offset += target.__swiper_touch - touch.clientX;
        target.style['transform'] = 'translate3d(' + -offset + 'px, 0px, 0px)';
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
  } else {
    touch = { clientX: event.clientX, clientY: event.clientY };
  }

  if (touch) {
    var target = event.target;
    if (target.getAttribute('data-ispage') === '1') {
      $(target.parentNode).addClass('febsui-swiper-animation');

      var targetPage = target.parentNode;
      if (!targetPage.__swiper_start) return;

      delete targetPage.__swiper_start;

      target = target.parentNode.parentNode;
      var current = target.getAttribute('data-current');

      var swipeSpan = 0;
      if (targetPage.__swiper_vertical) {
        swipeSpan = Math.abs(targetPage.__swiper_touch - touch.clientY);
      } else {
        swipeSpan = Math.abs(targetPage.__swiper_touch - touch.clientX);
      }

      var swipe = swipeSpan > 140 || Date.now() - targetPage.__swiper_touch_at < 200 && swipeSpan > 30;

      if (targetPage.__swiper_vertical) {
        if (swipe || swipeSpan >= target.offsetHeight / 2) {
          if (targetPage.__swiper_touch > touch.clientY) $(target).swiperNext(true);else $(target).swiperPre(true);
        } else {
          $(target).swiperTo(current, true, true);
        }
      } else {
        if (swipe || swipeSpan >= target.offsetWidth / 2) {
          if (targetPage.__swiper_touch > touch.clientX) $(target).swiperNext(true);else $(target).swiperPre(true);
        } else {
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

    dataShowDots = window.febs.string.isEmpty(dataShowDots) ? true : 'true' == dataShowDots;
    dataLoop = window.febs.string.isEmpty(dataLoop) ? true : 'true' == dataLoop;
    dataAuto = window.febs.string.isEmpty(dataAuto) ? 0 : parseInt(dataAuto);
    dataAuto = dataAuto === 0 ? 0 : dataAuto ? dataAuto : 7000;

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
          pagesCount++;
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
      } else {
        dataActiveIndex %= pagesCount;
        dataActiveIndex = dataActiveIndex < 0 ? pagesCount + dataActiveIndex : dataActiveIndex;
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

      dom.html('');
      dom.append(pages);
      dom.append(dots);
      dom.attr('data-current', 0);
      if (dataActiveIndex != 0) dom.swiperTo(dataActiveIndex, false);

      if (dom.hasClass('febsui-swiper-vertical')) {
        pages[0].__swiper_vertical = true;
      }

      setTimeout(function () {
        this.addClass('febsui-swiper-animation');
      }.bind(pages), 10);

      if (dataAuto) {
        setInterval(function () {
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
          } else {
            pages.detachEvent('ontouchstart', mobile_onTouchstart);
            pages.detachEvent('ontouchmove', mobile_onTouchmove);
            pages.detachEvent('ontouchend', mobile_onTouchend);
            pages.detachEvent('ontouchcancel', mobile_onTouchcancel);

            pages.attachEvent('ontouchstart', mobile_onTouchstart);
            pages.attachEvent('ontouchmove', mobile_onTouchmove);
            pages.attachEvent('ontouchend', mobile_onTouchend);
            pages.attachEvent('ontouchcancel', mobile_onTouchcancel);
          }
        } else {
          if (pages.addEventListener) {
            pages.removeEventListener('mousedown', mobile_onTouchstart);
            pages.removeEventListener('mousemove', mobile_onTouchmove);
            pages.removeEventListener('mouseup', mobile_onTouchend);
            pages.removeEventListener('mouseout', mobile_onTouchcancel);

            pages.addEventListener('mousedown', mobile_onTouchstart, true);
            pages.addEventListener('mousemove', mobile_onTouchmove, true);
            pages.addEventListener('mouseup', mobile_onTouchend, true);
            pages.addEventListener('mouseout', mobile_onTouchcancel, true);
          } else {
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

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var touchEventPrevent = __webpack_require__(0).mobile_preventTouchEvent;

exports.switch_init = switch_init;

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
      dom.click(function () {
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
      });

      touchEventPrevent(dom[0]);
    }
  } // for.
}

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = __webpack_require__(16)['default'];

var uuid = __webpack_require__(3);

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
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */



var _JSON$stringify = __webpack_require__(55)['default'];

var net = window.febs.net;
var utils = window.febs.utils;
var crypt = window.febs.crypt;
var err = __webpack_require__(15);

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
    body: _JSON$stringify({ filesize: control_uploadSeg_file.length, chunks: control_uploadSeg_chunks, data: cfg.data }),
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
/* 97 */
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
var escape_string = __webpack_require__(98).escape_string;

var uuid = __webpack_require__(3);
var upload = __webpack_require__(43);
var uploadErr = __webpack_require__(15);
var dialog = __webpack_require__(30);

// ie9.
var ie99 = window.febs.utils.browserIEVer() <= 9;

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
      if (window.febs.string.isEmpty(dataApi)) {
        throw new Error("uploader need attribute: data-api");
      }

      var uid = 'febsui-uploader-' + uuid.uuid();

      var html = dom.html();
      dom.html('');

      var submitHtml = '';
      if (ie99) {
        submitHtml = '<input type="submit" value="submit">';
      }

      var htmlForm = '<form id="' + uid + '-form" method="post" role="form" enctype="multipart/form-data" style="display:none">\n  <input id="' + uid + '" type="file" name="file" multiple' + (dataAccept ? ' accept="' + dataAccept + '"' : '') + '>\n  ' + submitHtml + '\n</form>';
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
        });

        // 上传.
        upload.upload({
          formObj: $('#' + _uid + '-form'),
          fileObj: $('#' + _uid),
          uploadUrl: _dataApi,
          maxFileSize: _dataMaxSize,
          beginCB: function beginCB(fileObj, uploader) {
            cancelControl = uploader;

            var uid = fileObj.attr('id');

            var filename = '';

            if (ie99) {
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
                var controlId = 'febsui-cancel-' + uuid.uuid();

                eval(_dataBegin + ('(window["febsui-uploader-controller-' + uid + '"], "' + filename + '")'));
              } else {
                eval(_dataBegin);
              }
            }

            window["febsui-uploader-controller-" + uid].trigger('uploadBegin', { filename: filename });
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
                  eval(_dataError + ('(window["febsui-uploader-controller-' + uid + '"], "\'+err+\'")'));
                } else {
                  eval(_dataError);
                }
              }

              window["febsui-uploader-controller-" + uid].trigger('uploadError', { err: err });
              delete window["febsui-uploader-controller-" + uid];

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

                    var finishData = 'febsui-finish-' + uuid.uuid();
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

            window["febsui-uploader-controller-" + uid].trigger('uploadProgress', { progress: parseFloat(pp) });
          }
        });
        // } // if.
      });
    }
  } // for.
}

/***/ }),
/* 98 */
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

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

var _typeof = __webpack_require__(16)["default"];

// require('es5-shim');
// require('es5-shim/es5-sham');
// require('console-polyfill');
// require('babel-polyfill');
// require('../third-party/bluebird.min.js');
// require('../third-party/bignumber.min.js');


(function (global, factory) {

  "use strict";

  if (( false ? "undefined" : _typeof(module)) === "object" && _typeof(module.exports) === "object") {

    // For CommonJS and CommonJS-like environments where a proper `window`
    // For environments that do not have a `window` with a `document`
    // (such as Node.js), expose a factory as module.exports.
    // This accentuates the need for the creation of a real `window`.

    if (global.document) {
      if (!global['febs']) {
        throw new Error('febsui requires `febs` or `febs-browser` library; Please require `febs`/`febs-browser` before febsui');
      }
    }

    module.exports = global.document ? factory(global, true) : function (w) {
      if (!w.document) {
        throw new Error("febsui requires a window with a document");
      }
      if (!w['febs']) {
        throw new Error('febsui requires `febs` or `febs-browser` library; Please require `febs`/`febs-browser` before febsui');
      }
      return factory(w);
    };
  } else {
    factory(global);
  }

  // Pass this if window is not defined yet
})(typeof window !== "undefined" ? window : undefined, function (window, noGlobal) {

  /**
   * jquery plugins.
   */
  __webpack_require__(49);
  __webpack_require__(48);

  var febsui = __webpack_require__(44);
  window['febsui'] = febsui;

  /**
   * jquery plugins.
   */
  __webpack_require__(47);

  __webpack_require__(45);
  __webpack_require__(31);
  __webpack_require__(50);
  __webpack_require__(52);
  __webpack_require__(51);
  __webpack_require__(46);
  __webpack_require__(53);

  return febsui;
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(54)(module)))

/***/ })
/******/ ]);
//# sourceMappingURL=febsui.js.map