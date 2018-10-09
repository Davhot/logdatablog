// счётчик символов textarea
function updateCountdown() {
  var remaining = 500 - $('.message').val().length;
  $('.countdown').text(' (Осталось: ' + remaining + ')');
}

$(document).ready(function($) {
  if ($('.message').length > 0) {
    updateCountdown();
    $('.message').change(updateCountdown);
    $('.message').keyup(updateCountdown);
  }
});
