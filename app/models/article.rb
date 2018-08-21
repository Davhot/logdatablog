class Article < ApplicationRecord
  belongs_to :category
  has_many :photos
  has_and_belongs_to_many :tags

  validates :title, :content, presence: true
end
