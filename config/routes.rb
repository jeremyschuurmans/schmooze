Rails.application.routes.draw do
  root 'static#index'
  resources 'messages'
end
