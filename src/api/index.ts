import $http from './interceptor';
import type { AxiosRequestConfig } from 'axios';



export const getLoginCode = (params) =>
    $http({
        url: '/ips/image/code',
        method: 'get',
        params
    } as AxiosRequestConfig);

export const addUser = (data) =>
    $http({
        url: '/ips/user/add',
        method: 'post',
        data
    } as AxiosRequestConfig);



export const delUser = (params) =>
    $http({
        url: '/ips/user/delete',
        method: 'post',
        params
    } as AxiosRequestConfig);
export const editUser = (data) =>
    $http({
        url: '/ips/user/edit',
        method: 'post',
        data
    } as AxiosRequestConfig);


export const userList = (data) =>
    $http({
        url: '/ips/user/listData',
        method: 'post',
        data
    } as AxiosRequestConfig);

export const addRole = (data) =>
    $http({
        url: '/ips/role/add',
        method: 'post',
        data
    } as AxiosRequestConfig);



export const delRole = (params) =>
    $http({
        url: '/ips/role/delete',
        method: 'post',
        params
    } as AxiosRequestConfig);
export const editRole = (data) =>
    $http({
        url: '/ips/role/edit',
        method: 'post',
        data
    } as AxiosRequestConfig);


export const roleList = (data) =>
    $http({
        url: '/ips/role/listData',
        method: 'post',
        data
    } as AxiosRequestConfig);


export const addDict = (data) =>
    $http({
        url: '/ips/dict/add',
        method: 'post',
        data
    } as AxiosRequestConfig);


export const delDict = (params) =>
    $http({
        url: '/ips/dict/delete',
        method: 'post',
        params
    } as AxiosRequestConfig);
export const editDict = (data) =>
    $http({
        url: '/ips/dict/edit',
        method: 'post',
        data
    } as AxiosRequestConfig);


export const dictList = (data) =>
    $http({
        url: '/ips/dict/listPage',
        method: 'post',
        data
    } as AxiosRequestConfig);


export const getDictByType = (params: { dictType: string }) =>
    $http({
        url: 'ips/dict/getByType',
        method: 'get',
        params,
    }) as unknown;


export const getDitByCode = (params: { dictType: string }) =>
    $http({
        url: 'ips/dict/getByCode',
        method: 'post',
        params,
    }) as unknown;

export const listModuleByRoleId = (params: { dictType: string }) =>
    $http({
        url: 'ips/role/listModuleByRoleId',
        method: 'post',
        params,
    }) as unknown;

export const listAllModule = (params: { dictType: string }) =>
    $http({
        url: 'ips/module/listAllModule',
        method: 'post',
        params,
    }) as unknown;
export const login = (data: { dictType: string }) =>
    $http({
        url: 'ips/login',
        method: 'post',
        data,
    }) as unknown;



