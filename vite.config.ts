import { URL, fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import pluginRewriteAll from 'vite-plugin-rewrite-all'
import { VitePWA } from 'vite-plugin-pwa'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vue(),
    vuetify({
      autoImport: true,
    }),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/, /\.vue\?vue/, // .vue
      ],
      imports: [
        'vue',
        'pinia',
      ],
      dts: 'src/auto-imports.d.ts',
      dirs: [
        'src/stores',
      ],
      vueTemplate: true,
    }),
    Components({
      extensions: ['vue'],
      dts: 'src/components.d.ts',
    }),
    pluginRewriteAll(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: ['favicon.ico'],
      manifest: {
        name: 'VRChat Aerospace University Packages Browser',
        short_name: 'vrcau\'s Packages',
        description: 'VRChat Aerospace University\'s Packages Browser',
        theme_color: '#000000',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      devOptions: {
        enabled: true,
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,webp,png}'],
      },
    }),
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
  },
  server: {
    port: 3000,
  },
})
