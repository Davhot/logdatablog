class Article < ApplicationRecord
  belongs_to :category
  has_many :photos
  has_and_belongs_to_many :tags

  validates :title, :content, :describe, :category_id, presence: true

  def tags=(ids)
    self.tag_ids = ids
  end
end
