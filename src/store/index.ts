import Vue from 'vue'
import Vuex from 'vuex'
import Building from '@/store/building.module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Building
  }
})
