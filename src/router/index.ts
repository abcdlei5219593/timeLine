import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';
import Layout from '@/views/Layout/index.vue';
import Cookie from 'js-cookie';

const routes: Array<RouteRecordRaw> = [

    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login/index.vue')
    },
    {
        path: '/ssoLogin',
        name: 'SsoLogin',
        component: () => import('@/views/Login/ssoLogin.vue')
    },
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard/index.vue')
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
                },
            },
            {
                path: 'device',
                name: 'DeviceSensor',
                component: () => import('@/views/Device/Sensor/index.vue'),
                meta: {
                    title: '设备管理'
                },
                children: [
                    {
                        path: 'sensor',
                        name: 'DeviceSensor',
                        component: () => import('@/views/Device/Sensor/index.vue'),
                        meta: {
                            title: '传感器'
                        }
                    },
                ]
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
                    {
                        path: 'waterWarn',
                        name: 'WaterWarn',
                        component: () => import('@/views/Warn/AirWarn/index.vue'),
                        meta: {
                            title: '水质告警'
                        }
                    },
                    {
                        path: 'windWarn',
                        name: 'WindWarn',
                        component: () => import('@/views/Warn/AirWarn/index.vue'),
                        meta: {
                            title: '风速告警'
                        }
                    },
                    {
                        path: 'ptuWarn',
                        name: 'PTUWarn',
                        component: () => import('@/views/Warn/AirWarn/index.vue'),
                        meta: {
                            title: 'PTU告警'
                        }
                    },
                    {
                        path: 'rainWarn',
                        name: 'RainWarn',
                        component: () => import('@/views/Warn/AirWarn/index.vue'),
                        meta: {
                            title: '雨量告警'
                        }
                    },
                    {
                        path: 'cityWarn',
                        name: 'CityWarn',
                        component: () => import('@/views/Warn/AirWarn/index.vue'),
                        meta: {
                            title: '城市环境告警'
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
                    title: '操作日志'
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
            {
                path: 'personalCenter',
                name: 'PersonalCenter',
                component: () => import('@/views/User/personalCenter.vue'),
                meta: {
                    title: '个人中心'
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


router.beforeEach((to, from, next) => {
    const token = Cookie.get('token');
    if (to.path !== '/login' && to.path !== '/ssoLogin' && !token) {
        return next('/login');
    }
    next();
});

export default router;
