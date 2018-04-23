// import { $ } from 'febs-browser';

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

var dialog = require('./dialog');
exports.dialog_hide = dialog.hide;
exports.dialog_showAlert = dialog.showAlert;
exports.dialog_showToast = dialog.showToast;
exports.dialog_showConfirm = dialog.showConfirm;
exports.dialog_showConfirmEdit = dialog.showConfirmEdit;

var switcha = require('./switch');
exports.switch_init = switcha.switch_init;
$(document).ready(function(){
  switcha.switch_init();
});

