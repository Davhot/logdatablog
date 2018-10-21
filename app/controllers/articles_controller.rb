class ArticlesController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show, :download_file,
    :create_comment, :delete_comment, :edit_comment, :tutorial]
  before_action :set_breadcrumbs, except: [:index]
  before_action :set_article, only: %i(show edit update destroy create_comment)
  before_action :set_article_files, only: %i(edit update)
  before_action :set_article_images, only: %i(load_editor_image edit update new
    create)
  before_action :set_files_without_article, only: %i(new create)

  # TODO: генерить форму загрузки images с authenticity_token
  skip_before_action :verify_authenticity_token, only: :upload_image

  def index
    session[:tutorial] = false
    @items = (@q = Article.search(params).ransack(params[:q])).result
    if @items.blank?
      @items = Article.all
      flash.now[:error] = "Не найдено ни одной статьи"
    end
    @items = @items
      .where
      .not(id: Article.unscoped.joins(:tags).where(tags: {name: 'Tutorial'}).uniq.ids)
      .page(params[:page])
  end

  def tutorial
    session[:tutorial] = true
    @items = (@q = Article.search(params).ransack(params[:q])).result
    if @items.blank?
      @items = Article.all
      flash.now[:error] = "Не найдено ни одной статьи"
    end
    @items = @items.includes(:tags).where(tags: {name: 'Tutorial'}).uniq.page params[:page]
    render 'index'
  end

  def show
    st = Statistic.find_or_create_by(ip: request.remote_ip, article: @item)
    st.update_attribute(:count, st.count + 1)
    @comments = @item.comments.where(parent_id: nil).order(:created_at)
  end

  def new
    @item = Article.new
    # @id_form = Digest::MD5.hexdigest(DateTime.current.to_s)
  end

  def create
    @item = Article.new(article_params)
    @item.files = @article_files
    @item.files << @article_images
    if @item.save
      redirect_to root_path, flash: {success: 'Статья успешно создана'}
    else
      # @id_form = params["id_form"]
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
    path = session[:tutorial] ? tutorial_articles_path : articles_path
    if @item.destroy
      redirect_to path, flash: {success: 'Статья успешно удалена'}
    else
      redirect_to path, flash: {error: 'Статья не удалена'}
    end
  end

  def upload_file
    if params[:id].present?
      @article_file = Article::File.create_from_file(params["file"],
        params["id"], current_user, false)
    else
      @article_file = Article::File.create_from_file(params["file"], nil,
        current_user, false)
    end
  end

  def upload_image
    if params[:id].present?
      @article_image = Article::File.create_from_file(params["editormd-image-file"],
        params["id"], current_user, true)
      @load_editor_image_path = load_editor_image_articles_path(id: params[:id])
    else
      @article_image = Article::File.create_from_file(params["editormd-image-file"],
        nil, current_user, true)
      @load_editor_image_path = load_editor_image_articles_path
    end
    render json: {address: root_path + @article_image.server_path,
      title: @article_image.original_filename, status: 200,
      load_editor_image_path: @load_editor_image_path,
      message: 'Изображение загружено!'}
  end

  def load_editor_image
  end

  def download_file
    doc = Article::File.find(params[:id])
    send_file(doc.filepath, filename: doc.original_filename)
  end

  def delete_file
    doc = Article::File.find(params[:id])
    @item = doc.article
    if @item.present?
      @article_images = @item.files.where(for_content: true)
    else
      @article_images = Article::File.where(for_content: true, article_id: nil)
    end
    if current_user.present? && doc.user == current_user
      @doc_id = doc.id
      doc.destroy
    end
  end

  def create_comment
    if params['article_comment']['parent_id'].present?
      @comment_id = Article::Comment.find(params['article_comment']['parent_id'])
        .right_leaf.id
    end
    @article_comment = Article::Comment.create(article_comment_params)
  end

  def edit_comment
    comment = Article::Comment.find(params['comment_id'])
    if comment.auth_user == @auth_user
      comment.update_attribute(:content, params['value'])
    end
  end

  def remove_comment
    comment = Article::Comment.find(params['comment_id'])
    if comment.auth_user == @auth_user
      @comment_id = comment.id
      comment.destroy
    end
  end

  private

  def set_files_without_article
    @article_files = Article::File.where(article_id: nil, for_content: false)
  end

  def set_article_images
    if params[:id].present?
      set_article
      @article_images = @item.files.where(for_content: true)
    else
      @article_images = Article::File.where(for_content: true, article_id: nil)
    end
  end

  def set_article_files
    @article_files = @item.files.where(for_content: false)
  end

  def set_article
    @item = Article.find(params[:id])
  end

  def article_comment_params
    params.require(:article_comment).permit(:content, :parent_id, :article_id,
      :auth_user_id, :parent_id)
  end

  def article_params
    params.require(:article).permit(:title, :content, :describe, :category_id, tags: [])
  end
end
