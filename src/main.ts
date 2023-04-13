import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import 'reset-css';
import './styles/main.scss';
import router from './router';

const pinia = createPinia();
const app = createApp(App);

app.use(router).use(pinia).mount('#app');

