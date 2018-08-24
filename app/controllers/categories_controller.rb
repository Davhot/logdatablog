class CategoriesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_breadcrumbs
  before_action :set_category, only: %i(show edit update destroy)

  def index
    @items = Category.all
  end

  def new
    @item = Category.new
  end

  def create
    @item = Category.new(category_params)
    if @item.save
      redirect_to categories_path, flash: {success: 'Категория успешно создана'}
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @item.update_attributes(category_params)
      redirect_to category_path(@item), flash: {success: 'Категория успешно обновлена'}
    else
      render :edit
    end
  end

  def destroy
    if @item.destroy
      redirect_to categories_path, flash: {success: 'Категория успешно удалена'}
    else
      redirect_to categories_path, flash: {error: 'Категория не удалена'}
    end
  end

  private

  def set_category
    @item = Category.find(params[:id])
  end

  def category_params
    params.require(:category).permit(:name)
  end
end
