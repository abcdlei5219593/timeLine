import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { User } from '../types/app';
import { useRoute } from 'vue-router';
import { APP_LIST } from '@/config';

export const useUserStore = defineStore('user', () => {
    const userInfo = ref<User | null>();

    const getUserInfo = async (val) => {
        userInfo.value = val;
    };
    return {
        userInfo,
        getUserInfo
    };
});



export const useSettingStore = defineStore('systemSetting', () => {
    const route = useRoute();
    const isCollapse = ref<boolean>(false);
    const mapCenter = [104.06, 30.59];
    const setCollapse = () => {
        isCollapse.value = !isCollapse.value;
    };
    const currentApp = APP_LIST.find(app => route.path.includes(app.url));
    return {
        isCollapse,
        setCollapse,
        mapCenter,
        currentApp
    };
});

export const storeMenu = defineStore('setting', () => {
    const menuLst = ref<any>([]);

    const getMenu = (val) => {
        menuLst.value = val;
    };
    return {
        menuLst,
        getMenu
    };
});


