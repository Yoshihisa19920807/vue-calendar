# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  scope :api do
    resources :calendars
    resources :events
    get :health_check, to: 'health_check#index'
  end
end
