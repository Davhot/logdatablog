class CommentsController < ApplicationController
  before_action :authenticate_user!, only: [:index, :destroy]

  def new
  end

  def create
    @comment = Comment.new(comment_params)
    if @comment.save
      flash[:success] = "Комментарий отправлен!"
      redirect_to root_url
    else
      flash.now[:error] = "Недопустимое сообщение!"
      render 'static_pages/contact'
    end
  end

  def index
    @comments = Comment.all
  end

  def destroy
    if Comment.find(params[:id]).destroy
      flash[:success] = "Comment removed!"
    else
      flash[:error] = "Something goes wrong! Comment hasn't been removed!"
    end
    redirect_to comments_url
  end

  private

  def comment_params
    params.require(:comment).permit(:content, :stars)
  end

end
