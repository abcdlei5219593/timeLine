import $http from './interceptor';
import type { AxiosRequestConfig } from 'axios';

export default {
    '/app/airContent': {
        getDeviceData: (data: object) =>
            $http({
                url: '/admin/gas/analyse/getDeviceData',
                method: 'post',
                data,
                showLoading: true
            } as AxiosRequestConfig),

        getHotmapData: (data: object = {}) =>
            $http({
                url: '/admin/gas/analyse/getHotmapData',
                method: 'post',
                data,
                showLoading: true
            } as AxiosRequestConfig),

        getAQIHourAvgInMonth: (params: object = {}) =>
            $http({
                url: '/admin/gas/analyse/getAQIHourAvgInMonth',
                method: 'get',
                params,
                showLoading: true
            } as AxiosRequestConfig),


        getMonitorData: (data: object = {}) =>
            $http({
                url: '/admin/gas/analyse/getMonitorData',
                method: 'post',
                data,
                showLoading: true
            } as AxiosRequestConfig),

        getCurvesData: (data: object = {}) =>
            $http({
                url: '/admin/gas/analyse/getCurvesData',
                method: 'post',
                data,
                showLoading: true
            } as AxiosRequestConfig),

        getAllStationAnalyses: (data: object = {}) =>
            $http({
                url: '/admin/gas/analyse/getAllStationAnalyses',
                method: 'post',
                data,
                showLoading: true
            } as AxiosRequestConfig)

    },
    '/app/water': {
        getDeviceData: (data: object) =>
            $http({
                url: '/admin/water/analyse/getDeviceData',
                method: 'post',
                data,
                showLoading: true
            } as AxiosRequestConfig),

        getHotmapData: (data: object = {}) =>
            $http({
                url: '/admin/water/analyse/getHotmapData',
                method: 'post',
                data,
                showLoading: true
            } as AxiosRequestConfig),

        getAQIHourAvgInMonth: (params: object = {}) =>
            $http({
                url: '/admin/water/analyse/getCWQIHourAvgInMonth',
                method: 'get',
                params,
                showLoading: true
            } as AxiosRequestConfig),


        getMonitorData: (data: object = {}) =>
            $http({
                url: '/admin/water/analyse/getMonitorData',
                method: 'post',
                data,
                showLoading: true
            } as AxiosRequestConfig),

        getCurvesData: (data: object = {}) =>
            $http({
                url: '/admin/water/analyse/getCurvesData',
                method: 'post',
                data,
                showLoading: true
            } as AxiosRequestConfig),

        getAllStationAnalyses: (data: object = {}) =>
            $http({
                url: '/admin/water/analyse/getAllStationAnalyses',
                method: 'post',
                data,
                showLoading: true
            } as AxiosRequestConfig)

    },
    '/app/wind': {
        getDeviceData: (data: object) =>
            $http({
                url: '/admin/wind/analyse/getDeviceData',
                method: 'post',
                data,
                showLoading: true
            } as AxiosRequestConfig),

        getHotmapData: (data: object = {}) =>
            $http({
                url: '/admin/wind/analyse/getHotmapData',
                method: 'post',
                data,
                showLoading: true
            } as AxiosRequestConfig),

        getAQIHourAvgInMonth: (params: object = {}) =>
            $http({
                url: '/admin/wind/analyse/getAQIHourAvgInMonth',
                method: 'get',
                params,
                showLoading: true
            } as AxiosRequestConfig),


        getMonitorData: (data: object = {}) =>
            $http({
                url: '/admin/wind/analyse/getMonitorData',
                method: 'post',
                data,
                showLoading: true
            } as AxiosRequestConfig),

        getCurvesData: (data: object = {}) =>
            $http({
                url: '/admin/wind/analyse/getCurvesData',
                method: 'post',
                data,
                showLoading: true
            } as AxiosRequestConfig),

        getAllStationAnalyses: (data: object = {}) =>
            $http({
                url: '/admin/wind/analyse/getAllStationAnalyses',
                method: 'post',
                data,
                showLoading: true
            } as AxiosRequestConfig)

    },
    '/app/ptu': {
        getDeviceData: (data: object) =>
            $http({
                url: '/admin/ptu/analyse/getDeviceData',
                method: 'post',
                data,
                showLoading: true
            } as AxiosRequestConfig),

        getHotmapData: (data: object = {}) =>
            $http({
                url: '/admin/ptu/analyse/getHotmapData',
                method: 'post',
                data,
                showLoading: true
            } as AxiosRequestConfig),

        getAQIHourAvgInMonth: (params: object = {}) =>
            $http({
                url: '/admin/ptu/analyse/getAQIHourAvgInMonth',
                method: 'get',
                params,
                showLoading: true
            } as AxiosRequestConfig),


        getMonitorData: (data: object = {}) =>
            $http({
                url: '/admin/ptu/analyse/getMonitorData',
                method: 'post',
                data,
                showLoading: true
            } as AxiosRequestConfig),

        getCurvesData: (data: object = {}) =>
            $http({
                url: '/admin/ptu/analyse/getCurvesData',
                method: 'post',
                data,
                showLoading: true
            } as AxiosRequestConfig),

        getAllStationAnalyses: (data: object = {}) =>
            $http({
                url: '/admin/ptu/analyse/getAllStationAnalyses',
                method: 'post',
                data,
                showLoading: true
            } as AxiosRequestConfig)

    },
    '/app/rain': {
        getDeviceData: (data: object) =>
            $http({
                url: '/admin/rain/analyse/getDeviceData',
                method: 'post',
                data,
                showLoading: true
            } as AxiosRequestConfig),

        getHotmapData: (data: object = {}) =>
            $http({
                url: '/admin/rain/analyse/getHotmapData',
                method: 'post',
                data,
                showLoading: true
            } as AxiosRequestConfig),

        getAQIHourAvgInMonth: (params: object = {}) =>
            $http({
                url: '/admin/rain/analyse/getAQIHourAvgInMonth',
                method: 'get',
                params,
                showLoading: true
            } as AxiosRequestConfig),


        getMonitorData: (data: object = {}) =>
            $http({
                url: '/admin/rain/analyse/getMonitorData',
                method: 'post',
                data,
                showLoading: true
            } as AxiosRequestConfig),

        getCurvesData: (data: object = {}) =>
            $http({
                url: '/admin/rain/analyse/getCurvesData',
                method: 'post',
                data,
                showLoading: true
            } as AxiosRequestConfig),

        getAllStationAnalyses: (data: object = {}) =>
            $http({
                url: '/admin/rain/analyse/getAllStationAnalyses',
                method: 'post',
                data,
                showLoading: true
            } as AxiosRequestConfig)

    }
};

