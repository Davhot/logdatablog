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
end
