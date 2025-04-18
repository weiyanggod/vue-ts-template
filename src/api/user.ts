import request from '@/utils/http'

export const login = () => {
  return request.get('/test')
}
