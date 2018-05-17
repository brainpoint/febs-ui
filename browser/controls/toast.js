var uuid = require('../uuid');

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

  if (typeof ctx !== 'object') {
    ctx = {content:ctx&&ctx.toString()};
  }

  escape_string(ctx);

  ctx.center = !!ctx.center;

  ctx.msg = ctx.content;

	if ($('.febsui-toast').length > 0) {
		$('.febsui-toast').remove();
	}

	var html = '<div class="febsui-toast' + (ctx.center?' febsui-toast-center': '') + '" style="display:none" role="alert"><div class="febsui-toast-container">'
	if (null != ctx.icon) {
    html += "<div class='febsui-icon febsui-icon-" + ctx.icon + "'></div>";

    if (ctx.center) {
      html += '<div class="febsui-dialog-msg">' + ctx.msg + '</div></div></div>';
    } else {
      html += '<div class="febsui-dialog-msg" style="padding-left:30px;">' + ctx.msg + '</div></div></div>';
    }
  }
	else{
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