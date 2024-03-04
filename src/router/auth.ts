export default [
    {
        id: 777711,
        label: '管理平台',
        children: [
            {
                id: 111,
                label: '项目管理',
                children: [
                    {
                        id: 1,
                        path: '/workbench/project',
                        label: '页面访问',
                    },
                    {
                        id: 2,
                        path: 'addProject',
                        label: '创建项目'
                    },
                    {
                        id: 3,
                        path: 'editProject',
                        label: '编辑项目'
                    },
                    {
                        id: 4,
                        path: 'editProjectMember',
                        label: '成员管理'
                    },
                ]

            },
            {
                id: 222 ,
                label: '道路管理',
                children: [
                    {
                        id: 5,
                        path: '/workbench/road',
                        label: '页面访问'
                    },
                    {
                        id: 6,
                        path: 'importRoadCad',
                        label: '导入CAD'
                    },
                    {
                        id: 7,
                        path: 'exportRoadCad',
                        label: '导出CAD'
                    },
                    {
                        id: 8,
                        path: 'importRoadData',
                        label: '导入数据'
                    },
                    {
                        id: 9,
                        path: 'exportRoadData',
                        label: '导出数据'
                    },
                    {
                        id: 10,
                        path: 'createRoute',
                        label: '创建道路'
                    },
                ]
            },
            {
                id: 333,
                label: '管网数据',
                children: [
                    {
                        id: 11,
                        path: '/workbench/road',
                        label: '页面访问'
                    },
                    {
                        id: 12111,
                        label: '管井数据',
                        children: [
                            {
                                id: 12,
                                label: '管井数据-标签页'
                            },
                            {
                                id: 13,
                                label: '提交审核'
                            },
                            {
                                id: 14,
                                label: '打回给测绘'
                            },
                            {
                                id: 15,
                                label: '审核通过'
                            },
                            {
                                id: 16,
                                label: '发起检测'
                            },
                            {
                                id: 17,
                                label: '发起清淤'
                            },
                            {
                                id: 18,
                                label: '复核完成'
                            },
                            {
                                id: 19,
                                label: '导出数据'
                            },
                            {
                                id: 20,
                                label: '测绘导入'
                            },
                            {
                                id: 21,
                                label: '标记为完成'
                            },
                            {
                                id: 22,
                                label: '写批注'
                            },
                            {
                                id: 23,
                                label: '详情'
                            },
                            {
                                id: 24,
                                label: '检测数据'
                            },
                            {
                                id: 25,
                                label: '编辑'
                            },

                        ]
                    },
                    {
                        id: 271111,
                        label: '管线数据',
                        children: [
                            {
                                id: 27,
                                label: '管线数据-标签页'
                            },
                            {
                                id: 28,
                                label: '提交审核'
                            },
                            {
                                id: 29,
                                label: '打回给测绘'
                            },
                            {
                                id: 30,
                                label: '审核通过'
                            },
                            {
                                id: 31,
                                label: '发起检测'
                            },
                            {
                                id: 32,
                                label: '发起清淤'
                            },
                            {
                                id: 33,
                                label: '复核完成'
                            },
                            {
                                id: 34,
                                label: '导出数据'
                            },
                            {
                                id: 35,
                                label: '测绘导入'
                            },
                            {
                                id: 36,
                                label: '标记为完成'
                            },
                            {
                                id: 37,
                                label: '写批注'
                            },
                            {
                                id: 38,
                                label: '详情'
                            },
                            {
                                id: 39,
                                label: '检测数据'
                            },
                            {
                                id: 40,
                                label: '编辑'
                            },

                        ]
                    }
                ]
            },
            {
                label: '系统设置',
                id: 555,
                children: [

                    {
                        id: 444,
                        label: '用户中心',
                        children: [
                            {
                                id: 42,
                                path: '/workbench/system/user',
                                label: '页面访问',

                            },
                            {
                                id: 43,
                                label: '添加'
                            },
                            {
                                id: 44,
                                label: '编辑'
                            },
                            {
                                id: 45,
                                label: '删除'
                            }
                        ]
                    },
                    {
                        id: 5555,
                        label: '角色管理',
                        children: [
                            {
                                id: 46,
                                path: '/workbench/system/role',
                                label: '页面访问',

                            },
                            {
                                id: 47,
                                label: '添加'
                            },
                            {
                                id: 48,
                                label: '编辑'
                            },
                            {
                                id: 49,
                                label: '删除'
                            }
                        ]

                    },
                    {
                        id: 6666,
                        label: '字典管理',
                        children: [
                            {
                                id: 50,
                                path: '/workbench/system/dic',
                                label: '页面访问',

                            },
                            {
                                id: 51,
                                label: '添加'
                            },
                            {
                                id: 52,
                                label: '编辑'
                            },
                            {
                                id: 53,
                                label: '删除'
                            }
                        ]

                    },
                ]

            }
        ]
    },
    {
        id: 777711222,
        label: 'APP',
        children: [
            {
                id: 900,
                label: '检测工单'
            },
            {
                id: 900,
                label: '清淤工单'
            }
        ]
    }
];
