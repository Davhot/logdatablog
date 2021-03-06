class StaticPagesController < ApplicationController
  before_action :authenticate_user!, only: [:comments]

  def about
  end

  def contact
  end

  def comments
    @comments = Article.all.map{|x| [x.title, x.comments]}.select{|x| x[1].size > 0}
    @contact_comments = Comment.order(:created_at).all.page params[:page]
  end
end
