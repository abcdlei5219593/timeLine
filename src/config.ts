// @Author: leiming
// @Date: 2023-04-17 17:29:13
// @LastEditors: leiming
// @LastEditTime: 2023-04-17 17:29:13
// @Description: file content

import { Menu } from './types/menu';
import { routeWaterPath } from './water';
import { routeAirPath } from './air';
import { routeWindPath } from './wind';
import { routePtuPath } from './ptu';
import { routeRainPath } from './rain';
import { routeUserPath } from './user';
import { getWindDirection } from '@/helper/index';

export const AMAP_KEY = '859de6e2d55150331e795f3cbfe21915';
export const SECURITY_CODE = '318d47264ccd25eb7bd2d4cfeda3b50c';

export const APP_LIST: Menu = [
    {
        url: '/app/airContent',
        name: '大气气体含量探测',
        bizModule: 1,
        defaultMeasure: 'aqi',
        children: routeAirPath('/app/airContent'),
        meta: {
            AQIName: 'AQI',
            categoryName: '空气质量',
            categoryTitle: '空气质量指数变化曲线',
            avgLabel: '月均浓度',
            stasticsColumns: [
                { prop: 'aqi', label: 'AQI', width: 60 },
                { prop: 'pm10', label: 'PM10（ug/m3）', width: 150 },
                { prop: 'pm25', label: 'PM2.5（ug/m3）', width: 150 },
                { prop: 'co', label: '一氧化碳（ug/m3）', width: 150 },
                { prop: 'no2', label: '二氧化氮（ug/m3）', width: 150 },
                { prop: 'o3', label: '臭氧（ug/m3）', width: 150 },
                { prop: 'so2', label: '二氧化硫（ug/m3）', width: 150 },
                { prop: 'temp', label: '温度', width: 150 },
                { prop: 'humi', label: '湿度', width: 150 },
            ],
            markerWindowField: [
                [
                    { prop: 'aqi', label: 'AQI' },
                    { prop: 'pm25', label: 'PM2.5' },
                    { prop: 'db', label: '噪音' },
                ],
                [
                    { prop: 'co', label: '一氧化碳' },
                    { prop: 'pm10', label: 'PM10' },
                    { prop: 'voc', label: 'VOC' },
                ],
                [
                    { prop: 'so2', label: '二氧化硫' },
                    { prop: 'temp', label: '温度' },
                    { prop: 'ap', label: '气压' },
                ],
                [
                    { prop: 'no2', label: '二氧化氮' },
                    { prop: 'humi', label: '湿度' },
                    { prop: 'prcp', label: '雨量' },
                ],
                [
                    { prop: 'h2s', label: 'H2S' },
                    { prop: 'o3', label: '臭氧' },
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
            categoryName: '水质质量',
            categoryTitle: '水质质量指数变化曲线',
            avgLabel: '月均数据',
            stasticsColumns: [
                { prop: 'cwqi', label: 'CWQI' },
                { prop: 'ph', label: 'PH' },
                { prop: 'd0', label: '溶解氧mg/L' },
                { prop: 'ec', label: '电导率μS/cm' },
                { prop: 'wt', label: '浊度NTU' },
                { prop: 'temp', label: '温度°C' },

            ],
            markerWindowField: [
                [
                    { prop: 'cwqi', label: 'CWQI' },
                    { prop: 'temp', label: '温度' },
                ],
                [
                    { prop: 'ph', label: 'PH' },
                ],
                [
                    { prop: 'd0', label: '溶解氧' },

                ],
                [
                    { prop: 'ec', label: '电导率' },
                ],
                [
                    { prop: 'wt', label: '浊度' },
                ]
            ]
        }
    },
    {
        url: '/app/wind',
        bizModule: 3,
        name: '风测量管理',
        defaultMeasure: 'wsp',
        children: routeWindPath('/app/wind'),
        meta: {
            AQIName: 'CWQI',
            categoryName: '风速',
            categoryTitle: '风速变化曲线',
            stasticsColumns: [
                { prop: 'wsp', label: '风速m/s' },
                { prop: 'wl', label: '风力', render: value => value ? `${value}级` : '/' },
            ],
            avgLabel: '月均风速',
            markerWindowField: [
                [
                    { prop: 'wsp', label: '风速' },
                ],
                [
                    { prop: 'wl', label: '风力' },
                ],
                [
                    { prop: 'wd', label: '风向', render: value => getWindDirection(value) },
                ],
            ]
        }
    },
    {
        url: '/app/rain',
        bizModule: 5,
        name: '降水测量管理',
        children: routeRainPath('/app/rain'),
        meta: {
            AQIName: 'CWQI',
            categoryName: '降水',
            categoryTitle: '雨量变化曲线',
            stasticsColumns: [
                { prop: 'cwqi', label: 'CWQI' },
                { prop: 'ph', label: 'PH' },
                { prop: 'd0', label: '溶解氧mg/L' },
                { prop: 'ec', label: '电导率μS/cm' },
                { prop: 'wt', label: '浊度NTU' },
                { prop: 'temp', label: '温度°C' },

            ],
            markerWindowField: [
                [
                    { prop: 'cwqi', label: 'CWQI' },
                    { prop: 'temp', label: '温度' },
                ],
                [
                    { prop: 'ph', label: 'PH' },
                ],
                [
                    { prop: 'd0', label: '溶解氧' },

                ],
                [
                    { prop: 'ec', label: '电导率' },
                ],
                [
                    { prop: 'wt', label: '浊度' },
                ]
            ]
        }
    },
    {
        url: '/app/ptu',
        bizModule: 4,
        name: 'PTU测量管理',
        children: routePtuPath('/app/ptu'),
        meta: {
            AQIName: 'CWQI',
            categoryName: 'PTU',
            categoryTitle: '土壤湿度变化曲线',
            stasticsColumns: [
                { prop: 'cwqi', label: 'CWQI' },
                { prop: 'ph', label: 'PH' },
                { prop: 'd0', label: '溶解氧mg/L' },
                { prop: 'ec', label: '电导率μS/cm' },
                { prop: 'wt', label: '浊度NTU' },
                { prop: 'temp', label: '温度°C' },

            ],
            markerWindowField: [
                [
                    { prop: 'cwqi', label: 'CWQI' },
                    { prop: 'temp', label: '温度' },
                ],
                [
                    { prop: 'ph', label: 'PH' },
                ],
                [
                    { prop: 'd0', label: '溶解氧' },

                ],
                [
                    { prop: 'ec', label: '电导率' },
                ],
                [
                    { prop: 'wt', label: '浊度' },
                ]
            ]
        }
    },
    {
        url: '/app/user',
        name: '用户与权限',
        bizModule: null,
        children: routeUserPath('/app/user')
    },
];

