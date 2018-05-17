febs-ui 库是一些常用的ui的合集;
febs-ui 库依赖 febs-browser 库

设计上

- 可以通过修改 `febsui-icon.css`, `febsui.css` 来个性化ui样式.
- 尽量使用js方法的方式来构建ui.
- 默认样式为iOS样式

febs-ui 引入了febs-browser(实现了jquery的部分接口), 无需额外引入jquery;

如果需要jquery, 请在febs-ui,febs之前引用

可以查看 [demo](http://demo.citongs.com/febsui)

# Install

Use npm to install:

```js
npm install febs-ui --save
```

# browser

以下列方式使用

> copy directory `node_modules/febs-browser/dist/febs` to client

> copy directory `node_modules/febs-ui/dist/febsui` to client

```html
<link rel="stylesheet" type="text/css" href="path/febsui/febsui.css" /> <!-- 会自动关联 febsui-icon.css -->
<script charset='UTF-8' type="text/javascript" src="path/febs/febs.min.js"></script>
<script charset='UTF-8' type="text/javascript" src="path/febsui/febsui.min.js"></script>

<script>
febsui.dialog_showToast({content:'即将开始', icon:'ok'});
</script>
```

# babel

以下列方式使用

```js
import febsui from 'febs-ui';
import 'febs-ui/febsui.css';  // 或是在html头部引用样式.

//
febsui.dialog_showToast({content:'即将开始', icon:'ok'});
```

# framework

目前实现了如下控件.

  - [jquery extend](#extend)
  - [button](#button)
  - [loading](#loading)
  - [toast](#toast)
  - [alert dialog](#dialog)
  - [confirm dialog](#dialog)
  - [edit dialog](#dialog)
  - [custom dialog](#custom-dialog)
  - [paging](#page)
  - [switch](#switch)
  - [checkbox](#checkbox)
  - [popover](#popover)
  - [actionSheet](#actionsheet)
  - [upload](#upload)

### extend

引入了 如下几个jquery插件方法. (febsui无需额外使用jquery库)

```js

/**
 * @desc 设置为disable (对input, button等元素有效).
 */
$('').setDisabled(isDisable);

/**
 * @desc 返回当前控件是否为disable状态.
 */
$('').isDisabled();
/**
 * @desc 判断第一个元素是否可见.
 */
$('').isVisibile();
/**
 * @desc 判断是否存在可见元素.
 */
$('').hasVisibile();

```

### initial ui

对于非js调用创建的ui, 在编辑好html标签代码后, 需要调用相应的初始化方法进行控件初始化.

页面加载完成`ready`事件触发后, 会自动调用一次初始化方法; 当如果在后续进行dom的修改添加新控件时, 需要手动调用初始化方法.

初始化方法列表

```js
/**
* @desc: 对页面上所有类型的ui控件进行初始化.
*/
febsui.ui_init();

/**
 * @desc 初始化页面上所有switch控件
 *       默认在页面加载完成时会调用一次; 加入新的switch控件时需调用一次.
 */
febsui.ui_switch_init(elem?:any);

/**
 * @desc 初始化页面上所有checkbox控件 (带 febsui-checkbox 类的控件)
 *       默认在页面加载完成时会调用一次; 加入新的checkbox控件时需调用一次.
 */
febsui.ui_checkbox_init(elem?:any);
/**
* @desc: 初始化popover控件.
*        对页面上 的所有 <popover> 元素进行初始化.
*        在增加新的popover到页面后, 需要手动调用此方法.
*/
febsui.ui_popover_init(elem?:any);

/**
* @desc: 初始化actionSheet控件.
*        对页面上 的所有 <actionsheet> 元素进行初始化.
*        在增加新的actionsheet到页面后, 需要手动调用此方法.
*/
febsui.ui_actionSheet_init(elem?:any);
/**
* @desc: 初始化dialog控件.
*        对页面上 的所有 <dialog> 元素进行初始化.
*        在增加新的dialog到页面后, 需要手动调用此方法.
*/
febsui.ui_dialog_init(elem?:any):void;
/**
* @desc: 初始化uploader控件.
*        对页面上 的所有 <uploader> 元素进行初始化.
*        在增加新的uploader到页面后, 需要手动调用此方法.
*/
febsui.ui_uploader_init(elem?:any):void;
/**
* @desc: 用于解决ie9下不支持css:animation; 初始化<div class="febsui-icon-spin1/febsui-icon-spin1-white">控件.
*/
febsui.ui_spin_init(elem?:any):void;
/**
* @desc: 对所有的button控件进行初始化, 保证移动端touch穿透体验.
*/
febsui.ui_button_init(elem?:any):void;
```

### button

![](doc/ui/control-button.png)

```html
  <button >default</button>
  <button class="btn-primary">primary</button>
  <button class="btn-secondary">secondary</button>
  <button class="btn-warning">warning</button>
  <button class="btn-danger">danger</button>
  <button class="btn-primary" disabled="disabled" onclick="console.log(23123);">disabled</button>
```


### loading

已经对需要显示的信息进行了转义

![](doc/ui/control-loadding.png)

```js
/**
* @desc: 当前是否显示.
* @return boolean.
*/
febsui.loading_isVisiable()
```

```js
/**
* @desc: 使用延时显示加载框.
* @param text: 提示文本.
* @param timeout: 延时显示, 默认为0.
* @param spinClass: 默认为 febsui-icon-spin1-white ; ie9以下浏览器使用 febsui-icon-spin3-white
* @return: 
*/
febsui.loading_show(text, timeout, spinClass)

/**
* @desc: 通过每500ms改变文本的方式显示加载框; 例如显示 3,2,1,3,2,1循环显示.
* @param textArray: 变化的文本数组.
* @param changeTextCB: 当前显示文本的回调. function(text).
* @param hideCB:  隐藏加载框时的设置文本的函数. function().
* @return: 
*/
febsui.loading_show_text(textArray, changeTextCB, hideCB) 

/**
* @desc: 隐藏加载对话框
* @return: 
*/
febsui.loading_hide()
```

使用如下代码可以创建spin动画.

```html
<html>

<div class="febsui-icon febsui-icon-spin1"></div>
<div class="febsui-icon febsui-icon-spin1-white"></div>

</html>
```

### toast

已经对需要显示的信息进行了转义

![](doc/ui/control-toast.png)


```js
/**
 * @desc: 显示提示.
 * @param ctx: {
  * ctx.title:    标题.
  * ctx.durable:	持续的时间 ms.
  * ctx.icon: 前置图标.
  * ctx.callback: function(){}	// 对话框消失后的回调.
  * ctx.center: 默认为false; 是否使用居中的显示方式.
  * }
  *  or string.
  */
febsui.toast( ctx );
/**
* @desc 手动隐藏toast.
*/
febsui.toast_hide();
```

### dialog

已经对需要显示的信息进行了转义

![](doc/ui/control-dialog.png)

![](doc/ui/control-confirm.png)


```js
/**
* @desc: 隐藏对话框
* @param selector: 关闭指定的窗口; null则关闭所有.
* @return: 
*/
febsui.dialog_hide( selector?:any );

/**
 * @desc: 显示警告对话框. (回调函数的上下文为当前窗口)
 * @param ctx: {
* ctx.title:    标题.
* ctx.content:	内容文字.
* ctx.contentHtml: html格式的内容 (与content二选一)
* ctx.confirm: function(){}	// 点击确认键的回调.
* ctx.okText
* }
*  or string.
*/
febsui.dialog_showAlert( ctx );

/**
 * @desc: 显示确认对话框. (回调函数的上下文为当前窗口)
 * @param ctx: {
* ctx.title:    标题.
* ctx.content:	内容文字.
* ctx.contentHtml: html格式的内容 (与content二选一)
* ctx.confirm: function(){}	// 点击确认键的回调.
* ctx.cancel: function(){}	// 点击取消键的回调.
* ctx.okText 确认按钮文字
* ctx.cancelText: 取消按钮文字
* }
*/
febsui.dialog_showConfirm( ctx );

  /**
   * @desc: 显示文本输入确认对话框. (回调函数的上下文为当前窗口)
   * @param ctx: {
  * ctx.title:    标题.
  * ctx.content:		 内容文字.
  * ctx.contentHtml: html格式的内容 (与content二选一)
  * ctx.editText:		 输入框文字.
  * ctx.confirm: function(text){}	// 点击确认键的回调.
  * ctx.cancel:  function(){} // 点击取消键的回调.
  * ctx.okText:
  * ctx.cancelText:
  * }
  */
febsui.dialog_showConfirmEdit( ctx );
```

### page
![](doc/ui/control-page.jpg)
```js
/**
* @desc: 初始化page控件.
* @param elem: 将控件插入到elem中, elem是一个jquery的对象.
* @param curPage: 当前页
* @param pageCount: 总页数
* @param totalCount: 总条数
* @param pageCallback: 页面跳转函数, function(page) {}
* @return: 
*/
febsui.page_init(elem, curPage, pageCount, totalCount, pageCallback)

```

### custom dialog

可以自行定义dialog的内容

```html

<div class="febsui-dialog" data-mask-close="true" style="width: 100px; height:400px;">
  ...
</div>

```

属性

| 属性 | 说明 | 值 |
|----|----|----|
| data-mask-close | 表明点击空白处是否关闭对话框. (默认false) | 允许的值为: true, false  |


方法

```js
/**
 * @desc 判断是否是popover
 */
$('.febsui-dialog').isDialog();
/**
 * @desc 显示dialog
 */
$('.febsui-dialog').dialogShow();

/**
 * @desc 隐藏dialog;
 */
$('.febsui-dialog').dialogHide();
```



### switch
![](doc/ui/control-switch.png)

示例

```html
<html>

<!-- 默认是on状态. -->
<div class="febsui-switch"></div> 
<div class="febsui-switch febsui-switch-on"></div> 

<!-- off状态. -->
<div class="febsui-switch febsui-switch-off"></div> 

<!-- disabled状态. -->
<div class="febsui-switch febsui-switch-disabled"></div> 

</html>
```

类

| 类名| 说明 |
|----|----|
| febsui-switch-on |  此类表示switch为on状态.  |
| febsui-switch-off |  此类表示switch为off状态.  |


方法

```js
/**
 * @desc 判断是否是switch
 */
$('.febsui-switch').isSwitch();
/**
 * @desc 监听变化事件
 */
$('.febsui-switch').switch(function(){
  // 
});

or

$('.febsui-switch').on('switch', function(){});


/**
 * @desc 手动触发事件
 */
$('.febsui-switch').switch();

or

$('.febsui-switch').on('switch');

/**
 * @desc 改变状态
 * @param isOn: 设置控件的状态.
 * @param trigger: 可选, 是否触发事件监听 (状态未改变不触发).
 */
$('.febsui-switch').switchOn(isOn, trigger);

/**
 * @desc 返回当前控件的状态.
 */
$('.febsui-switch').switchIsOn();
```


### checkbox
![](doc/ui/control-checkbox.png)

示例

```html
<html>

<input id="checkbox1" type="checkbox" class="febsui-checkbox">
<label for="checkbox1">checkbox</label>

</html>
```


方法

```js
/**
 * @desc 判断是否是checkbox
 */
$('.febsui-checkbox').isCheckbox();
/**
 * @desc 监听变化事件
 */
$('.febsui-checkbox').checkboxChange(function(){
  // 
});

/**
 * @desc 手动触发事件
 */
$('.febsui-checkbox').checkboxChange();

/**
 * @desc 改变状态
 * @param checked: 设置控件的状态.
 * @param trigger: 可选, 是否触发事件监听 (状态未改变不触发).
 */
$('.febsui-checkbox').checkboxChecked(checked, trigger);

/**
 * @desc 返回当前控件的状态.
 */
$('.febsui-checkbox').checkboxIsChecked();
```

### popover
![](doc/ui/control-popover.png)

示例

```html
<html>

<!-- 使用 top, left 样式来指定位置 -->
<div class="febsui-popover" style="top:50px; left:50px;">
  <div class="febsui-popover-cell">cell1</div>
  <div class="febsui-popover-cell">cell2</div>
  <div class="febsui-popover-cell">cell3</div>
</div>

<!-- 使用 data-attach 来固定位置到指定元素 -->
<div class="febsui-popover" id="popover" data-attach="#popoverAttach" data-direction="bottom" data-offset="5">
  <!-- {{ children nodes }} -->
</div>
<button id="popoverAttach" onclick="$('#popover').popoverShow();">show</button>

</html>
```

属性

| 属性 | 说明 | 值 |
|----|----|----|
| data-direction | 表明popover的方向. (默认为auto) | 允许的值为: left, right, top, bottom, center, auto  |
| data-offset |  表明提示位置(三角尖)的偏移像素. (auto时忽略此数值) | 允许的值: 只能为数值  |
| data-attach |  表明显示时自动显示在此元素的指定位置.  | 例如: #btn1  |

方法

```js
/**
 * @desc 判断是否是popover
 */
$('.febsui-popover').isPopover();
/**
 * @desc 显示popover
 * @param mask 是否显示掩码背景.
 * @param attachNode 附加到此节点上显示. 如果不存在, 则查询 data-attach 属性.
 */
$('.febsui-popover').popoverShow(mask?:boolean, attachNode?:selector);

/**
 * @desc 隐藏popover; 显示后点击也会隐藏.
 */
$('.febsui-popover').popoverHide();
```

### actionsheet

![](doc/ui/control-actionsheet.png)

示例

```html
<html>

<div class="febsui-actionsheet">
  <div class="febsui-actionsheet-cell">cell1</div>
  <div class="febsui-actionsheet-cell">cell2</div>

  <div class="febsui-actionsheet-cancel">CANCEL</div>
</div>

</html>
```

类

| 类名| 说明 |
|----|----|
| febsui-actionsheet-cell |  正常的单元格  |
| febsui-actionsheet-cancel |  底部cancel的单元格  |

方法

```js
/**
 * @desc 判断是否是actionsheet
 */
$('.febsui-actionsheet').isActionsheet();
/**
 * @desc 显示actionsheet
 */
$('.febsui-actionsheet').actionsheetShow();

/**
 * @desc 隐藏actionsheet; 显示后点击也会隐藏.
 */
$('.febsui-actionsheet').actionsheetHide();
```


### upload

![](doc/ui/control-uploader.png)

示例

```html
<html>
  <div class="febsui-uploader" data-api="/upload" 
         data-accept="application/zip" 
       data-filename="true" 
          data-begin="onUploadBegin"
         data-finish="febsui.dialog_showAlert('upload ok')"
         data-progress="onUploadProgress"
         data-error="onUploadError">上传图片</div>
  
  <script>
    function onUploadBegin(uploaderController, filename) {
      uploaderController.abort(); // abort uploader.
    }

    function onUploadProgress(percent) {
      console.log(percenter);
    }

    function onUploadError(err) {
      console.log(err);  
    }
  </script>

</html>
```

或使用 `on` 方式绑定事件.

```js

$('.febsui-uploader').on('uploadBegin', function(event, data) {
  console.log(data.filename); // 文件名.
});
$('.febsui-uploader').on('uploadProgress', function(event, data) {
  console.log(data.progress); // 进度.
});
$('.febsui-uploader').on('uploadError', function(event, data) {
  console.log(data.err); // 错误信息.
});
$('.febsui-uploader').on('uploadFinish', function(event, data) {
  console.log(data.responseData); // 服务器返回的数据.
});

```

属性

| 属性 | 说明 | 值 |
|----|----|----|
| data-api | 上传文件的api地址 |   |
| data-accept |  接受文件的类型 | (可选) MIME_type值  |
| data-filename |  是否显示选中的文件名  | (可选) true |
| data-begin | 上传开始的回调  | (可选) function(uploader, filename) {} |
| data-finish | 上传成功的回调  | (可选) function(uploader, serverData) {} |
| data-progress | 上传进度的回调  | (可选) function(uploader, percent) {} |
| data-error | 上传错误的回调  | (可选) function(uploader, err) {}; err可能的值有:  <br> febsui.uploadErr.nofile - 未选择文件<br> febsui.uploadErr.sizeExceed - 文件太大<br> febsui.uploadErr.crc32 - 计算本地文件hash值时错误<br> febsui.uploadErr.net - ajax上传时出错<br> 其他 |
| data-maxsize | 最大的文件字节大小 | (可选) 10240 |

事件.

| 事件名 | 说明 | 参数 |
|----|----|----|
| uploadBegin | 上传开始的回调 |  event, {filename:string}  |
| uploadProgress |  上传进程的回调 |  event, {progress:number}  |
| uploadError |  上传错误的回调 |  event, {err:any}  |
| uploadFinish |  上传完成的回调 |  event, {responseData:any}  |




方法

```js
/**
 * @desc 重设为未开始上传的样式
 */
$('.febsui-uploader').uploaderReset();
```


上传控件配合 `febs` 库使用. js的使用方式为:

> 如果是ie9以下浏览器, 服务器返回的数据时, 需要把响应头的content-type的值设为`text/plain`或者`text/html`; 否则会出现提示保存文件. 

#### multipart/form-data方式上传.

```js
/**
 * Desc:
 *      upload控件使用一个接口来上传文件, 使用multpart/form-data方式传输:
 *          1. uploadUrl: 上传文件.
 * Example:
 *      前台引入:
 *          1. 在需要upload的页面上使用如下语句:
 *                <form method="post" role="form" enctype="multipart/form-data" id="fileForm">
 *                  <input type="file" class="form-control" name="file" onchange="febsui.upload(cfg)" multiple>
 *                  <input type="submit" value="提交"> <!-- ie9以下浏览器需要提供此元素 -->
 *                </form>
 *      后台:
 *          1. 在uploadUrl中调用  await require('febs').controls.upload.accept(app, conditionCB); 当满足条件时将存储, 并返回true表示成功.
 */

 客户端调用如下接口上传文件.
 /** 
  * 并且 <input type="file" name="file"... 中, 必须存在name属性.
  * 使用post方式上传文件.
  * @param cfg:  object, 其中
  *              {
  *                data:       , // 上传到服务器的任意字符串数据.
  *                formObj:    , // 含有enctype="multipart/form-data"的form
  *                fileObj:    , // form中的file对象
  *                uploadUrl:  , // 上传文件内容的url. 系统将自动使用 uploadUrl?crc32=&size=的方式来上传.
  *                maxFileSize:    , // 允许上传的最大文件.0表示无限制.默认为0
  *                fileType:     , // 允许的文件类型.  如: image/gif,image/jpeg,image/x-png
  *                beginCB:     , // 上传开始的回调. function(uploader); 调用uploader.abort() 可以停止上传.
  *                finishCB:    , // 上传完成后的回调. function(err, fileObj, serverData)
 *                               //                   err:  - febsui.uploadErr.nofile      未选择文件.
 *                               //                         - febsui.uploadErr.sizeExceed  文件太大.
 *                               //                         - febsui.uploadErr.crc32       计算本地文件hash值时错误.
 *                               //                         - febsui.uploadErr.net         ajax上传时出错.
  *                               //                   serverData: 服务器返回的数据.
  *                progressCB:  , // 上传进度的回调. function(fileObj, percent),
  *                headers: {     // 设置request headers
  *                  'customHeader': 'value'
  *                },
  *                crossDomain: true,     // 跨域, 默认为true
  *                withCredentials: true, // 是否附带cookie, 默认为true
  *              }
  */
 febsui.upload(cfg);
```

例子
后台:
```js
exports.upload = async function(ctx, next)
{
  var r = await require('febs').controls.upload.accept(ctx, async function(data, filesize, filename, filemimeType){
    console.log(filesize);
    console.log(filename);
    console.log(filemimeType);

    return 'tempPath/temp.filename';
  });
};

```
前台:
```js
<script type="text/javascript" charset="utf-8" src="/febs/febs.min.js"></script>
<script type="text/javascript" charset="utf-8" src="/febsui/febsui.min.js"></script>

<script type="text/javascript">
function upload() {
  febsui.upload({
    formObj:  $('#fileForm'),
    fileObj:  $("#filec"),
    uploadUrl:  '/uploadFile',
    finishCB: function(err, fileObj, serverData){
      console.log(serverData);
    },
    progressCB: function(fileObj, percent){
      console.log(percent);
    })
  });
}
</script>

<form method="post" role="form" enctype="multipart/form-data" id="fileForm">
  <input id="filec" type="file" name="file" onchange="javascript:upload()" multiple>
</form>
```

#### base64方式上传.

客户端调用如下接口上传文件.
```js
/**
 * post方式上传文件.
 * 使用文件流片段的方式. 每个片段进行验证.速度稍慢
 * @param cfg:  object, 其中
 *              {
 *                data:       , // 上传到服务器的任意字符串数据,将在发送请求时发送.
 *                fileBase64Str:  , // 文件的base64格式字符串
 *                headerUrl:  , // 上传开始前的header请求地址.
 *                uploadUrl:  , // 上传文件内容的url.
 *                chunkSize:  1024*20,  // 每次上传的块大小.默认20kb
 *                beginCB:     , // 上传开始的回调. function(uploader); 调用uploader.abort() 可以停止上传.
 *                finishCB:    , // 上传完成后的回调. function(err, serverData)
 *                               //                   err:  - febsui.uploadErr.nofile      未选择文件.
 *                               //                         - febsui.uploadErr.sizeExceed  文件太大.
 *                               //                         - febsui.uploadErr.crc32       计算本地文件hash值时错误.
 *                               //                         - febsui.uploadErr.net         ajax上传时出错.
 *                               //                   serverData: 服务器返回的数据. 至少包含一个filename
 *                progressCB:  , // 上传进度的回调. function(percent)
 *              }
 */
febsui.uploadBase64(cfg);
```

例子
后台:
```js
// 处理上传请求.
exports.uploadByBase64Header = async function (ctx) {
    await febsui.uploadBase64.acceptHeader(ctx, 
      async function(data, filesize){
          return "/tmp/filename.jpg";
      }, function(data){ // set upload sessoin info.
          ctx.session.uploadSegInfo = data;
      });
}

// 处理上传片段.
exports.uploadByBase64 = async function (ctx) {
    await febsui.uploadBase64.accept(ctx, 
      async function(filename){
          let img = sharp(filename);
          let info = await img.metadata();
          return febs.utils.mergeMap(errCode.OK, { width: info.width, height: info.height });
      }, function(){  // get upload session info.
          return ctx.session.uploadSegInfo;
      }, function(data){ // set upload sessoin info.
          ctx.session.uploadSegInfo = data;
      }, function() {  // clear upload session info.
          ctx.session.uploadSegInfo = undefined;
      });
}
```
前台:
```js
<script type="text/javascript" charset="utf-8" src="/febs/febs.min.js"></script>
<script type="text/javascript" charset="utf-8" src="/febsui/febsui.min.js"></script>

<script type="text/javascript">
  febsui.uploadBase64({
      data: {msg :'这是一个用户数据'},
      fileBase64Str: base64Imagestr,
      headerUrl: '/api/mgr/uploadimgByBase64Header',
      uploadUrl: '/api/mgr/uploadimgByBase64',
      finishCB: function(err, serverData) {
        if (err) {
          console.log('err: ');
          console.log(err);
          console.log(serverData);
        }
        else {
          console.log('finish: ');
          console.log(serverData);
        }
      },
      progressCB: function(percent) {
        console.log(Math.ceil(percent*100)+'%');
      }
    });
</script>
```