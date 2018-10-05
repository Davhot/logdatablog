# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180828151053) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "article_files", force: :cascade do |t|
    t.string   "original_filename",            null: false
    t.string   "system_name",                  null: false
    t.string   "filepath",                     null: false
    t.string   "unique_index_for_new_article"
    t.integer  "article_id"
    t.integer  "user_id"
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
    t.index ["article_id"], name: "index_article_files_on_article_id", using: :btree
    t.index ["user_id"], name: "index_article_files_on_user_id", using: :btree
  end

  create_table "articles", force: :cascade do |t|
    t.integer  "category_id"
    t.string   "title",       null: false
    t.string   "content",     null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.string   "describe",    null: false
    t.index ["category_id"], name: "index_articles_on_category_id", using: :btree
    t.index ["title"], name: "index_articles_on_title", unique: true, using: :btree
  end

  create_table "articles_tags", id: false, force: :cascade do |t|
    t.integer "article_id", null: false
    t.integer "tag_id",     null: false
    t.index ["article_id", "tag_id"], name: "index_articles_tags_on_article_id_and_tag_id", using: :btree
  end

  create_table "categories", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_categories_on_name", unique: true, using: :btree
  end

  create_table "photos", force: :cascade do |t|
    t.string   "original_filename", null: false
    t.string   "system_filename",   null: false
    t.string   "filepath",          null: false
    t.integer  "article_id"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.index ["article_id"], name: "index_photos_on_article_id", using: :btree
  end

  create_table "tags", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_tags_on_name", unique: true, using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  end

  add_foreign_key "article_files", "articles"
  add_foreign_key "article_files", "users"
  add_foreign_key "articles", "categories"
  add_foreign_key "photos", "articles"
end
