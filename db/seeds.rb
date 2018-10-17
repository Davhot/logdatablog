tag = Tag.find_by(name: 'Tutorial')
if tag.blank?
  Tag.create(name: 'Tutorial')
  puts 'Create Tag name = Tutorial'
end
