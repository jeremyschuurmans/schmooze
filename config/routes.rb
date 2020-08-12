Rails.application.routes.draw do
  root 'static#index'
  resources 'messages'

  mount ActionCable.server => '/cable'
end
