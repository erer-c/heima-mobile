import axios from 'axios'
import jsonBig from 'json-bigint'
// 在JavaScript模块中，直接import获取容器即可
import store from '@/store'
export default axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

// 转化大数字
axios.defaults.transformResponse = [function (data) {
  // 如果正常的话使用jsonBig转化，否则返回一个空对象
  try {
    return jsonBig(data)
  } catch (error) {
    return {}
  }
}]

// 请求拦截器
axios.interceptors.request.use(function (config) {
  // 统一注入token
  const { user } = store.state
  // 如果有数据
  if (user) {
    // 用于获取本次请求头对象，固定API
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
})
// 响应拦截器
axios.interceptors.response.use(function (err) {
  return err
})
