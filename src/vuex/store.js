import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

// 应用初始状态
const state = {
  Authorization: localStorage.getItem('Authorization') || '',
  user: localStorage.getItem('user') || ''
}

// 定义所需的 mutations
const mutations = {
  setAuthorization (state, payload) {
    state.Authorization = payload.Authorization
    localStorage.setItem('Authorization', payload.Authorization)
  },
  setUser (state, payload) {
    state.user = payload.user
    localStorage.setItem('user', payload.user)
  }
}

// 创建 store 实例
export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations
})


