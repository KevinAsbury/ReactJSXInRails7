Rails.application.routes.draw do
  resources :users
  get 'helloworld', to: 'helloworld#index'
end
