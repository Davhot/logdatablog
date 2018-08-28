//= require jquery
//= require jquery-multi-select
//= require jquery_ujs
//= require popper
//= require bootstrap

//= require summernote-bs4
//= require summernote-ru-RU
//= require summernote-ext-highlight
//= require highlighter-rainbow-main
//= require summernote-cleaner

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
    styleTags: ['p', 'blockquote', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    toolbar: [
      ['cleaner',['cleaner']],
      ['misc', ['undo', 'redo']],
      ['style', ['bold', 'italic', 'underline', 'clear', 'style']],
      ['font', ['strikethrough', 'superscript', 'subscript', 'fontname']],
      ['fontsize', ['fontsize']],
      ['color', ['color']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['height', ['height']],
      ['insert', ['picture', 'link', 'video', 'table', 'hr']],
      ['highlight', ['highlight']],
      ['misc', ['fullscreen', 'codeview', 'help']]
    ],
    cleaner: {
      action: 'both',
      newline: '<p><br></p>', // Summernote's default is to use '<p><br></p>'
      notStyle: 'position:absolute;top:0;left:0;right:0', // Position of Notification
      icon: '<i class="note-icon-eraser"></i>',
      keepHtml: true, // Remove all Html formats
      keepOnlyTags: ['<p>', '<br>', '<ul>', '<li>', '<b>', '<strong>','<i>', '<a>'],
      keepClasses: false, // Remove Classes
      badTags: ['style', 'script', 'applet', 'embed', 'noframes', 'noscript', 'html', '<div>', '<pre>', '<code>'],
      badAttributes: ['style', 'start', 'class'], // Remove attributes from remaining tags
      limitChars: false, // 0/false|# 0/false disables option
      limitDisplay: 'both', // text|html|both
      limitStop: false // true/false
    },
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
