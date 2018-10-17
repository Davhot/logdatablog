Rails.application.routes.draw do
  root 'articles#index'

  get 'static_pages/about'
  get 'static_pages/contact'

  resources :authorizations, only: [] do
    collection do
      get 'get_vk_token'
    end
  end

  devise_for :users, controllers: { sessions: 'sessions' },
    path_names: { sign_in: 'login', sign_out: 'logout' }
  as :user do
    get 'admin', to: 'devise/sessions#new', as: :sign_in
  end

  resources :articles do
    member do
      patch 'upload_file'
      get 'download_file'
      get 'delete_file'
      post 'create_comment'
      get 'edit_comment'
      get 'remove_comment'
    end
    collection do
      post 'upload_file'
      get 'load_editor_image'
      post 'upload_image'
      get 'tutorial'
    end
  end
  resources :tags
  resources :categories
  resources :comments, only: [:new, :create, :destroy, :index]
end
