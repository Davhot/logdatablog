//= require jquery
//= require jquery-multi-select
//= require jquery_ujs
//= require popper
//= require bootstrap
//= require summernote-bs4
//= require summernote-ru-RU
//= require summernote-ext-highlight
//= require highlighter-rainbow-main
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
    prettifyHtml: false,
    toolbar: [
      ['misc', ['undo', 'redo']],
      ['style', ['bold', 'italic', 'underline', 'clear']],
      ['font', ['strikethrough', 'superscript', 'subscript', 'fontname']],
      ['fontsize', ['fontsize']],
      ['color', ['color']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['height', ['height']],
      ['insert', ['picture', 'link', 'video', 'table', 'hr']],
      ['highlight', ['highlight']],
      ['misc', ['fullscreen', 'codeview', 'help']]
    ],
    popover: {
      fontNames: ['Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Monserrat'],
      image: [
        ['imagesize', ['imageSize100', 'imageSize50', 'imageSize25']],
        ['float', ['floatLeft', 'floatRight', 'floatNone']],
        ['remove', ['removeMedia']]
      ],
      link: [
        ['link', ['linkDialogShow', 'unlink']]
      ],
      air: [
        ['color', ['color']],
        ['font', ['bold', 'underline', 'clear']],
        ['para', ['ul', 'paragraph']],
        ['table', ['table']],
        ['insert', ['link', 'picture']]
      ]
    },
    lang: 'ru-RU'
  });
});
