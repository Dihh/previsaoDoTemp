import Vue from 'vue'
import Vuex from 'vuex'
import { GOOGLE_API_KEY, OPENWEATHERMAP_KEY } from '@/API_KEY'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    GOOGLE_API_KEY,
    OPENWEATHERMAP_KEY
  },
  getters: {
    getGOOGLE_API_KEY(state, getters) {
      return state.GOOGLE_API_KEY
    },
    getOPENWEATHERMAP_KEY(state, getters) {
      return state.OPENWEATHERMAP_KEY
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
