<template>
    <div class="bg root">
        <header class="title">
            <img src="@/assets/img/title.png" alt="">
        </header>
        <div class="app-list">
            <AppBar :menu-list="appList" :show-bg-image="true">
            </AppBar>
        </div>
        <section class=""></section>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { storeMenu as useMenuStore } from '@/store/app';
import AppBar from '@/views/layout/Menu/appBar.vue';

const menuStore = useMenuStore();
const appList = computed(() => menuStore.menuList.map(
    ({ url, name }) => ({
        url,
        name,
        bgImage: `menu_${url.substring(url.lastIndexOf('/') + 1)}`
    }))
);

</script>

<style scoped lang="scss">
.bg{

    background-repeat: no-repeat;
    background-position: 0 0;
    background-size: 100% 100%;
}
.root{
    box-sizing: border-box;
    @include wh(100vw, 100vh);
    padding: 0 2vw;
    background-image: url('@/assets/img/gis.png');
}
.title {
    text-align: center;
    img{
        margin-top: 1.5vh;
        width: 27vw;
        height: 4vh;
    }
}
.app-list {
    margin-top: 6px;
    .el-menu {
        display: flex;
        height: 3.7vh;
        justify-content: space-between;
        align-items: center;
        margin: 0;
        background: transparent;
        ::v-deep(.menu-item) {
            display: flex;
            justify-content: space-between;
            align-items: center;
            &.left,&.right{
                width: 31vw;
            }

            .bg-menu{

            }
            img{
                width: 100%;
            }
            .bg-menu + .bg-menu{
                margin-left: 1vw;
            }
            .clock{
                white-space: nowrap;
                width: 8.23vw;
                font-size: 12px;
                color:#fff;
            }
        }
    }
}
</style>
