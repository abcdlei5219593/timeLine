<template>
    <ul role="menubar" class="el-menu el-menu--horizontal">
        <li
            v-for="(item, index) in menuList"
            :key="index"
            :class="[route.path.includes(item.url) ? 'is-active' : '','el-menu-item']" role="menuitem" tabindex="0"
            @click="handleClick(item)"
        >
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
    router.push(menu.url);
};

</script>

<style scoped>

</style>
