import { Menu } from './types/menu';


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
