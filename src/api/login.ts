import $http from './interceptor';

// 登录
export function login(data = {}) {
    return $http({
        url: '/login',
        method: 'post',
        data
    });
}
