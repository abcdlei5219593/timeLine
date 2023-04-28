import $http from './interceptor';

// 获取设备列表
export function deviceList(params = {}) {
    return $http.get('/admin/gas/device/query', params);
}
