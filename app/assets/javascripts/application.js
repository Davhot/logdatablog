//= require jquery
//= require jquery-multi-select
//= require jquery_ujs
//= require popper
//= require bootstrap
//= require summernote-bs4
//= require summernote-ru-RU
//= require main

$(document).ready(function () {
  $(".multiselect").multiSelect({
    selectableHeader: "<div class='custom-header'>Варианты выбора</div>",
    selectionHeader: "<div class='custom-header'>Выбранные элементы</div>"
  });
})

$(document).ready(function() {
  $('.summernote').summernote({
    tabsize: 2,
    height: 500,
    lang: 'ru-RU'
  });
});
