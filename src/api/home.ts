import $http from './interceptor';
import type { AxiosRequestConfig } from 'axios';



export const get24AvgData = (data: object) =>
    $http({
        url: '/admin/gas/index/get24AvgData',
        method: 'get',
        params: data,
        showLoading: true
    } as AxiosRequestConfig);

export const getAQI = (data: object | null = null) =>
    $http({
        url: '/admin/gas/index/getAQI    ',
        method: 'get',
        params: data,
        showLoading: true
    } as AxiosRequestConfig);

export const getLastestAlarms = (data: object | null = null) =>
    $http({
        url: '/admin/gas/index/getLastestAlarms',
        method: 'get',
        params: data,
        showLoading: true
    } as AxiosRequestConfig);

