<template>
    <ul role="menubar" class="el-menu el-menu--horizontal">
        <li v-for="(item, index) in menuList" :key="index"
            :class="[route.path.includes(item.url) ? 'is-active' : '', 'el-menu-item']" role="menuitem" tabindex="0"
            @click="handleClick(item)">
            {{ item.name }}
        </li>
    </ul>
</template>

<script setup lang="ts" name="AppBar">
import { Menu, MenuItem } from '../types/menu';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();

const router = useRouter();
const props = defineProps<{
    menuList: Menu
}>();

const handleClick = (menu: MenuItem) => {
    console.log(menu.url, 'menu.urlmenu.url');
    router.push(menu.url);
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
        color: rgba(255, 255, 255, .6);
        height: 40px;
        padding: 0 16px;

        &.is-active,
        &:hover {
            background-color: rgba(255, 255, 255, .2);
            color: rgba(255, 255, 255, .9) !important;
            border-radius: 3px;
        }
    }
}
</style>
