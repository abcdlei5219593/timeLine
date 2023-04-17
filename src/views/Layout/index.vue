<template>
    <ElContainer>
        <ElHeader>
            <ElContainer>
                <div class="logo"></div>
                <section class="header-right">
                    <AppBar :menu-list="appList" @select="changeApp">
                    </AppBar>
                </section>
            </ElContainer>
        </ElHeader>
        <ElContainer>
            <ElAside v-if="hasAside">
                <Menu class="app-menu" :router="true" mode="vertical" :menu-list="currentAppMenu">
                </Menu>
            </ElAside>
            <ElMain>
                <RouterView>
                </RouterView>
            </ElMain>
        </ElContainer>
    </ElContainer>
</template>

<script setup lang="ts">

import { ref, reactive, computed, onMounted, watch } from 'vue';
import { ElContainer,ElHeader, ElAside, ElMain } from 'element-plus';
import Menu from './Menu/index.vue';
import AppBar from './Menu/appBar.vue';
import { APP_LIST } from '@/config';
import { Menu as MenuType, MenuItem } from './types/menu';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const hasAside = computed(() => route.path.startsWith('/app'));

const appList = APP_LIST.map(({ url, name }) => ({ url, name }));

const changeApp = (path: string) => {
    const target = APP_LIST.find(({ url }) => url === path);

};

const routePath = computed(() => route.path);

const currentAppMenu = computed<MenuType | []>(() => {
    const target = APP_LIST.find(({ url }) => routePath.value.includes(url) );
    return target ? target.children : [];
});

const getFistFullpath = (route: MenuItem) => {
    let temp = '';
    if(route.children) {
        temp = getFistFullpath(route.children[0]);
    }else {
        temp = route.url;
    }
    return temp;
};

watch(
    routePath,
    (path) => {
        const target = APP_LIST.find(({ url }) => url === path);
        if(target) {
            router.replace(getFistFullpath(target));
        }
    },
    {
        immediate: true
    }
);



</script>

<style scoped lang="scss">
.el-header{
    .logo{
        height:40px;
        background: blue;
        flex-shrink: 0;
        height: $headerHeight;
    }
    padding:0;
    .header-right{
        flex:1;
    }
}
.el-aside, .logo{
    width: $asideWidth;
}
.el-aside, .el-main{
    min-height: calc(100vh - $headerHeight)
}
.app-menu{
    flex:1;
    height:100%;
}

</style>
