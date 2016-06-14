define(['qiniu'], function(qiniu){
  $('body').one('show.bs.modal', '.modal-insert-image', function(event){
    Array.prototype.slice.call(document.getElementsByClassName('qiniu-btn'), 0).forEach(function(element, index, array){
      var qiniuJsSDK = new QiniuJsSDK();
      var uploader = qiniuJsSDK.uploader({
        runtimes: 'html5,flash,silverlight,html4',
        browse_button: element,
        uptoken_url: '/api/uptoken/',
        get_new_uptoken: true,
        save_key: true,
        domain: 'http://o891smr57.bkt.clouddn.com/',
        max_file_size: '100mb',
        multi_selection: false,
        // flash_swf_url: 'path/of/plupload/Moxie.swf', //引入 flash,相对路径
        max_retries: 3,
        dragdrop: false,
        chunk_size: '4mb',
        auto_start: true,
        init: {
          FilesAdded: function(up, files) {
            plupload.each(files, function(file) {
            });
          },
          BeforeUpload: function(up, file) {
            uploader.disableBrowse(true);
            var uploadingText = element.getAttribute('data-uploading-text');
            if (!uploadingText) {
              element.innerHTML = uploadingText;
            }
            element.setAttribute('disabled', 'disabled');
          },
          UploadProgress: function(up, file) {
            var uploadingText = element.getAttribute('data-uploading-text');
            var speed = plupload.formatSize(file.speed).toUpperCase();
            if (!uploadingText) {
              uploadingText = '上传中...';
            }
            uploadingText += '已上传:' + file.percent + '%;速度:' + speed;
            element.innerHTML = uploadingText;
          },
          FileUploaded: function(up, file, info) {
            var domain = up.getOption('domain');
            var res = JSON.parse(info);
            var sourceLink = domain + res.key; //获取上传成功后的文件的Url
            $('#input-insert-image').val(sourceLink);
            $('.modal-insert-image .nav.nav-tabs li:first a').tab('show');
          },
          Error: function(up, err, errTip) {
          },
          UploadComplete: function() {
            console.info('UploadComplete');
            var unuploadingText = element.getAttribute('data-unupload-text');
            if (unuploadingText) {
              element.innerHTML = unuploadingText;
            }
            element.removeAttribute('disabled');
            uploader.disableBrowse(false);
          }
        }
      });
    });
  });
  return {};
});