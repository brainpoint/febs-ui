var uuid = require('../uuid');

exports.actionsheet_init = actionsheet_init;


/**
* @desc: 屏幕旋转事件.
*/
function resizeActionsheet(){
  var elem = $('actionsheet');
  
  for (var i = 0; i < elem.length; i++) {
    var span = (document.body.clientWidth - elem[i].clientWidth) / 2;
    span = Math.min(span, 15);

    $(elem[i]).css('margin-top', parseInt((document.body.clientHeight - elem[i].clientHeight) - span) + 'px');
  }
}

// 是否支持orientationchange事件
if ('orientation' in window && 'onorientationchange' in window)
{
  $(window).on('orientationchange', resizeActionsheet);
}
else {
  $(window).on('resize', resizeActionsheet);
}


$.fn.isActionsheet = function() {

  var _this = (typeof this.length === 'undefined') ? $(this) : this;

  if (_this.length >= 1) {
    if (_this[0].nodeName.toLowerCase() == 'actionsheet') {
      return true;
    }
    else {
      return $(_this[0]).hasClass('febsui-actionsheet');
    }
  }
  
  return false;
}

$.fn.actionsheetShow = function() {

  var _this = (typeof this.length === 'undefined') ? $(this) : this;

  for (var i = 0; i < _this.length; i++) {
    var ee = $(_this[i]);
    if (ee[0].nodeName.toLowerCase() == 'actionsheet') {
      ee = ee.parent();
    }
    if (ee.hasClass('febsui-actionsheet')) {

      if (ee.isVisibile())
        continue;

      var mask = '';
      if (!$('.febsui-mask').hasVisibile()) {
        ee.addClass('febsui-mask');
      }
      else {
        ee.removeClass('febsui-mask');
      }

      ee.one('click', function(){
        $(this).actionsheetHide();
      });

      ee.removeClass('febsui-invisible').addClass('febsui-visible');
    }
  }

  resizeActionsheet();
  return this;
}

$.fn.actionsheetHide = function() {

  var _this = (typeof this.length === 'undefined') ? $(this) : this;

  for (var i = 0; i < _this.length; i++) {
    var ee = $(_this[i]);
    if (ee[0].nodeName.toLowerCase() == 'actionsheet') {
      ee = ee.parent();
    }
    if (ee.hasClass('febsui-actionsheet')) {
      ee.removeClass('febsui-visible').addClass('febsui-invisible');
    }
  }
  return this;
}

/**
* @desc: 初始化popover控件.
*        对页面上 的所有 <actionsheet> 元素进行初始化.
*/
function actionsheet_init() {
  var elems = $('actionsheet');
  for (var i = 0; i < elems.length; i++) {
    var dom = $(elems[i]);

    if (!dom.hasClass('febsui-actionsheet-inited')) {

      dom.addClass('febsui-actionsheet-inited');

      var domChildren = dom.children();
      var ddChildren;
      if (domChildren[0]) {
        ddChildren = $("<div class='febsui-actionsheet-group'></div>");
        ddChildren.append(domChildren);
        dom.append(ddChildren);
      }

      if (ddChildren) {
        var domCancel = ddChildren.children('.febsui-actionsheet-cancel');
        if (domCancel[0]) {
          domCancel.addClass('febsui-actionsheet-cell');
          var ddCancel = $("<div class='febsui-actionsheet-group' style='margin-top:5px;'></div>");
          ddCancel.append(domCancel);
          dom.append(ddCancel);
        }
      }

      var dd = $("<div class='febsui-actionsheet'></div>");
      $('body').append(dd);
      var did = dom.attr('id');
      if (did) {
        dd.attr('id', did);
        dom.removeAttr('id');
        // copy attri.
        var attris = dom[0].attributes;
        if (attris) {
          for (var j = 0; j < attris.length; j++) {
            if (attris[j].nodeName.indexOf('data-') == 0) {
              dd.attr(attris[j].nodeName, dom.attr(attris[j].nodeName));
            }
          }
        }
      }

      dd.append(dom);

      // // 动画设置.
      // dom.css('-webkit-transform', 'translateY('+dom[0].clientHeight+'px)');
      // dom.css('-moz-transform', 'translateY('+dom[0].clientHeight+'px)');
      // dom.css('-ms-transform', 'translateY('+dom[0].clientHeight+'px)');
      // dom.css('-o-transform', 'translateY('+dom[0].clientHeight+'px)');
      // dom.css('transform', 'translateY('+dom[0].clientHeight+'px)');
    }
  } // for.
}

