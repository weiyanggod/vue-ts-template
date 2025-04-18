import type { App } from 'vue'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import LoginRouter from './modules/index'
import ErrorRouter from './modules/error'
import { setupRouterGuard } from './guard'

// 公共路由
export const publicRoutes: Array<RouteRecordRaw> = [
  ...LoginRouter,
  ...ErrorRouter,
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

/* 初始化路由表 */
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name) {
      router.hasRoute(name)
      router.removeRoute(name)
    }
  })
}

/* 导出 setupRouter */
export const setupRouter = (app: App<Element>) => {
  app.use(router)
  setupRouterGuard(router)
}

export default router
