var escape = require('../escape');

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
(document).addEventListener('keyup', function (event) {
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
    ctx = {content:ctx};
  }

	if (!ctx.okText) ctx.okText = "确认";
  escape_string(ctx);

	if ($('.febsui-dialog').length > 0) {
		$('.febsui-dialog').remove();
  }

  $("body").append($('<div class="febsui-dialog" role="alert"><div class="febsui-dialog-container">' + (ctx.title?('<div class="febsui-dialog-title">' + ctx.title + '</div>'):'') + '<div class="febsui-dialog-content">' + ctx.content + '</div><ul class="febsui-dialog-buttons"><li style="width:100%"><a href="#0" class="febsui-dialog-ok">' + ctx.okText + '</a></li></ul></div></div>'));
	

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
 */
function showToast(ctx) {
  if (typeof ctx === 'string') {
    ctx = {content:ctx};
  }

  escape_string(ctx);

  ctx.msg = ctx.content;

	if ($('.febsui-dialog-notice').length > 0) {
		$('.febsui-dialog-notice').remove();
	}

	var html = '<div id="febsui_dlg_cd_notice" class="febsui-dialog-notice" style="display:none" role="alert"><div class="febsui-dialog-notice-container">'
	if (null != ctx.icon) {
		html += "<div class='febsui-icon febsui-icon-" + ctx.icon + "'></div>";
		html += '<div class="febsui-dialog-msg" style="padding-left:30px;">' + ctx.msg + '</div></div></div>';
	}
	else{
		html += '<div class="febsui-dialog-msg">' + ctx.msg + '</div></div></div>';
	}
  $("body").append($(html));

  if (typeof $("#febsui_dlg_cd_notice").fadeIn !== 'function') {
    // console.log('febs-ui controls need function fadeIn/fadeOut');
    $("#febsui_dlg_cd_notice").css("display", "inherit");
    $("#febsui_dlg_cd_notice").removeClass('febsui-invisible').addClass('febsui-visible');
  } else {
    $("#febsui_dlg_cd_notice").fadeIn(200);
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
      if (typeof $("#febsui_dlg_cd_notice").fadeOut !== 'function') {
        // console.log('febs-ui controls need function fadeIn/fadeOut');
        // $("#febsui_dlg_cd_notice").css("display", "none");
        $("#febsui_dlg_cd_notice").removeClass('febsui-visible').addClass('febsui-invisible');
      } else {
        $("#febsui_dlg_cd_notice").fadeOut(200);
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

	$("body").append($('<div class="febsui-dialog" role="alert"><div class="febsui-dialog-container">' + (ctx.title?('<div class="febsui-dialog-title">' + ctx.title + '</div>'):'') + '<div class="febsui-dialog-content">' + ctx.content + '</div><ul class="febsui-dialog-buttons"><li><a href="#0" class="febsui-dialog-cancel">' + ctx.cancelText + '</a></li><li><a href="#0" class="febsui-dialog-ok">' + ctx.okText + '</a></li></ul><a href="#0" class="febsui-dialog-close img-replace">Close</a></div></div>'));
	setTimeout(function () {
		$('.febsui-dialog').addClass('febsui-visible');
	}, 10);

  //close popup
	$('.febsui-dialog').on('click', function (event) {
		if ($(event.target).hasClass('febsui-dialog-close') /*|| $(event.target).hasClass('febsui-dialog')*/) {
			event.preventDefault();
			hide();
			if (ctx.cancel) ctx.cancel();
		}
		else if ($(event.target).hasClass('febsui-dialog-ok')) {
			event.preventDefault();
			if (ctx.confirm) ctx.confirm();
		}
		else if ($(event.target).hasClass('febsui-dialog-cancel')) {
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

  var elems = '<div class="febsui-dialog" role="alert"><div class="febsui-dialog-container">' 
  + (ctx.title?('<div class="febsui-dialog-title">' + ctx.title + '</div>'):'') 
  + '<div class="febsui-dialog-content">' + ctx.content + '</div>' 
  + '<div class="febsui-dialog-edit"><input class="febsui-dialog-input-text" type="text" value="' + (ctx.editText?ctx.editText:'') + '">' + '</div>' 
  + '<ul class="febsui-dialog-buttons"><li><a href="#0" class="febsui-dialog-cancel">' + ctx.cancelText + '</a></li><li><a href="#0" class="febsui-dialog-ok">' + ctx.okText + '</a></li></ul><a href="#0" class="febsui-dialog-close img-replace">Close</a></div></div>';

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
		}
		else if ($(event.target).hasClass('febsui-dialog-ok')) {
			event.preventDefault();
			if (ctx.confirm) ctx.confirm( $('.febsui-dialog-container .febsui-dialog-edit .febsui-dialog-input-text').val() );
		}
		else if ($(event.target).hasClass('febsui-dialog-cancel')) {
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
