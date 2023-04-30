import $http from './interceptor';
import type { AxiosRequestConfig } from 'axios';

// 获取角色菜单
export const getRoleList = (data: object | null = null) =>
    $http({
        url: '/module/listRoleModule',
        method: 'post',
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


// 获取所有菜单
export const listAllModule = (data: object = {}) =>
    $http({
        url: '/module/listAllModule',
        method: 'post',
        data,
        showLoading: true
    } as AxiosRequestConfig);

// 获取登录用户菜单
export const listUserModule = (data: object = {}) =>
    $http({
        url: '/module/listUserModule',
        method: 'post',
        data,
        showLoading: true
    } as AxiosRequestConfig);
