

/**
 * 仅返回第一个元素的情况.
 */
$.fn.isVisibile = function() {

  var _this = (typeof this.length === 'undefined') ? $(this) : this;
  
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
    if (!( !!( _this[0].offsetWidth || _this[0].offsetHeight || _this[0].getClientRects().length ) ))
    {
      return false;
    }
    else {
      var style = window.getComputedStyle(_this[0]);
      return style.width !== 0 &&
      style.height !== 0 &&
      style.opacity !== 0 &&
      style.display!=='none' &&
      style.visibility!== 'hidden';
    }
  }

  return false;
}

// 单纯判断.
$.fn._isVisibile = function() {

  var _this = (typeof this.length === 'undefined') ? $(this) : this;
  
  if (_this.length > 0) {

    // other.
    if (!( !!( _this[0].offsetWidth || _this[0].offsetHeight || _this[0].getClientRects().length ) ))
    {
      return false;
    }
    else {
      var style = window.getComputedStyle(_this[0]);
      return style.width !== 0 &&
      style.height !== 0 &&
      style.opacity !== 0 &&
      style.display!=='none' &&
      style.visibility!== 'hidden';
    }
  }

  return false;
}
