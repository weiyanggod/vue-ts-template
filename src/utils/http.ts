import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from 'axios'

// 创建一个 axios 实例
const instance: AxiosInstance = axios.create({
  baseURL: '/api/', // 替换为你的 API 基础 URL
  timeout: 1000, // 请求超时时间
  headers: { 'Content-Type': 'application/json' },
})

// 请求拦截器
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 在发送请求之前做些什么
    // 比如添加 token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: any) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  },
)

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 对响应数据做些什么
    return response.data
  },
  (error: any) => {
    // 对响应错误做些什么
    return Promise.reject(error)
  },
)

export default instance
