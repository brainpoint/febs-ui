var uuid = require('../uuid');
var resizeDialog = require('../plugins/dialog').resizeDialog;

exports.hide = hide;
exports.showAlert = showAlert;
exports.showConfirm = showConfirm;
exports.showConfirmEdit = showConfirmEdit;

var isIE9 = window.febs.utils.browserIEVer();
var styleBorder = '';
// ie9.
if (isIE9 <= 9) {
  styleBorder = 'border-top:1px solid #eee;';
}



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

function hide(selector) {
  if (selector) {
    setTimeout(function(){
      $(selector).removeClass('febsui-visible').addClass('febsui-invisible');
      if ($(selector)[0]) {

        // 移除临时弹出的窗口.
        if (!$(selector).hasClass('febsui-dialog-init')) {
          setTimeout(function(){
            $(selector).remove();
          }, 300);
        }
      }
    }, 100);
  }
  else {
    var ee = $('.febsui-dialog');
    ee.removeClass('febsui-visible').addClass('febsui-invisible');

    var ees = [];
    // 移除临时弹出的窗口.
    for (var i = 0; i < ee.length; i++) {
      var eee = $(ee[i]);
      if (!eee.hasClass('febsui-dialog-init')) {
        ees.push(eee);
      }
    } // for.

    setTimeout(function(){
      for (var i = 0; i < ees.length; i++) {
        ees[i].remove();
      }
    }, 300);
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
* ctx.contentHtml: 使用html方式的内容.
* ctx.confirm: function(){}	// 点击确认键的回调.
* ctx.okText
*/
function showAlert(ctx) {

  if (typeof ctx === 'string') {
    ctx = {content:ctx};
  }

  ctx.contentHtml = ctx.contentHtml? ctx.contentHtml: '';

	if (!ctx.okText) ctx.okText = "确认";
  escape_string(ctx);

	// if ($('.febsui-dialog').length > 0) {
	// 	$('.febsui-dialog').remove();
  // }

  var uid = 'febs-'+uuid.uuid();

  var mask = '';
  if (!$('.febsui-mask').hasVisibile()) {
    mask = ' febsui-mask';
  }

  $("body").append($('<div' + ' id="' + uid + '" class="febsui-dialog'+mask+'" role="alert"><div class="febsui-dialog-container">' + (ctx.title?('<div class="febsui-dialog-title">' + ctx.title + '</div>'):'') + '<div class="febsui-dialog-content">' + (ctx.content? ctx.content: ctx.contentHtml) + '</div><ul class="febsui-dialog-buttons"><li style="width:100%;' + styleBorder + '"><a class="febsui-dialog-cancel">' + ctx.okText + '</a></li></ul></div></div>'));
  resizeDialog();

	setTimeout(function () {
		$('#'+uid).addClass('febsui-visible');
	}, 10);

  //close popup
  var ele = $('#'+uid);
	ele.on('click', function (event) {
		if ($(event.target).hasClass('febsui-dialog-cancel') /*|| $(event.target).hasClass('febsui-dialog')*/) {
			event.preventDefault();
			if (ctx.confirm) ctx.confirm.bind(ele)();
			hide(ele);
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
* ctx.title:    标题.
* ctx.content:		 内容文字.
* ctx.contentHtml: html方式的内容.
* ctx.confirm: function(){}	// 点击确认键的回调.
* ctx.cancel:  function(){} // 点击取消键的回调.
* ctx.okText:
* ctx.cancelText:
*/
function showConfirm(ctx) {
	if (!ctx.okText) ctx.okText = "确认";
  if (!ctx.cancelText) ctx.cancelText = "取消";
  
  ctx.contentHtml = ctx.contentHtml? ctx.contentHtml: '';

  escape_string(ctx);

	// if ($('.febsui-dialog').length > 0) {
	// 	$('.febsui-dialog').remove();
	// }

  var uid = 'febs-'+uuid.uuid();

  var mask = '';
  if (!$('.febsui-mask').hasVisibile()) {
    mask = ' febsui-mask';
  }

	$("body").append($('<div' + ' id="' + uid + '" class="febsui-dialog'+mask+'" role="alert"><div class="febsui-dialog-container">' + (ctx.title?('<div class="febsui-dialog-title">' + ctx.title + '</div>'):'') + '<div class="febsui-dialog-content">' + (ctx.content? ctx.content: ctx.contentHtml) + '</div><ul class="febsui-dialog-buttons"><li' + (isIE9?' style="'+styleBorder+'"':'') + '><a class="febsui-dialog-cancel">' + ctx.cancelText + '</a></li><li'+(isIE9?' style="'+styleBorder+'"':'')+'><a class="febsui-dialog-ok">' + ctx.okText + '</a></li></ul></div></div>'));
  resizeDialog();

  setTimeout(function () {
		$('#'+uid).addClass('febsui-visible');
	}, 10);

  //close popup
  var ele = $('#'+uid);
	ele.on('click', function (event) {
		if ($(event.target).hasClass('febsui-dialog-ok')) {
			event.preventDefault();
			if (ctx.confirm) ctx.confirm.bind(ele)();
		}
		else if ($(event.target).hasClass('febsui-dialog-cancel')) {
			event.preventDefault();
			if (ctx.cancel) ctx.cancel.bind(ele)();
			hide(ele);
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
			if (ctx.cancel) ctx.cancel.bind(ele)();
			hide(ele);
		}
	});
}


/**
* ctx.title:    标题.
* ctx.content:		 内容文字.
* ctx.contentHtml: html方式的内容.
* ctx.editText:		 输入框文字.
* ctx.confirm: function(text){}	// 点击确认键的回调.
* ctx.cancel:  function(){} // 点击取消键的回调.
* ctx.okText:
* ctx.cancelText:
*/
function showConfirmEdit(ctx) {
	if (!ctx.okText) ctx.okText = "确认";
  if (!ctx.cancelText) ctx.cancelText = "取消";
  
  ctx.contentHtml = ctx.contentHtml? ctx.contentHtml: '';

  // 转义.
  escape_string(ctx);

	// if ($('.febsui-dialog').length > 0) {
	// 	$('.febsui-dialog').remove();
	// }

  var uid = 'febs-'+uuid.uuid();

  var mask = '';
  if (!$('.febsui-mask').hasVisibile()) {
    mask = ' febsui-mask';
  }

  var elems = '<div' + ' id="' + uid + '" class="febsui-dialog'+mask+'" role="alert"><div class="febsui-dialog-container">' 
  + (ctx.title?('<div class="febsui-dialog-title">' + ctx.title + '</div>'):'') 
  + '<div class="febsui-dialog-content">' + (ctx.content? ctx.content: ctx.contentHtml) + '</div>' 
  + '<div class="febsui-dialog-edit"><input class="febsui-dialog-input-text" type="text" value="' + (ctx.editText?ctx.editText:'') + '">' + '</div>' 
  + '<ul class="febsui-dialog-buttons"><li'+(isIE9?' style="'+styleBorder+'"':'')+'><a class="febsui-dialog-cancel">' + ctx.cancelText + '</a></li><li'+(isIE9?' style="'+styleBorder+'"':'')+'><a class="febsui-dialog-ok">' + ctx.okText + '</a></li></ul></div></div>';

  $("body").append($(elems));
  resizeDialog();

	setTimeout(function () {
		$('#'+uid).addClass('febsui-visible');
	}, 10);

  //close popup
  var ele = $('#'+uid);
	ele.on('click', function (event) {
		if ($(event.target).hasClass('febsui-dialog-ok')) {
			event.preventDefault();
			if (ctx.confirm) ctx.confirm.bind(ele)( $('#'+uid + ' .febsui-dialog-edit .febsui-dialog-input-text').val() );
		}
		else if ($(event.target).hasClass('febsui-dialog-cancel')) {
			event.preventDefault();
			if (ctx.cancel) ctx.cancel.bind(ele)();
			hide(ele);
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
			if (ctx.cancel) ctx.cancel.bind(ele)();
			hide(ele);
		}
	});
}


/**
 * jquery plugin.
 */

exports.dialog_init = dialog_init;

/**
* @desc: 初始化dialog控件.
*        对页面上 的所有 <dialog> 元素进行初始化.
*/
function dialog_init() {
  var elems = $('dialog');
  for (var i = 0; i < elems.length; i++) {
    var dom = $(elems[i]);

    if (!dom.hasClass('febsui-dialog-container')) {
      dom.addClass('febsui-dialog-container');

      var dd = $("<div class='febsui-dialog febsui-dialog-init' role='alert'></div>");
      $('body').append(dd);
      var did = dom.attr('id');
      if (did) {
        dd.attr('id', did);
        dom.removeAttr('id');
      }
      dd.append(dom);

      //close popup
      dom.on('click', function (event) {
        if ($(event.target).hasClass('febsui-dialog-cancel')) {
          event.preventDefault();
          hide($(event.target).parents('.febsui-dialog'));
        }
      });
    }
  } // for.
}

