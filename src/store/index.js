import Vue from 'vue'
import Vuex from 'vuex'
import decodeJwt from 'jwt-decode'
import { setItem, getItem } from '@/utils/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getItem('user')
  },
  mutations: {
    // 解析用户id
    setUser (state, data) {
      if (data && data.token) {
        data.userId = decodeJwt(data.token).user_id
      }
      state.user = data
      // 使用本地存储，保证刷新后数据不会丢失，使数据持久化
      setItem('user', data)
    }
  },
  actions: {
  },
  modules: {
  }
})
