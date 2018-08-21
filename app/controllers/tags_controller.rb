class TagsController < ApplicationController
  before_action :authenticate_user!

  def index
    @tags = Article::Tag.all
  end

  def new
  end

  def create
  end
end
