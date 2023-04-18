import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import 'reset-css';
import './styles/main.scss';
import router from './router';
import VueAMap, {initAMapApiLoader} from '@vuemap/vue-amap';
import { AMAP_KEY } from './config';
import '@vuemap/vue-amap/dist/style.css';


initAMapApiLoader({
    key: AMAP_KEY,
    securityJsCode: 'securityJsCode', // 新版key需要配合安全密钥使用
    // Loca:{
    //  version: '2.0.0'
    // } // 如果需要使用loca组件库，需要加载Loca
});
const pinia = createPinia();
const app = createApp(App);

app
    .use(router)
    .use(pinia)
    .use(VueAMap)
    .mount('#app');

