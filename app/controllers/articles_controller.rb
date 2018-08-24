class ArticlesController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]
  before_action :set_breadcrumbs, except: [:index, :show]

  def index
    @items = Article.all
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
  end

  def destroy
  end

  private

  def set_acrticle
    @item = Article.find(params[:id])
  end

  def article_params
    params.require(:article).permit(:title, :content, :describe, :category_id, tags: [])
  end
end
