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

//= require summernote-bs4
//= require summernote-ru-RU
//= require summernote-ext-highlight
//= require highlighter-rainbow-main
//= require summernote-cleaner
//= require summernote

//= require main
//= require download_files

$(document).ready(function () {
  $(".multiselect").multiSelect({
    selectableHeader: "<div class='custom-header'>Варианты выбора</div>",
    selectionHeader: "<div class='custom-header'>Выбранные элементы</div>"
  });

  $('[data-toggle="tooltip"]').tooltip()
})
