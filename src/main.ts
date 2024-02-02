import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import App from './App.vue';
import 'reset-css';
import './styles/main.scss';
import './styles/iconfont/iconfont.css';
import './styles/common.scss';
import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { permission } from '@/directives/index';



const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);

app.directive('permission', permission);
app
    .use(router)
    .use(pinia)
 
    .use(ElementPlus)
    .mount('#app');

