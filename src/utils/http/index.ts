import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
  CreateAxiosDefaults,
} from 'axios'
import type { RequestConfig } from './types'

// 默认配置
const defaultConfig: CreateAxiosDefaults = {
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
}

class HttpRequest {
  private instance: AxiosInstance
  private pending: Map<string, AbortController>

  constructor(config: CreateAxiosDefaults) {
    this.instance = axios.create(config)
    this.pending = new Map()
    this.setupInterceptors()
  }

  // 生成请求的唯一键
  private generateRequestKey(config: InternalAxiosRequestConfig): string {
    const { method, url, params, data } = config
    return [method, url, JSON.stringify(params), JSON.stringify(data)].join('&')
  }

  // 添加请求到pending
  private addPending(config: InternalAxiosRequestConfig): void {
    const requestKey = this.generateRequestKey(config)
    if (this.pending.has(requestKey)) {
      this.removePending(config) // 如果存在相同请求，先取消之前的请求
    }
    const controller = new AbortController()
    config.signal = controller.signal
    this.pending.set(requestKey, controller)
  }

  // 移除pending中的请求
  private removePending(config: InternalAxiosRequestConfig): void {
    const requestKey = this.generateRequestKey(config)
    if (this.pending.has(requestKey)) {
      const controller = this.pending.get(requestKey)
      controller?.abort()
      this.pending.delete(requestKey)
    }
  }

  private setupInterceptors(): void {
    // 请求拦截器
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // 添加取消请求控制器
        this.addPending(config)

        // 添加token
        const token = localStorage.getItem('token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }

        return config
      },
      (error: any) => {
        return Promise.reject(error)
      },
    )

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        // 移除已完成的请求
        this.removePending(response.config)

        // 根据业务状态码处理
        const { code, data, message } = response.data
        if (code === 200) {
          return data
        } else {
          // 统一错误处理
          this.handleError(code, message)
          return Promise.reject(new Error(message))
        }
      },
      (error: any) => {
        // 移除已完成的请求
        if (error.config) {
          this.removePending(error.config)
        }

        // 处理取消请求
        if (axios.isCancel(error)) {
          console.log('Request canceled:', error.message)
          return Promise.reject(error)
        }

        // 处理其他错误
        this.handleError(error?.response?.status, error?.message)
        return Promise.reject(error)
      },
    )
  }

  private handleError(code: number, message: string): void {
    switch (code) {
      case 401:
        // 未授权，跳转到登录页
        localStorage.removeItem('token')
        window.location.href = '/login'
        break
      case 403:
        // 权限不足
        console.error('无权限访问')
        break
      case 404:
        console.error('请求的资源不存在')
        break
      case 500:
        console.error('服务器错误')
        break
      default:
        console.error(message || '未知错误')
    }
  }

  // 封装请求方法
  public request<T = any>(config: RequestConfig<T>): Promise<T> {
    return this.instance.request(config)
  }

  public get<T = any>(url: string, config?: RequestConfig<T>): Promise<T> {
    return this.instance.get(url, config)
  }

  public post<T = any>(
    url: string,
    data?: any,
    config?: RequestConfig<T>,
  ): Promise<T> {
    return this.instance.post(url, data, config)
  }

  public put<T = any>(
    url: string,
    data?: any,
    config?: RequestConfig<T>,
  ): Promise<T> {
    return this.instance.put(url, data, config)
  }

  public delete<T = any>(url: string, config?: RequestConfig<T>): Promise<T> {
    return this.instance.delete(url, config)
  }
}

// 创建实例
const http = new HttpRequest(defaultConfig)

export default http
