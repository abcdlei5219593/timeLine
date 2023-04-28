import $http from './interceptor';
import type { AxiosRequestConfig } from 'axios';

export const getRoleList = (data: object | null = null) =>
    $http({
        url: '/module/listRoleModule',
        method: 'get',
        params: data,
        showLoading: true
    } as AxiosRequestConfig);
