import $http from './interceptor';

// 用户基本信息
export function basic(params = {}) {
    return $http.get('/userInfo/basic', params);
}

// 修改密码
export function changePassword(params = {}) {
    return $http({
        url: '/userInfo/changePassword',
        method: 'post',
        params
    });
}

// 编辑个人信息
export function editUserInfo(params = {}) {
    return $http({
        url: '/userInfo/editUserInfo',
        method: 'post',
        params
    });
}
