import { Menu } from './types/menu';


export const routeUserPath = (basePath: string): Menu =>
    [
        {
            url: basePath + '/userCenter',
            name: '用户中心',
            icon: 'iconfont icon-home',
            children: [
                {
                    url: basePath + '/userCenter/view',
                    name: '页面访问',
                },
                {
                    url: basePath + 'addUser',
                    name: '新增用户',
                    isButton: true,
                },
                {
                    url: basePath + 'editUser',
                    name: '编辑用户',
                    isButton: true,
                },
                {
                    url: basePath + 'changePassword',
                    name: '密码修改',
                    isButton: true,
                },
            ]
        },
        {
            url: basePath + '/auth',
            name: '权限管理',
            icon: 'iconfont icon-map',
            children: [
                {
                    url: basePath + '/auth/view',
                    name: '页面访问',
                },
                {
                    url: basePath + 'addRole',
                    name: '新增角色',
                    isButton: true,
                },
                {
                    url: basePath + 'editRole',
                    name: '编辑角色',
                    isButton: true,
                },
                {
                    url: basePath + 'authorized',
                    name: '授权',
                    isButton: true,
                },
            ]
        },
        {
            url: basePath + '/personalCenter',
            name: '个人中心',
            icon: 'iconfont icon-device',
            children: [
                {
                    url: basePath + '/personalCenter/view',
                    name: '页面访问',
                },
                {
                    url: basePath + 'editPersonMessage',
                    name: '编辑个人信息',
                    isButton: true,
                },
                {
                    url: basePath + 'changePersonalPassword',
                    name: '修改密码',
                    isButton: true,
                },
            ]
        }
    ];
