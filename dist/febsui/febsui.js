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
/******/ 	return __webpack_require__(__webpack_require__.s = 92);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 1 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 2 */
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(13)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(5);
var createDesc = __webpack_require__(14);
module.exports = __webpack_require__(3) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(11);
var IE8_DOM_DEFINE = __webpack_require__(34);
var toPrimitive = __webpack_require__(27);
var dP = Object.defineProperty;

exports.f = __webpack_require__(3) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(63);
var defined = __webpack_require__(17);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(25)('wks');
var uid = __webpack_require__(15);
var Symbol = __webpack_require__(0).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(53);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(52);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2['default'] === "function" && typeof _iterator2['default'] === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2['default'] === "function" && obj.constructor === _symbol2['default'] && obj !== _symbol2['default'].prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = typeof _symbol2['default'] === "function" && _typeof(_iterator2['default']) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2['default'] === "function" && obj.constructor === _symbol2['default'] && obj !== _symbol2['default'].prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 10 */
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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(8);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.5' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 14 */
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
/* 15 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

var _typeof = __webpack_require__(9)["default"];

/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */

(function (global, factory) {

	"use strict";

	if (( false ? "undefined" : _typeof(module)) === "object" && _typeof(module.exports) === "object") {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		module.exports = global.document ? factory(global, true) : function (w) {
			if (!w.document) {
				throw new Error("febs-ui requires a window with a document");
			}
			return factory(w);
		};
	} else {
		factory(global);
	}

	// Pass this if window is not defined yet
})(typeof window !== "undefined" ? window : undefined, function (window, noGlobal) {

	'use strict';

	if (!window.febs) {
		throw new Error("febs-ui requires febs");
	}

	var err_nofile = 'nofile error'; // 未选择文件.
	var err_sizeExceed = 'sizeExceed error'; // 文件太大.
	var err_crc32 = 'crc32 error'; // 计算本地文件hash值时错误.
	var err_net = 'network error'; // ajax上传时出错.

	return {
		nofile: err_nofile,
		sizeExceed: err_sizeExceed,
		crc32: err_crc32,
		net: err_net
	};
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)(module)))

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
var $keys = __webpack_require__(39);
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

var def = __webpack_require__(5).f;
var has = __webpack_require__(1);
var TAG = __webpack_require__(7)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(25)('keys');
var uid = __webpack_require__(15);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
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
var isObject = __webpack_require__(8);
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

var global = __webpack_require__(0);
var core = __webpack_require__(12);
var LIBRARY = __webpack_require__(20);
var wksExt = __webpack_require__(29);
var defineProperty = __webpack_require__(5).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(7);


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var uuid = __webpack_require__(2);

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
if ('orientation' in window && 'onorientationchange' in window) {
  $(window).on('orientationchange', resizeDialog);
} else {
  $(window).on('resize', resizeDialog);
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
        if (!selector.hasClass('febsui-dialog-init')) {
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
document.addEventListener('keyup', function (event) {
  if (event.which == '27') {
    hide();
  }
});

/**
* ctx.title:    标题.
* ctx.content:	内容文字.
* ctx.confirm: function(){}	// 点击确认键的回调.
* ctx.okText
*/
function showAlert(ctx) {

  if (typeof ctx === 'string') {
    ctx = { content: ctx };
  }

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

  $("body").append($('<div' + ' id="' + uid + '" class="febsui-dialog' + mask + '" role="alert"><div class="febsui-dialog-container">' + (ctx.title ? '<div class="febsui-dialog-title">' + ctx.title + '</div>' : '') + '<div class="febsui-dialog-content">' + ctx.content + '</div><ul class="febsui-dialog-buttons"><li style="width:100%;' + styleBorder + '"><a class="febsui-dialog-cancel">' + ctx.okText + '</a></li></ul></div></div>'));
  resizeDialog();

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
* ctx.confirm: function(){}	// 点击确认键的回调.
* ctx.cancel:  function(){} // 点击取消键的回调.
* ctx.okText:
* ctx.cancelText:
*/
function showConfirm(ctx) {
  if (!ctx.okText) ctx.okText = "确认";
  if (!ctx.cancelText) ctx.cancelText = "取消";

  escape_string(ctx);

  // if ($('.febsui-dialog').length > 0) {
  // 	$('.febsui-dialog').remove();
  // }

  var uid = 'febs-' + uuid.uuid();

  var mask = '';
  if (!$('.febsui-mask').hasVisibile()) {
    mask = ' febsui-mask';
  }

  $("body").append($('<div' + ' id="' + uid + '" class="febsui-dialog' + mask + '" role="alert"><div class="febsui-dialog-container">' + (ctx.title ? '<div class="febsui-dialog-title">' + ctx.title + '</div>' : '') + '<div class="febsui-dialog-content">' + ctx.content + '</div><ul class="febsui-dialog-buttons"><li' + (isIE9 ? ' style="' + styleBorder + '"' : '') + '><a class="febsui-dialog-cancel">' + ctx.cancelText + '</a></li><li' + (isIE9 ? ' style="' + styleBorder + '"' : '') + '><a class="febsui-dialog-ok">' + ctx.okText + '</a></li></ul></div></div>'));
  resizeDialog();

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
  $(document).one('keyup', function (event) {
    if (event.which == '27') {
      if (ctx.cancel) ctx.cancel.bind(ele)();
      hide(ele);
    }
  });
}

/**
* ctx.title:    标题.
* ctx.content:		 内容文字.
* ctx.editText:		 输入框文字.
* ctx.confirm: function(text){}	// 点击确认键的回调.
* ctx.cancel:  function(){} // 点击取消键的回调.
* ctx.okText:
* ctx.cancelText:
*/
function showConfirmEdit(ctx) {
  if (!ctx.okText) ctx.okText = "确认";
  if (!ctx.cancelText) ctx.cancelText = "取消";

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

  var elems = '<div' + ' id="' + uid + '" class="febsui-dialog' + mask + '" role="alert"><div class="febsui-dialog-container">' + (ctx.title ? '<div class="febsui-dialog-title">' + ctx.title + '</div>' : '') + '<div class="febsui-dialog-content">' + ctx.content + '</div>' + '<div class="febsui-dialog-edit"><input class="febsui-dialog-input-text" type="text" value="' + (ctx.editText ? ctx.editText : '') + '">' + '</div>' + '<ul class="febsui-dialog-buttons"><li' + (isIE9 ? ' style="' + styleBorder + '"' : '') + '><a class="febsui-dialog-cancel">' + ctx.cancelText + '</a></li><li' + (isIE9 ? ' style="' + styleBorder + '"' : '') + '><a class="febsui-dialog-ok">' + ctx.okText + '</a></li></ul></div></div>';

  $("body").append($(elems));
  resizeDialog();

  setTimeout(function () {
    $('#' + uid).addClass('febsui-visible');
  }, 10);

  //close popup
  var ele = $('#' + uid);
  ele.on('click', function (event) {
    if ($(event.target).hasClass('febsui-dialog-ok')) {
      event.preventDefault();
      if (ctx.confirm) ctx.confirm.bind(ele)($('#' + uid + ' .febsui-dialog-edit .febsui-dialog-input-text').val());
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
  $(document).one('keyup', function (event) {
    if (event.which == '27') {
      if (ctx.cancel) ctx.cancel.bind(ele)();
      hide(ele);
    }
  });
}

/**
 * jquery plugin.
 */

exports.dialog_init = dialog_init;

/**
* @desc: 初始化dialog控件.
*        对页面上 的所有 <dialog> 元素进行初始化.
*/
function dialog_init() {
  var elems = $('dialog');
  for (var i = 0; i < elems.length; i++) {
    var dom = $(elems[i]);

    if (!dom.hasClass('febsui-dialog-container')) {
      dom.addClass('febsui-dialog-container');

      var dd = $("<div class='febsui-dialog febsui-dialog-init' role='alert'></div>");
      $('body').append(dd);
      var did = dom.attr('id');
      if (did) {
        dd.attr('id', did);
        dom.removeAttr('id');
      }
      dd.append(dom);
    }
  } // for.
}

/***/ }),
/* 31 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(8);
var document = __webpack_require__(0).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var core = __webpack_require__(12);
var ctx = __webpack_require__(60);
var hide = __webpack_require__(4);
var has = __webpack_require__(1);
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
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(3) && !__webpack_require__(13)(function () {
  return Object.defineProperty(__webpack_require__(32)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(20);
var $export = __webpack_require__(33);
var redefine = __webpack_require__(40);
var hide = __webpack_require__(4);
var Iterators = __webpack_require__(19);
var $iterCreate = __webpack_require__(65);
var setToStringTag = __webpack_require__(23);
var getPrototypeOf = __webpack_require__(71);
var ITERATOR = __webpack_require__(7)('iterator');
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
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(11);
var dPs = __webpack_require__(68);
var enumBugKeys = __webpack_require__(18);
var IE_PROTO = __webpack_require__(24)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(32)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(62).appendChild(iframe);
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
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(39);
var hiddenKeys = __webpack_require__(18).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 38 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(1);
var toIObject = __webpack_require__(6);
var arrayIndexOf = __webpack_require__(59)(false);
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
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

var _typeof = __webpack_require__(9)["default"];

/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */

(function (global, factory) {

  "use strict";

  if (( false ? "undefined" : _typeof(module)) === "object" && _typeof(module.exports) === "object") {

    // For CommonJS and CommonJS-like environments where a proper `window`
    // For environments that do not have a `window` with a `document`
    // (such as Node.js), expose a factory as module.exports.
    // This accentuates the need for the creation of a real `window`.
    module.exports = global.document ? factory(global, true) : function (w) {
      if (!w.document) {
        throw new Error("febs-ui requires a window with a document");
      }
      return factory(w);
    };
  } else {
    factory(global);
  }

  // Pass this if window is not defined yet
})(typeof window !== "undefined" ? window : undefined, function (window, noGlobal) {

  'use strict';

  if (!window.febs) {
    throw new Error("febs-ui requires febs");
  }

  var crypt = window.febs.crypt;
  var err = __webpack_require__(16);
  var ajaxSubmit = __webpack_require__(83).ajaxSubmit;
  var uuid = __webpack_require__(2);

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
   *                beginCB:     , // 上传开始的回调. function(uploader); 调用uploader.abort() 可以停止上传.
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

      var iframeDom = "<iframe id=\"" + uid + "\" name=\"" + uid + "\" style=\"display:none;\"></iframe>";
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

      if (control_upload_begin_cb) control_upload_begin_cb({ abort: function abort() {
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
            if (control_upload_begin_cb) control_upload_begin_cb(con);
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

  return { upload: upload };
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)(module)))

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// import { $ } from 'febs-browser';

// require('febs-browser');

if (!$) {
  throw new Error('must import febs first');
}

var loading = __webpack_require__(86);
exports.loading_isVisiable = loading.loading_isVisiable;
exports.loading_show = loading.loading_show;
exports.loading_show_text = loading.loading_show_text;
exports.loading_hide = loading.loading_hide;

exports.page_init = __webpack_require__(87).page_init;
exports.uploadBase64 = __webpack_require__(91).uploadBase64;
exports.upload = __webpack_require__(41).upload;
exports.uploadErr = __webpack_require__(16);

var toast = __webpack_require__(90);
exports.toast = toast.showToast;
exports.toast_hide = toast.hideToast;

var dialog = __webpack_require__(30);
exports.dialog_hide = dialog.hide;
exports.dialog_showAlert = dialog.showAlert;
exports.dialog_showConfirm = dialog.showConfirm;
exports.dialog_showConfirmEdit = dialog.showConfirmEdit;

var switcha = __webpack_require__(89);
exports.ui_switch_init = switcha.switch_init;

var popovera = __webpack_require__(88);
exports.ui_popover_init = popovera.popover_init;

var dialoga = __webpack_require__(30);
exports.ui_dialog_init = dialoga.dialog_init;

var actionsheeta = __webpack_require__(85);
exports.ui_actionsheet_init = actionsheeta.actionsheet_init;

var uploadera = __webpack_require__(84);
exports.ui_uploader_init = uploadera.uploader_init;

/**
* @desc: 初始化所有ui
* @return: 
*/
exports.ui_init = function () {
  switcha.switch_init();
  popovera.popover_init();
  dialoga.dialog_init();
  actionsheeta.actionsheet_init();
  uploadera.uploader_init();
};

// for mobile hover.
$(document).on('touchstart', function () {});

$(document).ready(function () {
  // init.
  exports.ui_init();
});

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


$.fn.isActionsheet = function () {

  var _this = typeof this.length === 'undefined' ? $(this) : this;

  if (_this.length >= 1) {
    if (_this[0].nodeName.toLowerCase() == 'actionsheet') {
      return true;
    } else {
      return $(_this[0]).hasClass('febsui-actionsheet');
    }
  }

  return false;
};

$.fn.actionsheetShow = function () {

  var _this = typeof this.length === 'undefined' ? $(this) : this;

  for (var i = 0; i < _this.length; i++) {
    var ee = $(_this[i]);
    if (ee[0].nodeName.toLowerCase() == 'actionsheet') {
      ee = ee.parent();
    }
    if (ee.hasClass('febsui-actionsheet')) {

      if (ee.isVisibile()) continue;

      var mask = '';
      if (!$('.febsui-mask').hasVisibile()) {
        ee.addClass('febsui-mask');
      } else {
        ee.removeClass('febsui-mask');
      }

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
    if (ee[0].nodeName.toLowerCase() == 'actionsheet') {
      ee = ee.parent();
    }
    if (ee.hasClass('febsui-actionsheet')) {
      setTimeout(function () {
        ee.removeClass('febsui-visible').addClass('febsui-invisible');
      }, 100);
    }
  }
  return this;
};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


$.fn.isDialog = function () {

  var _this = typeof this.length === 'undefined' ? $(this) : this;

  if (_this.length >= 1) {
    if (_this[0].nodeName.toLowerCase() == 'dialog') {
      return true;
    } else {
      return $(_this[0]).hasClass('febsui-dialog');
    }
  }

  return false;
};

$.fn.dialogShow = function () {

  var _this = typeof this.length === 'undefined' ? $(this) : this;

  for (var i = 0; i < _this.length; i++) {
    var ee = $(_this[i]);
    if (ee[0].nodeName.toLowerCase() == 'dialog') {
      ee = ee.parent();
    }
    if (ee.hasClass('febsui-dialog')) {

      if (!$('.febsui-mask').hasVisibile()) {
        ee.addClass('febsui-mask');
      } else {
        ee.removeClass('febsui-mask');
      }

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
    if (ee[0].nodeName.toLowerCase() == 'dialog') {
      ee = ee.parent();
    }
    if (ee.hasClass('febsui-dialog-init')) {
      ee.removeClass('febsui-visible').addClass('febsui-invisible');
    }
  }
  return this;
};

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * 仅返回第一个元素的情况.
 */
$.fn.isDisabled = function () {

  var ee = this;

  // switch.
  if (ee.isSwitch()) return ee.switchIsDisabled();

  var dis = ee.attr('disabled');
  return !!dis;
};

$.fn.setDisabled = function (isDisable) {

  var ee = this;

  // switch.
  if (ee.isSwitch()) return ee.switchDisabled(isDisable);

  if (isDisable) {
    ee.attr('disabled', 'disabled');
  } else {
    ee.removeAttr('disabled');
  }
  return this;
};

/***/ }),
/* 46 */
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
/* 47 */
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
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function resizePopover() {
  $('popover').popoverHide();
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
    if (_this[0].nodeName.toLowerCase() == 'popover') {
      return true;
    } else {
      return $(_this[0]).hasClass('febsui-popover');
    }
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
    if (ee[0].nodeName.toLowerCase() == 'popover') {
      ee = ee.parent();
    }

    if (ee.hasClass('febsui-popover')) {

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

      var eee = ee.children('popover');
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

          // auto.
          // data-direction
          if (attrDirection == 'auto') {
            var direction2;

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
            }

            var arrow = eee.children('.febsui-popover-arrow');

            arrow.removeClass('febsui-popover-arrow-left');
            arrow.removeClass('febsui-popover-arrow-right');
            arrow.removeClass('febsui-popover-arrow-top');
            arrow.removeClass('febsui-popover-arrow-bottom');
            arrow.addClass('febsui-popover-arrow-' + direction2);

            if (direction2 == 'top' || direction2 == 'bottom') {
              direction2 = 'left';
            } else if (direction2 == 'left' || direction2 == 'right') {
              direction2 = 'top';
            }
            arrow.css('top', '');
            arrow.css('bottom', '');
            arrow.css('left', '');
            arrow.css('right', '');
            arrow.css(direction2, offset + 'px');
          } else {
            if (attrDirection == 'left') {
              top = parseInt(top + height / 2 - offset - dis);
              left = left + width + dis;
            } else if (attrDirection == 'right') {
              top = parseInt(top + height / 2 - offset - dis);
              left = left - width2 - dis;
            } else if (attrDirection == 'top') {
              top = parseInt(top + height + dis);
              left = parseInt(left + width / 2 - offset - dis);
            } else if (attrDirection == 'bottom') {
              top = parseInt(top - height2 - dis);
              left = parseInt(left + width / 2 - offset - dis);
            }
          }

          eee.css('top', top + docoffset.top + 'px');
          eee.css('left', left + docoffset.left + 'px');
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
    if (ee[0].nodeName.toLowerCase() == 'popover') {
      ee = ee.parent();
    }
    if (ee.hasClass('febsui-popover')) {
      setTimeout(function () {
        ee.removeClass('febsui-visible').addClass('febsui-invisible');
      }, 100);
    }
  }
  return this;
};

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


$.fn.isSwitch = function () {
  var _this = typeof this.length === 'undefined' ? $(this) : this;

  if (_this.length >= 1) {
    var elem = _this[0]._swtichEvents;
    if (!!elem) {
      return true;
    }

    if (_this[0].nodeName.toLowerCase() == 'switch') {
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
      var elem = _this[i];

      if (elem._swtichEvents) {
        elem._swtichEvents.push(cb);
      } // if.
    } // for.
  }
  // trigger.
  else {
      for (var i = 0; i < _this.length; i++) {
        var elem = _this[i];
        var ee = elem._swtichEvents;
        if (ee) {
          for (var i = 0; i < ee.length; i++) {
            ee[i].bind(elem)();
          }
        }
      } // for.
    } // if..else.
  return this;
};

$.fn.switchOn = function (isOn, trigger) {

  var _this = typeof this.length === 'undefined' ? $(this) : this;

  for (var i = 0; i < _this.length; i++) {
    var elem = _this[i];

    if (elem._swtichEvents) {
      if (isOn) {
        if (elem.hasClass("febsui-switch-off")) {
          elem.removeClass("febsui-switch-off").addClass("febsui-switch-on");
          if (trigger) {
            elem['switch']();
          }
        }
      } else {
        if (!elem.hasClass("febsui-switch-off")) {
          elem.removeClass("febsui-switch-on").addClass("febsui-switch-off");
          if (trigger) {
            elem['switch']();
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
    var elem = _this[i];

    if (elem._swtichEvents) {
      if (isDisable) elem.addClass("febsui-switch-disabled");else elem.removeClass("febsui-switch-disabled");
    } // if.
  } // for.
  return this;
};

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * jquery plugin.
 */

$.fn.uploaderReset = function () {
  var _this = typeof this.length === 'undefined' ? $(this) : this;
  if (_this[0] && _this[0].nodeName.toLowerCase() == 'uploader') {
    for (var i = 0; i < _this.length; i++) {
      var ee = $(_this[i]);
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
    }
  } // if.

  return this;
};

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(54), __esModule: true };

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(55), __esModule: true };

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(56), __esModule: true };

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(12);
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(79);
__webpack_require__(77);
__webpack_require__(80);
__webpack_require__(81);
module.exports = __webpack_require__(12).Symbol;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(78);
__webpack_require__(82);
module.exports = __webpack_require__(29).f('iterator');


/***/ }),
/* 57 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 58 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(6);
var toLength = __webpack_require__(74);
var toAbsoluteIndex = __webpack_require__(73);
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
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(57);
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
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(21);
var gOPS = __webpack_require__(38);
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
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(0).document;
module.exports = document && document.documentElement;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(31);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(31);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(36);
var descriptor = __webpack_require__(14);
var setToStringTag = __webpack_require__(23);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(4)(IteratorPrototype, __webpack_require__(7)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 66 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(15)('meta');
var isObject = __webpack_require__(8);
var has = __webpack_require__(1);
var setDesc = __webpack_require__(5).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(13)(function () {
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
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(5);
var anObject = __webpack_require__(11);
var getKeys = __webpack_require__(21);

module.exports = __webpack_require__(3) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(22);
var createDesc = __webpack_require__(14);
var toIObject = __webpack_require__(6);
var toPrimitive = __webpack_require__(27);
var has = __webpack_require__(1);
var IE8_DOM_DEFINE = __webpack_require__(34);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(3) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(6);
var gOPN = __webpack_require__(37).f;
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
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(1);
var toObject = __webpack_require__(75);
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
/* 72 */
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
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(26);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(26);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(17);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(58);
var step = __webpack_require__(66);
var Iterators = __webpack_require__(19);
var toIObject = __webpack_require__(6);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(35)(Array, 'Array', function (iterated, kind) {
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
/* 77 */
/***/ (function(module, exports) {



/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(72)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(35)(String, 'String', function (iterated) {
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
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(0);
var has = __webpack_require__(1);
var DESCRIPTORS = __webpack_require__(3);
var $export = __webpack_require__(33);
var redefine = __webpack_require__(40);
var META = __webpack_require__(67).KEY;
var $fails = __webpack_require__(13);
var shared = __webpack_require__(25);
var setToStringTag = __webpack_require__(23);
var uid = __webpack_require__(15);
var wks = __webpack_require__(7);
var wksExt = __webpack_require__(29);
var wksDefine = __webpack_require__(28);
var enumKeys = __webpack_require__(61);
var isArray = __webpack_require__(64);
var anObject = __webpack_require__(11);
var isObject = __webpack_require__(8);
var toIObject = __webpack_require__(6);
var toPrimitive = __webpack_require__(27);
var createDesc = __webpack_require__(14);
var _create = __webpack_require__(36);
var gOPNExt = __webpack_require__(70);
var $GOPD = __webpack_require__(69);
var $DP = __webpack_require__(5);
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
  __webpack_require__(37).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(22).f = $propertyIsEnumerable;
  __webpack_require__(38).f = $getOwnPropertySymbols;

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
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(4)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(28)('asyncIterator');


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(28)('observable');


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(76);
var global = __webpack_require__(0);
var hide = __webpack_require__(4);
var Iterators = __webpack_require__(19);
var TO_STRING_TAG = __webpack_require__(7)('toStringTag');

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
/* 83 */
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
/* 84 */
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

var uuid = __webpack_require__(2);
var upload = __webpack_require__(41);
var uploadErr = __webpack_require__(16);
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
* @desc: 初始化page控件.
* @param elem: 将控件插入到elem中, elem是一个jquery的对象.
* @param curPage: 当前页
* @param pageCount: 总页数
* @param totalCount: 总条数
* @param pageCallback: 页面跳转函数, function(page) {}
* @return: 
*/
function uploader_init() {
  var elems = $('uploader');
  for (var i = 0; i < elems.length; i++) {
    var dom = $(elems[i]);

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

      //
      // event.
      //
      $('#' + uid).change(function (env) {

        var uploader = $(this).parent().parent('uploader');

        var _uid = $(this).attr('id');

        if (window.febs.string.isEmpty(this.value) || $('#' + _uid)[0].files && $('#' + _uid)[0].files.length <= 0) {
          return;
        }

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

        var uploader = $(this).parent().parent('uploader');

        var _dataApi = uploader.attr('data-api');
        var _dataMaxSize = uploader.attr('data-maxsize');
        var _dataBegin = uploader.attr('data-begin');
        var _dataFinish = uploader.attr('data-finish');
        var _dataError = uploader.attr('data-error');

        // if ($('#'+_uid)[0].files) {

        var cancelControl;
        var filename = '';

        if (ie99) {
          var indexsp = this.value.lastIndexOf('\\');
          if (indexsp > 0) {
            indexsp = this.value.substr(indexsp + 1);
          } else {
            indexsp = this.value.lastIndexOf('/');
            if (indexsp < 0) {
              console.log('can\'t find filename');indexsp = '';
            } else indexsp = this.value.substr(indexsp + 1);
          }

          filename = indexsp;
          $('#' + _uid + '-filename').html(filename);
        } else {
          filename = $('#' + _uid)[0].files[0].name;
          $('#' + _uid + '-filename').html(filename);
        }

        // trim.
        if (_dataFinish) {
          _dataFinish = _dataFinish.replace(/(^\s*)|(\s*$)/g, "");
        }
        if (_dataError) {
          _dataError = _dataError.replace(/(^\s*)|(\s*$)/g, "");
        } else {
          _dataError = '_Feb_fegegRRdefaultUploaderError';
        }

        _dataMaxSize = _dataMaxSize ? parseInt(_dataMaxSize) : 0;

        // 取消.
        cancel.attr('style', 'display:inline !important;');
        cancel.one('click', function () {
          uploader.uploaderReset();
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
          beginCB: function beginCB(uploader) {
            cancelControl = uploader;

            if (_dataBegin) {
              var i = 0;
              for (; i < _dataBegin.length; i++) {
                if (!(_dataBegin[i] >= 'a' && _dataBegin[i] <= 'z' || _dataBegin[i] >= 'A' && _dataBegin[i] <= 'Z' || _dataBegin[i] == '_')) {
                  break;
                }
              }
              if (i >= _dataBegin.length) {
                var controlId = 'febsui-cancel-' + uuid.uuid();
                window[controlId] = uploader;

                filename = window.febs.string.replace(filename, '"', '\"');
                eval(_dataBegin + ('(window["' + controlId + '"], "' + filename + '")'));
                delete window[controlId];
              } else {
                eval(_dataBegin);
              }
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
                  eval(_dataError + '("' + err + '")');
                } else {
                  eval(_dataError);
                }
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
                    eval(_dataFinish + ('(window["' + finishData + '"])'));
                    delete window[finishData];
                  } else {
                    eval(_dataFinish);
                  }
                }
              }
          },
          progressCB: function progressCB(fileObj, percent) {
            percent = percent * 100 + "%";
            progressBg.css('width', percent);
            progressSpan.html(percent);
          }
        });
        // } // if.
      });
    }
  } // for.
}

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var uuid = __webpack_require__(2);

exports.actionsheet_init = actionsheet_init;

/**
* @desc: 初始化popover控件.
*        对页面上 的所有 <actionsheet> 元素进行初始化.
*/
function actionsheet_init() {
  var elems = $('actionsheet');
  for (var i = 0; i < elems.length; i++) {
    var dom = $(elems[i]);

    if (!dom.hasClass('febsui-actionsheet-inited')) {

      dom.addClass('febsui-actionsheet-inited');

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

      var dd = $("<div class='febsui-actionsheet'></div>");
      $('body').append(dd);
      var did = dom.attr('id');
      if (did) {
        dd.attr('id', did);
        dom.removeAttr('id');
        // copy attri.
        var attris = dom[0].attributes;
        if (attris) {
          for (var j = 0; j < attris.length; j++) {
            if (attris[j].nodeName.indexOf('data-') == 0) {
              dd.attr(attris[j].nodeName, dom.attr(attris[j].nodeName));
            }
          }
        }
      }

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
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
* @return: 
*/
function loading_show(text, timeout) {

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
    $('#' + loading_tag_name).html('<div class="febsui-loading-c"><div class="febsui-loading"><div class="febsui-loading-spin"></div><p>' + (text ? text : '') + '</p></div></div>');
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
};

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */

var crypt = __webpack_require__(2);

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
  var urlPrePageClass = curPage > 1 ? 'febsui_pagepre' : 'febsui_pagepre_no';
  var urlNextPage = curPage < pageCount ? foo + '(' + (curPage + 1) + ')' : 'javascript:;';
  var urlNextPageClass = curPage < pageCount ? 'febsui_pagenxt' : 'febsui_pagenxt_no';

  var e = elem.children('.febsui-pagin');
  if (e && e.length > 0) {
    $(e[0]).remove();
  }

  elem.append('<div class="febsui-pagin">\
  <div class="message">\
    共<i class="blue">' + totalCount + '</i>条记录，当前显示第&nbsp;<i class="blue">' + curPage + '&nbsp;</i>页\
  </div>\
  <ul class="febsui-paginList">\
    <li class="febsui-paginItem">\
      <a href="' + urlPrePage + '">\
        <span style="display: block" class=' + urlPrePageClass + '></span>\
      </a>\
    </li>' + pagePre + '<li class="febsui-paginItem febsui-pagin-current">\
      <a href="javascript:;">' + curPage + '</a>\
    </li>' + pageNext + '<li class="febsui-paginItem">\
      <a href="' + urlNextPage + '">\
        <span style="display: block" class=' + urlNextPageClass + '></span>\
      </a>\
    </li>\
  </ul>\
</div>');
}

exports.page_init = page_init;

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var uuid = __webpack_require__(2);

exports.popover_init = popover_init;

/**
* @desc: 初始化popover控件.
*        对页面上 的所有 <popover> 元素进行初始化.
*/
function popover_init() {
  var elems = $('popover');
  for (var i = 0; i < elems.length; i++) {
    var dom = $(elems[i]);

    if (!dom.hasClass('febsui-popover-inited') && !dom.children().hasClass('febsui-popover-arrow')) {

      // data-direction
      var direction = dom.attr('data-direction');
      direction = window.febs.string.isEmpty(direction) ? 'auto' : direction;
      direction = direction.toLowerCase();
      if (direction != 'auto') {
        var direction2;
        if (direction != 'top' && direction != 'left' && direction != 'right' && direction != 'bottom') {
          throw new Error('popover attribute data-direction only can be top/left/right/bottom');
        }
        if (direction == 'top' || direction == 'bottom') {
          direction2 = 'left';
        }
        if (direction == 'left' || direction == 'right') {
          direction2 = 'top';
        }

        // data-offset
        var offset = dom.attr('data-offset');
        offset = window.febs.string.isEmpty(offset) ? '10' : offset;
        if (parseInt(offset) != offset) {
          throw new Error('popover attribute data-offset only can be number');
        }

        dom.prepend('<div class="febsui-popover-arrow febsui-popover-arrow-' + direction + '" style="' + direction2 + ': ' + offset + 'px;"></div>');
      } else {
        dom.prepend('<div class="febsui-popover-arrow"></div>');
      }

      dom.addClass('febsui-popover-inited');

      // ie9.
      if (window.febs.utils.browserIEVer() <= 9) {
        var cells = dom.children('.febsui-popover-cell');
        for (var jj = 0; jj < cells.length - 1; jj++) {
          $(cells[jj]).css('border-bottom', '1px solid #eee');
        }
      }

      var dd = $("<div class='febsui-popover'></div>");
      $('body').append(dd);
      var did = dom.attr('id');
      if (did) {
        dd.attr('id', did);
        dom.removeAttr('id');
        // copy attri.
        var attris = dom[0].attributes;
        if (attris) {
          for (var j = 0; j < attris.length; j++) {
            if (attris[j].nodeName.indexOf('data-') == 0) {
              dd.attr(attris[j].nodeName, dom.attr(attris[j].nodeName));
            }
          }
        }
      }
      dd.append(dom);
    }
  } // for.
}

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.switch_init = switch_init;

/**
* @desc: 初始化switch控件.
*        对页面上 class 为 febsui-switch-on 以及 febsui-switch-off 的所有元素初始化为switch控件.
*/
function switch_init() {
  var elems = $('switch');
  // elems.append("<span class='febsui-switch-slider'></span>");
  for (var i = 0; i < elems.length; i++) {
    var dom = $(elems[i]);
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

      elems[i]._swtichEvents = elems[i]._swtichEvents || [];
    }
  } // for.
}

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var uuid = __webpack_require__(2);

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
  if (typeof ctx === 'string') {
    ctx = { content: ctx };
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
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

var _JSON$stringify = __webpack_require__(51)["default"];

var _typeof = __webpack_require__(9)["default"];

/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */

(function (global, factory) {

  "use strict";

  if (( false ? "undefined" : _typeof(module)) === "object" && _typeof(module.exports) === "object") {

    // For CommonJS and CommonJS-like environments where a proper `window`
    // For environments that do not have a `window` with a `document`
    // (such as Node.js), expose a factory as module.exports.
    // This accentuates the need for the creation of a real `window`.
    module.exports = global.document ? factory(global, true) : function (w) {
      if (!w.document) {
        throw new Error("febs-ui requires a window with a document");
      }
      return factory(w);
    };
  } else {
    factory(global);
  }

  // Pass this if window is not defined yet
})(typeof window !== "undefined" ? window : undefined, function (window, noGlobal) {

  'use strict';

  if (!window.febs) {
    throw new Error("febs-ui requires febs");
  }

  var net = window.febs.net;
  var utils = window.febs.utils;
  var crypt = window.febs.crypt;
  var err = __webpack_require__(16);

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
  function uploadBase64(cfg) {
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
          })["catch"](function (err) {
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
    })["catch"](function (err) {
      if (err == 'timeout') {
        if (control_uploadSeg_cb) control_uploadSeg_cb(err.net, null);
      } else {
        if (control_uploadSeg_cb) control_uploadSeg_cb(err, null);
      }
    });
  }

  return { uploadBase64: uploadBase64 };
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)(module)))

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

var _typeof = __webpack_require__(9)["default"];

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
		module.exports = global.document ? factory(global, true) : function (w) {
			if (!w.document) {
				throw new Error("febsui requires a window with a document");
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
	__webpack_require__(47);
	__webpack_require__(46);

	var febsui = __webpack_require__(42);
	window['febsui'] = febsui;

	/**
  * jquery plugins.
  */
	__webpack_require__(45);

	__webpack_require__(43);
	__webpack_require__(44);
	__webpack_require__(48);
	__webpack_require__(49);
	__webpack_require__(50);

	return febsui;
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)(module)))

/***/ })
/******/ ]);
//# sourceMappingURL=febsui.js.map