// @Author: leiming
// @Date: 2023-04-17 17:29:13
// @LastEditors: leiming
// @LastEditTime: 2023-04-17 17:29:13
// @Description: file content

import { Menu } from './types/menu';

export const AMAP_KEY = '859de6e2d55150331e795f3cbfe21915';
export const SECURITY_CODE = '318d47264ccd25eb7bd2d4cfeda3b50c';



export const routePath = (basePath: string): Menu =>
    [
        {
            url: basePath + '/home',
            name: '首页'
        },
        {
            url: basePath + '/map',
            name: '地图展示'
        },
        {
            url: basePath + '/statistics',
            name: '统计分析',
            children: [
                {
                    url: basePath + '/statistics/heatMap',
                    name: '热力图',
                },
                {
                    url: basePath + '/statistics/compare',
                    name: '对比图',
                },
                {
                    url: basePath + '/statistics/report',
                    name: '分析报告',
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
            name: '设备管理'
        },
        {
            url: basePath + '/warn',
            name: '告警管理',
            children: [
                {
                    url: basePath + '/warn/deviceWarn',
                    name: '设备告警',
                },
                {
                    url: basePath + '/warn/airWarn',
                    name: '大气告警',
                },

            ]
        },
        {
            url: basePath + '/histroy',
            name: '历史数据'
        },
        {
            url: basePath + '/flag',
            name: '标记管理'
        },
        {
            url: basePath + '/userCenter',
            name: '用户中心'
        },
        {
            url: basePath + '/auth',
            name: '权限管理'
        },

    ];


export const APP_LIST: Menu = [
    {
        url: '/app/airContent',
        name: '大气气体含量探测',
        children: routePath('/app/airContent')
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
