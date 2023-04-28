import $http from './interceptor';

// 获取设备列表
export function deviceList(params = {}) {
    return $http.get('/admin/gas/device/query', params);
}

// 获取传感器列表
export function getSensors(params = {}) {
    return $http({
        url: '/admin/gas/device/getSensors',
        method: 'post',
        params
    });
}

