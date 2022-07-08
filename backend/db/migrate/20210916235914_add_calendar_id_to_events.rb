# frozen_string_literal: true

# rails g migration AddCalendarIdToEvents calendar:references
class AddCalendarIdToEvents < ActiveRecord::Migration[6.1]
  def change
    add_reference :events, :calendar, null: false, foreign_key: true
  end
end
