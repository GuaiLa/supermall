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
    return config;
  })

  // 2.2 响应拦截
  instance.interceptors.response.use(res => {
    return res.data
    console.log(res.data);
  }, err => {
    console.log(err);
    return config.data;
  })

  // 3. 发送真正的网络请求
  return instance(config)
}
