import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import 'reset-css';
import './styles/main.scss';
import './styles/iconfont.scss';
import './styles/common.scss';
import store from './store';
import router from './router';
import VueAMap, { initAMapApiLoader } from '@vuemap/vue-amap';
import { AMAP_KEY, SECURITY_CODE } from './config';
import '@vuemap/vue-amap/dist/style.css';


initAMapApiLoader({
    key: AMAP_KEY,
    securityJsCode: SECURITY_CODE, // 新版key需要配合安全密钥使用
});

const pinia = createPinia();
const app = createApp(App);

app
    .use(router)
    .use(store)
    .use(pinia)
    .use(VueAMap)
    .mount('#app');

