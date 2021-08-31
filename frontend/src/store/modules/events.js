import axios from 'axios';

const apiUrl = 'http://localhost:3000';

// 状態管理するデータを定義する
const state = {
  events: [],
  event: null,
  isEditMode: false,
};

// stateの値を取り出す関数を定義する
const getters = {
  events: state => state.events.map(event => {
    return {
      ...event,
      start: new Date(event.start),
      end: new Date(event.end)
    };
  }),
  event: state => state.event ? {
    ...state.event,
    start: new Date(state.event.start),
    end: new Date(state.event.end)
  } : null,
  // just a boolean
  isEditMode: state => state.isEditMode,
};

// eventsデータをstateに保存する関数を定義する
const mutations = {
  setEvents: (state, events) => (state.events = events),
  setEvent: (state, event) => (state.event = event),
  setEditMode: (state, isEditMode) => (state.isEditMode = isEditMode),
  createEvent: (state, event) => (state.events = [...state.events, event]),
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
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};