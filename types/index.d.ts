// Type definitions for febs

/// <reference types="node" />

export class dom {

  /** common */
  setDisabled(isDisable: boolean): dom;
  isDisabled(): boolean;
  /**
   * 判断第一个元素是否可见.
   */
  isVisible(): boolean;
  /**
   * 判断是否存在可见元素.
   */
  hasVisible(): boolean;

  /** dialog */
  isDialog(): boolean;
  dialogShow(cb:()=>{}): dom;
  dialogHide(cb:()=>{}): dom;

  /** switch */
  isSwitch(): boolean;
  switchIsOn(): boolean;
  switch(cb?: (e: any) => void): dom;
  switchOn(isOn: boolean, trigger?: boolean): dom;

  /** popover */
  isPopover(): boolean;
  popoverShow(mask?: boolean, attachNode?: any): dom;
  popoverHide(): dom;

  /** actionsheet */
  isActionsheet(): boolean;
  actionsheetShow(): dom;
  actionsheetHide(): dom;

  /** swiper */
  isSwiper(): boolean;
  swiperDotColor(color?: string): dom;
  swiperSpeed(ms: number): dom;
  swiperPre(trigger?: boolean): dom;
  swiperNext(trigger?: boolean): dom;
  swiperCurrent(): number;
  swiperTotal(): number;
  swiperTo(index: number, animation?: boolean, trigger?: boolean): dom;
  swiper(cb?: (e: any) => void): dom;
  swiperMoving(cb: (percent:number)=>void): dom;

  /** checkbox */
  isCheckbox(): boolean;
  checkboxChecked(checked?:boolean, trigger?: boolean): boolean|dom;

  /** radio */
  isRadio(): boolean;
  radioGetValue(): string;
  radioSetValue(value: string, trigger?: boolean): dom;
  radioChecked(checked?:boolean, trigger?: boolean): boolean|dom;
}


/**
* @desc: 使用延时显示加载框.
* @param text: 提示文本.
* @param timeout: 延时显示, 默认为0.
* @param spinClass: 默认为 febsui-icon-spin1-white
* @param spinLeft: 是否在左侧显示spin.
* @param whiteBg: 使用白色背景
* @return: 
*/
export function loading_show(text: string, timeout?: number, spinClass?: string, spinLeft?: boolean, whiteBg?: boolean): any;

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
 * @desc: 显示提示.
 * @param ctx: {
  * ctx.content:  提示内容.
  * ctx.durable:	持续的时间 ms.
  * ctx.icon: 前置图标.
  * ctx.center: 默认为false; 是否使用居中的显示方式.
  * ctx.callback: function(){}	// 对话框消失后的回调.
  * }
  */
export function toast(ctx: { content?: string, durable?: number, icon?: 'ok' | 'error' | 'warn', center?: boolean, callback?: () => void }): void;

/**
 * @desc 手动隐藏toast.
 */
export function toast_hide(): void;

/**
* @desc: 隐藏对话框
* @param selector: 关闭指定的窗口; null则关闭所有.
* @param finishCb: 完成时的回调.
* @return: 
*/
export function dialog_hide(selector?: any, finishCb?:()=>{}): void;

/**
 * @desc: 显示警告对话框. (回调函数的上下文为当前窗口)
 * @param ctx: {
* ctx.cssClass: 自定义的扩展样式.
* ctx.blackBg:  使用黑色背景.
* ctx.title:    标题.
* ctx.content:	内容文字.
* ctx.contentHtml: html格式的内容 (与content二选一)
* ctx.confirm: function(dialog:any){}	// 点击确认键的回调.
* ctx.okText
* }
* @return 返回当前窗口的句柄
*/
export function dialog_showAlert(ctx: { cssClass?: string, blackBg?: boolean, title?: string, content?: string, contentHtml?: string, confirm?: (dialog:any) => void, okText?: string }): any;

/**
 * @desc: 显示确认对话框. (回调函数的上下文为当前窗口)
 * @param ctx: {
* ctx.cssClass: 自定义的扩展样式.
* ctx.blackBg:  使用黑色背景.
* ctx.title:    标题.
* ctx.content:	内容文字.
* ctx.contentHtml: html格式的内容 (与content二选一)
* ctx.confirm: function(dialog:any){}	// 点击确认键的回调.
* ctx.cancel: function(dialog:any){}	// 点击取消键的回调.
* ctx.okText 确认按钮文字
* ctx.cancelText: 取消按钮文字
* }
* @return 返回当前窗口的句柄
*/
export function dialog_showConfirm(ctx: { cssClass?: string, blackBg?: boolean, title?: string, content?: string, contentHtml?: string, confirm?: (dialog:any) => void, cancel?: (dialog:any) => void, okText?: string, cancelText?: string }): any;


/**
 * @desc: 显示文本输入确认对话框. (回调函数的上下文为当前窗口)
 * @param ctx: {
* ctx.cssClass: 自定义的扩展样式.
* ctx.blackBg:  使用黑色背景.
* ctx.title:    标题.
* ctx.content:		 内容文字.
* ctx.contentHtml: html格式的内容 (与content二选一)
* ctx.editText:		 输入框文字.
* ctx.confirm: function(text, dialog:any){}	// 点击确认键的回调.
* ctx.cancel:  function(dialog:any){} // 点击取消键的回调.
* ctx.okText:
* ctx.cancelText:
* }
* @return 返回当前窗口的句柄
*/
export function dialog_showConfirmEdit(ctx: { cssClass?: string, blackBg?: boolean, title?: string, content?: string, contentHtml?: string, editText?: string, confirm?: (text: string, dialog:any) => void, cancel?: (dialog:any) => void, okText?: string, cancelText?: string }): any;

export namespace uploadErr {
  /** 未选择文件 */
  const nofile: 'nofile error';
  /** 文件太大 */
  const sizeExceed: 'sizeExceed error';
  /** 计算本地文件hash值时错误 */
  const crc32: 'crc32 error';
  /** 网络出错 */
  const net: 'network error';
}

/** [客户端调用] 需要 jquery,jquery.form 库支持.
* 并且 <input type="file" name="file"... 中, 必须存在name属性.
* 使用post方式上传文件.
* @param cfg:  object, 其中
*              {
*                data:       , // 上传到服务器的任意字符串数据.
*                formObj:    , // 含有enctype="multipart/form-data"的form
*                fileObj:    , // form中的file对象
*                fileIndex:  , // 选中的file文件的索引; 默认为0;
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
*                progressCB:  , // 上传进度的回调. function(fileObj, percent)
*                headers: {     // 设置request headers
*                  'customHeader': 'value'
*                },
*                crossDomain: true,     // 跨域, 默认为true
*                withCredentials: true, // 是否附带cookie, 默认为true
*                checkoutCrc32: true,   // 是否上传 crc32,size,ajaxmark(防止chrome优化) 三个参数.
*                sliceOffset: 0,       // 上传数据偏移地址. (ie9及以下不支持).
*                sliceLength: -1,     // 上传数据段长度 (-1表示到结尾). (ie9及以下不支持).
*              }
*/
export function upload(cfg: {
  data?: string,
  formObj: any,
  fileObj: any,
  fileIndex?:  number,
  uploadUrl: string,
  maxFileSize?: number,
  fileType?: string,
  beginCB?: (uploader: { abort: () => void }) => void,
  finishCB?: (err: any, fileObj: any, serverData: any, xhr?:any) => void,
  progressCB?: (fileObj: any, percent: number) => void,
  headers?: any,
  crossDomain?: boolean,
  withCredentials?: boolean,
  sliceOffset?: number,
  sliceLength?: number,
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
 *                beginCB:     , // 上传开始的回调. function(uploader); 调用uploader.abort() 可以停止上传.
 *                finishCB:    , // 上传完成后的回调. function(err, serverData)
 *                               //                   err:  - febsui.uploadErr.nofile      未选择文件.
 *                               //                         - febsui.uploadErr.sizeExceed  文件太大.
 *                               //                         - febsui.uploadErr.crc32       计算本地文件hash值时错误.
 *                               //                         - febsui.uploadErr.net         ajax上传时出错.
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
  data?: string,
  fileBase64Str: string,
  headerUrl: string,
  uploadUrl: string,
  chunkSize?: number,
  beginCB?: (uploader: { abort: () => void }) => void,
  finishCB?: (err: any, serverData: any) => void,
  progressCB?: (percent: number) => void,
  headers?: any,
  crossDomain?: boolean,
  withCredentials?: boolean,
}): void;

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
 * @desc 初始化页面上所有switch控件 (会进行事件初始化)
 *       默认在页面加载完成时会调用一次; 加入新的switch控件时需调用一次.
 */
export function ui_switch_init(elem?: any): void;


/**
 * @desc 初始化页面上所有checkbox控件 (带febsui-checkbox类的控件)(会进行事件初始化)
 *       默认在页面加载完成时会调用一次; 加入新的checkbox控件时需调用一次.
 */
export function ui_checkbox_init(elem?: any): void;

/**
 * @desc 初始化页面上所有radio控件 (带febsui-radio类的控件)(会进行事件初始化)
 *       默认在页面加载完成时会调用一次; 加入新的radio控件时需调用一次.
 */
export function ui_radio_init(elem?: any): void;

/**
* @desc: 初始化popover控件.(会进行事件初始化)
*        对页面上 的所有 <popover> 元素进行初始化.
*        在增加新的popover到页面后, 需要手动调用此方法.
*/
export function ui_popover_init(elem?: any): void;

/**
* @desc: 初始化actionSheet控件.(会进行事件初始化)
*        对页面上 的所有 <actionsheet> 元素进行初始化.
*        在增加新的actionsheet到页面后, 需要手动调用此方法.
*/
export function ui_actionSheet_init(elem?: any): void;

/**
* @desc: 初始化dialog控件.(会进行事件初始化)
*        对页面上 的所有 <dialog> 元素进行初始化.
*        在增加新的dialog到页面后, 需要手动调用此方法.
*/
export function ui_dialog_init(elem?: any): void;
/**
* @desc: 初始化uploader控件.(会进行事件初始化)
*        对页面上 的所有 <uploader> 元素进行初始化.
*        在增加新的uploader到页面后, 需要手动调用此方法.
*/
export function ui_uploader_init(elem?: any): void;
/**
* @desc: 用于解决ie9下不支持css:animation; 初始化<div class="febsui-icon-spin1/febsui-icon-spin1-white">控件.
*/
export function ui_spin_init(elem?: any): void;
/**
* @desc: 对所有的button控件进行初始化, 保证移动端touch穿透体验.(会进行事件初始化)
*/
export function ui_button_init(elem?: any): void;
/**
* @desc: 对所有的swiper控件进行初始化.(会进行事件初始化)
*/
export function ui_swiper_init(elem?: any): void;
/**
* @desc: 对页面上所有ui控件进行初始化.(会进行事件初始化)
*/
export function ui_init(): void;


/**
 * @desc 对元素进行事件初始化.
 * @param elem: switch元素, 已经是完整的样式. 
 */
export function ui_switch_init_event(elem: any): void;
/**
 * @desc 对元素进行事件初始化.
 * @param elem: checkbox元素, 已经是完整的样式. 
 */
export function ui_checkbox_init_event(elem: any): void;
/**
 * @desc 对元素进行事件初始化.
 * @param elem: radio元素, 已经是完整的样式. 
 */
export function ui_radio_init_event(elem: any): void;
/**
 * @desc 对元素进行事件初始化.
 * @param elem: button元素, 已经是完整的样式. 
 */
export function ui_button_init_event(elem: any): void;
/**
 * @desc 对元素进行事件初始化.
 * @param elem: swiper元素, 已经是完整的样式. 
 */
export function ui_swiper_init_event(elem: any): void;

/**
* @desc: 阻止在elem上的move或touchmove事件.
*/
export function preventEvent(elem: any): void;