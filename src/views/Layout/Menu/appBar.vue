<template>
    <section role="menubar" class="el-menu el-menu--horizontal">
        <template v-if="showBgImage">
            <section class="left menu-item">
                <section v-for="(item, index) in leftMenu" :key="index" :class="[

                        item.bgImage ? ['bg-menu', item.bgImage] : ''
                    ]" role="menuitem" tabindex="0" @click="handleClick(item)">
                    <img :src="getAssetsFile(item.bgImage)" alt="">
                </section>
            </section>
            <section class="right menu-item">
                <section v-for="(item, index) in rightMenu" :key="index" :class="[
                        item.bgImage ? ['bg-menu', item.bgImage] : ''
                    ]" role="menuitem" tabindex="0" @click="handleClick(item)">
                    <img :src="getAssetsFile(item.bgImage)" alt="">
                </section>
                <section class="clock">
                    {{ clock }}
                </section>
            </section>
        </template>
        <template v-else>
            <section class="el-menu-item" @click="toScreen()">
                数据看板
            </section>
            <section v-for="(item, index) in menuList" :key="index" :class="[
                    route.path.includes(item.url) ? 'is-active' : '',
                    'el-menu-item'
                ]" role="menuitem" tabindex="0" @click="handleClick(item)">
                {{ item.name }}
            </section>
        </template>
    </section>
</template>

<script setup lang="ts" name="AppBar">
import dayjs from 'dayjs';
import { computed, ref, watch } from 'vue';
import { Menu, MenuItem } from '../types/menu';
import { useRoute, useRouter } from 'vue-router';
import { storeMenu } from '@/store/app';
import { APP_LIST } from '@/config';

const route = useRoute();

const router = useRouter();
const props = withDefaults(defineProps<{
    menuList: Menu;
    showBgImage: boolean
}>(), {
    menuList: [],
    showBgImage: false,
});



const leftMenu = computed(() => {
    if (props.showBgImage) {
        return props.menuList.slice(0, 4);
    }
    return [];
});

const rightMenu = computed(() => {
    if (props.showBgImage) {
        return props.menuList.slice(4);
    }
    return [];
});

const clock = ref(null);
let timer = null;
const getClock = () => {
    timer = setInterval(() => {
        clock.value = dayjs().format('YYYY-MM-DD HH:MM:ss');
    }, 1000);
};
if (props.showBgImage) {
    getClock();

}


const getAssetsFile = (url: string) => {
    return new URL(`../../../assets/img/${url}.png`, import.meta.url).href;
};

const handleClick = (menu: MenuItem) => {
    console.log(menu, 'menu');
    const store = storeMenu();
    const bizModule = APP_LIST.find((m) => {
        return m.url == menu.url;
    });
    console.log(bizModule.bizModule, 'bizModule.bizModule');
    store.getBizModule(bizModule.bizModule);

    let url = '';
    store.menuList.forEach((item: any) => {
        if (item.url === menu.url) {
            // 防止跳入页面访问权限里
            if (item.children[0].children.length > 0 && item.children[0].children[0].name.indexOf('页面访问') < 0) {
                url = item.children[0].children[0].url;
            } else {
                url = item.children[0].url;
            }
            router.push(url);
        }
    });
};

const toScreen = () => {
    router.push('/dashboard');
};
</script>

<style scoped lang="scss">
.el-menu {
    background-color: $mainColor;
    border: 0;
    padding: 12px 0;
    box-sizing: border-box;
    margin-left: 48px;

    .el-menu-item {
        color: rgba(255, 255, 255, 0.6);
        height: 40px;
        padding: 0 16px;

        &.is-active,
        &:hover {
            background-color: rgba(255, 255, 255, 0.2) !important;
            color: rgba(255, 255, 255, 0.9) !important;
            border-radius: 3px;
        }
    }

    .bg-menu {}
}
</style>
