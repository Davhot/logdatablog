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
  end

  def create
    @item = Article.new(article_params)
    if @item.save
      redirect_to root_path, flash: {success: 'Статья успешно создана'}
    else
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

  private

  def set_article
    @item = Article.find(params[:id])
  end

  def article_params
    params.require(:article).permit(:title, :content, :describe, :category_id, tags: [])
  end
end
