import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';
import Layout from '@/views/Layout/index.vue';
import Cookie from 'js-cookie';

export const routes: Array<RouteRecordRaw> = [

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
        path: '/workbench',
        name: 'Workbench',
        component: Layout,
        meta: {
            auth: true
        },
        children: [
            {
                path: '/workbench/project',
                name: 'Project',
                component: () => import('@/views/Project/list.vue'),
                meta: {
                    title: '项目管理',
                    icon: 'project'
                },

            },
            {
                path: '/workbench/road',
                name: 'road',
                component: () => import('@/views/road/list.vue'),
                meta: {
                    title: '道路管理',
                    icon: 'road'
                },

            },
            {
                path: '/workbench/data',
                name: 'data',
                component: () => import('@/views/data/list.vue'),
                meta: {
                    title: '管网数据',
                    icon: 'data'
                },

            },
            {
                path: '/workbench/system',
                name: 'system',
                redirect: '/workbench/system/user',

                meta: {
                    title: '系统设置',
                    icon: 'system'
                },
                children: [
                    {
                        path: '/workbench/system/user',
                        name: 'workbenchuser',
                        component: () => import('@/views/system/users.vue'),
                        meta: {
                            title: '用户中心'
                        }
                    },
                    {
                        path: '/workbench/system/role',
                        name: 'Role',
                        component: () => import('@/views/system/role.vue'),
                        meta: {
                            title: '角色管理'
                        }
                    },
                ]

            },

            // {
            //     path: '/workbenchuserCenter',
            //     name: 'UserCenter',
            //     component: () => import('@/views/User/userCenter.vue'),
            //     meta: {
            //         title: '用户中心'
            //     }
            // },
            // {
            //     path: '/workbench/auth',
            //     name: 'Auth',
            //     component: () => import('@/views/User/auth.vue'),
            //     meta: {
            //         title: '权限管理'
            //     }
            // },
            // {
            //     path: '/workbench/personalCenter',
            //     name: 'PersonalCenter',
            //     component: () => import('@/views/User/personalCenter.vue'),
            //     meta: {
            //         title: '个人中心'
            //     }
            // },

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
    if (to.path !== '/login' && !token) {
        return next('/login');
    }
    next();
});

export default router;
