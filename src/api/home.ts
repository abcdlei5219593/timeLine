import $http from './interceptor';
import type { AxiosRequestConfig } from 'axios';



export const get24AvgData = (data: object) =>
    $http({
        url: '/ckips/admin/gas/index/get24AvgData',
        method: 'get',
        params: data,
        showLoading: true
    } as AxiosRequestConfig);


