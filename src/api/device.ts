import $http from './interceptor';
import type { AxiosRequestConfig } from 'axios';



export const getStations = (data: object) =>
    $http({
        url: '/admin/gas/common/getStations',
        method: 'post',
        data,
        showLoading: true
    } as AxiosRequestConfig);


export const getDeviceData = (data: object) =>
    $http({
        url: '/admin/gas/analyse/getDeviceData',
        method: 'post',
        data,
        showLoading: true
    } as AxiosRequestConfig);
export const getDeviceList = (data: object = {}) =>
    $http({
        url: '/admin/gas/device/query',
        method: 'get',
        params: data,
        showLoading: true
    } as AxiosRequestConfig);

