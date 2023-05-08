<template>
    <ElMenu :default-active="defaultActive" v-bind="$attrs">
        <template v-for="(node, index) in menuList" :key="index">
            <!--noSubMenu 是有详情的单个菜单,node.name !== '设备管理'"原本为!node.noSubMenu,就只有设备管理才有，先写死-->
            <ElSubMenu v-if="node.children && node.children.length && node.name !== '设备管理'" :index="node.url">
                <template #title>
                    <i v-if="node.icon" class="menu-icon" :class="node.icon"></i>
                    <span class="menu-title">{{ node.name }}</span>
                </template>
                <ElMenuItem v-for="(sub, subIndex) in node.children" :key="subIndex" :index="sub.url">
                    {{ sub.name }}
                </ElMenuItem>
            </ElSubMenu>
            <ElMenuItem v-else :index="node.url">
                <i v-if="node.icon" class="menu-icon" :class="node.icon"></i>
                <template #title>
                    <span class="menu-title">{{ node.name }}</span>
                </template>
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
}>();

const route = useRoute();

const defaultActive = route.fullPath;
</script>

<style scoped lang="scss">
.menu-icon {
    font-size: 20px;
    // margin-right: 8px;
}
.menu-title {
    padding-left: 8px;
}
// :deep(.el-menu-item) {
//     padding-left: 16px !important;
// }
:deep(.el-menu-item .el-menu-tooltip__trigger) {
    justify-content: center;
}
:deep(.el-tooltip__trigger) {
    padding-right: 10px;
    justify-content: center;
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
