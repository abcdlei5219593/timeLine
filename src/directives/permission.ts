import { useSettingStore, storeMenu } from '@/store/app';

export default {
    mounted(el, binding, vnode, prevVnode) {

        const store = useSettingStore();
        const menuStore = storeMenu();
        const currentApp = store.currentApp;
        const key = binding.value;
        if (!menuStore.buttonList.some(item => item.url === `${currentApp.url}${key}`)) {
            el.parentNode && el.parentNode.removeChild(el);
        }
    }
};
