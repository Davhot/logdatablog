$ ->
  $(".read_more").click ->
    location.href = $(this).data('link')
