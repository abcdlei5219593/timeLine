import $http from './interceptor';
import type { AxiosRequestConfig } from 'axios';



export default {
    '/app/airContent': {
        get24AvgData: (data: object) =>
            $http({
                url: '/admin/gas/index/get24AvgData',
                method: 'get',
                params: data,
                showLoading: true
            } as AxiosRequestConfig),
        getAQI: (data: object) =>
            $http({
                url: '/admin/gas/index/getAQI',
                method: 'get',
                params: data,
                showLoading: true
            } as AxiosRequestConfig),
        getLastestAlarms: (data: object) =>
            $http({
                url: '/admin/gas/index/getLastestAlarms',
                method: 'get',
                params: data,
                showLoading: true
            } as AxiosRequestConfig)

    },
    '/app/water': {
        get24AvgData: (data: object) =>
            $http({
                url: '/admin/water/index/get24AvgData',
                method: 'get',
                params: data,
                showLoading: true
            } as AxiosRequestConfig),
        getAQI: (data: object) =>
            $http({
                url: '/admin/water/index/getCWQI',
                method: 'get',
                params: data,
                showLoading: true
            } as AxiosRequestConfig),
        getLastestAlarms: (data: object) =>
            $http({
                url: '/admin/water/index/getLastestAlarms',
                method: 'get',
                params: data,
                showLoading: true
            } as AxiosRequestConfig)

    }
};



