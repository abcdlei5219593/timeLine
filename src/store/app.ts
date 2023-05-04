import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { User } from '../types/app';
import { useRoute } from 'vue-router';
import { APP_LIST } from '@/config';


export const useUserStore = defineStore({
    id: 'user',
    state() {
        return {
            userInfo: null,
        };
    },
    actions: {
        getUserInfo(userInfo) {
            this.userInfo = userInfo;
        },

    },

    // 添加如下配置
    persist: {
        // 开启持久化A
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
        return {
            menuList: [],
            buttonList: [],
            bizModule: 1,
        };
    },
    getters: {
        currentMenu: (state) => {

        }

    },
    actions: {
        getMenu(menuList, buttonList) {
            console.log(buttonList);
            this.menuList = menuList;
            this.buttonList = buttonList;
        },
        getBizModule(bizModule) {
            this.bizModule = bizModule
        }

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
            },
            {
                key: 'buttonList',// 给一个要保存的名称
                storage: sessionStorage,// sessionStorage / localStorage 存储方式
                paths: ['buttonList']
            },
            {
                key: 'bizModule',// 给一个要保存的名称
                storage: sessionStorage,// sessionStorage / localStorage 存储方式
                paths: ['bizModule']
            }
        ]
    }
});


