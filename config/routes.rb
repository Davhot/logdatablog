Rails.application.routes.draw do
  root 'articles#index'
  devise_for :users, controllers: { sessions: 'sessions' },
    path_names: { sign_in: 'login', sign_out: 'logout' }
  as :user do
    get 'admin', to: 'devise/sessions#new', as: :sign_in
  end
  resource :articles
end
