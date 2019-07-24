var resizeDialog = require('../plugins/dialog').resizeDialog;
var maskPrevent = require('../utils/domHelper').maskPreventEvent;

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


function hide(selector, finishCb) {
  if (selector) {
    setTimeout(function(){
      $(selector).removeClass('febsui-visible').addClass('febsui-invisible');
      if ($(selector)[0]) {

        // 移除临时弹出的窗口.
        if ($(selector).hasClass('febsui-dialog-init-sys')) {
          setTimeout(function(){
            $(selector).remove();
            if (finishCb)
              finishCb();
          }, 300);
        }
        else {
          if (finishCb) {
            setTimeout(function(){
                finishCb();
            }, 300);
          }
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
      if (eee.hasClass('febsui-dialog-init-sys')) {
        ees.push(eee);
      }
    } // for.

    setTimeout(function(){
      for (var i = 0; i < ees.length; i++) {
        ees[i].remove();
      }
      if (finishCb) {
        finishCb();
      }
    }, 300);
  }
}

// add keyup.
// (document).addEventListener('keyup', function (event) {
//   if (event.which == '27') {
//     hide();
//   }
// });

/**
* ctx.title:    标题.
* ctx.blackBg:  使用黑色背景.
* ctx.cssClass: 自定义扩展样式.
* ctx.content:	内容文字.
* ctx.contentHtml: 使用html方式的内容.
* ctx.confirm: function(){}	// 点击确认键的回调.
* ctx.okText
*/
function showAlert(ctx) {

  if (typeof ctx !== 'object') {
    ctx = {content:ctx&&ctx.toString()};
  }

  ctx.contentHtml = ctx.contentHtml? ctx.contentHtml: '';

	if (!ctx.okText) ctx.okText = "确认";
  escape_string(ctx);

	// if ($('.febsui-dialog').length > 0) {
	// 	$('.febsui-dialog').remove();
  // }

  var uid = 'febs-'+febs.crypt.uuid();

  var mask = '';
  if (!$('.febsui-mask').hasVisible()) {
    mask = ' febsui-mask';
  }

  if (ctx.cssClass) {
    mask += ' ' + ctx.cssClass;
  }

  var blackBgClass = ctx.blackBg? ' febsui-dialog-container-black' : '';

  var htmlElem = '<div' + ' id="' + uid + '" class="febsui-dialog febsui-dialog-init-sys febsui-dialog-init'+mask+'" role="alert"><div class="febsui-dialog-container' + blackBgClass + '">';
  htmlElem += (ctx.title?('<div class="febsui-dialog-title">' + ctx.title + '</div>'):'');
  htmlElem += (ctx.content||ctx.contentHtml) ? ('<div class="febsui-dialog-content">' + (ctx.content? ctx.content: ctx.contentHtml) + '</div>') : '';
  htmlElem += '<ul class="febsui-dialog-buttons"><li style="width:100%;' + styleBorder + '"><button class="febsui-dialog-cancel">' + ctx.okText + '</button></li></ul></div></div>';

  $("body").append($(htmlElem));
  resizeDialog();

  var eee = $('#'+uid);
  maskPrevent(eee);
  maskPrevent(eee.children('.febsui-dialog-container'));
  
	setTimeout(function () {
		eee.addClass('febsui-visible');
	}, 10);

  //close popup
  var ele = eee;
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
* ctx.blackBg:  使用黑色背景.
* ctx.cssClass: 自定义扩展样式.
* ctx.content:		 内容文字.
* ctx.contentHtml: html方式的内容.
* ctx.confirm: function(){}	// 点击确认键的回调.
* ctx.cancel:  function(){} // 点击取消键的回调.
* ctx.okText:
* ctx.cancelText:
*/
function showConfirm(ctx) {
  
  if (typeof ctx !== 'object') {
    ctx = {content:ctx&&ctx.toString()};
  }

	if (!ctx.okText) ctx.okText = "确认";
  if (!ctx.cancelText) ctx.cancelText = "取消";
  
  ctx.contentHtml = ctx.contentHtml? ctx.contentHtml: '';

  escape_string(ctx);

	// if ($('.febsui-dialog').length > 0) {
	// 	$('.febsui-dialog').remove();
	// }

  var uid = 'febs-'+febs.crypt.uuid();

  var mask = '';
  if (!$('.febsui-mask').hasVisible()) {
    mask = ' febsui-mask';
  }

  if (ctx.cssClass) {
    mask += ' ' + ctx.cssClass;
  }

  var blackBgClass = ctx.blackBg? ' febsui-dialog-container-black' : '';

  var htmlElem = '<div' + ' id="' + uid + '" class="febsui-dialog febsui-dialog-init-sys febsui-dialog-init'+mask+'" role="alert"><div class="febsui-dialog-container' + blackBgClass + '">';
  htmlElem += (ctx.title?('<div class="febsui-dialog-title">' + ctx.title + '</div>'):'');
  htmlElem += (ctx.content||ctx.contentHtml) ? ('<div class="febsui-dialog-content">' + (ctx.content? ctx.content: ctx.contentHtml) + '</div>') : '';
  htmlElem += '<ul class="febsui-dialog-buttons"><li' + (isIE9?' style="'+styleBorder+'"':'') + '><button class="febsui-dialog-cancel">' + ctx.cancelText + '</button></li><li'+(isIE9?' style="'+styleBorder+'"':'')+'><button class="febsui-dialog-ok">' + ctx.okText + '</button></li></ul></div></div>';

	$("body").append($(htmlElem));
  resizeDialog();

  maskPrevent($('#'+uid));

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
	// $(document).one('keyup', function (event) {
	// 	if (event.which == '27') {
	// 		if (ctx.cancel) ctx.cancel.bind(ele)();
	// 		hide(ele);
	// 	}
	// });
}


/**
* ctx.title:    标题.
* ctx.blackBg:  使用黑色背景.
* ctx.cssClass: 自定义扩展样式.
* ctx.content:		 内容文字.
* ctx.contentHtml: html方式的内容.
* ctx.editText:		 输入框文字.
* ctx.confirm: function(text){}	// 点击确认键的回调.
* ctx.cancel:  function(){} // 点击取消键的回调.
* ctx.okText:
* ctx.cancelText:
*/
function showConfirmEdit(ctx) {
    
  if (typeof ctx !== 'object') {
    ctx = {content:ctx&&ctx.toString()};
  }

	if (!ctx.okText) ctx.okText = "确认";
  if (!ctx.cancelText) ctx.cancelText = "取消";
  
  ctx.contentHtml = ctx.contentHtml? ctx.contentHtml: '';

  // 转义.
  escape_string(ctx);

	// if ($('.febsui-dialog').length > 0) {
	// 	$('.febsui-dialog').remove();
	// }

  var uid = 'febs-'+febs.crypt.uuid();

  var mask = '';
  if (!$('.febsui-mask').hasVisible()) {
    mask = ' febsui-mask';
  }

  if (ctx.cssClass) {
    mask += ' ' + ctx.cssClass;
  }

  var blackBgClass = ctx.blackBg? ' febsui-dialog-container-black' : '';

  var elems = '<div' + ' id="' + uid + '" class="febsui-dialog febsui-dialog-init-sys febsui-dialog-init'+mask+'" role="alert"><div class="febsui-dialog-container' + blackBgClass + '">';
  elems += (ctx.title?('<div class="febsui-dialog-title">' + ctx.title + '</div>'):'') 
  elems += ((ctx.content||ctx.contentHtml) ? ('<div class="febsui-dialog-content">' + (ctx.content? ctx.content: ctx.contentHtml) + '</div>') : '') 
  elems += '<div class="febsui-dialog-edit"><input class="febsui-input-text-noborder" type="text" value="' + (ctx.editText?ctx.editText:'') + '">' + '</div>' 
  elems += '<ul class="febsui-dialog-buttons"><li'+(isIE9?' style="'+styleBorder+'"':'')+'><button class="febsui-dialog-cancel">' + ctx.cancelText + '</button></li><li'+(isIE9?' style="'+styleBorder+'"':'')+'><button class="febsui-dialog-ok">' + ctx.okText + '</button></li></ul></div></div>';

  $("body").append($(elems));
  resizeDialog();

  maskPrevent($('#'+uid));

	setTimeout(function () {
		$('#'+uid).addClass('febsui-visible');
	}, 10);

  //close popup
  var ele = $('#'+uid);
	ele.on('click', function (event) {
		if ($(event.target).hasClass('febsui-dialog-ok')) {
			event.preventDefault();
			if (ctx.confirm) ctx.confirm.bind(ele)( $('#'+uid + ' .febsui-dialog-edit .febsui-input-text-noborder').val() );
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
	// $(document).one('keyup', function (event) {
	// 	if (event.which == '27') {
	// 		if (ctx.cancel) ctx.cancel.bind(ele)();
	// 		hide(ele);
	// 	}
	// });
}


/**
 * jquery plugin.
 */

exports.dialog_init = dialog_init;

/**
* @desc: 初始化dialog控件.
*        对页面上 的所有 <dialog> 元素进行初始化.
*/
function dialog_init(elem) {
  var elems = elem ? elem : $('.febsui-dialog');
  for (var i = 0; i < elems.length; i++) {
    var dom = $(elems[i]);
    
    if (!dom.hasClass('febsui-dialog')) {
      continue;
    }

    if (!dom.hasClass('febsui-dialog-init')) {
      dom.addClass('febsui-dialog-container').removeClass('febsui-dialog');

      // 内容.
      var content = dom.children('.febsui-dialog-content');
      var title = dom.children('.febsui-dialog-title');

      var contentWrap = title[0]? '<div class="febsui-dialog-content-wrap febsui-dialog-content-wrap-title"></div>': '<div class="febsui-dialog-content-wrap"></div>';
      dom.prepend($(contentWrap).append(content));
      if (title[0]) {
        dom.prepend(title);
      }

      // 判断是否有按钮.
      if (!dom.children('.febsui-dialog-buttons')[0]) {
        dom.addClass('febsui-dialog-container-noButtons');
      }
      
      var domid = dom.attr('id');
      if (febs.string.isEmpty(domid)) {
        throw new Error('must have a "id" attribute in custom febsui-dialog');
      }

      // var ddd = $("<div class='febsui-dialog febsui-dialog-init' style='display:none !important;'></div>");
      // ddd.insertBefore(dom);

      var maskZIndex = dom.attr('data-mask-zindex');

      $('.febsui-dialog[data-id="'+domid+'"]').remove();
      var dd = $("<div class='febsui-dialog febsui-dialog-init febsui-dialog-custom"+ ' id-'+domid +"' role='alert' data-id='"+domid+"'></div>");
      if (!isNaN(parseInt(maskZIndex))) {
        dd.css('z-index', parseInt(maskZIndex));
      }
      $('body').append(dd);
      dd.append(dom);

      //close popup
      dom.on('click', function (event) {
        if ($(event.target).hasClass('febsui-dialog-cancel')) {
          event.preventDefault();
          hide($(event.target).parents('.febsui-dialog'));
        }
      });

      if (dom.attr('data-mask-close') == 'true') {
        dd.on('click', function (event) {
          if (event.currentTarget == event.target) {
            event.preventDefault();
            hide($(event.target));
          }
        });
      }
    }
  } // for.
}

