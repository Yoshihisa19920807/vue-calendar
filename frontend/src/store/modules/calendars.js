import axios from 'axios';

import { serializeCalendar } from '../../functions/serializers';

const apiUrl = 'http://localhost:3000';

const state = {
  calendars: [],
  calendar: null,
};

// 関数名を定義
const getters = {
  // 関数名
  calendars: state => state.calendars.map(calendar => serializeCalendar(calendar)),
  calendar: state => serializeCalendar(state.calendar),
};

const mutations = {
  setCalendars: (state, calendars) => (state.calendars = calendars),
  setCalendar: (state, calendar) => (state.calendar = calendar),
  appendCalendar: (state, calendar) => (state.calendars = [...state.calendars, calendar]),
  updateCalendar: (state, calendar) => (state.calendars = state.calendars.map(c => (c.id === calendar.id ? calendar : c))),
};

const actions = {
  async fetchCalendars({ commit }) {
    const response = await axios.get(`${apiUrl}/calendars`);
    commit('setCalendars', response.data)
  },
  async createCalendar({ commit }, calendar) {
    const response = await axios.post(`${apiUrl}/calendars`, calendar);
    commit('appendCalendar', response.data);
  },
  setCalendar({ commit }, calendar) {
    commit('setCalendar', calendar);
  },
  async updateCalendar({ commit }, calendar) {
    console.log("updateCalendar__")
    const response = await axios.put(`${apiUrl}/calendars/${calendar.id}`, calendar);
    commit('updateCalendar', response.data);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
