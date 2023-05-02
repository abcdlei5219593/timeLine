// @Author: leiming
// @Date: 2023-04-17 17:29:13
// @LastEditors: leiming
// @LastEditTime: 2023-04-17 17:29:13
// @Description: file content

import { Menu } from './types/menu';
// import { storeMenu } from '@/store/app';

export const AMAP_KEY = '859de6e2d55150331e795f3cbfe21915';
export const SECURITY_CODE = '318d47264ccd25eb7bd2d4cfeda3b50c';

// const store: any = storeMenu() || '';
// console.log(store.menuList, 'store.menuListstore.menuList');
const menu = sessionStorage.getItem('menuList') ? JSON.parse(sessionStorage.getItem('menuList')) : [];
console.log(menu, 'menumenumenumenumenu');

const airMenu = menu && menu.length && menu.find((f: any) => {
    return f.url === '/app/airContent';
}).children;
const airMenuList: any = airMenu ? airMenu : [];
const userMenu = menu && menu.length && menu.find((f: any) => {
    return f.url === '/app/user';
}).children;
const useMenuList: any = userMenu ? userMenu : [];
console.log(useMenuList, 'useMenuListuseMenuListuseMenuListuseMenuList');

export const routePath = (basePath: string): Menu =>
    [
        ...airMenuList
    ];

export const routeUserPath = (basePath: string): Menu =>
    [
        ...useMenuList
    ];

export const routeWaterPath = (basePath: string): Menu =>
    [
        {
            url: basePath + '/map',
            name: '地图展示',
            icon: 'iconfont icon-dituzhanshi',
        },
        {
            url: basePath + '/statistics',
            name: '统计分析',
            icon: 'iconfont icon-tongjifenxi',
            children: [
                {
                    url: basePath + '/statistics/compare',
                    name: '对比图',
                },
                {
                    url: basePath + '/statistics/report',
                    name: '分析报告',
                    children: [
                        {
                            url: basePath + '/statistics/report/view',
                            name: '页面访问',

                        },
                        {
                            url: basePath + 'exportStatisticsData',
                            name: '导出数据',
                            isButton: true,

                        },

                    ]
                },
                {
                    url: basePath + '/statistics/statisticsData',
                    name: '统计数据',
                },
                {
                    url: basePath + '/statistics/avgData',
                    name: '月小时平均数据',
                }
            ]
        },
        {
            url: basePath + '/device',
            name: '设备管理',
            icon: 'iconfont icon-shebeiguanli',
            // children里为单菜单里的详情,noSubMenu是有详情的单菜单
            noSubMenu: true,
            children: [
                {
                    url: basePath + '/device/viewPage',
                    name: '页面访问',
                },

                {
                    url: basePath + 'deviceSensor',
                    name: '传感器',
                    isButton: true,
                    children: [
                        {
                            url: basePath + '/device/deviceSensor/view',
                            name: '页面访问',

                        },
                        {
                            url: basePath + 'adjusting',
                            name: '校推',
                            isButton: true,

                        },
                        {
                            url: basePath + 'setThreshold ',
                            name: '设置阀值',
                            isButton: true,

                        },
                    ]
                },
                {
                    url: basePath + 'pendingTrigger',
                    name: '上报间隔',
                    isButton: true
                },
                {
                    url: basePath + 'reStart',
                    name: '重启',
                    isButton: true
                },
            ]
        },
        {
            url: basePath + '/warn',
            name: '告警管理',
            icon: 'iconfont icon-gaojingguanli',
            children: [
                {
                    url: basePath + '/warn/deviceWarn',
                    name: '设备告警',
                },
                {
                    url: basePath + '/warn/airWarn',
                    name: '水质告警',
                    children: [
                        {
                            url: basePath + '/device/airWarn/view',
                            name: '页面访问',

                        },
                        {
                            url: basePath + 'closeWarn',
                            name: '关闭告警',
                            isButton: true,

                        },

                    ]
                },

            ]
        },
        {
            url: basePath + '/flag',
            name: '操作日志',
            icon: 'iconfont icon-biaojiguanli',
        },

    ];

export const APP_LIST: Menu = [
    {
        url: '/app/airContent',
        name: '大气气体含量探测',
        bizModule: 1,
        children: routePath('/app/airContent')
    },
    {
        url: '/app/water',
        name: '水质探测管理',
        children: routeWaterPath('/app/water')
    },
    {
        url: '/app/pm',
        name: '可吸入颗粒物探测',
        children: routePath('/app/pm')
    },
    {
        url: '/app/wind',
        name: '风测量管理'
    },
    {
        url: '/app/rain',
        name: '降水测量管理'
    },
    {
        url: '/app/ptu',
        name: 'PTU测量管理'
    },
    {
        url: '/app/user',
        name: '用户与权限',
        children: routeUserPath('/app/user')
    },
];
