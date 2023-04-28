import $http from './interceptor';
import type { AxiosRequestConfig } from 'axios';



export const getDeviceData = (data: object) =>
    $http({
        url: '/admin/gas/analyse/getDeviceData',
        method: 'post',
        data,
        showLoading: true
    } as AxiosRequestConfig);

export const getHotmapData = (data: object = {}) =>
    $http({
        url: '/admin/gas/analyse/getHotmapData',
        method: 'post',
        data,
        showLoading: true
    } as AxiosRequestConfig);


