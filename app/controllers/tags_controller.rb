class TagsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_breadcrumbs
  before_action :set_tag, only: %i(show edit update destroy)

  def index
    @items = Tag.all
  end

  def new
    @item = Tag.new
  end

  def create
    @item = Tag.new(tag_params)
    if @item.save
      redirect_to tags_path, flash: {success: 'Тег успешно создан'}
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @item.update_attributes(tag_params)
      redirect_to tag_path(@item), flash: {success: 'Тег успешно обновлен'}
    else
      render :edit
    end
  end

  def destroy
    if @item.destroy
      redirect_to tags_path, flash: {success: 'Тег успешно удален'}
    else
      redirect_to tags_path, flash: {error: 'Тег не удален'}
    end
  end

  private

  def set_tag
    @item = Tag.find(params[:id])
  end

  def tag_params
    params.require(:tag).permit(:name)
  end
end
