
'use strict';


var stringUtils = window.febs.string;

function escape_string(str) {
  // 转义.
  str = stringUtils.replace(str, '<', '&lt;');
  str = stringUtils.replace(str, '>', '&gt;');
  return str;
}

exports.escape_string = escape_string;