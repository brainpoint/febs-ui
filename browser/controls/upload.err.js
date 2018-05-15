/**
 * Copyright (c) 2017 Copyright brainpoint All Rights Reserved.
 * Author: lipengxiang
 * Desc:
 */

'use strict';

var err_nofile = 'nofile error';  // 未选择文件.
var err_sizeExceed = 'sizeExceed error';  // 文件太大.
var err_crc32 = 'crc32 error';    // 计算本地文件hash值时错误.
var err_net = 'network error';    // ajax上传时出错.

module.exports = {
        nofile:err_nofile,
        sizeExceed: err_sizeExceed,
        crc32: err_crc32,
        net: err_net
       };