class Article < ApplicationRecord
  default_scope { order(created_at: :desc) }
  belongs_to :category
  has_many :photos
  has_many :files, class_name: 'Article::File'
  has_many :statistics
  has_and_belongs_to_many :tags

  validates :title, :content, :describe, :category_id, presence: true

  def tags=(ids)
    self.tag_ids = ids
  end

  def views
    statistics.pluck(:count).sum
  end

  def self.search(params)
    if params['tag_id'].present?
      self.includes(:tags).where(tags: {id: params[:tag_id]})
    elsif params['category_id'].present?
      self.where(category_id: params[:category_id])
    else
      self.all
    end
  end
end
