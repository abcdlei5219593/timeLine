import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { User } from '../types/app';

export const useUserStore = defineStore('user', () => {
    const userInfo = ref<User | null>();

    const getUserInfo = async () => {
        userInfo.value = {
            name: '雷鸣',
            id: 111
        };
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


