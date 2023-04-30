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

// 获取用户列表
export const userList = (data: object = {}) =>
    $http({
        url: '/user/listData',
        method: 'post',
        data,
        showLoading: true
    } as AxiosRequestConfig);

// 创建用户
export const userAdd = (data: object = {}) =>
    $http({
        url: '/user/add',
        method: 'post',
        params: data,
        showLoading: true
    } as AxiosRequestConfig);

// 修改用户
export const userEdit = (data: object = {}) =>
    $http({
        url: '/user/edit',
        method: 'post',
        params: data,
        showLoading: true
    } as AxiosRequestConfig);

// 删除用户
export const userDelete = (data: object = {}) =>
    $http({
        url: '/user/delete',
        method: 'post',
        data,
        showLoading: true
    } as AxiosRequestConfig);

// 获取角色列表
export const roleList = (data: object = {}) =>
    $http({
        url: '/role/listData',
        method: 'post',
        data,
        showLoading: true
    } as AxiosRequestConfig);

// 添加角色
export const roleAdd = (data: object = {}) =>
    $http({
        url: '/role/add',
        method: 'post',
        params: data,
        showLoading: true
    } as AxiosRequestConfig);

// 修改角色
export const roleEdit = (data: object = {}) =>
    $http({
        url: '/role/edit',
        method: 'post',
        params: data,
        showLoading: true
    } as AxiosRequestConfig);

// 删除角色
export const roleDelete = (data: object = {}) =>
    $http({
        url: '/role/delete',
        method: 'post',
        data,
        showLoading: true
    } as AxiosRequestConfig);

// 获取角色拥有的权限和id
export const listModuleNamesByRoleId = (data: object = {}) =>
    $http({
        url: '/role/listModuleNamesByRoleId',
        method: 'post',
        data,
        showLoading: true
    } as AxiosRequestConfig);

// 获取角色下拉
export const listRoleSelect = (data: object = {}) =>
    $http({
        url: '/role/listRoleSelect',
        method: 'post',
        data,
        showLoading: true
    } as AxiosRequestConfig);

// 重置用户密码
export const resetPassword = (data: object = {}) =>
    $http({
        url: '/user/resetPassword',
        method: 'post',
        params: data,
        showLoading: true
    } as AxiosRequestConfig);
