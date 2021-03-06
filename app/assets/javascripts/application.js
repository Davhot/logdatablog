//= require jquery
//= require jquery-multi-select
//= require jquery_ujs
//= require jquery-ui
//= require popper
//= require bootstrap

//= require jquery-fileupload/vendor/jquery.ui.widget
//= require jquery-fileupload/jquery.iframe-transport
//= require jquery-fileupload/jquery.fileupload
//= require jquery-fileupload/jquery.fileupload-process
//= require jquery-fileupload/jquery.fileupload-validate

//= require lib/prettify.min
//= require lib/marked.min
//= require lib/flowchart.min
//= require lib/jquery.flowchart.min
//= require lib/raphael.min
//= require lib/underscore.min
//= require lib/sequence-diagram.min
//= require editormd
//= require editormd_en


//= require svg
//= require svg_filter
//= require cool_bg

//= require bootstrap-editable

//= require main
//= require download_files
//= require article
//= require static_pages

$(document).ready(function () {
  $(".multiselect").multiSelect({
    selectableHeader: "<div class='custom-header'>Варианты выбора</div>",
    selectionHeader: "<div class='custom-header'>Выбранные элементы</div>"
  });

  $('#scrollup').mouseover( function(){
		$( this ).animate({opacity: 0.65},100);
	}).mouseout( function(){
		$( this ).animate({opacity: 1},100);
	}).click( function(){
		window.scroll(0 ,0);
		return false;
	});

  $(window).scroll(function(){
    var scrollBottom = $(document).height() - $(window).height() - $(window).scrollTop();
		if ( $(document).scrollTop() > 0 && scrollBottom > 0) {
			$('#scrollup').fadeIn('fast');
		} else {
			$('#scrollup').fadeOut('fast');
		}
	});

  $('[data-toggle="tooltip"]').tooltip();


  if ($("#test-editormd").length > 0){
    var testEditor;
    $(function() {
        testEditor = editormd("test-editormd", {
            width           : "100%",
            height          : "600",
            path            : "/assets/lib/",
            htmlDecode      : "style,script,iframe",
            tex             : true,
            emoji           : true,
            taskList        : true,
            flowChart       : true,
            sequenceDiagram : true,
            imageUpload     : true,
            imageFormats    : ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
            imageUploadURL  : $("#test-editormd").data('url'), // TODO: загрузка изображения на URL
        });
    });
  }


  var editormd_view;
  $(function() {
      editormd_view = editormd.markdownToHTML("editormd-view", {
        path            : "/assets/lib/",
        htmlDecode      : "style,script,iframe",  // you can filter tags decode
        emoji           : true,
        taskList        : true,
        tex             : true,
        flowChart       : true,
        sequenceDiagram : true,
      });
      $("#editormd-view p:has(img)").css({'text-align': 'center'});
      $("#editormd-view img").click(function (e) {e.preventDefault();});
  })
})
