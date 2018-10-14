$ ->
  $(".read_more").click ->
    location.href = $(this).data('link')
  $('.answer-comment').click show_comment_form
  $('.comment').each ->
    $(this).css({'margin-left': $(this).data('offset') * 2 + 'em'})

show_comment_form = ->
  $('.comment-form').not('.d-none').addClass('d-none')
  target = $(this).data('target')
  $(target).toggleClass('d-none')
