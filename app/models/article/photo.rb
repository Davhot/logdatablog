class Article::Photo < ApplicationRecord
  belongs_to :article

  validates :original_filename, :system_filename, :filepath, presence: true
end
