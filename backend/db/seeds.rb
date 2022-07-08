# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
calendar = Calendar.create!(name: 'カレンダー１', color: 'blue')
# calendar: calendar で calendar_id: calendar.idと同じ
Event.create!(calendar: calendar, name: '予定1', start: '2021-07-14 10:00:00', end: '2021-07-14 11:00:00')
Event.create!(calendar: calendar, name: '予定2', start: '2021-07-14 10:00:00', end: '2021-07-14 11:00:00')
Event.create!(calendar: calendar, name: '予定3', start: '2021-07-14 10:00:00', end: '2021-07-14 11:00:00')
Event.create!(calendar: calendar, name: '予定4', start: '2021-07-14 10:00:00', end: '2021-07-14 11:00:00')
