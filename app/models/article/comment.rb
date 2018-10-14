class Article::Comment < ApplicationRecord
  belongs_to :auth_user
  belongs_to :article

  validates :content, presence: true

  def depth
    p_id = id
    count = 0
    count += 1 while (p_id = Article::Comment.find_by(id: p_id).parent_id)
    count
  end

  def self.children(id)
    Article::Comment.where(parent_id: id).ids
  end

  def tree
    nodes = []
    p_ids = [id]
    while p_ids.present?
      nodes << Article::Comment.find(p_ids.first)
      p_id = p_ids.shift
      p_ids.unshift(Article::Comment.children(p_id))
      p_ids = p_ids.flatten.compact
    end
    nodes.shift
    nodes
  end
end
