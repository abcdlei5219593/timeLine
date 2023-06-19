<template>
    <div class="bg root">
        <header class="title">
            <img src="@/assets/img/title.png" alt="" />
        </header>
        <div class="app-list">
            <AppBar :menu-list="appList" :show-bg-image="true"> </AppBar>
        </div>
        <section class="main">
            <div class="left">
                <div class="box box1">
                    <span class="title">环境监测-大气详情</span>
                    <div class="list-con">
                        <img src="@/assets/img/air.png" />
                        <ul>
                            <li>
                                <p>SO2</p>
                                <p>40</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="box box2">
                    <span class="title">环境监测-AQ/趋势图</span>
                    <lineChart :lineData="airLine" />
                </div>
                <div class="box box1">
                    <span class="title">环境监测-PTU测量</span>
                    <div class="list-con">
                        <img src="@/assets/img/ptu.png" />
                        <ul>
                            <li>
                                <p>SO2</p>
                                <p>40</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="box box2">
                    <span class="title">环境监测-月降雨量</span>
                    <lineChart :lineData="rainLine" />
                </div>
            </div>
            <div class="right">
                <div class="box box3">
                    <span class="title">环境监测-水质</span>
                </div>
                <div class="box box1">
                    <span class="title">环境监测-风测量</span>
                    <div class="list-con">
                        <img src="@/assets/img/air.png" />
                        <ul>
                            <li>
                                <p>SO2</p>
                                <p>40</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="box box1">
                    <span class="title">环境监测-设备检测</span>
                    <div class="list-con">
                        <img src="@/assets/img/air.png" />
                        <ul>
                            <li>
                                <p>SO2</p>
                                <p>40</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="box box4">
                    <span class="title">环境监测-告警信息</span>
                    <pieChart :pieData="pieData" />
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { storeMenu as useMenuStore } from '@/store/app';
import AppBar from '@/views/layout/Menu/appBar.vue';
import lineChart from './components/line.vue';
import pieChart from './components/pie.vue';

const menuStore = useMenuStore();
const appList = computed(() =>
    menuStore.menuList.map(({ url, name }) => ({
        url,
        name,
        bgImage: `menu_${url.substring(url.lastIndexOf('/') + 1)}`,
    }))
);

const airLine = ref({
    lineLabel: [],
    lineValue: [],
    id: 1,
});
const rainLine = ref({
    lineLabel: [],
    lineValue: [],
    id: 2,
});

const pieData = ref({
    pieValue: [
        {
            name: '4G',
            value: 343183,
        },
        {
            name: 'WIFI',
            value: 7571,
        },
        {
            name: 'NET',
            value: 1186,
        },
    ],
});
</script>

<style scoped lang="scss">
.bg {
    background-repeat: no-repeat;
    background-position: 0 0;
    background-size: 100% 100%;
}
.root {
    box-sizing: border-box;
    @include wh(100vw, 100vh);
    padding: 0 2vw;
    background-image: url('@/assets/img/gis.png');
}
.title {
    text-align: center;
    img {
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
            &.left,
            &.right {
                width: 31vw;
            }

            .bg-menu {
            }
            img {
                width: 100%;
            }
            .bg-menu + .bg-menu {
                margin-left: 1vw;
            }
            .clock {
                white-space: nowrap;
                width: 8.23vw;
                font-size: 12px;
                color: #fff;
            }
        }
    }
}
.main {
    display: flex;
    justify-content: space-between;
    margin-top: 3vh;

    .left,
    .right {
        width: 480px;

        .list-con {
            display: flex;
            margin-top: 1vh;
            img {
                height: 5vh;
                margin-left: 30px;
            }
            ul {
                display: flex;
                margin-left: 20px;

                li {
                    p:first-child {
                        color: #fff;
                        height: 2vh;
                        line-height: 2vh;
                    }
                    p:last-child {
                        font-size: 19px;
                        font-weight: 700;
                        color: #24eacd;
                        height: 3vh;
                        line-height: 3vh;
                    }
                }
            }
        }

        .box {
            height: 13vh;
            background: url(@/assets/img/box1.png) no-repeat;
            background-size: 100% 100%;
            margin-bottom: 2vh;

            .title {
                line-height: 5vh;
                margin-left: 20px;
                border-bottom: 2px solid #00b5ff;
                padding-bottom: 5px;
                color: #ffffff;
                font-size: 12px;
            }
        }
        .box2 {
            height: 25vh;
            background: url(@/assets/img/box2.png) no-repeat;
            background-size: 100% 100%;
        }
        .box3 {
            height: 19vh;
            background: url(@/assets/img/box3.png) no-repeat;
            background-size: 100% 100%;
        }
        .box4 {
            height: 32vh;
            background: url(@/assets/img/box4.png) no-repeat;
            background-size: 100% 100%;
        }
    }
}
</style>
