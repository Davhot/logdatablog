$(document).ready(function() {
  var wrapper = $( ".fileinput-button" ),
  inp = wrapper.find( "input" ),
  btn = wrapper.find( "button" ),
  lbl = wrapper.find( ".file-label" );
  btn.focus(function(){
    inp.focus()
  });
  // Crutches for the :focus style:
  inp.focus(function(){
    wrapper.addClass( "focus" );
  }).blur(function(){
    wrapper.removeClass( "focus" );
  });
  btn.add( lbl ).click(function(){
    inp.click();
  });

  $( window ).resize(function(){
    $( ".fileinput-button input" ).triggerHandler( "change" );
  });

  $('#article-choose-photo').fileupload({
    // maxFileSize: 15 * 1000000, // 15 MB
    dropZone: $('#dropzone'),
    progress: function (e, data) {
      // Пропускная способность
      console.log(data.bitrate);
      var progress = parseInt(data.loaded / data.total * 100, 10);
      console.log(progress);
    },
    start: function (e) {
      console.log("Начало закачки: " + Date())
    },
    drop: function (e, data) {
      $.each(data.files, function (index, file) {
        console.log('Перенесён файл: ' + file.name);
      });
    },
    done: function(e, data) { }
  }).on('fileuploadprogressall', function (e, data) {
      var progress = parseInt(data.loaded / data.total * 100, 10);
      $('#progress .progress-bar').css(
        'width',
        progress + '%'
      );
  }).on('fileuploadprocessalways', function (e, data) {
    var currentFile = data.files[data.index];
    if (data.files.error && currentFile.error == "File is too large") {
      alert("Размер файла превышает 15Мб!")
    }
  });
})
