class ArticlesController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]
  before_action :set_breadcrumbs, except: [:index]
  before_action :set_article, only: %i(show edit update destroy)
  before_action :set_article_files, only: %i(edit update)

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
      @article_file = Article::File.create_from_file(params["file"], nil,
        params["id"], current_user)
    else
      @article_file = Article::File.create_from_file(params["file"],
        params["id_form"], nil, current_user)
    end
  end

  def upload_image
    raise params.inspect
  end

  def download_file
    doc = Article::File.find(params[:id])
    send_file(doc.filepath, filename: doc.original_filename)
  end

  def delete_file
    doc = Article::File.find(params[:id])
    if current_user.present? && doc.user == current_user
      File.delete(doc.filepath) if File.exists?(doc.filepath)
      @doc_id = doc.id
      doc.destroy
    end
  end

  private

  def set_article_files
    @article_files = @item.files
  end

  def set_article
    @item = Article.find(params[:id])
  end

  def article_params
    params.require(:article).permit(:title, :content, :describe, :category_id, tags: [])
  end
end
