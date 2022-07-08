# frozen_string_literal: true

class Event < ApplicationRecord
  belongs_to :calendar

  # バリデーションの設定を追加
  validates :name, presence: true, length: { maximum: 100 }
  validates :start, presence: true
  validates :end, presence: true
end
