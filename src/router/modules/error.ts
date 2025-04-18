import type { RouteRecordRaw } from 'vue-router'

const errorRoutes: Array<RouteRecordRaw> = [
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error/404.vue'),
    meta: {
      title: '404',
      requiresAuth: false,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
]

export default errorRoutes
