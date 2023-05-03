import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import App from './App.vue';
import 'reset-css';
import './styles/main.scss';
import './styles/iconfont/iconfont.css';
import './styles/common.scss';
import router from './router';
import VueAMap, { initAMapApiLoader } from '@vuemap/vue-amap';
import { AMAP_KEY, SECURITY_CODE } from './config';
import '@vuemap/vue-amap/dist/style.css';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import echarts from './echarts';


initAMapApiLoader({
    key: AMAP_KEY,
    securityJsCode: SECURITY_CODE, // 新版key需要配合安全密钥使用
});

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);
app.config.globalProperties.$echarts = echarts;
app
    .use(router)
    .use(pinia)
    .use(VueAMap)
    .use(ElementPlus)
    .mount('#app');

