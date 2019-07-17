import {
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  RECEIVE_GOODS,
  ADD_FOOD_COUNT,
  REDUCE_FOOD_COUNT
} from '../mutation-types'
import Vue from 'vue'
import {
  reqGoods,
  reqRatings,
  reqInfo
} from '../../api'
const  state={
  goods: [], // 商品列表
  ratings: [], // 商家评价列表
  info: {}, // 商家信息
  cartFoods:[]//底部食物数组
}
const mutations={
  //增加食物
  [ADD_FOOD_COUNT](state,food){
    if (!food.count){
      //给food对象添加新的属性 属性名为count 属性值为1
      // food.count=1  //新添加的属性没有数据绑定
      Vue.set(food,'count',1)
      //将food添加到cartfoods中
      state.cartFoods.push(food)
    }else {

      food.count++
    }

  },
  //减少食物
  [REDUCE_FOOD_COUNT](state,food){
     if (food.count>0){
       food.count--
       if (food.count===0){
          state.cartFoods.splice(state.cartFoods.indexOf(food),1)
       }

     }
  },
  [RECEIVE_INFO](state, {info}) {
    state.info = info
  },

  [RECEIVE_RATINGS](state, {ratings}) {
    state.ratings = ratings
  },

  [RECEIVE_GOODS](state, {goods}) {
    state.goods = goods
  },
}
const actions={

  // 异步获取商家信息
  async getShopInfo({commit}, cb) {
    const result = await reqInfo()
    if(result.code===0) {
      const info = result.data
      commit(RECEIVE_INFO, {info})
      cb && cb()
    }
  },

  // 异步获取商家评价列表
  async getShopRatings({commit}, cb) {
    const result = await reqRatings()
    if(result.code===0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, {ratings})
      cb && cb()
    }
  },

  // 异步获取商家商品列表
  async getShopGoods({commit}, cb) {
    const result = await reqGoods()
    if(result.code===0) {
      const goods = result.data
      commit(RECEIVE_GOODS, {goods})
      cb && cb()
    }
  },
  updateFoodCount({commit},{isAdd,food}){
    if(isAdd){
       commit(ADD_FOOD_COUNT,food)
    }else{
      commit(REDUCE_FOOD_COUNT,food)
    }
  }
}
  const  getters={
      //总数量
       totalCount(state){
         return state.cartFoods.reduce((pre,food)=>pre+food.count,0)
       },
    //总价格
    totalPrice(state){
      return state.cartFoods.reduce((pre,food)=>pre+food.count*food.price,0)
    },
    //评级的数组的长度
    totalRatingCount(state){
      return state.ratings.length
    },
    //推荐评价的数量
    totalPositiveRatingCount(state){
      return state.ratings.reduce((pre,rating) => pre + (rating.rateType===0?1:0),0)
    }
  }


export default {
  state,
  mutations,
  actions,
  getters
}