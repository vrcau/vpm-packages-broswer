// Composables
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/NotPackageAvailable.vue'),
      },
    ],
  },
  {
    path: '/packages/:id',
    component: () => import('@/views/PakcageDetail.vue'),
    props: true,
  },
] as RouteRecordRaw[]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
