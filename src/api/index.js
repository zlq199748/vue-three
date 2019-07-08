/*
接口请求函数
* */

import  ajax from './ajax'
const BASE='/api'
//经纬度
export  const reqAddress=(longitude,latitude)=>ajax.get(BASE+`/position/${latitude},${longitude}`)
//食品分类
export  const reqCategorys=()=>ajax({
  method:'GET',
  url:BASE+'/index_category'
})
//根据经纬度获取商品列表
export  const reqShops=({latitude,longitude})=>ajax({
  method:'GET',
  url:BASE+'/shops',
  params: {latitude,longitude}
})

