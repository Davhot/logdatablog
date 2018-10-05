Rails.application.routes.draw do
  root 'articles#index'
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
      post 'upload_image'
    end
    collection do
      patch 'upload_file'
    end
  end
  resources :tags
  resources :categories
end
