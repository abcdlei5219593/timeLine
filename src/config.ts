// @Author: leiming
// @Date: 2023-04-17 17:29:13
// @LastEditors: leiming
// @LastEditTime: 2023-04-17 17:29:13
// @Description: file content

import { Menu } from './types/menu';
import { routeWaterPath } from './water';
import { routeAirPath } from './air';


export const AMAP_KEY = '859de6e2d55150331e795f3cbfe21915';
export const SECURITY_CODE = '318d47264ccd25eb7bd2d4cfeda3b50c';



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
            // isButton: true,
            // children: [
            //     {
            //         url: basePath + '/personalCenter',
            //         name: '个人中心',
            //         isButton: true,
            //     }
            // ]
        }
    ];

export const APP_LIST: Menu = [
    {
        url: '/app/airContent',
        name: '大气气体含量探测',
        bizModule: 1,
        children: routeAirPath('/app/airContent')
    },
    {
        url: '/app/water',
        name: '水质探测管理',
        bizModule: 2,
        children: routeWaterPath('/app/water')
    },
    {
        url: '/app/pm',
        name: '可吸入颗粒物探测',
        children: routeAirPath('/app/pm')
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
        bizModule: null,
        children: routeUserPath('/app/user')
    },
];
