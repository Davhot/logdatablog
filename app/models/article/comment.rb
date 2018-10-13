class Article::Comment < ApplicationRecord
  belongs_to :auth_user
  belongs_to :article

  validates :content, presence: true
end
