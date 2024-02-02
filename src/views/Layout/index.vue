<template>
    <ElContainer>
        <ElHeader>
            <ElContainer>
                <div class="logo fs-18 fw-600">
                    <img style="margin-left:20px;width: 178px;height:30px;" class="logo-img" src="@/assets/logo.png" />
                </div>

                <HeaderRight></HeaderRight>
            </ElContainer>
        </ElHeader>
        <ElContainer>
            <ElAside v-if="hasAside">
                <!-- <img class="menu-bg" src="@/assets/img/menu-bg.png"> -->
                <Menu
                    class="app-menu"
                    :router="true"
                    mode="vertical"
                    :menu-list="menuList"
                    :collapse="store.isCollapse"
                >
                </Menu>
                <div class="toggle-menu" @click="store.setCollapse">
                    <i v-if="!store.isCollapse" class="iconfont icon-shouqidaohang"></i>
                    <i v-else class="iconfont icon-zhankaidaohang"></i>
                    <span v-if="!store.isCollapse">收起导航</span>
                </div>
            </ElAside>
            <ElMain>
                <Breadcrumb v-if="showBread" />
                <RouterView class="main-view">
                </RouterView>
            </ElMain>
        </ElContainer>
    </ElContainer>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { ElContainer, ElHeader, ElAside, ElMain } from 'element-plus';
import Menu from './Menu/index.vue';
import AppBar from './Menu/appBar.vue';
import HeaderRight from './HeaderRight/index.vue';
import Breadcrumb from './Breadcrumb/index.vue';
import { APP_LIST } from '@/config';
import { Menu as MenuType, MenuItem } from './types/menu';
import { useRoute, useRouter } from 'vue-router';
import { useSettingStore, storeMenu as useMenuStore } from '@/store/app';
import { routes } from '@/router/index';

const route = useRoute();
const router = useRouter();
const store = useSettingStore();
const menuStore = useMenuStore();

const hasAside = true; // computed(() => route.path.startsWith('/app') && route.path.indexOf('/personalCenter') === -1);


const routePath = computed(() => route.path);

const showBread = computed(() => !route.path.includes('/home'));

const layoutHeight = computed(() => showBread.value ? '100% - 40px' : '100%');

// const isCollapse = ref(store.state.app.isCollapse);

const menuList = routes.find(item => item.meta?.auth)?.children;

// const getFistFullpath = (route: MenuItem) => {
//     let temp = '';
//     if (route.children && route.children.length) {
//         temp = getFistFullpath(route.children[0]);
//     } else {
//         temp = route.url;
//     }

//     return temp;
// };


</script>

<style scoped lang="scss">
.el-header {
    background: url(../../assets/top_bg.png) no-repeat 0 0;
    background-size: 100% 100%;
    padding: 12px 24px;
    height: $headerHeight;

    .logo {

        display: flex;
        align-items: center;

    }

    padding: 0;

    .header-right {
        flex: 1;
    }
}

.el-aside,
.el-main {
    min-height: calc(100vh - $headerHeight);
    overflow: hidden;
}

.el-main {
    background-color: $contentBackgroundColor;
    box-sizing: border-box;
    padding: 0 $containerSpace $containerSpace $containerSpace;

    .main-view {
        box-sizing: border-box;
        height: calc(v-bind(layoutHeight));
        // overflow-y: auto;
    }
}

.el-aside {
    position: relative;
    width: inherit !important;

    .menu-bg {
        position: absolute;
        width: 100%;
        opacity: 0.88;
        left: 0;
        top: 0;
    }

    :deep(.el-sub-menu .el-menu) {
        background: transparent;
    }

    .el-menu {
        color:#1B1B1E !important;
        position: relative;


    }

    .toggle-menu {
        position: absolute;
        bottom: 0;
        height: 56px;
        line-height: 56px;
        border-top: 1px solid #E4E5EA;
        width: 100%;
        color: #1B1B1E;
        display: flex;
        cursor: pointer;
        font-size: 14px;

        .icon-shouqidaohang,
        .icon-zhankaidaohang {
            font-size: 20px;
            margin: 0 8px 0 22px;
            display: block;
        }
    }

    &.is-collapse {
        width: $asideCollapseWidth;
    }
}

.app-menu {
    flex: 1;
    height: 100%;
    border-right: 0;
    padding-top: 8px;
    overflow-y: auto;

    :deep(.el-menu-item),
    :deep(.el-sub-menu__title) {
        height: 36px;
        margin-bottom: 4px !important;
        color: $asideColor;
        &.is-active {
            background: #ECF0FD;
            .menu-title {
                color: #4371EE;
            }

        }
    }

    :deep(.el-menu-item):hover,
    :deep(.el-sub-menu__title):hover {
        background: #ECF0FD;
        .menu-title {
            color: #4371EE;
        }
    }

    :deep(.el-sub-menu .el-menu-item) {
        padding-left: 48px !important;
    }
}
</style>
