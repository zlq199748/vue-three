import {
  reqAddress,
  reqCategorys,
  reqShops,
  reqAutoLogin
} from '../api'
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RESET_USER,
  RECEIVE_USER,
  RECEIVE_TOKEN,
  RESET_TOKEN
}from './mutation-types'
export default {

  //地址
async getAddress({commit,state}){
 const { longitude , latitude} = state
  const result= await reqAddress(longitude,latitude)
  if (result.code==0){
     const address =result.data
    commit(RECEIVE_ADDRESS,address)
  }
 },


  //食品分类列表
  async getCategorys({commit}){
    const result= await reqCategorys()
    if (result.code==0){
      const categorys =result.data
      commit(RECEIVE_CATEGORYS,categorys)
    }
  },
  //获取商家列表
  async getShops({commit ,state}){
    const {longitude ,latitude} = state
    const result= await   reqShops({ longitude , latitude})
    if (result.code==0){
      const shops =result.data
      commit(RECEIVE_SHOPS,shops)
    }
  },



  //记录user
  /*postUser({commit},user){
    commit(RECEIVE_USER,{user})
    localStorage.setItem('token_key',user.token)
  },
  //退出登录
  logout({commit}){
     // 清除工作 local中保存的token 重置user 清除cookie中的user_id
   commit(RESET_USER)
   localStorage.removeItem('token_key')
    Cookies.remove('user_id')
  }*/

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
