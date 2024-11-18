import { get } from '../index'
// 获取所有场景
export const getViewList = () => {
  return get('/view')
}
