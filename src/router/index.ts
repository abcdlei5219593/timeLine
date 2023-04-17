import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';
import Layout from '@/views/Layout/index.vue';

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
        path: '/app/:appkey',
        name: 'Apps',
        component: Layout,
        children: [
            {
                path: 'map',
                name: 'Map',
                component: () => import('@/views/Map/index.vue'),
                meta: {
                    title: '地图展示'
                }
            },
            {
                path: 'statistics',
                name: 'Statistics',
                meta: {
                    title: '统计分析'
                },
                children: [
                    {
                        path: 'heatMap',
                        name: 'HeatMap',
                        component: () => import('@/views/Statistics/HeatMap/index.vue'),
                        meta: {
                            title: '热力图'
                        },
                    }
                ]
            },

        ]
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
