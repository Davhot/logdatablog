$(document).ready ->
  $('#sidebar-toggle').on 'click', ->
    btn = $(this).children('.sidebar-toggle')
    id = btn.data('link')
    $(id).toggleClass 'toggled'
    if $(id).hasClass('toggled')
      btn.html '<i class="fa fa-angle-double-right"></i>'
    else
      btn.html '<i class="fa fa-angle-double-left"></i>'
    return
  $('.sidebar-toggle').click (e) ->
    e.preventDefault()
    return
  $('.with-subitems').on 'click', ->
    $(this).parent().children('.subitems').toggle 300
    return
  # synchronize two scroll
  current_window_pos = 0
  $(window).scroll ->
    $('#sidebar-wrapper').scrollTop $('#sidebar-wrapper').scrollTop() + $(window).scrollTop() - current_window_pos
    current_window_pos = $(window).scrollTop()
    return
  return
