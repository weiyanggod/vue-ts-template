import type { AxiosRequestConfig } from 'axios'

export interface RequestConfig<T = any>
  extends Omit<AxiosRequestConfig, 'responseType'> {
  dataType?: T
}
