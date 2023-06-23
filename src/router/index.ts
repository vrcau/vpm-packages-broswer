// Composables
import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("@/views/NotPackageAvailable.vue"),
      },
    ],
  },
  {
    path: "/packages/:id",
    component: () => import("@/views/PakcageDetail.vue"),
    props: true,
  },
] as RouteRecordRaw[];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;