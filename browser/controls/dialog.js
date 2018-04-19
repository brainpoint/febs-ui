var escape = require('../escape');
var dom = require('../dom');

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
  var elems = dom.getElementsByClassName('febsui-popup');
  if (elems) {
    for (var i = 0; i < elems.length; i++) {
      dom.removeClass(elems[i], 'febsui-visible');
      dom.addClass(elems[i], 'febsui-invisible');
    }
  }

	// $('.febsui-popup').removeClass('febsui-visible');
  // if ($('.febsui-popup').length > 0) {
  //   $('.febsui-popup').addClass('febsui-invisible');
  // }
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

  {
    var elems = dom.getElementsByClassName('febsui-popup');
    if (elems) {
      for (var i = 0; i < elems.length; i++) {
        dom.removeElement(elems[i]);
      }
    }
  }
	// if ($('.febsui-popup').length > 0) {
	// 	$('.febsui-popup').remove();
  // }

  {
    var _body = dom.getElementsByTagName('body')[0];
    var elemPopup = dom.createElement('div');
    dom.addClass(elemPopup, 'febsui-popup');
    dom.setAttribute(elemPopup, 'role', alert);
    elemPopup.innerHTML = '<div class="febsui-popup-container">' + (ctx.title?('<div class="febsui-popup-title">' + ctx.title + '</div>'):'') + '<div class="febsui-popup-content">' + ctx.content + '</div><ul class="febsui-popup-buttons"><li style="width:100%"><a href="#0" class="febsui-popup-ok">' + ctx.okText + '</a></li></ul></div>';
    dom.appendChild(_body, elemPopup);
  }// $("body").append($('<div class="febsui-popup" role="alert"><div class="febsui-popup-container">' + (ctx.title?('<div class="febsui-popup-title">' + ctx.title + '</div>'):'') + '<div class="febsui-popup-content">' + ctx.content + '</div><ul class="febsui-popup-buttons"><li style="width:100%"><a href="#0" class="febsui-popup-ok">' + ctx.okText + '</a></li></ul></div></div>'));
	

	setTimeout(function () {
    var elems = dom.getElementsByClassName('febsui-popup');
    if (elems) {
      for (var i = 0; i < elems.length; i++) {
        dom.addClass(elems[i], 'febsui-visible');
      }
    }
		// $('.febsui-popup').addClass('febsui-visible');
	}, 10);

  //close popup
  {
    var elems = dom.getElementsByClassName('febsui-popup');
    if (elems) {
      for (var i = 0; i < elems.length; i++) {
        elems[i].addEventListener('click', function (event) {
          if (dom.hasClass(event.target, 'febsui-popup-ok') /*|| $(event.target).is('.febsui-popup')*/) {
            event.preventDefault();
            hide();
            if (ctx.confirm) ctx.confirm();
          }
        });
      }
    }
  }
	// $('.febsui-popup').on('click', function (event) {
	// 	if ($(event.target).is('.febsui-popup-ok') /*|| $(event.target).is('.febsui-popup')*/) {
	// 		event.preventDefault();
	// 		hide();
	// 		if (ctx.confirm) ctx.confirm();
	// 	}
  // });
  
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

  {
    var elems = dom.getElementsByClassName('febsui-popup-notice');
    if (elems) {
      for (var i = 0; i < elems.length; i++) {
        dom.removeElement(elems[i]);
      }
    }
  }
	// if ($('.febsui-popup-notice').length > 0) {
	// 	$('.febsui-popup-notice').remove();
	// }

  {
    var _body = dom.getElementsByTagName('body')[0];
    var elemPopup = dom.createElement('div');
    dom.setAttribute(elemPopup, 'id', 'febsui_dlg_cd_notice');
    dom.setAttribute(elemPopup, 'style', 'display:none');
    dom.setAttribute(elemPopup, 'role', 'alert');
    dom.addClass(elemPopup, 'febsui-popup-notice');

    var html = '<div class="febsui-popup-notice-container">';
    if (null != ctx.icon) {
      html += "<div class='febsui-icon febsui-icon-" + ctx.icon + "'></div>";
      html += '<div class="febsui-popup-msg" style="padding-left:30px;">' + ctx.msg + '</div></div>';
    }
    else{
      html += '<div class="febsui-popup-msg">' + ctx.msg + '</div></div>';
    }

    elemPopup.innerHTML = html;
    dom.appendChild(_body, elemPopup);
  }
	// var html = '<div id="febsui_dlg_cd_notice" class="febsui-popup-notice" style="display:none" role="alert"><div class="febsui-popup-notice-container">'
	// if (null != ctx.icon) {
	// 	html += "<div class='febsui-icon febsui-icon-" + ctx.icon + "'></div>";
	// 	html += '<div class="febsui-popup-msg" style="padding-left:30px;">' + ctx.msg + '</div></div></div>';
	// }
	// else{
	// 	html += '<div class="febsui-popup-msg">' + ctx.msg + '</div></div></div>';
	// }
  // $("body").append($(html));

  {
    var elem = dom.getElementById('febsui_dlg_cd_notice');
    if (elem) {
      if (typeof elem.fadeIn !== 'function') {
        console.log('febs-ui controls need function fadeIn/fadeOut');
        elem.style.display = 'inherit';
      } else {
        elem.fadeIn(200);
      }
    }
  }
  // if (typeof $("#febsui_dlg_cd_notice").fadeIn !== 'function') {
  //   console.log('febs-ui controls need function fadeIn/fadeOut');
  //   $("#febsui_dlg_cd_notice").css("display", "inherit");
  // } else {
  //   $("#febsui_dlg_cd_notice").fadeIn(200);
  // }
	
	var t = 3000;
	if (null != ctx.time) {
		t = ctx.time;
	}
	if (t > 0) {
    if (toastHideTimer) {
      clearTimeout(toastHideTimer);
    }

		toastHideTimer = setTimeout(function () {
      {
        var elem = dom.getElementById('febsui_dlg_cd_notice');
        if (elem) {
          if (typeof elem.fadeOut !== 'function') {
            console.log('febs-ui controls need function fadeIn/fadeOut');
            elem.style.display = 'none';
          } else {
            elem.fadeOut(200);
          }
        }
      }
      // if (typeof $("#febsui_dlg_cd_notice").fadeOut !== 'function') {
      //   console.log('febs-ui controls need function fadeIn/fadeOut');
      //   $("#febsui_dlg_cd_notice").css("display", "none");
      // } else {
      //   $("#febsui_dlg_cd_notice").fadeOut(200);
      // }
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

  {
    var elems = dom.getElementsByClassName('febsui-popup');
    if (elems) {
      for (var i = 0; i < elems.length; i++) {
        dom.removeElement(elems[i]);
      }
    }
  }
	// if ($('.febsui-popup').length > 0) {
	// 	$('.febsui-popup').remove();
	// }

  {
    var _body = dom.getElementsByTagName('body')[0];
    var elemPopup = dom.createElement('div');
    dom.setAttribute(elemPopup, 'role', 'alert');
    dom.addClass(elemPopup, 'febsui-popup');

    var html = '<div class="febsui-popup-notice-container">';
    if (null != ctx.icon) {
      html += "<div class='febsui-icon febsui-icon-" + ctx.icon + "'></div>";
      html += '<div class="febsui-popup-msg" style="padding-left:30px;">' + ctx.msg + '</div></div>';
    }
    else{
      html += '<div class="febsui-popup-msg">' + ctx.msg + '</div></div>';
    }

    elemPopup.innerHTML = '<div class="febsui-popup-container">' + (ctx.title?('<div class="febsui-popup-title">' + ctx.title + '</div>'):'') + '<div class="febsui-popup-content">' + ctx.content + '</div><ul class="febsui-popup-buttons"><li><a href="#0" class="febsui-popup-cancel">' + ctx.cancelText + '</a></li><li><a href="#0" class="febsui-popup-ok">' + ctx.okText + '</a></li></ul><a href="#0" class="febsui-popup-close img-replace">Close</a></div>';
    dom.appendChild(_body, elemPopup);
  }
	// $("body").append($('<div class="febsui-popup" role="alert"><div class="febsui-popup-container">' + (ctx.title?('<div class="febsui-popup-title">' + ctx.title + '</div>'):'') + '<div class="febsui-popup-content">' + ctx.content + '</div><ul class="febsui-popup-buttons"><li><a href="#0" class="febsui-popup-cancel">' + ctx.cancelText + '</a></li><li><a href="#0" class="febsui-popup-ok">' + ctx.okText + '</a></li></ul><a href="#0" class="febsui-popup-close img-replace">Close</a></div></div>'));
	setTimeout(function () {
    var elems = dom.getElementsByClassName('febsui-popup');
    if (elems) {
      for (var i = 0; i < elems.length; i++) {
        dom.addClass(elems[i], 'febsui-visible');
      }
    }
		// $('.febsui-popup').addClass('febsui-visible');
	}, 10);

  //close popup
  {
    var elems = dom.getElementsByClassName('febsui-popup');
    if (elems) {
      for (var i = 0; i < elems.length; i++) {
        elems[i].addEventListener('click', function (event) {
          if (dom.hasClass(event.target, 'febsui-popup-close') /*|| $(event.target).is('.febsui-popup')*/) {
            event.preventDefault();
            hide();
            if (ctx.cancel) ctx.cancel();
          }
          else if (dom.hasClass(event.target, 'febsui-popup-ok')) {
            event.preventDefault();
            if (ctx.confirm) ctx.confirm();
          }
          else if (dom.hasClass(event.target, 'febsui-popup-cancel')) {
            event.preventDefault();
            hide();
            if (ctx.cancel) ctx.cancel();
          }
        });
      }
    }
  }
	// $('.febsui-popup').on('click', function (event) {
	// 	if ($(event.target).is('.febsui-popup-close') /*|| $(event.target).is('.febsui-popup')*/) {
	// 		event.preventDefault();
	// 		hide();
	// 		if (ctx.cancel) ctx.cancel();
	// 	}
	// 	else if ($(event.target).is('.febsui-popup-ok')) {
	// 		event.preventDefault();
	// 		if (ctx.confirm) ctx.confirm();
	// 	}
	// 	else if ($(event.target).is('.febsui-popup-cancel')) {
	// 		event.preventDefault();
	// 		hide();
	// 		if (ctx.cancel) ctx.cancel();
	// 	}
  // });
  
  //close popup when clicking the esc keyboard button
  (document).addEventListener('keyup', function (event) {
		if (event.which == '27') {
      hide();
      if (ctx.cancel) ctx.cancel();
      (document).removeEventListener('keyup', this);
		}
	});
	// $(document).keyup(function (event) {
	// 	if (event.which == '27') {
	// 		hide();
	// 		if (ctx.cancel) ctx.cancel();
	// 	}
	// });
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

  {
    var elems = dom.getElementsByClassName('febsui-popup');
    if (elems) {
      for (var i = 0; i < elems.length; i++) {
        dom.removeElement(elems[i]);
      }
    }
  }
	// if ($('.febsui-popup').length > 0) {
	// 	$('.febsui-popup').remove();
	// }

  {
    var _body = dom.getElementsByTagName('body')[0];
    var elemPopup = dom.createElement('div');
    dom.setAttribute(elemPopup, 'role', 'alert');
    dom.addClass(elemPopup, 'febsui-popup');

    var elems = '<div class="febsui-popup-container">' 
      + (ctx.title?('<div class="febsui-popup-title">' + ctx.title + '</div>'):'') 
      + '<div class="febsui-popup-content">' + ctx.content + '</div>' 
      + '<div class="febsui-popup-edit"><input class="febsui-popup-input-text" type="text" value="' + (ctx.editText?ctx.editText:'') + '">' + '</div>' 
      + '<ul class="febsui-popup-buttons"><li><a href="#0" class="febsui-popup-cancel">' + ctx.cancelText + '</a></li><li><a href="#0" class="febsui-popup-ok">' + ctx.okText + '</a></li></ul><a href="#0" class="febsui-popup-close img-replace">Close</a></div>';

    elemPopup.innerHTML = elems;
    dom.appendChild(_body, elemPopup);
  }
  // var elems = '<div class="febsui-popup" role="alert"><div class="febsui-popup-container">' 
  // + (ctx.title?('<div class="febsui-popup-title">' + ctx.title + '</div>'):'') 
  // + '<div class="febsui-popup-content">' + ctx.content + '</div>' 
  // + '<div class="febsui-popup-edit"><input class="febsui-popup-input-text" type="text" value="' + (ctx.editText?ctx.editText:'') + '">' + '</div>' 
  // + '<ul class="febsui-popup-buttons"><li><a href="#0" class="febsui-popup-cancel">' + ctx.cancelText + '</a></li><li><a href="#0" class="febsui-popup-ok">' + ctx.okText + '</a></li></ul><a href="#0" class="febsui-popup-close img-replace">Close</a></div></div>';

  // $("body").append($(elems));
  
	setTimeout(function () {
    var elems = dom.getElementsByClassName('febsui-popup');
    if (elems) {
      for (var i = 0; i < elems.length; i++) {
        dom.addClass(elems[i], 'febsui-visible');
      }
    }
		// $('.febsui-popup').addClass('febsui-visible');
	}, 10);

  //close popup
  {
    var elems = dom.getElementsByClassName('febsui-popup');
    if (elems) {
      for (var i = 0; i < elems.length; i++) {
        elems[i].addEventListener('click', function (event) {
          if (dom.hasClass(event.target, 'febsui-popup-close') /*|| $(event.target).is('.febsui-popup')*/) {
            event.preventDefault();
            hide();
            if (ctx.cancel) ctx.cancel();
          }
          else if (dom.hasClass(event.target, 'febsui-popup-ok')) {
            event.preventDefault();
            var ee = dom.getElementsByClassName('febsui-popup-input-text')[0];

            if (ctx.confirm) ctx.confirm( ee ? ee.value : '' );
          }
          else if (dom.hasClass(event.target, 'febsui-popup-cancel')) {
            event.preventDefault();
            hide();
            if (ctx.cancel) ctx.cancel();
          }
        });
      }
    }
  }
	// $('.febsui-popup').on('click', function (event) {
	// 	if ($(event.target).is('.febsui-popup-close') /*|| $(event.target).is('.febsui-popup')*/) {
	// 		event.preventDefault();
	// 		hide();
	// 		if (ctx.cancel) ctx.cancel();
	// 	}
	// 	else if ($(event.target).is('.febsui-popup-ok')) {
	// 		event.preventDefault();
	// 		if (ctx.confirm) ctx.confirm( $('.febsui-popup-container  .febsui-popup-edit .febsui-popup-input-text').val() );
	// 	}
	// 	else if ($(event.target).is('.febsui-popup-cancel')) {
	// 		event.preventDefault();
	// 		hide();
	// 		if (ctx.cancel) ctx.cancel();
	// 	}
  // });
  
  //close popup when clicking the esc keyboard button
  (document).addEventListener('keyup', function (event) {
		if (event.which == '27') {
      hide();
      if (ctx.cancel) ctx.cancel();
      (document).removeEventListener('keyup', this);
		}
	});
	// $(document).keyup(function (event) {
	// 	if (event.which == '27') {
	// 		hide();
	// 		if (ctx.cancel) ctx.cancel();
	// 	}
	// });
}
