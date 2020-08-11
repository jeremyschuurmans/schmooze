Rails.application.routes.draw do
  root 'static#index'
  resources 'messages'
  resources 'topics'
end
