// Type definitions for febs

/// <reference types="node" />

/**
* @desc: 使用延时显示加载框.
* @param text: 提示文本.
* @param timeout: 延时显示, 默认为0.
* @return: 
*/
export  function loading_show(text: string, timeout?: number): any;

/**
* @desc: 通过每500ms改变文本的方式显示加载框; 例如显示 3,2,1,3,2,1循环显示.
* @param textArray: 变化的文本数组.
* @param changeTextCB: 当前显示文本的回调. function(text).
* @param hideCB:  隐藏加载框时的设置文本的函数. function().
* @return: 
*/
export function loading_show_text(textArray: Array<string>, changeTextCB: (text: string) => void, hideCB: () => void): void;

/**
* @desc: 隐藏加载对话框
* @return: 
*/
export function loading_hide(): void;


/**
* @desc: 隐藏对话框
* @return: 
*/
export function dialog_hide(): void;

/**
 * @desc: 显示警告对话框.
 * @param ctx: {
* ctx.title:    标题.
* ctx.content:	内容文字.
* ctx.confirm: function(){}	// 点击确认键的回调.
* ctx.okText
* }
*/
export function dialog_showAlert( ctx: { title?:string, content?:string, confirm?:()=>void, okText?:string } ): void;

/**
 * @desc: 显示提示.
 * @param ctx: {
  * ctx.content:  提示内容.
  * ctx.time:	持续的时间 ms.
  * ctx.icon: 前置图标.
  * ctx.center: 默认为false; 是否使用居中的显示方式.
  * ctx.callback: function(){}	// 对话框消失后的回调.
  * }
  */
  export function dialog_showToast( ctx: { content?:string, time?:number, icon?:'ok'|'error'|'warn', center?:boolean, callback?:()=>void } ): void;

/**
 * @desc: 显示确认对话框.
 * @param ctx: {
* ctx.title:    标题.
* ctx.content:	内容文字.
* ctx.confirm: function(){}	// 点击确认键的回调.
* ctx.cancel: function(){}	// 点击取消键的回调.
* ctx.okText 确认按钮文字
* ctx.cancelText: 取消按钮文字
* }
*/
export function dialog_showConfirm( ctx: { title?:string, content?:string, confirm?:()=>void, cancel?:()=>void, okText?:string, cancelText?:string } ): void;


/**
 * @desc: 显示文本输入确认对话框.
 * @param ctx: {
* ctx.title:    标题.
* ctx.content:		 内容文字.
* ctx.editText:		 输入框文字.
* ctx.confirm: function(text){}	// 点击确认键的回调.
* ctx.cancel:  function(){} // 点击取消键的回调.
* ctx.okText:
* ctx.cancelText:
* }
*/
export function dialog_showConfirmEdit( ctx: { title?:string, content?:string, editText?:string, confirm?:(text:string)=>void, cancel?:()=>void, okText?:string, cancelText?:string } ): void;

/**
* @desc: 初始化page控件.
* @param elem: 将控件插入到elem中, elem是一个jquery的对象.
* @param curPage: 当前页
* @param pageCount: 总页数
* @param totalCount: 总条数
* @param pageCallback: 页面跳转函数, function(page) {}
* @return: 
*/
export function page_init(elem: any, curPage: number, pageCount: number, totalCount: number, pageCallback: (page: any) => void): void;

/**
 * @desc 初始化页面上所有switch控件
 *       默认在页面加载完成时会调用一次; 加入新的switch控件时需调用一次.
 */
export function switch_init():void;

/** [客户端调用] 需要 jquery,jquery.form 库支持.
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
*                finishCB:    , // 上传完成后的回调. function(err, fileObj, serverData)
*                               //                   err:  - 'no file'      未选择文件.
*                               //                         - 'size too big' 文件太大.
*                               //                         - 'check crc32 err' 计算本地文件hash值时错误.
*                               //                         - 'ajax err'     ajax上传时出错.
*                               //                   serverData: 服务器返回的数据.
*                progressCB:  , // 上传进度的回调. function(fileObj, percent)
*                headers: {     // 设置request headers
*                  'customHeader': 'value'
*                },
*                crossDomain: true,     // 跨域, 默认为true
*                withCredentials: true, // 是否附带cookie, 默认为true
*              }
*/
export function upload(cfg: {
  data:       string,
  formObj:    any,
  fileObj:    any,
  uploadUrl:  string,
  maxFileSize:  number,
  fileType:    string,
  finishCB:    (err:any, fileObj:any, serverData:any)=>void,
  progressCB:  (fileObj:any, percent:number)=>void,
  headers:  any,
  crossDomain: boolean,
  withCredentials: boolean,
}): void;

/**
 * [客户端调用] post方式上传文件.
 * 使用文件流片段的方式. 每个片段进行验证.速度稍慢
 * @param cfg:  object, 其中
 *              {
 *                data:       , // 上传到服务器的任意字符串数据,将在发送请求时发送.
 *                fileBase64Str:  , // 文件的base64格式字符串
 *                headerUrl:  , // 上传开始前的header请求地址.
 *                uploadUrl:  , // 上传文件内容的url.
 *                chunkSize:  1024*20,  // 每次上传的块大小.默认20kb
 *                finishCB:    , // 上传完成后的回调. function(err, serverData)
 *                               //                   err:  - 'no file'      未选择文件.
 *                               //                         - 'size too big' 文件太大.
 *                               //                         - 'check crc32 err' 计算本地文件hash值时错误.
 *                               //                         - 'ajax err'     ajax上传时出错.
 *                               //                   serverData: 服务器返回的数据. 至少包含一个filename
 *                progressCB:  , // 上传进度的回调. function(percent),
 *                headers: {     // 设置request headers
 *                  'customHeader': 'value'
 *                },
 *                crossDomain: true,     // 跨域, 默认为true
 *                withCredentials: true, // 是否附带cookie, 默认为true
 *              }
 */
export function uploadBase64(cfg: {
  data:       string,
  fileBase64Str:    string,
  headerUrl:        string,
  uploadUrl:        string,
  chunkSize:        number,
  finishCB:         (err:any, serverData:any)=>void,
  progressCB:  (percent:number)=>void,
  headers:  any,
  crossDomain: boolean,
  withCredentials: boolean,
}): void;