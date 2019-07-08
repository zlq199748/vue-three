import Vue from 'vue'
import Vuex ,{Store} from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import state from './state'
Vue.use(Vuex)
export default new Store({
  state,
  actions,
  mutations,
  getters,
})
