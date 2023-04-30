import $http from './interceptor';
import type { AxiosRequestConfig } from 'axios';



export const getStations = (data: object) =>
    $http({
        url: '/admin/common/getStations',
        method: 'post',
        params: data,
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
        url: '/admin/device/query',
        method: 'get',
        params: data,
        showLoading: true
    } as AxiosRequestConfig);

// 获取传感器列表
export const getSensors = (data: object = {}) =>
    $http({
        url: '/admin/device/getSensors',
        method: 'post',
        params: data,
        showLoading: true
    } as AxiosRequestConfig);

// 设置阈值
export const deviceSet = (data: object = {}) =>
    $http({
        url: '/admin/device/set',
        method: 'post',
        data,
        showLoading: true
    } as AxiosRequestConfig);

// 新增设备
export const deviceAdd = (data: object = {}) =>
    $http({
        url: '/admin/device/add',
        method: 'post',
        data,
        showLoading: true
    } as AxiosRequestConfig);
