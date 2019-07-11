/*
接口请求函数
* */

import  ajax from './ajax'
import  store from '../vuex/store'
const BASE='/api'

//经纬度
export  const reqAddress=(longitude,latitude)=>ajax.get(BASE+`/position/${latitude},${longitude}`)
//食品分类
export  const reqCategorys=()=>ajax({
  method:'GET',
  url:BASE+'/index_category',
  headers: {needToken: true}, // 需要进行权限验证
})
//根据经纬度获取商品列表
export  const reqShops=({latitude,longitude})=>ajax({
  method:'GET',
  url:BASE+'/shops',
  params: {latitude,longitude},
  headers: {needToken: true}, // 需要进行权限验证
})

//获取一次性短信验证码
export  const SmsVerification=(phone)=>ajax({
  method:'GET',
  url:BASE+'/sendcode',
  params: {phone}
})
//用户名密码登录
export  const reqAddPwd=({name,pwd ,captcha})=>ajax({
  method:'POST',
  url:BASE+'/login_pwd',
  data: {
    name,
    pwd ,
    captcha
  }
})
//手机号验证码登陆
export  const reqAddphone=({phone ,code})=>ajax({
  method:'POST',
  url:BASE+'/login_sms',
  data: {
    phone ,
    code
  }
})

// 请求自动登陆
export const reqAutoLogin = () => ajax({
  url: BASE + '/auto_login',
  headers: {needToken:true}
})

export const reqGoods = () => ajax('/goods')
export const reqRatings = () => ajax('/ratings')
export const reqInfo = () => ajax('/info')
