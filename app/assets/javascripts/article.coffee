$ ->
  $(".read_more").click ->
    location.href = $(this).data('link')
  $('.answer-comment').click show_comment_form
  $('.comment').each ->
    $(this).css({'margin-left': $(this).data('offset') * 2 + 'em'})
  $(".article_comment_content_show div[contenteditable=\"true\"]").each ->
    elem = $(this)
    $(this).focusout ->
      url = $(this).data('url')
      data = {content: $(this).text()}
      $.ajax(url: url, data: data)

show_comment_form = ->
  target = $(this).data('target')
  $('.comment-form').not('.d-none').not(target).addClass('d-none')
  $(target).toggleClass('d-none')
