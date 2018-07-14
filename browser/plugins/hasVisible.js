

/**
 * 元素中是否存在可见的.
 */
$.fn.hasVisible = function() {

  var _this = (typeof this.length === 'undefined') ? $(this) : this;
  
  for (var i = 0; i < _this.length; i++){
    if (!( !!( _this[i].offsetWidth || _this[i].offsetHeight || _this[i].getClientRects().length ) ))
    {
      continue;
    }
    else {
      var style = window.getComputedStyle(_this[i]);
      if ( style.width !== 0 &&
      style.height !== 0 &&
      style.opacity !== 0 &&
      style.display!=='none' &&
      style.visibility!== 'hidden') {
        return true;
      }
    }
  }

  return false;
}
