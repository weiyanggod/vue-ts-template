import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { setupRouter } from '@/router/index'
import 'virtual:uno.css'
const setupApp = async () => {
  const app = createApp(App)
  // 创建路由
  setupRouter(app)
  app.mount('#app')
}

setupApp()
