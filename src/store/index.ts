import { createPinia } from 'pinia'

import { App } from 'vue'

export function setupStore(app: App) {
  const pinia = createPinia()
  app.use(pinia)
}

export * from './modues'
