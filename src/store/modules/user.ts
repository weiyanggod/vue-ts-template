import { defineStore } from 'pinia'
import { ref } from 'vue'

interface UserInfo {
  id: number
  username: string
  avatar?: string
}

export const useUserStore = defineStore('user', () => {
  // 状态
  const token = ref<string>('')
  const userInfo = ref<UserInfo | null>(null)

  // 获取用户信息
  const getUserInfo = async () => {
    try {
      // TODO: 调用获取用户信息的接口
      // const { data } = await getUserInfoApi()
      // userInfo.value = data
    } catch (error) {
      console.error('获取用户信息失败:', error)
    }
  }

  // 登录
  const login = async (username: string, password: string) => {
    try {
      // TODO: 调用登录接口
      // const { data } = await loginApi({ username, password })
      // token.value = data.token
      // localStorage.setItem('token', data.token)
    } catch (error) {
      console.error('登录失败:', error)
      throw error
    }
  }

  // 登出
  const logout = () => {
    token.value = ''
    userInfo.value = null
    localStorage.removeItem('token')
  }

  // 检查是否已登录
  const checkLogin = () => {
    const localToken = localStorage.getItem('token')
    if (localToken) {
      token.value = localToken
      return true
    }
    return false
  }

  return {
    token,
    userInfo,
    getUserInfo,
    login,
    logout,
    checkLogin,
  }
})
