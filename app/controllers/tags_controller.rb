class TagsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_breadcrumbs

  def index
    @items = Tag.all
  end

  def new
    @item = Tag.new
  end

  def create
    @item = Tag.new(tag_params)
    if @item.save
      redirect_to tags_path
    else
      render :new
    end
  end

  private
  
  def set_breadcrumbs
    @need_restful_breadcrumbs = true
  end

  def tag_params
    params.require(:tag).permit(:name)
  end
end
