import $http from './interceptor';
import type { AxiosRequestConfig } from 'axios';

// 登录
export const login = (params = {}) =>
    $http({
        url: '/login',
        method: 'post',
        params,
        showLoading: true
    } as AxiosRequestConfig);

export const getRoleList = (data: object | null = null) =>
    $http({
        url: '/module/listRoleModule',
        method: 'get',
        params: data,
        showLoading: true
    } as AxiosRequestConfig);

// 获取登录用户菜单权限
export const listUserModule = (params = {}) =>
    $http({
        url: '/module/listUserModule',
        method: 'post',
        params,
        showLoading: true
    } as AxiosRequestConfig);
