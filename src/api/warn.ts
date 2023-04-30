import $http from './interceptor';
import type { AxiosRequestConfig } from 'axios';

// 获取大气告警列表
export const alarmList = (data: object = {}) =>
    $http({
        url: '/admin/alarm/query',
        method: 'post',
        data,
        showLoading: true
    } as AxiosRequestConfig);

// 关闭大气告警
export const alarmClose = (data: object = {}) =>
    $http({
        url: '/admin/alarm/close',
        method: 'post',
        data,
        showLoading: true
    } as AxiosRequestConfig);
