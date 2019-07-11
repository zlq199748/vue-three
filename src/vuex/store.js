import Vue from 'vue'
import Vuex ,{Store} from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import user from './modules/user'
import msite from './modules/msite'
import shop from './modules/shop'

Vue.use(Vuex)
export default new Store({
  actions,
  mutations,
  getters,
  modules:{ // 配置应用中所有的功能相关的配置 总状态
    msite:msite,
    user:user,
    shop:shop
  }
})
