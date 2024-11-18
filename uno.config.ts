import { defineConfig, presetAttributify, presetUno, presetWind } from 'unocss'

export default defineConfig({
  presets: [
    presetWind(),
    presetAttributify({
      /* preset 选项 */
    }),
    presetUno(),
    // ...自定义 presets
  ],
  shortcuts: [
    ['wh-full', 'w-full h-full'],
    ['f-c-c', 'flex justify-center items-center'],
    ['f-col', 'flex flex-col'],
  ],
})
