class Calendar < ApplicationRecord
  has_many :events

  validates :name, presence: true, length: {maximum: 100}
end
