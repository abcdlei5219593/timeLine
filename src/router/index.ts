import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';

const routes: Array<RouteRecordRaw> = [

    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login/index.vue')
    },
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/:pathMatch(.*)*',
        component: () => import('@/views/404'),
        meta: {
            name: '404',
        },
    },

];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
// 路由跳转之前调用



export default router;
