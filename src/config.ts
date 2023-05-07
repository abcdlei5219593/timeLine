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
        defaultMeasure: 'aqi',
        children: routeAirPath('/app/airContent'),
        meta: {
            AQIName: 'AQI',
            categoryName: '空气',
            stasticsColumns: [
                { prop: 'api', label: 'AQI', width: 60},
                { prop: 'pm10', label: 'PM10（ug/m3）', width: 100},
                { prop: 'pm25', label: 'PM2.5（ug/m3）', width: 100},
                { prop: 'co', label: '一氧化碳（ug/m3）', width: 100},
                { prop: 'no2', label: '二氧化氮（ug/m3）', width: 100},
                { prop: 'o3', label: '臭氧（ug/m3）', width: 100},
                { prop: 'so2', label: '氧化硫（ug/m3）', width: 100},
                { prop: 'temp', label: '温度', width: 100},
                { prop: 'humi', label: '湿度', width: 100},
                { prop: 'wsp', label: '风速', width: 100},
                { prop: '', label: '风压', width: 100},
                { prop: 'wd', label: '风向', width: 60},
                { prop: 'wsp', label: '风速', width: 100},
            ],
            markerWindowField: [
                [
                    { prop: 'aqi', label: 'AQI'},
                    { prop: 'pm25', label: 'PM'},
                ],
                [
                    { prop: 'co', label: '一氧化碳'},
                    { prop: 'pm10', label: 'PM10'},
                ],
                [
                    { prop: 'so2', label: '二氧化硫'},
                    { prop: 'temp', label: '温度'},
                ],
                [
                    { prop: 'no2', label: '二氧化氮'},
                    { prop: 'humi', label: '湿度'},
                ],
                [
                    { prop: 'h2s', label: '臭氧'},
                ]
            ]

        },
    },
    {
        url: '/app/water',
        name: '水质探测管理',
        bizModule: 2,
        defaultMeasure: 'cwqi',
        children: routeWaterPath('/app/water'),
        meta: {
            AQIName: 'CWQI',
            categoryName: '水质',
            stasticsColumns: [
                { prop: 'cwqi', label: 'CWQI'},
                { prop: 'ph', label: 'PH'},
                { prop: 'd0', label: '溶解氧mg/L'},
                { prop: 'ec', label: '电导率μS/cm'},
                { prop: 'wt', label: '浊度NTU'},
                { prop: 'temp', label: '温度°C'},

            ],
            markerWindowField: [
                [
                    { prop: 'cwqi', label: 'CWQI'},
                    { prop: 'temp', label: '温度'},
                ],
                [
                    { prop: 'ph', label: 'PH'},
                ],
                [
                    { prop: 'd0', label: '溶解氧'},

                ],
                [
                    { prop: 'ec', label: '电导率'},
                ],
                [
                    { prop: 'wt', label: '浊度'},
                ]
            ]
        }
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

