define(['jquery', 'extensions/toc', 'eventMgr', 'fileMgr', 'fileSystem'], function(jquery, toc, eventMgr, fileMgr, fileSystem) {
  var stackeditHelper = {};
  var currentHTML = '';
  eventMgr.addListener('onPreviewFinished', function(htmlWithComments, htmlWithoutComments) {
    currentHTML = {
      withComments: htmlWithComments,
      withoutComments: htmlWithoutComments
    };
  });
  $('body').on('click.stackedithelper', '#consoleContentAsMarkdown', function(event){
    console.info(fileMgr.currentFile.content);
  });
  $('body').on('click.stackedithelper', '#consoleContentAsHTML', function(event){
    console.info(currentHTML.withoutComments);
  });
  $('body').on('click.consoleTableOfContent', '#consoleTableOfContent', function(event) {
    console.info(toc.buildToc());
  });

  // delete all files
  function deleteAllFile() {
    for (var key in fileSystem) {
      fileMgr.deleteFile(key);
    }
  }
  stackeditHelper.getToc = function () {
    return toc.buildToc();
  };
  stackeditHelper.getHtmlWithComments = function() {
    return currentHTML.withComments;
  };
  stackeditHelper.getHtmlWithoutComments = function() {
    return currentHTML.withoutComments;
  };
  stackeditHelper.getMarkdownContent = function() {
    return fileMgr.currentFile.content;
  };
  stackeditHelper.getMarkdownTitle = function() {
    return fileMgr.currentFile.title;
  };
  stackeditHelper.initMarkdownContent = function(markdownContent) {
    deleteAllFile();
    var fileDesc = fileMgr.createFile(null, markdownContent);
    fileMgr.selectFile(fileDesc);
  };
  eventMgr.addListener('onReady', function(event) {
    window.stackeditHelper = stackeditHelper;
    if (typeof parent.onStackEditInited == 'function') {
      parent.onStackEditInited();
    }
  });
  return stackeditHelper;
});