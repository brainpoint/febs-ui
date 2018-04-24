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
/******/ 	return __webpack_require__(__webpack_require__.s = 79);
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
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(43);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(42);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2['default'] === "function" && typeof _iterator2['default'] === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2['default'] === "function" && obj.constructor === _symbol2['default'] && obj !== _symbol2['default'].prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = typeof _symbol2['default'] === "function" && _typeof(_iterator2['default']) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2['default'] === "function" && obj.constructor === _symbol2['default'] && obj !== _symbol2['default'].prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 2 */
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
/* 3 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
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
var IE8_DOM_DEFINE = __webpack_require__(31);
var toPrimitive = __webpack_require__(25);
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
var IObject = __webpack_require__(53);
var defined = __webpack_require__(15);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(23)('wks');
var uid = __webpack_require__(14);
var Symbol = __webpack_require__(0).Symbol;
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
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 16 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(36);
var enumBugKeys = __webpack_require__(16);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 20 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(6).f;
var has = __webpack_require__(3);
var TAG = __webpack_require__(8)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(23)('keys');
var uid = __webpack_require__(14);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 24 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 25 */
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
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var core = __webpack_require__(11);
var LIBRARY = __webpack_require__(18);
var wksExt = __webpack_require__(27);
var defineProperty = __webpack_require__(6).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(8);


/***/ }),
/* 28 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(9);
var document = __webpack_require__(0).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var core = __webpack_require__(11);
var ctx = __webpack_require__(50);
var hide = __webpack_require__(5);
var has = __webpack_require__(3);
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
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(4) && !__webpack_require__(12)(function () {
  return Object.defineProperty(__webpack_require__(29)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(18);
var $export = __webpack_require__(30);
var redefine = __webpack_require__(37);
var hide = __webpack_require__(5);
var Iterators = __webpack_require__(17);
var $iterCreate = __webpack_require__(55);
var setToStringTag = __webpack_require__(21);
var getPrototypeOf = __webpack_require__(61);
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
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(10);
var dPs = __webpack_require__(58);
var enumBugKeys = __webpack_require__(16);
var IE_PROTO = __webpack_require__(22)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(29)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(52).appendChild(iframe);
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
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(36);
var hiddenKeys = __webpack_require__(16).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 35 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(3);
var toIObject = __webpack_require__(7);
var arrayIndexOf = __webpack_require__(49)(false);
var IE_PROTO = __webpack_require__(22)('IE_PROTO');

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
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(5);


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

var _typeof = __webpack_require__(1)["default"];

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

	var stringUtils = window.febs.string;

	function escape_string(str) {
		// 转义.
		str = stringUtils.replace(str, '<', '&lt;');
		str = stringUtils.replace(str, '>', '&gt;');
		return str;
	}

	return escape_string;
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// import { $ } from 'febs-browser';

// require('febs-browser');

if (!$) {
  throw new Error('must import febs first');
}

var loading = __webpack_require__(74);
exports.loading_isVisiable = loading.loading_isVisiable;
exports.loading_show = loading.loading_show;
exports.loading_show_text = loading.loading_show_text;
exports.loading_hide = loading.loading_hide;

exports.page_init = __webpack_require__(75).page_init;
exports.uploadBase64 = __webpack_require__(77).uploadBase64;
exports.upload = __webpack_require__(78).upload;

var dialog = __webpack_require__(73);
exports.dialog_hide = dialog.hide;
exports.dialog_showAlert = dialog.showAlert;
exports.dialog_showToast = dialog.showToast;
exports.dialog_showConfirm = dialog.showConfirm;
exports.dialog_showConfirmEdit = dialog.showConfirmEdit;

var switcha = __webpack_require__(76);
exports.switch_init = switcha.switch_init;
$(document).ready(function () {
  switcha.switch_init();
});

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

var _typeof = __webpack_require__(1)["default"];

/*!
 * jQuery Form Plugin
 * version: 4.2.2
 * Requires jQuery v1.7.2 or later
 * Project repository: https://github.com/jquery-form/form

 * Copyright 2017 Kevin Morris
 * Copyright 2006 M. Alsup

 * Dual licensed under the LGPL-2.1+ or MIT licenses
 * https://github.com/jquery-form/form#license

 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 */
/* global ActiveXObject */

(function (factory) {

	"use strict";

	if (( false ? "undefined" : _typeof(module)) === "object" && _typeof(module.exports) === "object") {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		module.exports = function (w) {
			if (!w['$']) {
				throw new Error("febs-ui requires a window with $ or jquery or zepto or febs");
			}
			return factory(w['$']);
		};
	} else {
		factory(window['$']);
	}

	// Pass this if window is not defined yet
})(function ($) {
	/* eslint-enable */
	'use strict';

	/*
 	Usage Note:
 	-----------
 	Do not use both ajaxSubmit and ajaxForm on the same form. These
 	functions are mutually exclusive. Use ajaxSubmit if you want
 	to bind your own submit handler to the form. For example,
 		$(document).ready(function() {
 		$('#myForm').on('submit', function(e) {
 			e.preventDefault(); // <-- important
 			$(this).ajaxSubmit({
 				target: '#output'
 			});
 		});
 	});
 		Use ajaxForm when you want the plugin to manage all the event binding
 	for you. For example,
 		$(document).ready(function() {
 		$('#myForm').ajaxForm({
 			target: '#output'
 		});
 	});
 		You can also use ajaxForm with delegation (requires jQuery v1.7+), so the
 	form does not have to exist when you invoke ajaxForm:
 		$('#myForm').ajaxForm({
 		delegation: true,
 		target: '#output'
 	});
 		When using ajaxForm, the ajaxSubmit function will be invoked for you
 	at the appropriate time.
 */

	var rCRLF = /\r?\n/g;

	/**
  * Feature detection
  */
	var feature = {};

	feature.fileapi = $('<input type="file">').get(0).files !== undefined;
	feature.formdata = typeof window.FormData !== 'undefined';

	var hasProp = !!$.fn.prop;

	// attr2 uses prop when it can but checks the return type for
	// an expected string. This accounts for the case where a form
	// contains inputs with names like "action" or "method"; in those
	// cases "prop" returns the element
	$.fn.attr2 = function () {
		if (!hasProp) {
			return this.attr.apply(this, arguments);
		}

		var val = this.prop.apply(this, arguments);

		if (val && val.jquery || typeof val === 'string') {
			return val;
		}

		return this.attr.apply(this, arguments);
	};

	/**
  * ajaxSubmit() provides a mechanism for immediately submitting
  * an HTML form using AJAX.
  *
  * @param	{object|string}	options		jquery.form.js parameters or custom url for submission
  * @param	{object}		data		extraData
  * @param	{string}		dataType	ajax dataType
  * @param	{function}		onSuccess	ajax success callback function
  */
	$.fn.ajaxSubmit = function (options, data, dataType, onSuccess) {
		// fast fail if nothing selected (http://dev.jquery.com/ticket/2752)
		if (!this.length) {
			log('ajaxSubmit: skipping submit process - no element selected');

			return this;
		}

		/* eslint consistent-this: ["error", "$form"] */
		var method,
		    action,
		    url,
		    $form = this;

		if (typeof options === 'function') {
			options = { success: options };
		} else if (typeof options === 'string' || options === false && arguments.length > 0) {
			options = {
				'url': options,
				'data': data,
				'dataType': dataType
			};

			if (typeof onSuccess === 'function') {
				options.success = onSuccess;
			}
		} else if (typeof options === 'undefined') {
			options = {};
		}

		method = options.method || options.type || this.attr2('method');
		action = options.url || this.attr2('action');

		url = typeof action === 'string' ? $.trim(action) : '';
		url = url || window.location.href || '';
		if (url) {
			// clean url (don't include hash vaue)
			url = (url.match(/^([^#]+)/) || [])[1];
		}

		options = $.extend(true, {
			url: url,
			success: $.ajaxSettings.success,
			type: method || $.ajaxSettings.type,
			iframeSrc: /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank' // eslint-disable-line no-script-url
		}, options);

		// hook for manipulating the form data before it is extracted;
		// convenient for use with rich editors like tinyMCE or FCKEditor
		var veto = {};

		this.trigger('form-pre-serialize', [this, options, veto]);

		if (veto.veto) {
			log('ajaxSubmit: submit vetoed via form-pre-serialize trigger');

			return this;
		}

		// provide opportunity to alter form data before it is serialized
		if (options.beforeSerialize && options.beforeSerialize(this, options) === false) {
			log('ajaxSubmit: submit aborted via beforeSerialize callback');

			return this;
		}

		var traditional = options.traditional;

		if (typeof traditional === 'undefined') {
			traditional = $.ajaxSettings.traditional;
		}

		var elements = [];
		var qx,
		    a = this.formToArray(options.semantic, elements, options.filtering);

		if (options.data) {
			var optionsData = $.isFunction(options.data) ? options.data(a) : options.data;

			options.extraData = optionsData;
			qx = $.param(optionsData, traditional);
		}

		// give pre-submit callback an opportunity to abort the submit
		if (options.beforeSubmit && options.beforeSubmit(a, this, options) === false) {
			log('ajaxSubmit: submit aborted via beforeSubmit callback');

			return this;
		}

		// fire vetoable 'validate' event
		this.trigger('form-submit-validate', [a, this, options, veto]);
		if (veto.veto) {
			log('ajaxSubmit: submit vetoed via form-submit-validate trigger');

			return this;
		}

		var q = $.param(a, traditional);

		if (qx) {
			q = q ? q + '&' + qx : qx;
		}

		if (options.type.toUpperCase() === 'GET') {
			options.url += (options.url.indexOf('?') >= 0 ? '&' : '?') + q;
			options.data = null; // data is null for 'get'
		} else {
			options.data = q; // data is the query string for 'post'
		}

		var callbacks = [];

		if (options.resetForm) {
			callbacks.push(function () {
				$form.resetForm();
			});
		}

		if (options.clearForm) {
			callbacks.push(function () {
				$form.clearForm(options.includeHidden);
			});
		}

		// perform a load on the target only if dataType is not provided
		if (!options.dataType && options.target) {
			var oldSuccess = options.success || function () {};

			callbacks.push(function (data, textStatus, jqXHR) {
				var successArguments = arguments,
				    fn = options.replaceTarget ? 'replaceWith' : 'html';

				$(options.target)[fn](data).each(function () {
					oldSuccess.apply(this, successArguments);
				});
			});
		} else if (options.success) {
			if ($.isArray(options.success)) {
				$.merge(callbacks, options.success);
			} else {
				callbacks.push(options.success);
			}
		}

		options.success = function (data, status, xhr) {
			// jQuery 1.4+ passes xhr as 3rd arg
			var context = options.context || this; // jQuery 1.4+ supports scope context

			for (var i = 0, max = callbacks.length; i < max; i++) {
				callbacks[i].apply(context, [data, status, xhr || $form, $form]);
			}
		};

		if (options.error) {
			var oldError = options.error;

			options.error = function (xhr, status, error) {
				var context = options.context || this;

				oldError.apply(context, [xhr, status, error, $form]);
			};
		}

		if (options.complete) {
			var oldComplete = options.complete;

			options.complete = function (xhr, status) {
				var context = options.context || this;

				oldComplete.apply(context, [xhr, status, $form]);
			};
		}

		// are there files to upload?

		// [value] (issue #113), also see comment:
		// https://github.com/malsup/form/commit/588306aedba1de01388032d5f42a60159eea9228#commitcomment-2180219
		var fileInputs = $('input[type=file]:enabled', this).filter(function () {
			return $(this).val() !== '';
		});
		var hasFileInputs = fileInputs.length > 0;
		var mp = 'multipart/form-data';
		var multipart = $form.attr('enctype') === mp || $form.attr('encoding') === mp;
		var fileAPI = feature.fileapi && feature.formdata;

		log('fileAPI :' + fileAPI);

		var shouldUseFrame = (hasFileInputs || multipart) && !fileAPI;
		var jqxhr;

		// options.iframe allows user to force iframe mode
		// 06-NOV-09: now defaulting to iframe mode if file input is detected
		if (options.iframe !== false && (options.iframe || shouldUseFrame)) {
			// hack to fix Safari hang (thanks to Tim Molendijk for this)
			// see: http://groups.google.com/group/jquery-dev/browse_thread/thread/36395b7ab510dd5d
			if (options.closeKeepAlive) {
				$.get(options.closeKeepAlive, function () {
					jqxhr = fileUploadIframe(a);
				});
			} else {
				jqxhr = fileUploadIframe(a);
			}
		} else if ((hasFileInputs || multipart) && fileAPI) {
			jqxhr = fileUploadXhr(a);
		} else {
			jqxhr = $.ajax(options);
		}

		$form.removeData('jqxhr').data('jqxhr', jqxhr);

		// clear element array
		for (var k = 0; k < elements.length; k++) {
			elements[k] = null;
		}

		// fire 'notify' event
		this.trigger('form-submit-notify', [this, options]);

		return this;

		// utility fn for deep serialization
		function deepSerialize(extraData) {
			var serialized = $.param(extraData, options.traditional).split('&');
			var len = serialized.length;
			var result = [];
			var i, part;

			for (i = 0; i < len; i++) {
				// #252; undo param space replacement
				serialized[i] = serialized[i].replace(/\+/g, ' ');
				part = serialized[i].split('=');
				// #278; use array instead of object storage, favoring array serializations
				result.push([decodeURIComponent(part[0]), decodeURIComponent(part[1])]);
			}

			return result;
		}

		// XMLHttpRequest Level 2 file uploads (big hat tip to francois2metz)
		function fileUploadXhr(a) {
			var formdata = new FormData();

			for (var i = 0; i < a.length; i++) {
				formdata.append(a[i].name, a[i].value);
			}

			if (options.extraData) {
				var serializedData = deepSerialize(options.extraData);

				for (i = 0; i < serializedData.length; i++) {
					if (serializedData[i]) {
						formdata.append(serializedData[i][0], serializedData[i][1]);
					}
				}
			}

			options.data = null;

			var s = $.extend(true, {}, $.ajaxSettings, options, {
				contentType: false,
				processData: false,
				cache: false,
				type: method || 'POST'
			});

			if (options.uploadProgress) {
				// workaround because jqXHR does not expose upload property
				s.xhr = function () {
					var xhr = $.ajaxSettings.xhr();

					if (xhr.upload) {
						xhr.upload.addEventListener('progress', function (event) {
							var percent = 0;
							var position = event.loaded || event.position; /* event.position is deprecated */
							var total = event.total;

							if (event.lengthComputable) {
								percent = Math.ceil(position / total * 100);
							}

							options.uploadProgress(event, position, total, percent);
						}, false);
					}

					return xhr;
				};
			}

			s.data = null;

			var beforeSend = s.beforeSend;

			s.beforeSend = function (xhr, o) {
				// Send FormData() provided by user
				if (options.formData) {
					o.data = options.formData;
				} else {
					o.data = formdata;
				}

				if (beforeSend) {
					beforeSend.call(this, xhr, o);
				}
			};

			return $.ajax(s);
		}

		// private function for handling file uploads (hat tip to YAHOO!)
		function fileUploadIframe(a) {
			var form = $form[0],
			    el,
			    i,
			    s,
			    g,
			    id,
			    $io,
			    io,
			    xhr,
			    sub,
			    n,
			    timedOut,
			    timeoutHandle;
			var deferred = $.Deferred();

			// #341
			deferred.abort = function (status) {
				xhr.abort(status);
			};

			if (a) {
				// ensure that every serialized input is still enabled
				for (i = 0; i < elements.length; i++) {
					el = $(elements[i]);
					if (hasProp) {
						el.prop('disabled', false);
					} else {
						el.removeAttr('disabled');
					}
				}
			}

			s = $.extend(true, {}, $.ajaxSettings, options);
			s.context = s.context || s;
			id = 'jqFormIO' + new Date().getTime();
			var ownerDocument = form.ownerDocument;
			var $body = $form.closest('body');

			if (s.iframeTarget) {
				$io = $(s.iframeTarget, ownerDocument);
				n = $io.attr2('name');
				if (!n) {
					$io.attr2('name', id);
				} else {
					id = n;
				}
			} else {
				$io = $('<iframe name="' + id + '" src="' + s.iframeSrc + '" />', ownerDocument);
				$io.css({ position: 'absolute', top: '-1000px', left: '-1000px' });
			}
			io = $io[0];

			xhr = { // mock object
				aborted: 0,
				responseText: null,
				responseXML: null,
				status: 0,
				statusText: 'n/a',
				getAllResponseHeaders: function getAllResponseHeaders() {},
				getResponseHeader: function getResponseHeader() {},
				setRequestHeader: function setRequestHeader() {},
				abort: function abort(status) {
					var e = status === 'timeout' ? 'timeout' : 'aborted';

					log('aborting upload... ' + e);
					this.aborted = 1;

					try {
						// #214, #257
						if (io.contentWindow.document.execCommand) {
							io.contentWindow.document.execCommand('Stop');
						}
					} catch (ignore) {}

					$io.attr('src', s.iframeSrc); // abort op in progress
					xhr.error = e;
					if (s.error) {
						s.error.call(s.context, xhr, e, status);
					}

					if (g) {
						$.event.trigger('ajaxError', [xhr, s, e]);
					}

					if (s.complete) {
						s.complete.call(s.context, xhr, e);
					}
				}
			};

			g = s.global;
			// trigger ajax global events so that activity/block indicators work like normal
			if (g && $.active++ === 0) {
				$.event.trigger('ajaxStart');
			}
			if (g) {
				$.event.trigger('ajaxSend', [xhr, s]);
			}

			if (s.beforeSend && s.beforeSend.call(s.context, xhr, s) === false) {
				if (s.global) {
					$.active--;
				}
				deferred.reject();

				return deferred;
			}

			if (xhr.aborted) {
				deferred.reject();

				return deferred;
			}

			// add submitting element to data if we know it
			sub = form.clk;
			if (sub) {
				n = sub.name;
				if (n && !sub.disabled) {
					s.extraData = s.extraData || {};
					s.extraData[n] = sub.value;
					if (sub.type === 'image') {
						s.extraData[n + '.x'] = form.clk_x;
						s.extraData[n + '.y'] = form.clk_y;
					}
				}
			}

			var CLIENT_TIMEOUT_ABORT = 1;
			var SERVER_ABORT = 2;

			function getDoc(frame) {
				/* it looks like contentWindow or contentDocument do not
     * carry the protocol property in ie8, when running under ssl
     * frame.document is the only valid response document, since
     * the protocol is know but not on the other two objects. strange?
     * "Same origin policy" http://en.wikipedia.org/wiki/Same_origin_policy
     */

				var doc = null;

				// IE8 cascading access check
				try {
					if (frame.contentWindow) {
						doc = frame.contentWindow.document;
					}
				} catch (err) {
					// IE8 access denied under ssl & missing protocol
					log('cannot get iframe.contentWindow document: ' + err);
				}

				if (doc) {
					// successful getting content
					return doc;
				}

				try {
					// simply checking may throw in ie8 under ssl or mismatched protocol
					doc = frame.contentDocument ? frame.contentDocument : frame.document;
				} catch (err) {
					// last attempt
					log('cannot get iframe.contentDocument: ' + err);
					doc = frame.document;
				}

				return doc;
			}

			// Rails CSRF hack (thanks to Yvan Barthelemy)
			var csrf_token = $('meta[name=csrf-token]').attr('content');
			var csrf_param = $('meta[name=csrf-param]').attr('content');

			if (csrf_param && csrf_token) {
				s.extraData = s.extraData || {};
				s.extraData[csrf_param] = csrf_token;
			}

			// take a breath so that pending repaints get some cpu time before the upload starts
			function doSubmit() {
				// make sure form attrs are set
				var t = $form.attr2('target'),
				    a = $form.attr2('action'),
				    mp = 'multipart/form-data',
				    et = $form.attr('enctype') || $form.attr('encoding') || mp;

				// update form attrs in IE friendly way
				form.setAttribute('target', id);
				if (!method || /post/i.test(method)) {
					form.setAttribute('method', 'POST');
				}
				if (a !== s.url) {
					form.setAttribute('action', s.url);
				}

				// ie borks in some cases when setting encoding
				if (!s.skipEncodingOverride && (!method || /post/i.test(method))) {
					$form.attr({
						encoding: 'multipart/form-data',
						enctype: 'multipart/form-data'
					});
				}

				// support timout
				if (s.timeout) {
					timeoutHandle = setTimeout(function () {
						timedOut = true;cb(CLIENT_TIMEOUT_ABORT);
					}, s.timeout);
				}

				// look for server aborts
				function checkState() {
					try {
						var state = getDoc(io).readyState;

						log('state = ' + state);
						if (state && state.toLowerCase() === 'uninitialized') {
							setTimeout(checkState, 50);
						}
					} catch (e) {
						log('Server abort: ', e, ' (', e.name, ')');
						cb(SERVER_ABORT); // eslint-disable-line callback-return
						if (timeoutHandle) {
							clearTimeout(timeoutHandle);
						}
						timeoutHandle = undefined;
					}
				}

				// add "extra" data to form if provided in options
				var extraInputs = [];

				try {
					if (s.extraData) {
						for (var n in s.extraData) {
							if (s.extraData.hasOwnProperty(n)) {
								// if using the $.param format that allows for multiple values with the same name
								if ($.isPlainObject(s.extraData[n]) && s.extraData[n].hasOwnProperty('name') && s.extraData[n].hasOwnProperty('value')) {
									extraInputs.push($('<input type="hidden" name="' + s.extraData[n].name + '">', ownerDocument).val(s.extraData[n].value).appendTo(form)[0]);
								} else {
									extraInputs.push($('<input type="hidden" name="' + n + '">', ownerDocument).val(s.extraData[n]).appendTo(form)[0]);
								}
							}
						}
					}

					if (!s.iframeTarget) {
						// add iframe to doc and submit the form
						$io.appendTo($body);
					}

					if (io.attachEvent) {
						io.attachEvent('onload', cb);
					} else {
						io.addEventListener('load', cb, false);
					}

					setTimeout(checkState, 15);

					try {
						form.submit();
					} catch (err) {
						// just in case form has element with name/id of 'submit'
						var submitFn = document.createElement('form').submit;

						submitFn.apply(form);
					}
				} finally {
					// reset attrs and remove "extra" input elements
					form.setAttribute('action', a);
					form.setAttribute('enctype', et); // #380
					if (t) {
						form.setAttribute('target', t);
					} else {
						$form.removeAttr('target');
					}
					$(extraInputs).remove();
				}
			}

			if (s.forceSync) {
				doSubmit();
			} else {
				setTimeout(doSubmit, 10); // this lets dom updates render
			}

			var data,
			    doc,
			    domCheckCount = 50,
			    callbackProcessed;

			function cb(e) {
				if (xhr.aborted || callbackProcessed) {
					return;
				}

				doc = getDoc(io);
				if (!doc) {
					log('cannot access response document');
					e = SERVER_ABORT;
				}
				if (e === CLIENT_TIMEOUT_ABORT && xhr) {
					xhr.abort('timeout');
					deferred.reject(xhr, 'timeout');

					return;
				} else if (e === SERVER_ABORT && xhr) {
					xhr.abort('server abort');
					deferred.reject(xhr, 'error', 'server abort');

					return;
				}

				if (!doc || doc.location.href === s.iframeSrc) {
					// response not received yet
					if (!timedOut) {
						return;
					}
				}

				if (io.detachEvent) {
					io.detachEvent('onload', cb);
				} else {
					io.removeEventListener('load', cb, false);
				}

				var status = 'success',
				    errMsg;

				try {
					if (timedOut) {
						throw 'timeout';
					}

					var isXml = s.dataType === 'xml' || doc.XMLDocument || $.isXMLDoc(doc);

					log('isXml=' + isXml);

					if (!isXml && window.opera && (doc.body === null || !doc.body.innerHTML)) {
						if (--domCheckCount) {
							// in some browsers (Opera) the iframe DOM is not always traversable when
							// the onload callback fires, so we loop a bit to accommodate
							log('requeing onLoad callback, DOM not available');
							setTimeout(cb, 250);

							return;
						}
						// let this fall through because server response could be an empty document
						// log('Could not access iframe DOM after mutiple tries.');
						// throw 'DOMException: not available';
					}

					// log('response detected');
					var docRoot = doc.body ? doc.body : doc.documentElement;

					xhr.responseText = docRoot ? docRoot.innerHTML : null;
					xhr.responseXML = doc.XMLDocument ? doc.XMLDocument : doc;
					if (isXml) {
						s.dataType = 'xml';
					}
					xhr.getResponseHeader = function (header) {
						var headers = { 'content-type': s.dataType };

						return headers[header.toLowerCase()];
					};
					// support for XHR 'status' & 'statusText' emulation :
					if (docRoot) {
						xhr.status = Number(docRoot.getAttribute('status')) || xhr.status;
						xhr.statusText = docRoot.getAttribute('statusText') || xhr.statusText;
					}

					var dt = (s.dataType || '').toLowerCase();
					var scr = /(json|script|text)/.test(dt);

					if (scr || s.textarea) {
						// see if user embedded response in textarea
						var ta = doc.getElementsByTagName('textarea')[0];

						if (ta) {
							xhr.responseText = ta.value;
							// support for XHR 'status' & 'statusText' emulation :
							xhr.status = Number(ta.getAttribute('status')) || xhr.status;
							xhr.statusText = ta.getAttribute('statusText') || xhr.statusText;
						} else if (scr) {
							// account for browsers injecting pre around json response
							var pre = doc.getElementsByTagName('pre')[0];
							var b = doc.getElementsByTagName('body')[0];

							if (pre) {
								xhr.responseText = pre.textContent ? pre.textContent : pre.innerText;
							} else if (b) {
								xhr.responseText = b.textContent ? b.textContent : b.innerText;
							}
						}
					} else if (dt === 'xml' && !xhr.responseXML && xhr.responseText) {
						xhr.responseXML = toXml(xhr.responseText); // eslint-disable-line no-use-before-define
					}

					try {
						data = httpData(xhr, dt, s); // eslint-disable-line no-use-before-define
					} catch (err) {
						status = 'parsererror';
						xhr.error = errMsg = err || status;
					}
				} catch (err) {
					log('error caught: ', err);
					status = 'error';
					xhr.error = errMsg = err || status;
				}

				if (xhr.aborted) {
					log('upload aborted');
					status = null;
				}

				if (xhr.status) {
					// we've set xhr.status
					status = xhr.status >= 200 && xhr.status < 300 || xhr.status === 304 ? 'success' : 'error';
				}

				// ordering of these callbacks/triggers is odd, but that's how $.ajax does it
				if (status === 'success') {
					if (s.success) {
						s.success.call(s.context, data, 'success', xhr);
					}

					deferred.resolve(xhr.responseText, 'success', xhr);

					if (g) {
						$.event.trigger('ajaxSuccess', [xhr, s]);
					}
				} else if (status) {
					if (typeof errMsg === 'undefined') {
						errMsg = xhr.statusText;
					}
					if (s.error) {
						s.error.call(s.context, xhr, status, errMsg);
					}
					deferred.reject(xhr, 'error', errMsg);
					if (g) {
						$.event.trigger('ajaxError', [xhr, s, errMsg]);
					}
				}

				if (g) {
					$.event.trigger('ajaxComplete', [xhr, s]);
				}

				if (g && ! --$.active) {
					$.event.trigger('ajaxStop');
				}

				if (s.complete) {
					s.complete.call(s.context, xhr, status);
				}

				callbackProcessed = true;
				if (s.timeout) {
					clearTimeout(timeoutHandle);
				}

				// clean up
				setTimeout(function () {
					if (!s.iframeTarget) {
						$io.remove();
					} else {
						// adding else to clean up existing iframe response.
						$io.attr('src', s.iframeSrc);
					}
					xhr.responseXML = null;
				}, 100);
			}

			var toXml = $.parseXML || function (s, doc) {
				// use parseXML if available (jQuery 1.5+)
				if (window.ActiveXObject) {
					doc = new ActiveXObject('Microsoft.XMLDOM');
					doc.async = 'false';
					doc.loadXML(s);
				} else {
					doc = new DOMParser().parseFromString(s, 'text/xml');
				}

				return doc && doc.documentElement && doc.documentElement.nodeName !== 'parsererror' ? doc : null;
			};
			var parseJSON = $.parseJSON || function (s) {
				/* jslint evil:true */
				return window['eval']('(' + s + ')'); // eslint-disable-line dot-notation
			};

			var httpData = function httpData(xhr, type, s) {
				// mostly lifted from jq1.4.4

				var ct = xhr.getResponseHeader('content-type') || '',
				    xml = (type === 'xml' || !type) && ct.indexOf('xml') >= 0,
				    data = xml ? xhr.responseXML : xhr.responseText;

				if (xml && data.documentElement.nodeName === 'parsererror') {
					if ($.error) {
						$.error('parsererror');
					}
				}
				if (s && s.dataFilter) {
					data = s.dataFilter(data, type);
				}
				if (typeof data === 'string') {
					if ((type === 'json' || !type) && ct.indexOf('json') >= 0) {
						data = parseJSON(data);
					} else if ((type === 'script' || !type) && ct.indexOf('javascript') >= 0) {
						$.globalEval(data);
					}
				}

				return data;
			};

			return deferred;
		}
	};

	/**
  * ajaxForm() provides a mechanism for fully automating form submission.
  *
  * The advantages of using this method instead of ajaxSubmit() are:
  *
  * 1: This method will include coordinates for <input type="image"> elements (if the element
  *	is used to submit the form).
  * 2. This method will include the submit element's name/value data (for the element that was
  *	used to submit the form).
  * 3. This method binds the submit() method to the form for you.
  *
  * The options argument for ajaxForm works exactly as it does for ajaxSubmit. ajaxForm merely
  * passes the options argument along after properly binding events for submit elements and
  * the form itself.
  */
	$.fn.ajaxForm = function (options, data, dataType, onSuccess) {
		if (typeof options === 'string' || options === false && arguments.length > 0) {
			options = {
				'url': options,
				'data': data,
				'dataType': dataType
			};

			if (typeof onSuccess === 'function') {
				options.success = onSuccess;
			}
		}

		options = options || {};
		options.delegation = options.delegation && $.isFunction($.fn.on);

		// in jQuery 1.3+ we can fix mistakes with the ready state
		if (!options.delegation && this.length === 0) {
			var o = { s: this.selector, c: this.context };

			if (!$.isReady && o.s) {
				log('DOM not ready, queuing ajaxForm');
				$(function () {
					$(o.s, o.c).ajaxForm(options);
				});

				return this;
			}

			// is your DOM ready?  http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
			log('terminating; zero elements found by selector' + ($.isReady ? '' : ' (DOM not ready)'));

			return this;
		}

		if (options.delegation) {
			$(document).off('submit.form-plugin', this.selector, doAjaxSubmit).off('click.form-plugin', this.selector, captureSubmittingElement).on('submit.form-plugin', this.selector, options, doAjaxSubmit).on('click.form-plugin', this.selector, options, captureSubmittingElement);

			return this;
		}

		return this.ajaxFormUnbind().on('submit.form-plugin', options, doAjaxSubmit).on('click.form-plugin', options, captureSubmittingElement);
	};

	// private event handlers
	function doAjaxSubmit(e) {
		/* jshint validthis:true */
		var options = e.data;

		if (!e.isDefaultPrevented()) {
			// if event has been canceled, don't proceed
			e.preventDefault();
			$(e.target).closest('form').ajaxSubmit(options); // #365
		}
	}

	function captureSubmittingElement(e) {
		/* jshint validthis:true */
		var target = e.target;
		var $el = $(target);

		if (!$el.is('[type=submit],[type=image]')) {
			// is this a child element of the submit el?  (ex: a span within a button)
			var t = $el.closest('[type=submit]');

			if (t.length === 0) {
				return;
			}
			target = t[0];
		}

		var form = target.form;

		form.clk = target;

		if (target.type === 'image') {
			if (typeof e.offsetX !== 'undefined') {
				form.clk_x = e.offsetX;
				form.clk_y = e.offsetY;
			} else if (typeof $.fn.offset === 'function') {
				var offset = $el.offset();

				form.clk_x = e.pageX - offset.left;
				form.clk_y = e.pageY - offset.top;
			} else {
				form.clk_x = e.pageX - target.offsetLeft;
				form.clk_y = e.pageY - target.offsetTop;
			}
		}
		// clear form vars
		setTimeout(function () {
			form.clk = form.clk_x = form.clk_y = null;
		}, 100);
	}

	// ajaxFormUnbind unbinds the event handlers that were bound by ajaxForm
	$.fn.ajaxFormUnbind = function () {
		return this.off('submit.form-plugin click.form-plugin');
	};

	/**
  * formToArray() gathers form element data into an array of objects that can
  * be passed to any of the following ajax functions: $.get, $.post, or load.
  * Each object in the array has both a 'name' and 'value' property. An example of
  * an array for a simple login form might be:
  *
  * [ { name: 'username', value: 'jresig' }, { name: 'password', value: 'secret' } ]
  *
  * It is this array that is passed to pre-submit callback functions provided to the
  * ajaxSubmit() and ajaxForm() methods.
  */
	$.fn.formToArray = function (semantic, elements, filtering) {
		var a = [];

		if (this.length === 0) {
			return a;
		}

		var form = this[0];
		var formId = this.attr('id');
		var els = semantic || typeof form.elements === 'undefined' ? form.getElementsByTagName('*') : form.elements;
		var els2;

		if (els) {
			els = $.makeArray(els); // convert to standard array
		}

		// #386; account for inputs outside the form which use the 'form' attribute
		// FinesseRus: in non-IE browsers outside fields are already included in form.elements.
		if (formId && (semantic || /(Edge|Trident)\//.test(navigator.userAgent))) {
			els2 = $(':input[form="' + formId + '"]').get(); // hat tip @thet
			if (els2.length) {
				els = (els || []).concat(els2);
			}
		}

		if (!els || !els.length) {
			return a;
		}

		if ($.isFunction(filtering)) {
			els = $.map(els, filtering);
		}

		var i, j, n, v, el, max, jmax;

		for (i = 0, max = els.length; i < max; i++) {
			el = els[i];
			n = el.name;
			if (!n || el.disabled) {
				continue;
			}

			if (semantic && form.clk && el.type === 'image') {
				// handle image inputs on the fly when semantic == true
				if (form.clk === el) {
					a.push({ name: n, value: $(el).val(), type: el.type });
					a.push({ name: n + '.x', value: form.clk_x }, { name: n + '.y', value: form.clk_y });
				}
				continue;
			}

			v = $.fieldValue(el, true);
			if (v && v.constructor === Array) {
				if (elements) {
					elements.push(el);
				}
				for (j = 0, jmax = v.length; j < jmax; j++) {
					a.push({ name: n, value: v[j] });
				}
			} else if (feature.fileapi && el.type === 'file') {
				if (elements) {
					elements.push(el);
				}

				var files = el.files;

				if (files.length) {
					for (j = 0; j < files.length; j++) {
						a.push({ name: n, value: files[j], type: el.type });
					}
				} else {
					// #180
					a.push({ name: n, value: '', type: el.type });
				}
			} else if (v !== null && typeof v !== 'undefined') {
				if (elements) {
					elements.push(el);
				}
				a.push({ name: n, value: v, type: el.type, required: el.required });
			}
		}

		if (!semantic && form.clk) {
			// input type=='image' are not found in elements array! handle it here
			var $input = $(form.clk),
			    input = $input[0];

			n = input.name;

			if (n && !input.disabled && input.type === 'image') {
				a.push({ name: n, value: $input.val() });
				a.push({ name: n + '.x', value: form.clk_x }, { name: n + '.y', value: form.clk_y });
			}
		}

		return a;
	};

	/**
  * Serializes form data into a 'submittable' string. This method will return a string
  * in the format: name1=value1&amp;name2=value2
  */
	$.fn.formSerialize = function (semantic) {
		// hand off to jQuery.param for proper encoding
		return $.param(this.formToArray(semantic));
	};

	/**
  * Serializes all field elements in the jQuery object into a query string.
  * This method will return a string in the format: name1=value1&amp;name2=value2
  */
	$.fn.fieldSerialize = function (successful) {
		var a = [];

		this.each(function () {
			var n = this.name;

			if (!n) {
				return;
			}

			var v = $.fieldValue(this, successful);

			if (v && v.constructor === Array) {
				for (var i = 0, max = v.length; i < max; i++) {
					a.push({ name: n, value: v[i] });
				}
			} else if (v !== null && typeof v !== 'undefined') {
				a.push({ name: this.name, value: v });
			}
		});

		// hand off to jQuery.param for proper encoding
		return $.param(a);
	};

	/**
  * Returns the value(s) of the element in the matched set. For example, consider the following form:
  *
  *	<form><fieldset>
  *		<input name="A" type="text">
  *		<input name="A" type="text">
  *		<input name="B" type="checkbox" value="B1">
  *		<input name="B" type="checkbox" value="B2">
  *		<input name="C" type="radio" value="C1">
  *		<input name="C" type="radio" value="C2">
  *	</fieldset></form>
  *
  *	var v = $('input[type=text]').fieldValue();
  *	// if no values are entered into the text inputs
  *	v === ['','']
  *	// if values entered into the text inputs are 'foo' and 'bar'
  *	v === ['foo','bar']
  *
  *	var v = $('input[type=checkbox]').fieldValue();
  *	// if neither checkbox is checked
  *	v === undefined
  *	// if both checkboxes are checked
  *	v === ['B1', 'B2']
  *
  *	var v = $('input[type=radio]').fieldValue();
  *	// if neither radio is checked
  *	v === undefined
  *	// if first radio is checked
  *	v === ['C1']
  *
  * The successful argument controls whether or not the field element must be 'successful'
  * (per http://www.w3.org/TR/html4/interact/forms.html#successful-controls).
  * The default value of the successful argument is true. If this value is false the value(s)
  * for each element is returned.
  *
  * Note: This method *always* returns an array. If no valid value can be determined the
  *	array will be empty, otherwise it will contain one or more values.
  */
	$.fn.fieldValue = function (successful) {
		for (var val = [], i = 0, max = this.length; i < max; i++) {
			var el = this[i];
			var v = $.fieldValue(el, successful);

			if (v === null || typeof v === 'undefined' || v.constructor === Array && !v.length) {
				continue;
			}

			if (v.constructor === Array) {
				$.merge(val, v);
			} else {
				val.push(v);
			}
		}

		return val;
	};

	/**
  * Returns the value of the field element.
  */
	$.fieldValue = function (el, successful) {
		var n = el.name,
		    t = el.type,
		    tag = el.tagName.toLowerCase();

		if (typeof successful === 'undefined') {
			successful = true;
		}

		/* eslint-disable no-mixed-operators */
		if (successful && (!n || el.disabled || t === 'reset' || t === 'button' || (t === 'checkbox' || t === 'radio') && !el.checked || (t === 'submit' || t === 'image') && el.form && el.form.clk !== el || tag === 'select' && el.selectedIndex === -1)) {
			/* eslint-enable no-mixed-operators */
			return null;
		}

		if (tag === 'select') {
			var index = el.selectedIndex;

			if (index < 0) {
				return null;
			}

			var a = [],
			    ops = el.options;
			var one = t === 'select-one';
			var max = one ? index + 1 : ops.length;

			for (var i = one ? index : 0; i < max; i++) {
				var op = ops[i];

				if (op.selected && !op.disabled) {
					var v = op.value;

					if (!v) {
						// extra pain for IE...
						v = op.attributes && op.attributes.value && !op.attributes.value.specified ? op.text : op.value;
					}

					if (one) {
						return v;
					}

					a.push(v);
				}
			}

			return a;
		}

		return $(el).val().replace(rCRLF, '\r\n');
	};

	/**
  * Clears the form data. Takes the following actions on the form's input fields:
  *  - input text fields will have their 'value' property set to the empty string
  *  - select elements will have their 'selectedIndex' property set to -1
  *  - checkbox and radio inputs will have their 'checked' property set to false
  *  - inputs of type submit, button, reset, and hidden will *not* be effected
  *  - button elements will *not* be effected
  */
	$.fn.clearForm = function (includeHidden) {
		return this.each(function () {
			$('input,select,textarea', this).clearFields(includeHidden);
		});
	};

	/**
  * Clears the selected form elements.
  */
	$.fn.clearFields = $.fn.clearInputs = function (includeHidden) {
		var re = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i; // 'hidden' is not in this list

		return this.each(function () {
			var t = this.type,
			    tag = this.tagName.toLowerCase();

			if (re.test(t) || tag === 'textarea') {
				this.value = '';
			} else if (t === 'checkbox' || t === 'radio') {
				this.checked = false;
			} else if (tag === 'select') {
				this.selectedIndex = -1;
			} else if (t === 'file') {
				if (/MSIE/.test(navigator.userAgent)) {
					$(this).replaceWith($(this).clone(true));
				} else {
					$(this).val('');
				}
			} else if (includeHidden) {
				// includeHidden can be the value true, or it can be a selector string
				// indicating a special test; for example:
				// $('#myForm').clearForm('.special:hidden')
				// the above would clean hidden inputs that have the class of 'special'
				if (includeHidden === true && /hidden/.test(t) || typeof includeHidden === 'string' && $(this).is(includeHidden)) {
					this.value = '';
				}
			}
		});
	};

	/**
  * Resets the form data or individual elements. Takes the following actions
  * on the selected tags:
  * - all fields within form elements will be reset to their original value
  * - input / textarea / select fields will be reset to their original value
  * - option / optgroup fields (for multi-selects) will defaulted individually
  * - non-multiple options will find the right select to default
  * - label elements will be searched against its 'for' attribute
  * - all others will be searched for appropriate children to default
  */
	$.fn.resetForm = function () {
		return this.each(function () {
			var el = $(this);
			var tag = this.tagName.toLowerCase();

			switch (tag) {
				case 'input':
					this.checked = this.defaultChecked;
				// fall through

				case 'textarea':
					this.value = this.defaultValue;

					return true;

				case 'option':
				case 'optgroup':
					var select = el.parents('select');

					if (select.length && select[0].multiple) {
						if (tag === 'option') {
							this.selected = this.defaultSelected;
						} else {
							el.find('option').resetForm();
						}
					} else {
						select.resetForm();
					}

					return true;

				case 'select':
					el.find('option').each(function (i) {
						// eslint-disable-line consistent-return
						this.selected = this.defaultSelected;
						if (this.defaultSelected && !el[0].multiple) {
							el[0].selectedIndex = i;

							return false;
						}
					});

					return true;

				case 'label':
					var forEl = $(el.attr('for'));
					var list = el.find('input,select,textarea');

					if (forEl[0]) {
						list.unshift(forEl[0]);
					}

					list.resetForm();

					return true;

				case 'form':
					// guard against an input with the name of 'reset'
					// note that IE reports the reset function as an 'object'
					if (typeof this.reset === 'function' || _typeof(this.reset) === 'object' && !this.reset.nodeType) {
						this.reset();
					}

					return true;

				default:
					el.find('form,input,label,select,textarea').resetForm();

					return true;
			}
		});
	};

	/**
  * Enables or disables any matching elements.
  */
	$.fn.enable = function (b) {
		if (typeof b === 'undefined') {
			b = true;
		}

		return this.each(function () {
			this.disabled = !b;
		});
	};

	/**
  * Checks/unchecks any matching checkboxes or radio buttons and
  * selects/deselects and matching option elements.
  */
	$.fn.selected = function (select) {
		if (typeof select === 'undefined') {
			select = true;
		}

		return this.each(function () {
			var t = this.type;

			if (t === 'checkbox' || t === 'radio') {
				this.checked = select;
			} else if (this.tagName.toLowerCase() === 'option') {
				var $sel = $(this).parent('select');

				if (select && $sel[0] && $sel[0].type === 'select-one') {
					// deselect all other options
					$sel.find('option').selected(false);
				}

				this.selected = select;
			}
		});
	};

	// expose debug var
	$.fn.ajaxSubmit.debug = false;

	// helper fn for console logging
	function log() {
		if (!$.fn.ajaxSubmit.debug) {
			return;
		}

		var msg = '[jquery.form] ' + Array.prototype.join.call(arguments, '');

		if (window.console && window.console.log) {
			window.console.log(msg);
		} else if (window.opera && window.opera.postError) {
			window.opera.postError(msg);
		}
	}
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(44), __esModule: true };

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(45), __esModule: true };

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(46), __esModule: true };

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(11);
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(69);
__webpack_require__(67);
__webpack_require__(70);
__webpack_require__(71);
module.exports = __webpack_require__(11).Symbol;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(68);
__webpack_require__(72);
module.exports = __webpack_require__(27).f('iterator');


/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(7);
var toLength = __webpack_require__(64);
var toAbsoluteIndex = __webpack_require__(63);
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
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(47);
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
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(19);
var gOPS = __webpack_require__(35);
var pIE = __webpack_require__(20);
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
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(0).document;
module.exports = document && document.documentElement;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(28);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(28);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(33);
var descriptor = __webpack_require__(13);
var setToStringTag = __webpack_require__(21);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(5)(IteratorPrototype, __webpack_require__(8)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 56 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(14)('meta');
var isObject = __webpack_require__(9);
var has = __webpack_require__(3);
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
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(6);
var anObject = __webpack_require__(10);
var getKeys = __webpack_require__(19);

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
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(20);
var createDesc = __webpack_require__(13);
var toIObject = __webpack_require__(7);
var toPrimitive = __webpack_require__(25);
var has = __webpack_require__(3);
var IE8_DOM_DEFINE = __webpack_require__(31);
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
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(7);
var gOPN = __webpack_require__(34).f;
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
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(3);
var toObject = __webpack_require__(65);
var IE_PROTO = __webpack_require__(22)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(24);
var defined = __webpack_require__(15);
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
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(24);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(24);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(15);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(48);
var step = __webpack_require__(56);
var Iterators = __webpack_require__(17);
var toIObject = __webpack_require__(7);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(32)(Array, 'Array', function (iterated, kind) {
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
/* 67 */
/***/ (function(module, exports) {



/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(62)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(32)(String, 'String', function (iterated) {
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
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(0);
var has = __webpack_require__(3);
var DESCRIPTORS = __webpack_require__(4);
var $export = __webpack_require__(30);
var redefine = __webpack_require__(37);
var META = __webpack_require__(57).KEY;
var $fails = __webpack_require__(12);
var shared = __webpack_require__(23);
var setToStringTag = __webpack_require__(21);
var uid = __webpack_require__(14);
var wks = __webpack_require__(8);
var wksExt = __webpack_require__(27);
var wksDefine = __webpack_require__(26);
var enumKeys = __webpack_require__(51);
var isArray = __webpack_require__(54);
var anObject = __webpack_require__(10);
var isObject = __webpack_require__(9);
var toIObject = __webpack_require__(7);
var toPrimitive = __webpack_require__(25);
var createDesc = __webpack_require__(13);
var _create = __webpack_require__(33);
var gOPNExt = __webpack_require__(60);
var $GOPD = __webpack_require__(59);
var $DP = __webpack_require__(6);
var $keys = __webpack_require__(19);
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
  __webpack_require__(34).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(20).f = $propertyIsEnumerable;
  __webpack_require__(35).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(18)) {
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
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(26)('asyncIterator');


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(26)('observable');


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(66);
var global = __webpack_require__(0);
var hide = __webpack_require__(5);
var Iterators = __webpack_require__(17);
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
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var escape = __webpack_require__(38);

var toastHideTimer;

exports.hide = hide;
exports.showAlert = showAlert;
exports.showToast = showToast;
exports.showConfirm = showConfirm;
exports.showConfirmEdit = showConfirmEdit;

function escape_string(ctx) {
	// 转义.
	if (ctx.title) {
		ctx.title = escape(ctx.title);
	}
	if (ctx.content) {
		ctx.content = escape(ctx.content);
	}
	if (ctx.msg) {
		ctx.msg = escape(ctx.msg);
	}
	if (ctx.editText) {
		ctx.editText = escape(ctx.editText);
	}
	if (ctx.okText) {
		ctx.okText = escape(ctx.okText);
	}
	if (ctx.cancelText) {
		ctx.cancelText = escape(ctx.cancelText);
	}
}

function hide() {
	$('.febsui-dialog').removeClass('febsui-visible');
	if ($('.febsui-dialog').length > 0) {
		$('.febsui-dialog').addClass('febsui-invisible');
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

	if ($('.febsui-dialog').length > 0) {
		$('.febsui-dialog').remove();
	}

	$("body").append($('<div class="febsui-dialog" role="alert"><div class="febsui-dialog-container">' + (ctx.title ? '<div class="febsui-dialog-title">' + ctx.title + '</div>' : '') + '<div class="febsui-dialog-content">' + ctx.content + '</div><ul class="febsui-dialog-buttons"><li style="width:100%"><a href="#0" class="febsui-dialog-ok">' + ctx.okText + '</a></li></ul></div></div>'));

	setTimeout(function () {
		$('.febsui-dialog').addClass('febsui-visible');
	}, 10);

	//close popup
	$('.febsui-dialog').on('click', function (event) {
		if ($(event.target).hasClass('febsui-dialog-ok') /*|| $(event.target).hasClass('febsui-dialog')*/) {
				event.preventDefault();
				hide();
				if (ctx.confirm) ctx.confirm();
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
 * ctx.content
 * ctx.time
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
	if (null != ctx.time) {
		t = ctx.time;
	}
	if (t > 0) {
		if (toastHideTimer) {
			clearTimeout(toastHideTimer);
		}

		toastHideTimer = setTimeout(function () {
			if (typeof $(".febsui-toast").fadeOut !== 'function') {
				// console.log('febs-ui controls need function fadeIn/fadeOut');
				// $("#febsui-dialog-cd-toast").css("display", "none");
				$(".febsui-toast").removeClass('febsui-visible').addClass('febsui-invisible');
			} else {
				$(".febsui-toast").fadeOut(200);
			}

			toastHideTimer = null;
			if (null != ctx.callback) {
				ctx.callback();
			}
		}, t);
	}
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

	if ($('.febsui-dialog').length > 0) {
		$('.febsui-dialog').remove();
	}

	$("body").append($('<div class="febsui-dialog" role="alert"><div class="febsui-dialog-container">' + (ctx.title ? '<div class="febsui-dialog-title">' + ctx.title + '</div>' : '') + '<div class="febsui-dialog-content">' + ctx.content + '</div><ul class="febsui-dialog-buttons"><li><a href="#0" class="febsui-dialog-cancel">' + ctx.cancelText + '</a></li><li><a href="#0" class="febsui-dialog-ok">' + ctx.okText + '</a></li></ul><a href="#0" class="febsui-dialog-close img-replace">Close</a></div></div>'));
	setTimeout(function () {
		$('.febsui-dialog').addClass('febsui-visible');
	}, 10);

	//close popup
	$('.febsui-dialog').on('click', function (event) {
		if ($(event.target).hasClass('febsui-dialog-close') /*|| $(event.target).hasClass('febsui-dialog')*/) {
				event.preventDefault();
				hide();
				if (ctx.cancel) ctx.cancel();
			} else if ($(event.target).hasClass('febsui-dialog-ok')) {
			event.preventDefault();
			if (ctx.confirm) ctx.confirm();
		} else if ($(event.target).hasClass('febsui-dialog-cancel')) {
			event.preventDefault();
			hide();
			if (ctx.cancel) ctx.cancel();
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
			hide();
			if (ctx.cancel) ctx.cancel();
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

	if ($('.febsui-dialog').length > 0) {
		$('.febsui-dialog').remove();
	}

	var elems = '<div class="febsui-dialog" role="alert"><div class="febsui-dialog-container">' + (ctx.title ? '<div class="febsui-dialog-title">' + ctx.title + '</div>' : '') + '<div class="febsui-dialog-content">' + ctx.content + '</div>' + '<div class="febsui-dialog-edit"><input class="febsui-dialog-input-text" type="text" value="' + (ctx.editText ? ctx.editText : '') + '">' + '</div>' + '<ul class="febsui-dialog-buttons"><li><a href="#0" class="febsui-dialog-cancel">' + ctx.cancelText + '</a></li><li><a href="#0" class="febsui-dialog-ok">' + ctx.okText + '</a></li></ul><a href="#0" class="febsui-dialog-close img-replace">Close</a></div></div>';

	$("body").append($(elems));

	setTimeout(function () {
		$('.febsui-dialog').addClass('febsui-visible');
	}, 10);

	//close popup
	$('.febsui-dialog').on('click', function (event) {
		if ($(event.target).hasClass('febsui-dialog-close') /*|| $(event.target).hasClass('febsui-dialog')*/) {
				event.preventDefault();
				hide();
				if (ctx.cancel) ctx.cancel();
			} else if ($(event.target).hasClass('febsui-dialog-ok')) {
			event.preventDefault();
			if (ctx.confirm) ctx.confirm($('.febsui-dialog-container .febsui-dialog-edit .febsui-dialog-input-text').val());
		} else if ($(event.target).hasClass('febsui-dialog-cancel')) {
			event.preventDefault();
			hide();
			if (ctx.cancel) ctx.cancel();
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
			hide();
			if (ctx.cancel) ctx.cancel();
		}
	});
}

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

var _typeof = __webpack_require__(1)["default"];

/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */
var escape = __webpack_require__(38);

function escape_string(str) {
  // 转义.
  if (str) {
    str = escape(str);
  }
  return str;
}

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

  var loading_tag_name = 'febsui_loading_span_s23153dd12ax1';
  var control_loading_index = 0;
  var control_loading_timer;
  var control_loading_text_elemFunc;
  var control_loading_text_hideFunc;
  var control_loading_text_array;

  var controls = {};

  /**
  * @desc: 当前是否显示.
  */
  controls.loading_isVisiable = function () {
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
      $('#' + loading_tag_name).html('<div class="febsui-loading-c"><div class="febsui-loading"><div class="febsui-loading-spin"></div><p style="margin-left:auto;margin-right:auto;text-align:center;max-width:200px;">' + (text ? text : '') + '</p></div></div>');
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
  controls.loading_show_text = function (textArray, changeTextCB, hideCB) {

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
  controls.loading_hide = function () {
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

  return controls;
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

var _typeof = __webpack_require__(1)["default"];

/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */

var crypt = __webpack_require__(80);

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

  window['febscontrolspage_map'] = {};

  var controls = {};

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
      e[0].remove();
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
  controls.page_init = page_init;

  return controls;
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.switch_init = switch_init;

$.fn.isSwitchOn = function () {
  return !this.hasClass("febsui-switch-off");
};

$.fn["switch"] = function (cb) {
  if (cb) {
    if (this.length > 1) {
      for (var i = 0; i < this.length; i++) {
        var elem = this[i];

        if (elem._swtichEvents) {
          elem._swtichEvents.push(cb);
        } // if.
      } // for.
    } else {
      var elem = this._elem;
      if (elem._swtichEvents) {
        elem._swtichEvents.push(cb);
      } // if.
    }
  }
  // trigger.
  else {
      if (this.length > 1) {
        for (var i = 0; i < this.length; i++) {
          var elem = this[i];
          var ee = elem._swtichEvents;
          if (ee) {
            for (var i = 0; i < ee.length; i++) {
              ee[i].bind(elem)();
            }
          }
        } // for.
      } else {
        var elem = this._elem;
        var ee = elem._swtichEvents;
        if (ee) {
          for (var i = 0; i < ee.length; i++) {
            ee[i].bind(elem)();
          }
        }
      }
    } // if..else.
};

$.fn.isSwitchDisable = function () {
  return this.hasClass("febsui-switch-disabled");
};

$.fn.switchDisable = function (isDisable) {
  if (this.length > 1) {
    for (var i = 0; i < this.length; i++) {
      var elem = this[i];

      if (elem._swtichEvents) {
        if (isDisable) elem.addClass("febsui-switch-disabled");else elem.removeClass("febsui-switch-disabled");
      } // if.
    } // for.
  } else {
    var elem = this;
    if (elem._swtichEvents) {
      if (isDisable) elem.addClass("febsui-switch-disabled");else elem.removeClass("febsui-switch-disabled");
    } // if.
  }
};

$.fn.switchOn = function (isOn, trigger) {
  if (this.length > 1) {
    for (var i = 0; i < this.length; i++) {
      var elem = this[i];

      if (elem._swtichEvents) {
        if (isOn) {
          if (elem.hasClass("febsui-switch-off")) {
            elem.removeClass("febsui-switch-off").addClass("febsui-switch-on");
            if (trigger) {
              elem["switch"]();
            }
          }
        } else {
          if (!elem.hasClass("febsui-switch-off")) {
            elem.removeClass("febsui-switch-on").addClass("febsui-switch-off");
            if (trigger) {
              elem["switch"]();
            }
          }
        }
      } // if.
    } // for.
  } else {
    var elem = this;
    if (elem._swtichEvents) {
      if (isOn) {
        if (elem.hasClass("febsui-switch-off")) {
          elem.removeClass("febsui-switch-off").addClass("febsui-switch-on");
          if (trigger) {
            elem["switch"]();
          }
        }
      } else {
        if (!elem.hasClass("febsui-switch-off")) {
          elem.removeClass("febsui-switch-on").addClass("febsui-switch-off");
          if (trigger) {
            elem["switch"]();
          }
        }
      }
    } // if.
  }
};

/**
* @desc: 初始化switch控件.
*        对页面上 class 为 febsui-switch-on 已经 febsui-switch-off 的所有元素初始化为switch控件.
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

        ee["switch"]();
      });

      elems[i]._swtichEvents = elems[i]._swtichEvents || [];

      // elems[i]._switchOn = elems[i].on;
      // elems[i].on = function(event, cb) {
      //   if (event == 'change') {
      //     $(this)._swtichEvents.push(cb);
      //   } else {
      //     $(this)._switchOn(event, cb);
      //   }
      // }.bind(elems[i]);
      // elems[i]._switchOff = elems[i].off;
      // elems[i].off = function(event, cb) {
      //   if (event == 'change') {
      //     var ee = $(this)._swtichEvents;
      //     if (!cb) {
      //       $(this)._swtichEvents = [];
      //     } else {
      //       for (var i = 0; i < ee.length; i++) {
      //         if (ee[i] === cb) {
      //           ee.splice(i, 1);
      //           break;
      //         }
      //       }
      //     }
      //   } else {
      //     $(this)._switchOff(event, cb);
      //   }
      // }.bind(elems[i]);

      // elems[i]._switchOn('change', function(e){
      //   var ee = $(this)._swtichEvents;
      //   for (var i = 0; o < ee.length; i++) {
      //     ee[i](e);
      //   }
      // });

      // elems[i]._switchTrigger = elems[i].trigger;
      // elems[i].trigger = function(event) {
      //   if (event == 'change') {
      //     $(this).switch(!$(this).isSwitchOn(), true);
      //   } else {
      //     $(this)._switchTrigger(event);
      //   }
      // }.bind(elems[i]);
    }
  } // for.
}

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

var _JSON$stringify = __webpack_require__(41)["default"];

var _typeof = __webpack_require__(1)["default"];

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
   *                finishCB:    , // 上传完成后的回调. function(err, serverData)
   *                               //                   err:  - 'no file'      未选择文件.
   *                               //                         - 'size too big' 文件太大.
   *                               //                         - 'check crc32 err' 计算本地文件hash值时错误.
   *                               //                         - 'ajax err'     ajax上传时出错.
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
    var control_uploadSeg_header_url = cfg.headerUrl;
    var control_uploadSeg_url = cfg.uploadUrl;
    var control_uploadSeg_chunkSize = cfg.chunkSize || 1024 * 20;

    if (!cfg.fileBase64Str) {
      if (control_uploadSeg_cb) control_uploadSeg_cb('no file', null);
      return;
    }

    var urlQueryIndex = control_uploadSeg_url.indexOf('?');
    if (urlQueryIndex < 0) {
      control_uploadSeg_url += '?';
    } else if (urlQueryIndex < control_uploadSeg_url.length - 1) {
      control_uploadSeg_url += '&';
    }
    control_uploadSeg_url += 'crc32=';

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
              if (++control_uploadSeg_currentChunk == control_uploadSeg_chunks) {
                if (control_uploadSeg_cb) control_uploadSeg_cb(null, r);
              } else {
                control_uploadSeg_errorCount = 0;
                control_uploadSegs_begin();
              }
            } else {
              if (control_uploadSeg_cb) control_uploadSeg_cb('ajax err', r);
            }
          })["catch"](function (err) {
            if (err == 'timeout') {
              if (control_uploadSeg_errorCount++ < 10) {
                control_uploadSegs_begin();
              } else {
                if (control_uploadSeg_cb) control_uploadSeg_cb('ajax err', null);
              }
            } else if (control_uploadSeg_cb) control_uploadSeg_cb(err, null);
          });
        };

        var control_uploadSeg_errorCount = 0;

        control_uploadSegs_begin();
      } else {
        if (control_uploadSeg_cb) control_uploadSeg_cb('ajax err', r);
      }
    })["catch"](function (err) {
      if (err == 'timeout') {
        if (control_uploadSeg_cb) control_uploadSeg_cb('ajax err', null);
      } else {
        if (control_uploadSeg_cb) control_uploadSeg_cb(err, null);
      }
    });
  }

  return { uploadBase64: uploadBase64 };
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

var _typeof = __webpack_require__(1)["default"];

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
   *                finishCB:    , // 上传完成后的回调. function(err, fileObj, serverData)
   *                               //                   err:  - 'no file'      未选择文件.
   *                               //                         - 'size too big' 文件太大.
   *                               //                         - 'check crc32 err' 计算本地文件hash值时错误.
   *                               //                         - 'ajax err'     ajax上传时出错.
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
    var control_upload_url = cfg.uploadUrl;
    var control_upload_maxFileSize = !cfg.maxFileSize ? Infinity : cfg.maxFileSize;

    if (cfg.fileType) {
      cfg.fileObj.attr("accept", cfg.fileType);
    }

    if (!cfg.fileObj[0].files[0]) {
      if (control_upload_cb) control_upload_cb('no file', cfg.fileObj, null);
      return;
    }
    if (cfg.fileObj[0].files[0].size > control_upload_maxFileSize) {
      if (control_upload_cb) control_upload_cb('size too big', cfg.fileObj, null);
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

    if (!formObj.ajaxSubmit) {
      throw 'febs-ui upload need jquery.form.js';
    }

    crypt.crc32_file(fileObj[0].files[0], function (crc) {
      if (crc) {
        formObj.ajaxSubmit({
          method: 'POST',
          url: control_upload_url + 'crc32=' + crc + '&size=' + fileObj[0].files[0].size + (cfg.data ? '&data=' + cfg.data : ''),
          dataType: 'json',
          contentType: "application/json; charset=utf-8",
          uploadProgress: function uploadProgress(ev, pos, total, percentComplete) {
            if (control_upload_progress_cb) control_upload_progress_cb(fileObj, percentComplete / 100.0);
          },
          error: function error() {
            if (control_upload_cb) control_upload_cb('ajax err', fileObj, null);
          },
          success: function success(r) {
            if (control_upload_cb) control_upload_cb(null, fileObj, r);
          },
          crossDomain: cfg.crossDomain,
          beforeSend: function beforeSend(xhr) {
            if (cfg.headers) {
              for (var control_uploadSeg_key in cfg.headers) {
                if (control_uploadSeg_key != 'Content-Type') xhr.setRequestHeader(control_uploadSeg_key, cfg.headers[control_uploadSeg_key]);
              }
            }
          },
          xhrFields: cfg.withCredentials ? {
            withCredentials: true
          } : null
        });
      } else {
        if (control_upload_cb) control_upload_cb('check crc32 err', fileObj, null);
      }
    });
  }

  return { upload: upload };
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

var _typeof = __webpack_require__(1)["default"];

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

	var febsui = __webpack_require__(39);
	window['febsui'] = febsui;

	/**
  * jquery plugins.
  */
	__webpack_require__(40)(window);

	return febsui;
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))

/***/ }),
/* 80 */
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

/***/ })
/******/ ]);
//# sourceMappingURL=febsui.js.map