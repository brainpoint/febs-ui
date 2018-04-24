{/* <div class="febsui-upload">
  <button onclick='$("#fileObj")[0].click()'>上传图片</button>
  <form id="fileForm" method="post" role="form" enctype="multipart/form-data" style="display:none">
    <input id="fileObj" type="file" name="file" onchange="javascript:SetupWebUploader('/api/users/upload_image', $('#fileForm'), $('#fileObj'))" multiple>
  </form>
  <div class="febsui-upload-progress">
    <div class="febsui-upload-progress-bg"></div>
    <span>10%</span>
    <div class="febsui-upload-progress-cancel"><div class="febsui-icon febsui-icon-error"></div></div>
  </div>
</div> */}

/**
* @desc: 初始化page控件.
* @param elem: 将控件插入到elem中, elem是一个jquery的对象.
* @param curPage: 当前页
* @param pageCount: 总页数
* @param totalCount: 总条数
* @param pageCallback: 页面跳转函数, function(page) {}
* @return: 
*/
function upload_init(elem, curPage, pageCount, totalCount, pageCallback) {

}