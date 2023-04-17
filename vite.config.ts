import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueSetupExtend from 'vite-plugin-vue-setup-extend';
import ElementPlus from 'unplugin-element-plus/vite';

export default defineConfig({
    base: './',
    plugins: [
        vue(), // 支持单文件方式  .vue
        vueJsx(), // 支持tsx方式  .tsx

        ElementPlus(),
        vueSetupExtend()
    ],
    resolve: {
        alias: {
            '@': '/src',
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                // dart sass 不允许使用 / 做为除号，需要使用 math 函数，所以按照以下方式引入 sass 的 math 模块使用
                additionalData: '@use "sass:math"; @import "@/styles/variables.scss";',
            },
        },
    },

});
