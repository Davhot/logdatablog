class Article::File < ApplicationRecord
  belongs_to :article
  belongs_to :user

  validates :original_filename, :system_name, :filepath, presence: true

  def self.create_from_file(uploaded_io, id_form, article_id = nil, user, for_content)
    filename = uploaded_io.original_filename
    digest = Digest::MD5.hexdigest(filename + DateTime.current.to_s)
    filepath = Rails.root.join('public', 'uploads')
    Dir.mkdir(filepath) unless File.exists?(filepath)
    filepath = Rails.root.join('public', 'uploads', digest[-2,2])
    Dir.mkdir(filepath) unless File.exists?(filepath)
    filepath = Rails.root.join(filepath, digest).to_s
    File.open(filepath, 'wb') do |file|
      file.write(uploaded_io.read)
      @doc = self.create(filepath: filepath,
        original_filename: filename,
        system_name: digest,
        unique_index_for_new_article: id_form,
        article_id: article_id,
        user: user,
        for_content: for_content)
    end
    @doc
  end

  def info
    ["filepath: #{filepath}",
      "original_filename: #{original_filename}",
      "system_name: #{system_name}",
      "article_id: #{article_id}"].join(', ')
  end

  def server_path
    filepath.sub(/^\/.*public\//, '')
  end
end
