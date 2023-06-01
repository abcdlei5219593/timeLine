<template>
    <ElContainer>
        <ElHeader>
            <ElContainer>
                <div class="logo fs-18 fw-600">
                    <img class="logo-img" src="@/assets/login/header-logo.png" />
                    <!-- 智慧环境监测系统 -->
                    <div>
                        <p>长江工业园未来城市</p>
                        <p>智慧环境监测系统</p>
                    </div>
                </div>
                <section>
                    <AppBar :menu-list="appList"> </AppBar>
                </section>
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
                    :menu-list="currentAppMenu"
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
                <RouterView class="main-view"> </RouterView>
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

const route = useRoute();
const router = useRouter();
const store = useSettingStore();
const menuStore = useMenuStore();
console.log(route.path, 'route.pathroute.path');
const hasAside = computed(() => route.path.startsWith('/app') && route.path.indexOf('/personalCenter') === -1);

const appList = computed(() => menuStore.menuList.map(({ url, name }) => ({ url, name })));

const routePath = computed(() => route.path);

const showBread = computed(() => !route.path.includes('/home'));

const layoutHeight = computed(() => (showBread.value ? '100% - 40px' : '100%'));

// const isCollapse = ref(store.state.app.isCollapse);

const currentAppMenu = computed<MenuType | []>(() => {
    const target = menuStore.menuList.find(({ url }) => routePath.value.includes(url));
    return target ? target.children : [];
});

const getFistFullpath = (route: MenuItem) => {
    let temp = '';
    if (route.children && route.children.length) {
        temp = getFistFullpath(route.children[0]);
    } else {
        temp = route.url;
    }

    return temp;
};

watch(
    routePath,
    (path) => {
        const target = menuStore.menuList.find(({ url }) => url === path);
        if (target) {
            router.replace(getFistFullpath(target));
        }
    },
    {
        immediate: true,
    }
);

watch(
    () => store.currentApp,
    (app) => {
        if (app) {
            store.getMeasureListHandler({ bizModule: app.bizModule });
        }
    },
    {
        deep: true,
        immediate: true,
    }
);
</script>

<style scoped lang="scss">
.el-header {
    background-color: $mainColor;
    padding: 12px 24px;
    height: $headerHeight;

    .logo {
        background: $mainColor;
        flex-shrink: 0;
        height: $headerHeight;
        width: $asideWidth;
        text-align: center;
        color: rgba(255, 255, 255, 0.9);
        margin: 10px 0 10px 20px;
        height: 24px;
        line-height: 24px;
        display: flex;
        height: 44px;
        line-height: 22px;
        font-size: 18px;
        // text-align: left;

        .logo-img {
            width: 49px;
            height: 44px;
            margin-right: 12px;
        }
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
        background: #01022b;
        position: relative;

        &::before {
            content: '';
            display: block;
            background: url(@/assets/img/menu-bg.png) 100% 50% no-repeat;
            opacity: 0.12;
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 100%;
            background-size: cover;
            padding-bottom: 160px;
        }
    }

    .toggle-menu {
        position: absolute;
        bottom: 0;
        height: 56px;
        line-height: 56px;
        border-top: 1px solid #2a2b4d;
        width: 100%;
        color: #fff;
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
            color: $mainColor;
            background: $asideActiveBackground;
        }
    }

    :deep(.el-menu-item):hover,
    :deep(.el-sub-menu__title):hover {
        background: $asideActiveBackground;
        color: #2d8cf0;
    }

    :deep(.el-sub-menu .el-menu-item) {
        padding-left: 48px !important;
    }
}
</style>
