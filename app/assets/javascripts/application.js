//= require jquery
//= require jquery-multi-select
//= require jquery_ujs
//= require bootstrap
//= require main

$(document).ready(function () {
  $(".multiselect").multiSelect({
    selectableHeader: "<div class='custom-header'>Варианты выбора</div>",
    selectionHeader: "<div class='custom-header'>Выбранные элементы</div>"
  });
})
