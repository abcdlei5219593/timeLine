import $http from './interceptor';

// 登录
export function login(params = {}) {
    return $http({
        url: '/login',
        method: 'post',
        params
    });
}

// 获取角色对应菜单
export function listRoleModule(params = {}) {
    return $http({
        url: '/module/listRoleModule',
        method: 'post',
        params
    });
}

// 获取登录用户菜单权限
export function listUserModule(params = {}) {
    return $http({
        url: '/module/listUserModule',
        method: 'post',
        params
    });
}
