import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loader: false
  },
  getters: {
    getLoader(state, getters) {
      return state.loader
    }
  },
  mutations: {
    setLoader(state, payload) {
      state.loader = payload
    },
  },
  actions: {
  },
  modules: {
  }
})
