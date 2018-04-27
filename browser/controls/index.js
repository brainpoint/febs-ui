// import { $ } from 'febs-browser';

// require('febs-browser');

if (!$) {
  throw new Error('must import febs first');
}

var loading = require('./loading');
exports.loading_isVisiable = loading.loading_isVisiable;
exports.loading_show = loading.loading_show;
exports.loading_show_text = loading.loading_show_text;
exports.loading_hide = loading.loading_hide;

exports.page_init  = require('./page').page_init;
exports.uploadBase64  = require('./upload.base64').uploadBase64;
exports.upload  = require('./upload').upload;

var toast = require('./toast');
exports.toast = toast.showToast;
exports.toast_hide = toast.hideToast;

var dialog = require('./dialog');
exports.dialog_hide = dialog.hide;
exports.dialog_showAlert = dialog.showAlert;
exports.dialog_showConfirm = dialog.showConfirm;
exports.dialog_showConfirmEdit = dialog.showConfirmEdit;

var switcha = require('./switch');
exports.switch_init = switcha.switch_init;

var popovera = require('./popover');
exports.popover_init = popovera.popover_init;

var dialoga = require('./dialog');
exports.dialog_init = dialoga.dialog_init;

var actionsheeta = require('./actionsheet');
exports.actionsheet_init = actionsheeta.actionsheet_init;


$(document).ready(function(){
  switcha.switch_init();
  popovera.popover_init();
  dialoga.dialog_init();
  actionsheeta.actionsheet_init();
});
