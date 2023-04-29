import $http from './interceptor';
import type { AxiosRequestConfig } from 'axios';

// 用户基本信息
export const basic = (data: object | null = null) =>
    $http({
        url: '/userInfo/basic',
        method: 'get',
        params: data,
        showLoading: true
    } as AxiosRequestConfig);

// 修改密码
export const changePassword = (data: object = {}) =>
    $http({
        url: '/userInfo/changePassword',
        method: 'post',
        data,
        showLoading: true
    } as AxiosRequestConfig);

// 编辑个人信息
export const editUserInfo = (data: object = {}) =>
    $http({
        url: '/userInfo/editUserInfo',
        method: 'post',
        data,
        showLoading: true
    } as AxiosRequestConfig);
