import { createRouter, createWebHistory,RouteRecordRaw } from "vue-router";
 
// 1. 配置路由
const routes: Array<RouteRecordRaw> = [
    {path:'/', redirect: '/login'},
    {path:'/login',
     component: () => import('../views/login.vue')
    },
    {
      path: '/layout',
      name: 'layout',
      component: () => import('@/views/layout/index.vue'),
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('@/views/layout/home.vue')
        },
        {
          path: '/info',
          name: 'info',
          component: () => import('@/views/basic/info.vue')
        },
        {
          path: '/canvas',
          name: 'canvas',
          component: () => import('@/views/basic/canvas.vue')
        },
      ]
    },
 
];
// 2.返回一个 router 实列，为函数，配置 history 模式
const router = createRouter({
    history: createWebHistory(),
    routes,
});
 
// 3.导出路由   去 main.ts 注册 router.ts
 
export default router