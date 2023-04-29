import $http from './interceptor';
import type { AxiosRequestConfig } from 'axios';

export const getRoleList = (data: object | null = null) =>
    $http({
        url: '/module/listRoleModule',
        method: 'get',
        params: data,
        showLoading: true
    } as AxiosRequestConfig);

// 数据字典
export const getDataDictionary = (dictType: string | number | null = null) =>
    $http({
        url: `/config/dict/get/${dictType}`,
        method: 'get',
        showLoading: true
    } as AxiosRequestConfig);


// 标记管理
export const operationLog = (data: object | null = null) =>
    $http({
        url: '/operationLog/listData',
        method: 'get',
        params: data,
        showLoading: true
    } as AxiosRequestConfig);
