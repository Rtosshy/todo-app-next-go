import axios from 'axios'
import { getCsrfToken } from './csrf-store'
import type { AxiosRequestConfig } from 'axios'

export const AXIOS_INSTANCE = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  withCredentials: true,
})

AXIOS_INSTANCE.interceptors.request.use((config) => {
  const token = getCsrfToken()

  if (token) {
    config.headers['X-CSRF-Token'] = token
  }
  return config
})

export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
  }).then(({ data }) => data)

  return promise
}
