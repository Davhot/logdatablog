$ ->
  $(".read_more").click ->
    location.href = $(this).data('link')
  $('.answer-comment').click show_comment_form
  $('.comment').each ->
    $(this).css({'margin-left': $(this).data('offset') * 2 + 'em'})
  $(".comment-content").each ->
    elem = $(this)
    $(this).editable({
       type:  'textarea',
       pk:    1,
       id:    $(this).attr('id'),
       url:   $(this).data('url'),
       title: 'Enter comments',
       mode: 'inline',
       ajaxOptions: {type: "GET"}
    })
  $(".comment-content").click (e) ->
    e.preventDefault()

  $("#editormd-view img").click (e) ->
    e.preventDefault()

show_comment_form = ->
  target = $(this).data('target')
  $('.comment-form').not('.d-none').not(target).addClass('d-none')
  $(target).toggleClass('d-none')
