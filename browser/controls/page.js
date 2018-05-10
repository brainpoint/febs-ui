/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */

var crypt = require('../uuid');

'use strict';

window['febscontrolspage_map'] = {};

/**
* @desc: 初始化page控件.
* @param elem: 将控件插入到elem中, elem是一个jquery的对象.
* @param curPage: 当前页
* @param pageCount: 总页数
* @param totalCount: 总条数
* @param pageCallback: 页面跳转函数, function(page) {}
* @return: 
*/
function page_init(elem, curPage, pageCount, totalCount, pageCallback) {

  elem = $(elem);

  var foo = 'page'+crypt.uuid();
  window['febscontrolspage_map'][foo] = pageCallback;
  foo = 'javascript:window[\'febscontrolspage_map\'][\''+foo+'\']';

  var pagePre = '';
  if (curPage > 0)
  {
    var stp = Math.min(curPage, 5);
    for (var i = 1; i < 5 && curPage > i; i++)
    {
      pagePre += '<li class="febsui-paginItem"><a href="'+foo+'('+(i+curPage-stp)+')">'+(i+curPage-stp)+'</a></li>';
    }
  }

  var pageNext = '';
  if (pageCount > curPage)
  {
    var pages = febs.utils.browserIsPhone() ? 2 : 5;
    var i = 1+curPage;
    for (; i < pages+curPage && i <= pageCount; i++)
    {
      pageNext += '<li class="febsui-paginItem"><a href="'+foo+'('+i+')">'+i+'</a></li>';
    }
    if (i < pageCount)
    {
      pageNext += '<li class="febsui-paginItem"><a href="'+foo+'('+i+')">...</a></li>';
    }
  }

  var urlPrePage = curPage > 1 ? foo+'(' + (curPage-1) + ')' : 'javascript:;';
  var urlPrePageClass = curPage > 1 ? 'febsui-pagepre febsui-icon-arrow-left' : 'febsui-pagepre febsui-icon-arrow-left-gray';
  var urlNextPage = curPage < pageCount ? foo+'(' + (curPage+1) + ')' : 'javascript:;';
  var urlNextPageClass = curPage < pageCount ? 'febsui-pagenxt febsui-icon-arrow-right' : 'febsui-pagenxt febsui-icon-arrow-right-gray';

  var e = elem.children('.febsui-pagin');
  if (e && e.length > 0) {
    $(e[0]).remove();
  }

  elem.append(('<div class="febsui-pagin">\
  <div class="febsui-paginMessage">\
    共<i class="blue">'
      + totalCount +
    '</i>条记录，当前显示第&nbsp;<i class="blue">'+curPage+'&nbsp;</i>页\
  </div>\
  <ul class="febsui-paginList">\
    <li class="febsui-paginItem">\
      <a href="'+urlPrePage+'">\
        <span style="display: block" class="'+urlPrePageClass+'"></span>\
      </a>\
    </li>'
    + pagePre +
    '<li class="febsui-paginItem febsui-pagin-current">\
      <a href="javascript:;">'+curPage+'</a>\
    </li>'
    + pageNext +
    '<li class="febsui-paginItem">\
      <a href="'+urlNextPage+'">\
        <span style="display: block" class="'+urlNextPageClass+'"></span>\
      </a>\
    </li>\
  </ul>\
</div>'));
}

exports.page_init  = page_init;