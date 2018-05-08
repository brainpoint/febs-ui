
/**
 * 仅返回第一个元素的情况.
 */
$.fn.isDisabled = function() {

  var ee = this;

  // switch.
  if (ee.isSwitch())
    return ee.switchIsDisabled();
  
  // checkbox.
  if (ee.isCheckbox()) {
    return ee.checkboxIsDisabled();
  }


  var dis = ee.attr('disabled');
  return !!dis;
}

$.fn.setDisabled = function(isDisable) {

  var ee = this;

  // switch.
  if (ee.isSwitch())
    return ee.switchDisabled(isDisable);

  // checkbox.
  if (ee.isCheckbox())
    return ee.checkboxDisabled(isDisable);

  if (isDisable) {
    ee.attr('disabled', 'disabled');
  }
  else {
    ee.removeAttr('disabled');
  }
  return this;
}