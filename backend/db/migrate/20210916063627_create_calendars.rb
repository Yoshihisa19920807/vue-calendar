# frozen_string_literal: true

class CreateCalendars < ActiveRecord::Migration[6.1]
  def change
    create_table :calendars do |t|
      t.string 'name', limit: 100
      t.boolean 'is_visible', default: true
      t.string 'color'
      t.timestamps
    end
  end
end
