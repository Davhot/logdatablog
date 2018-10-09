class Article < ApplicationRecord
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

  def files_not_for_content
    files.where(for_content: false)
  end
end
