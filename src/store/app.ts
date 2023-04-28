import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { User } from '../types/app';

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


export const useSettingStore = defineStore('setting', () => {
    const isCollapse = ref<boolean>(false);

    const setCollapse = () => {
        isCollapse.value = !isCollapse.value;
    };
    return {
        isCollapse,
        setCollapse
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


