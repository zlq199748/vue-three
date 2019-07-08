import axios from 'axios'

import qs  from 'qs'
//请求超时 全局配置
axios.defaults.timeout =20000
// 添加请求拦截器
axios.interceptors.request.use((config) => {

  const {method, data} = config
  // 如果是携带数据的post请求, 进行处理
  if (method.toLowerCase()==='post' && data && typeof data==='object') {
    config.data = qs.stringify(data) // {name: 'tom', pwd: '123'} ==> name=tom&pwd=123
  }

  return config;
});

//
//响应拦截
axios.interceptors.response.use(response=>{
  return response.data
},error=>{
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
