import type { Router } from 'vue-router'
import { useUserStore } from '@/store/modules/user'
import { ElMessage } from 'element-plus'

export function setupRouterGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    // 设置页面标题
    document.title = (to.meta.title as string) || '系统'

    const userStore = useUserStore()
    const token = userStore.token

    // 判断是否需要登录
    if (to.meta.requiresAuth && !token) {
      ElMessage.warning('请先登录')
      next({ path: '/login', query: { redirect: to.fullPath } })
      return
    }

    next()
  })

  router.afterEach(() => {
    // 路由切换后的操作
  })
}
