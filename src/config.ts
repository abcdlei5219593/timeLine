// @Author: leiming
// @Date: 2023-04-17 17:29:13
// @LastEditors: leiming
// @LastEditTime: 2023-04-17 17:29:13
// @Description: file content

import { Menu } from './types/menu';

export const AMAP_KEY = '859de6e2d55150331e795f3cbfe21915';

export const APP_LIST: Menu = [
    {
        url: '/app/airContent',
        name: '大气气体含量探测',
        children: [

            {
                url: '/app/airContent/statistics',
                name: '地图展示',
                children: [
                    {
                        url: '/app/airContent/statistics/heatMap',
                        name: '热力图',
                    }
                ]
            },
            {
                url: '/app/airContent/map',
                name: '地图展示'
            },
        ]
    },
    {
        url: '/app/pm',
        name: '可吸入颗粒物探测'
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
];
