import { Menu } from './types/menu';

export const routePtuPath = (basePath: string): Menu =>
    [
        {
            url: basePath + '/home',
            name: '首页',
            icon: 'iconfont icon-shouye',
        },
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
                    url: basePath + '/warn/ptuWarn',
                    name: 'PTU告警',
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
