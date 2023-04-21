<template>
    <ElContainer>
        <ElHeader>
            <ElContainer>
                <div class="logo fs-18 fw-600">大气监测管理系统</div>
                <section>
                    <AppBar :menu-list="appList" @select="changeApp"> </AppBar>
                </section>
                <HerderRight></HerderRight>
            </ElContainer>
        </ElHeader>
        <ElContainer>
            <ElAside v-if="hasAside">
                <Menu
                    class="app-menu"
                    :router="true"
                    mode="vertical"
                    :menu-list="currentAppMenu"
                    :collapse="isCollapse"
                >
                </Menu>
                <div class="toggle-menu" @click="setCollapse">
                    <i class="iconfont icon-putaway" v-if="!isCollapse"></i>
                    <i class="iconfont icon-expand" v-else></i>
                    <span v-if="!isCollapse">收起导航</span>
                </div>
            </ElAside>
            <ElMain>
                <RouterView> </RouterView>
            </ElMain>
        </ElContainer>
    </ElContainer>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch } from 'vue';
import { ElContainer, ElHeader, ElAside, ElMain } from 'element-plus';
import Menu from './Menu/index.vue';
import AppBar from './Menu/appBar.vue';
import HerderRight from './HerderRight/index.vue';
import { APP_LIST } from '@/config';
import { Menu as MenuType, MenuItem } from './types/menu';
import { useRoute, useRouter } from 'vue-router';
import store from '@/store/index.ts';

const route = useRoute();
const router = useRouter();
const hasAside = computed(() => route.path.startsWith('/app'));

const appList = APP_LIST.map(({ url, name }) => ({ url, name }));

const changeApp = (path: string) => {
    const target = APP_LIST.find(({ url }) => url === path);
};

const routePath = computed(() => route.path);

const isCollapse = ref(store.state.app.isCollapse);

const currentAppMenu = computed<MenuType | []>(() => {
    const target = APP_LIST.find(({ url }) => routePath.value.includes(url));
    return target ? target.children : [];
});

const getFistFullpath = (route: MenuItem) => {
    let temp = '';
    if (route.children) {
        temp = getFistFullpath(route.children[0]);
    } else {
        temp = route.url;
    }
    return temp;
};

const setCollapse = () => {
    isCollapse.value = !isCollapse.value;
    store.commit('app/SET_COLLAPSE', isCollapse.value);
};

watch(
    routePath,
    (path) => {
        const target = APP_LIST.find(({ url }) => url === path);
        if (target) {
            router.replace(getFistFullpath(target));
        }
    },
    {
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
    padding: 20px;
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

        .icon-putaway,
        .icon-expand {
            font-size: 24px;
            margin: 0 10px 0 26px;
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
