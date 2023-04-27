import axios from 'axios';
import { ElMessage, ElLoading } from 'element-plus';
import Cookie from 'js-cookie';
import qs from 'qs';

type LoadingInstance = {
    close: () => void
} | null
let loadingInstance: LoadingInstance = null;


console.log(import.meta.env);
// 创建axios实例
const $http = axios.create({
    // 请求的域名，基本地址，proxy 代理时会将“/api”以及前置字符串会被替换为真正域名
    baseURL: import.meta.env.VITE_URL + '/ckips',
    // 跨域请求时发送Cookie
    // withCredentials: true, // 视情况而定
    // 超时时间
    timeout: 5000,
    headers: {
        'content-type': 'application/json; charset=utf-8'
    },
    paramsSerializer: params => qs.stringify(params, { arrayFormat: 'comma' })
});

// 请求拦截器
$http.interceptors.request.use((config) => {
    config.headers = config.headers || {};
    const token = Cookie.get('token') || '';
    if (token) {
        config.headers.token = token;
    }
    if (config.showLoading) {
        loadingInstance = ElLoading.service({
            lock: true,
            text: '数据加载中...',
        });
    }
    return config;
});

// 响应拦截器
$http.interceptors.response.use((response) => {
    if(loadingInstance) {

        loadingInstance.close();
        loadingInstance = null;
    }
    if(+response.data.code === 0) {
        return response.data.data;
    }
    ElMessage.error(response.data.msg);
    return Promise.reject();


}, (error) => {
    console.log(import.meta.env);
    if (error.response) {

        switch (error.response.status) {
            case 401:
                ElMessage.warning('资源没有访问权限！');
                break;
            case 404:
                ElMessage.warning('接口不存在，请检查接口地址是否正确！');
                break;
            case 500:
                ElMessage.warning('内部服务器错误，请联系系统管理员！');
                break;
            default:
                return Promise.reject(error.response.data); // 返回接口返回的错误信息
        }
    } else {
        ElMessage.error('遇到跨域错误，请设置代理或者修改后端允许跨域访问！');
    }
    if(loadingInstance) {
        loadingInstance.close();
        loadingInstance = null;
    }
});



export default $http;
