
import {
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_TOKEN,
  RESET_TOKEN,
} from '../mutation-types'
import {reqAutoLogin} from '../../api'
const  state={
  user:{},
  token:localStorage.getItem('token_key')//初始读取
}
const mutations={
  [RECEIVE_USER](state,{user}){
    state.user=user
  },
  [RESET_USER](state){
    state.user={}
  },
  [RECEIVE_TOKEN](state,{token}){
    state.token=token
  },
  [RESET_TOKEN](state){
    state.token=''
  }
}
const actions={
  /*记录user:
   持久化保存token
   在state中保存user
   */
  recordUser ({commit}, user) {
    // 将user的token保存到localStorage中 为了长久保存 关闭浏览器还可以访问（后台会验证有效期）
    //存token什么时候用呢 后台请求需要检查接口时
    localStorage.setItem('token_key', user.token)
    // 将token保存到state中  为了后面直接从state中取
    commit(RECEIVE_TOKEN, { token: user.token }) //token对象 user里面头token
    // 将user保存到state中
    delete user.token  // 删除对象中指定的属性
    commit(RECEIVE_USER, { user }) //把user存到状态中（内存）
  },

  /*
   退出登陆
   */
  logout ({commit}) {
    // 重置状态中的user
    commit(RESET_USER)
    //重置状态中的token
    commit(RESET_TOKEN)
    // 清除local中保存的token
    localStorage.removeItem('token_key')
  },
  /*
   自动登录
   * */
  async autoLigon({commit ,state}){
    const token =state.token
    if (token){
      const result =await  reqAutoLogin()
      if (result.code===0){
        const user=result.data
        commit(RECEIVE_USER,{user})
      }

    }

  }
}
export default {
  state,
  mutations,
  actions,
}