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
