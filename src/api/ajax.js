import axios from 'axios'
import store from '../vuex/store'
import  router from '../router'
import qs  from 'qs'
//请求超时 全局配置
axios.defaults.timeout =20000
// 添加请求拦截器
axios.interceptors.request.use((config) => {

  const {method, data} = config
  // 如果是携带数据（data）的post请求, 并且data有值
  if (method.toLowerCase()==='post' && data && typeof data==='object') {
    config.data = qs.stringify(data) // {name: 'tom', pwd: '123'} ==> name=tom&pwd=123
  }
  const {needToken}=config.headers//让拦截器可以看到
  //如果浏览器端有token就自动携带上
   if (needToken){
      const token =store.state.user.token
      if (token){
        config.headers.Authorization=token
      }else {
        const  error=new  Error('没有权限，不能发请求')
        error.status=401
        throw error
      }
   }
  return config;
});

//
//响应拦截
axios.interceptors.response.use(response=>{
  return response.data
},error=>{

  if (!error.response) {
    if (error.status===401) {
      if (router.currentRoute.path !== '/login') {
        console.log('请求前未授权, 跳转到登陆')
        // 退出登陆
        router.replace('/login')
        alert(error.message)
      } else {
        console.log('请求前未授权, 但已跳转')
      }
    } else {
      console.log('error', error)
    }

  } else {
    const status = error.response.status
    const msg = error.message
    if (status === 401) { // 授权过期
      if (router.currentRoute.path !== '/login') {
        console.log('请求后未授权, 跳转到登陆')
        // 退出登陆
        store.dispatch('logout')
        router.replace('/login')
        alert(error.response.data.message)
      } else {
        console.log('token 过期')
      }
    } else if (status === 404) {
      alert('请求的资源不存在')
    } else {
      alert('请求异常: ' + msg)
    }
  }
   return new Promise(()=>{})// 中断promise链
})

export default axios


/* export default function (url,data={},type='GET') {
  return new Promise((resolve,reject)=>{
    let promise
    if (type==='GET'){
      promise= axios.get(url,{
        params:data
      })
    }else {
      promise= axios.post(url,data)
    }
    promise.then(response=>{
      resolve(response)
    }).catch(error=>{
      console.log('请求出错');
    })
  })
} */
