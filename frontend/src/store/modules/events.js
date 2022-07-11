import axios from 'axios';
// import { format } from 'date-fns';
// import { isWithinInterval } from 'date-fns';
import { isDateWithinInterval, compareDates } from '../../functions/dateTime';
import { serializeEvent } from '../../functions/serializers';

// const apiUrl = 'http://localhost:3000';
const apiUrl = 'http://34.105.77.36:3000';

// 状態管理するデータを定義する
const state = {
  events: [],
  event: null,
  isEditMode: false,
  clickedDate: null,
};

// stateの値を取り出す関数を定義する
const getters = {
  events: state => state.events.filter(event => event.calendar.is_visible).map(event => serializeEvent(event)),
  event: state => serializeEvent(state.event),
  dayEvents: state =>
    state.events
      .map(event => serializeEvent(event))
      .filter(
        event => isDateWithinInterval(state.clickedDate, event.startDate, event.endDate),
      ).sort(compareDates),
      // .filter(
      //   event =>
      //     isWithinInterval(new Date(state.clickedDate), { start: new Date(event.startDate), end: new Date(event.endDate) })
      // ),
  // just a boolean
  isEditMode: state => state.isEditMode,
  clickedDate: state => state.clickedDate,
};

// eventsデータをstateに保存する関数を定義する
const mutations = {
  setEvents: (state, events) => (state.events = events),
  setEvent: (state, event) => (state.event = event),
  setEditMode: (state, isEditMode) => (state.isEditMode = isEditMode),
  createEvent: (state, event) => (state.events = [...state.events, event]),
  removeEvent: (state, event) => (state.events = state.events.filter(e => e.id !== event.id)),
  updateEvent: (state, event) => (state.events= state.events.map( e => (e.id === event.id ? event : e))),
  resetEvent: state => (state.event = null),
  setClickedDate: (state, date) => (state.clickedDate = date)
};

// axiosでAPIリクエストを送信してeventsデータを取得し、mutationを呼び出す関数を定義する
const actions = {
  async fetchEvents({ commit }) {
    const response = await axios.get(`${apiUrl}/api/events`);
    commit('setEvents', response.data);
  },
  setEvent({ commit }, event) {
    commit('setEvent', event);
  },
  setEditMode({ commit }, isEditMode ) {
    commit('setEditMode', isEditMode);
  },
  setClickedDate( { commit }, date) {
    commit('setClickedDate', date);
  },
  async createEvent({ commit }, event) {
    const response = await axios.post(`${apiUrl}/api/events`, event);
    commit('createEvent', response.data);
  },
  async deleteEvent({ commit }, id) {
    const response = await axios.delete(`${apiUrl}/api/events/${id}`);
    commit( 'removeEvent', response.data);
    commit( 'resetEvent');
  },
  async updateEvent({ commit }, event) {
    const response = await axios.put(`${apiUrl}/api/events/${event.id}`, event);
    commit( 'updateEvent', response.data);
    // commit( 'resetEvent');
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
