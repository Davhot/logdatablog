class ArticlesController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]
  before_action :set_breadcrumbs, except: [:index]
  before_action :set_article, only: %i(show edit update destroy)

  def index
    @items = Article.all.order(created_at: :desc)
  end

  def show
  end

  def new
    @item = Article.new

    @id_form = Digest::MD5.hexdigest(DateTime.current.to_s)
  end

  def create
    @item = Article.new(article_params)
    if @item.save
      redirect_to root_path, flash: {success: 'Статья успешно создана'}
    else
      @id_form = params["id_form"]
      render :new
    end
  end

  def edit
  end

  def update
    if @item.update_attributes(article_params)
      redirect_to article_path(@item), flash: {success: 'Статья успешно обновлена'}
    else
      render :edit
    end
  end

  def destroy
    if @item.destroy
      redirect_to articles_path, flash: {success: 'Статья успешно удалена'}
    else
      redirect_to articles_path, flash: {error: 'Статья не удалена'}
    end
  end

  def upload_file
    if params[:id].present?
      @incident_document = Incident::Document.create_from_file(params["file"],
        current_main_user, nil, params["id"])
    else
      @incident_document = Incident::Document.create_from_file(params["file"],
        current_main_user, params["id_form"])
    end
  end

  def download_file
    doc = Incident::Document.find(params[:id])
    send_file(doc.filepath, filename: doc.original_filename)
  end

  def delete_file
    doc = Incident::Document.find(params[:id])
    File.delete(doc.filepath)
    @doc_id = doc.id
    doc.update_attribute(:deleted, true)
  end

  private

  def set_article
    @item = Article.find(params[:id])
  end

  def article_params
    params.require(:article).permit(:title, :content, :describe, :category_id, tags: [])
  end
end
