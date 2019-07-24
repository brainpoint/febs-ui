
/**
 * 仅返回第一个元素的情况.
 */
$.fn.isDisable = function() {
  var _this = (typeof this.length === 'undefined') ? $(this) : this;
  
  if (_this.length > 0) {
    // switch.
    if (_this.isSwitch && _this.isSwitch())
      return _this.switchIsDisabled();

    // checkbox.
    if (_this.isCheckbox && _this.isCheckbox()) {
      return _this.checkboxIsDisabled();
    }

    var dis = _this.attr('disabled');
    return !!dis;
  }
}

$.fn.setDisable = function(isDisable) {

  var _this = (typeof this.length === 'undefined') ? $(this) : this;
  if (_this.length > 0) {

    // switch.
    if (_this.isSwitch())
      return _this.switchDisabled(isDisable);

    // checkbox.
    if (_this.isCheckbox())
      return _this.checkboxDisabled(isDisable);

    if (isDisable) {
      _this.attr('disabled', 'disabled');
    }
    else {
      _this.removeAttr('disabled');
    }
  }
  return this;
}