import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { User } from '../types/app';
import { useRoute } from 'vue-router';
import { APP_LIST } from '@/config';


export const useUserStore = defineStore({
    id: 'user',
    state() {
        const userInfo = ref<User | null>();
        const getUserInfo = async (val: User) => {
            userInfo.value = val;
        };
        return {
            userInfo,
            getUserInfo
        };
    },
    // 添加如下配置
    persist: {
        // 开启持久化
        enabled: true,
        strategies: [
            {
                key: 'userInfo',// 给一个要保存的名称
                storage: sessionStorage,// sessionStorage / localStorage 存储方式
                paths: ['userInfo']
            }
        ]
    }
});



export const useSettingStore = defineStore('systemSetting', () => {
    const route = useRoute();
    const isCollapse = ref<boolean>(false);
    const mapCenter = [104.06, 30.59];
    const measureList = ref([]);
    const setCollapse = () => {
        isCollapse.value = !isCollapse.value;
    };
    // const getMeasureList = async () => {
    //     measureList.value = await getMeasureList();
    // };

    const currentApp = APP_LIST.find(app => route.path.includes(app.url));

    return {
        isCollapse,
        setCollapse,
        mapCenter,
        currentApp,
        // getMeasureList,
        measureList
    };
});

export const storeMenu = defineStore({
    id: 'menu',
    state() {
        const menuList: any = [];
        const getMenu = (val: any) => {
            menuList.value = val;
        };
        return {
            menuList,
            getMenu
        };
    },
    // 添加如下配置
    persist: {
        // 开启持久化
        enabled: true,
        strategies: [
            {
                key: 'menuList',// 给一个要保存的名称
                storage: sessionStorage,// sessionStorage / localStorage 存储方式
                paths: ['menuList']
            }
        ]
    }
});


