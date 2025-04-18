export default [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/index.vue'),
    meta: {
      title: '登录页',
    },
  },
]
