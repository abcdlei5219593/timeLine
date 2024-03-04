<template>
    <ElMenu :default-active="defaultActive" v-bind="$attrs">
        <template v-for="(node, index) in menuStore.menuList" :key="index">
            <!--noSubMenu 是有详情的单个菜单,node.name !== '设备管理'"原本为!node.noSubMenu,就只有设备管理才有，先写死-->
            <ElSubMenu
                v-if="
                    node.children &&
                        node.children.length
                "
                :index="node.path"
            >
                <template #title>
                    <i v-if="node.meta.icon"  class="menu-icon" :class="node.meta.icon" />
                    <span class="menu-title">{{ node.meta.title }}</span>
                </template>
                <ElMenuItem v-for="(sub, subIndex) in node.children" :key="subIndex" :index="sub.path">
                    {{ sub.meta.title }}
                </ElMenuItem>
            </ElSubMenu>
            <ElMenuItem v-else :index="node.path">
                <i v-if="node.meta.icon"  class="menu-icon" :class="node.meta.icon" />
                <template #title>
                    <span class="menu-title">{{ node.meta.title }}</span>
                </template>
            </ElMenuItem>
        </template>
    </ElMenu>
</template>

<script setup lang="ts" name="Menu">
import { ElMenu, ElMenuItem, ElSubMenu } from 'element-plus';
import { Menu } from '../types/menu';
import { useRoute } from 'vue-router';
import { useMenuStore, useUserStore } from '@/store/app';

const menuStore = useMenuStore();
console.log(menuStore)
const route = useRoute();

const defaultActive = route.fullPath;


const getMenuIcon = (icon: any) => {
    return new URL(`../../../assets/${icon}.png`, import.meta.url).href;
};
</script>

<style scoped lang="scss">
.is-active,:deep(.el-menu-item):hover {
    .menu-icon {
        &.data {
            background-image: url(../../../assets/data_active.png);
        }
        &.road {
            background-image: url(../../../assets/road_active.png);
        }

        &.project {
            background-image: url(../../../assets/project_active.png);
        }
    }
}
.menu-icon {
    width: 20px;
    height: 20px;
    background-size: 100% 100%;
    &.data {
        background-image: url(../../../assets/data.png);
    }
    &.road {
        background-image: url(../../../assets/road.png);
    }
    &.system {
        background-image: url(../../../assets/system.png);
    }
    &.project {
        background-image: url(../../../assets/project.png);
    }
}
.menu-title {
    color:#1B1B1E;
    padding-left: 8px;
}
// :deep(.el-menu-item) {
//     padding-left: 16px !important;
// }
.el-menu{
    background: #fff url('@/assets/aside.png') no-repeat left bottom/100%;

}
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
