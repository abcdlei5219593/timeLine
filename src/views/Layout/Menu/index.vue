<template>
    <ElMenu :default-active="defaultActive" v-bind="$attrs" :collapse="isCollapse">
        <template v-for="(node, index) in menuList" :key="index">
            <ElSubMenu v-if="node.children && node.children.length" :index="node.url">
                <template #title>
                    <i class="menu-icon" v-if="node.icon" :class="node.icon"></i>
                    <span class="menu-title">{{ node.name }}</span>
                </template>
                <ElMenuItem v-for="(sub, subIndex) in node.children" :key="subIndex" :index="sub.url">
                    {{ sub.name }}
                </ElMenuItem>
            </ElSubMenu>
            <ElMenuItem v-else :index="node.url">
                <i class="menu-icon" v-if="node.icon" :class="node.icon"></i>
                <span class="menu-title">{{ node.name }}</span>
            </ElMenuItem>
        </template>
    </ElMenu>
</template>

<script setup lang="ts" name="Menu">
import { ElMenu, ElMenuItem, ElSubMenu } from 'element-plus';
import { Menu } from '../types/menu';
import { useRoute } from 'vue-router';

const props = defineProps<{
    menuList: Menu;
    isCollapse: {
        type: Boolean;
        default: true;
    };
}>();

const route = useRoute();

const defaultActive = route.fullPath;
</script>

<style scoped lang="scss">
.menu-icon {
    font-size: 20px;
    margin-right: 8px;
}
.el-menu:not(.el-menu--collapse) {
    width: $asideWidth;
    min-height: 400px;
}
/*隐藏文字*/
.el-menu--collapse .menu-title {
    display: none;
}
</style>
