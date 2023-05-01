// @Author: leiming
// @Date: 2023-04-17 17:29:13
// @LastEditors: leiming
// @LastEditTime: 2023-04-17 17:29:13
// @Description: file content

import { Menu } from './types/menu';
// import { storeMenu } from '@/store/app';

export const AMAP_KEY = '859de6e2d55150331e795f3cbfe21915';
export const SECURITY_CODE = '318d47264ccd25eb7bd2d4cfeda3b50c';


// const store: any = storeMenu();
// console.log(store.menuList, 'store.menuListstore.menuList');
const menu = sessionStorage.getItem('menuList') ? JSON.parse(sessionStorage.getItem('menuList')) : [];
console.log(menu, 'menumenumenumenumenu');

const airMenu = menu && menu.length && menu.find(f => {
    return f.url === '/app/airContent';
}).children;
const menuList: any = airMenu ? airMenu : [];

export const routePath = (basePath: string): Menu =>
    [
        ...menuList
    ];

export const routeUserPath = (basePath: string): Menu =>
    [
        {
            url: basePath + '/userCenter',
            name: '用户中心',
            icon: 'iconfont icon-home',
        },
        {
            url: basePath + '/auth',
            name: '权限管理',
            icon: 'iconfont icon-map',
        },
        {
            url: basePath + '/personalCenter',
            name: '个人中心',
            icon: 'iconfont icon-device',
            // children里为单菜单里的详情,noSubMenu是有详情的单菜单
            noSubMenu: true,
            children: [
                {
                    url: basePath + '/personalCenter',
                    name: '个人中心',
                    isButton: true,
                }
            ]
        }
    ];

export const APP_LIST: Menu = [
    {
        url: '/app/airContent',
        name: '大气气体含量探测',
        bizModule: 1,
        children: routePath('/app/airContent')
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
