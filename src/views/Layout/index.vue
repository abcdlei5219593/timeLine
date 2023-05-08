<template>
    <ElContainer>
        <ElHeader>
            <ElContainer>
                <div class="logo fs-18 fw-600">
                    大气监测管理系统
                </div>
                <section>
                    <AppBar :menu-list="appList">
                    </AppBar>
                </section>
                <HeaderRight></HeaderRight>
            </ElContainer>
        </ElHeader>
        <ElContainer>
            <ElAside v-if="hasAside">
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
                <RouterView class="main-view">
                </RouterView>
            </ElMain>
        </ElContainer>
    </ElContainer>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch } from 'vue';
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
const hasAside = computed(() => route.path.startsWith('/app'));

const appList = computed(() => menuStore.menuList.map(({ url, name }) => ({ url, name })));

const routePath = computed(() => route.path);

const showBread = computed(() => !route.path.includes('/home'));

const layoutHeight = showBread.value ? '100% - 40px' : '100%';

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
        margin: 20px 0;
        height: 24px;
        line-height: 24px;
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

    .toggle-menu {
        position: absolute;
        bottom: 0;
        height: 56px;
        line-height: 56px;
        border-top: 1px solid #e7e7e7;
        width: 100%;
        color: #666666;
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
        margin-bottom: 4px;
        color: $asideColor;

        &.is-active {
            color: $mainColor;
            background: $asideActiveBackground;
        }
    }
}
</style>
