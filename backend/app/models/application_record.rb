# frozen_string_literal: true

class ApplicationRecord < ActiveRecord::Base
  # Allow creating a model without a table
  self.abstract_class = true
end
