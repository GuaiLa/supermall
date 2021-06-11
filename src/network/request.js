import axios from "axios"

export function request(config) {
  // 1.创建axios实例
  const instance = axios.create({
    baseURL: "http://152.136.185.210:7878/api/m5",
    timeout: 10000
  })

// 2.axios拦截器
// 2.1 请求拦截
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    console.log(err);
    return err;
  })

  // 2.2 响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log('来到了response拦截failure中');
    console.log(err);
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '请求错误'
          break
        case 401:
          err.message = '未授权的访问'
          break
      }
    }
    return err
  })

  // 3. 发送真正的网络请求
  return instance(config)
  // 传入对象进行网络请求
  // instance(config).then(res => {
  //   resolve(res)
  // }).catch(err => {
  //   reject(err)
  // })
}
