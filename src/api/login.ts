import $http from './interceptor';

//登录 
export function login(params = {}) {
    return $http({
        url: '/login',
        method: 'post',
        params
    })
}