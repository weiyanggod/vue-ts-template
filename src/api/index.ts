import axiosInstance from '@/utils/http.ts'
export interface ApiResult<T> {
  code: number
  message: string
  data: T
  statusCode?: number
}

export const axios = axiosInstance

// 请求封装
export async function get<T>(
  url: string,
  params?: unknown,
): Promise<ApiResult<T>> {
  const response = await axiosInstance.get<ApiResult<T>>(url, { params })
  return response.data
}

export async function post<T>(
  url: string,
  data?: unknown,
): Promise<ApiResult<T>> {
  const response = await axiosInstance.post<ApiResult<T>>(url, data)
  return response.data
}

export async function put<T>(
  url: string,
  data?: unknown,
): Promise<ApiResult<T>> {
  const response = await axiosInstance.put<ApiResult<T>>(url, data)
  return response.data
}

export async function del<T>(
  url: string,
  params?: unknown,
): Promise<ApiResult<T>> {
  const response = await axiosInstance.delete<ApiResult<T>>(url, { params })
  return response.data
}
