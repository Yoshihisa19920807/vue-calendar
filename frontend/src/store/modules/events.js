import axios from 'axios';
// import { format } from 'date-fns';
import { serializeEvent } from '../../functions/serializers';

const apiUrl = 'http://localhost:3000';

// 状態管理するデータを定義する
const state = {
  events: [],
  event: null,
  isEditMode: false,
};

// stateの値を取り出す関数を定義する
const getters = {
  events: state => state.events.map(event => serializeEvent(event)),
  event: state => serializeEvent(state.event),
  // just a boolean
  isEditMode: state => state.isEditMode,
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
};

// axiosでAPIリクエストを送信してeventsデータを取得し、mutationを呼び出す関数を定義する
const actions = {
  async fetchEvents({ commit }) {
    const response = await axios.get(`${apiUrl}/events`);
    commit('setEvents', response.data);
  },
  setEvent({ commit }, event) {
    commit('setEvent', event);
  },
  setEditMode({ commit }, isEditMode ) {
    commit('setEditMode', isEditMode);
  },
  async createEvent({ commit }, event) {
    const response = await axios.post(`${apiUrl}/events`, event);
    commit('createEvent', response.data);
  },
  async deleteEvent({ commit }, id) {
    const response = await axios.delete(`${apiUrl}/events/${id}`);
    commit( 'removeEvent', response.data);
    commit( 'resetEvent');
  },
  async updateEvent({ commit }, event) {
    const response = await axios.put(`${apiUrl}/events/${event.id}`, event);
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