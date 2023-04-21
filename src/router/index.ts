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
                path: 'home',
                name: 'Home',
                component: () => import('@/views/Home/index.vue'),
                meta: {
                    title: '首页'
                }
            },
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
                    },
                    {
                        path: 'compare',
                        name: 'Compare',
                        component: () => import('@/views/Statistics/Compare/index.vue'),
                        meta: {
                            title: '对比图'
                        },
                    },
                    {
                        path: 'report',
                        name: 'Report',
                        component: () => import('@/views/Statistics/Report/index.vue'),
                        meta: {
                            title: '分析报告'
                        },
                    },
                    {
                        path: 'statisticsData',
                        name: 'StatisticsData',
                        component: () => import('@/views/Statistics/StatisticsData/index.vue'),
                        meta: {
                            title: '统计数据'
                        },
                    },
                    {
                        path: 'avgData',
                        name: 'AvgData',
                        component: () => import('@/views/Statistics/AvgData/index.vue'),
                        meta: {
                            title: '月小时平均数据'
                        },
                    }
                ]
            },
            {
                path: 'device',
                name: 'Device',
                component: () => import('@/views/Device/index.vue'),
                meta: {
                    title: '设备管理'
                }
            },
            {
                path: 'warn',
                name: 'Warn',
                meta: {
                    title: '告警管理'
                },
                children: [
                    {
                        path: 'deviceWarn',
                        name: 'DeviceWarn',
                        component: () => import('@/views/Warn/DeviceWarn/index.vue'),
                        meta: {
                            title: '设备告警'
                        }
                    },
                    {
                        path: 'airWarn',
                        name: 'AirWarn',
                        component: () => import('@/views/Warn/AirWarn/index.vue'),
                        meta: {
                            title: '大气告警'
                        }
                    },
                ]
            },
            {
                path: 'histroy',
                name: 'Histroy',
                component: () => import('@/views/Histroy/index.vue'),
                meta: {
                    title: '历史数据'
                }
            },
            {
                path: 'flag',
                name: 'Flag',
                component: () => import('@/views/Flag/index.vue'),
                meta: {
                    title: '标记管理'
                }
            },
            {
                path: 'userCenter',
                name: 'UserCenter',
                component: () => import('@/views/User/userCenter.vue'),
                meta: {
                    title: '用户中心'
                }
            },
            {
                path: 'auth',
                name: 'Auth',
                component: () => import('@/views/User/auth.vue'),
                meta: {
                    title: '权限管理'
                }
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
