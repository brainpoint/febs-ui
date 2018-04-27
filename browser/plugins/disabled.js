
/**
 * 仅返回第一个元素的情况.
 */
$.fn.isDisabled = function() {

  var ee = this;

  // switch.
  if (ee.isSwitch())
    return ee.switchIsDisabled();


  var dis = ee.attr('disabled');
  return !!dis;
}

$.fn.disabled = function(isDisable) {

  var ee = this;

  // switch.
  if (ee.isSwitch())
    return ee.switchDisabled(isDisable);


  if (isDisable) {
    ee.attr('disabled', 'disabled');
  }
  else {
    ee.removeAttr('disabled');
  }
  return this;
}