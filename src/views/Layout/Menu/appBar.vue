<template>
    <ul role="menubar" class="el-menu el-menu--horizontal">
        <li
            v-for="(item, index) in menuList"
            :key="index"
            :class="[route.path.includes(item.url) ? 'is-active' : '', 'el-menu-item']"
            role="menuitem"
            tabindex="0"
            @click="handleClick(item)"
        >
            {{ item.name }}
        </li>
    </ul>
</template>

<script setup lang="ts" name="AppBar">
import { Menu, MenuItem } from '../types/menu';
import { useRoute, useRouter } from 'vue-router';
import { storeMenu } from '@/store/app';
import { APP_LIST } from '@/config';

const route = useRoute();

const router = useRouter();
const props = defineProps<{
    menuList: Menu;
}>();

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
            //防止跳入页面访问权限里
            if (item.children[0].children.length > 0 && item.children[0].children[0].name.indexOf('页面访问') < 0) {
                url = item.children[0].children[0].url;
            } else {
                url = item.children[0].url;
            }
            router.push(url);
        }
    });
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
}
</style>
