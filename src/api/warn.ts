import $http from './interceptor';

// 获取大气告警列表
export function alarmList(params = {}) {
    return $http({
        url: '/admin/gas/alarm/query',
        method: 'post',
        params
    });
}

// 关闭大气告警
export function alarmClose(params = {}) {
    return $http({
        url: '/admin/gas/alarm/close',
        method: 'post',
        params
    });
}
