module ArticlesHelper
  def download_article_file_link(article_file_id)
    link_to content_tag(:i, nil, class: "fa fa-download"),
       download_file_article_path(article_file_id),
       { 'data-toggle': 'tooltip', 'data-html': true,
         'data-placement': 'bottom', 'title': 'Скачать файл' }
  end

  def delete_file_article_link(article_file_id)
    link_to content_tag(:i, nil, class: "fa fa-trash"),
      delete_file_article_path(id: article_file_id),
      { remote: true, data: {confirm: "Удалить?"}, class: "tooltips",
        "data-placement": "bottom", "data-html": "true",
        "data-toggle": "tooltip", "data-original-title": "Удалить файл" }
  end

  def set_article_image_link(article_image)
    link_to content_tag(:i, nil, class: "fa fa-check"),
       '', { 'data-toggle': 'tooltip', 'data-html': true,
         'data-placement': 'bottom', 'title': 'Выбрать файл',
          class: 'set-article-image',
          id: "set-article-image-#{article_image.id}",
          data: {address: root_path + article_image.server_path,
            title: article_image.original_filename } }
  end

  def may_remove_comment?(comment)
    @auth_user.present? &&
      (comment.auth_user == @auth_user || @auth_user.user.present?) &&
      Article::Comment.children(comment.id).empty?
  end

  def may_edit_comment?(comment)
    @auth_user.present? &&
      (comment.auth_user == @auth_user || @auth_user.user.present?)
  end
end
