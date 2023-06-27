import $http from './interceptor';
import type { AxiosRequestConfig } from 'axios';

//告警数据
export const getAlarmData = () =>
    $http({
        url: '/cim/env/alarm/getAlarmData',
        method: 'get',
    } as AxiosRequestConfig);

//环境告警记录
export const getLastestAlarms = () =>
    $http({
        url: '/cim/env/alarm/getLastestAlarms',
        method: 'get',
    } as AxiosRequestConfig);

//监测设备
export const getDeviceData = () =>
    $http({
        url: '/cim/env/device/getDeviceData',
        method: 'get',
    } as AxiosRequestConfig);

//大气-近12小时AQI
export const getAQIIn12Hours = () =>
    $http({
        url: '/cim/env/gas/getAQIIn12Hours',
        method: 'get',
    } as AxiosRequestConfig);

//大气-近12月AQI
export const getAQIIn12Months = () =>
    $http({
        url: '/cim/env/gas/getAQIIn12Months',
        method: 'get',
    } as AxiosRequestConfig);

//大气-近15日
export const getAQIIn15Days = () =>
    $http({
        url: '/cim/env/gas/getAQIIn15Days',
        method: 'get',
    } as AxiosRequestConfig);

//大气-质量数据
export const getRealData = () =>
    $http({
        url: '/cim/env/gas/getRealData',
        method: 'get',
    } as AxiosRequestConfig);

//大气-微站分布
export const stationData = () =>
    $http({
        url: '/cim/env/gas/stationData',
        method: 'get',
    } as AxiosRequestConfig);

//ptu测量
export const getPtuData = () =>
    $http({
        url: '/cim/env/ptu/getPtuData',
        method: 'get',
    } as AxiosRequestConfig);

//降雨-月降雨量
export const getPRCPEveryMonth = () =>
    $http({
        url: '/cim/env/rain/getPRCPEveryMonth',
        method: 'get',
    } as AxiosRequestConfig);

//水质
export const getWaterData = () =>
    $http({
        url: '/cim/env/water/getWaterData',
        method: 'get',
    } as AxiosRequestConfig);

//风测量
export const getWindData = () =>
    $http({
        url: '/cim/env/wind/getWindData',
        method: 'get',
    } as AxiosRequestConfig);

//查询所有设备
export const queryAll = () =>
    $http({
        url: '/admin/device/queryAll',
        method: 'get',
    } as AxiosRequestConfig);

//获取地图数据
export const getDeviceDataMap = (data: object) =>
    $http({
        url: '/admin/gas/analyse/getDeviceData',
        method: 'post',
        data,
    } as AxiosRequestConfig);