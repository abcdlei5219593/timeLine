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
                            <li v-for="(item, i) in airList" :key="i">
                                <p>{{ item.label }}</p>
                                <p>{{ item.value }}</p>
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
                        <ul class="ptu-ul">
                            <li v-for="(item, i) in ptuList" :key="i">
                                <p>{{ item.label }}</p>
                                <p>{{ item.value }}</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="box box2">
                    <span class="title">环境监测-月降雨量</span>
                    <lineChart :lineData="rainLine" />
                </div>
            </div>
            <div class="center">
                <el-popover
                    placement="top-start"
                    title=""
                    :width="200"
                    trigger="hover"
                    content=""
                    v-for="(item, i) in mapPoint"
                    :key="i"
                >
                    <template #reference>
                        <img
                            class="center-point"
                            src="@/assets/img/point.png"
                            :style="{ top: item.top + 'vh', left: item.left + '%' }"
                        />
                    </template>
                    <div>99999</div>
                </el-popover>
            </div>
            <div class="right">
                <div class="box box3">
                    <span class="title">环境监测-水质</span>
                    <div class="list-con">
                        <img src="@/assets/img/air.png" />
                        <ul class="water-ul">
                            <li v-for="(item, i) in waterList" :key="i">
                                <p>{{ item.label }}</p>
                                <p>{{ item.value }}</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="box box1">
                    <span class="title">环境监测-风测量</span>
                    <div class="list-con">
                        <img src="@/assets/img/air.png" />
                        <ul>
                            <li v-for="(item, i) in windList" :key="i">
                                <p>{{ item.label }}</p>
                                <p>{{ item.value }}</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="box box1">
                    <span class="title">环境监测-设备检测</span>
                    <div class="list-con">
                        <img src="@/assets/img/air.png" />
                        <ul>
                            <li v-for="(item, i) in deviceList" :key="i">
                                <p>{{ item.label }}</p>
                                <p>{{ item.value }}</p>
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
            name: '降雨告警数：',
            value: 20,
        },
        {
            name: '风速告警数：',
            value: 20,
        },
        {
            name: 'PTU告警数：',
            value: 20,
        },
        {
            name: '大气告警数：',
            value: 20,
        },
        {
            name: '水质告警数：',
            value: 20,
        },
    ],
});
const airList = ref([
    {
        label: 'SO2',
        value: 0,
    },
    {
        label: 'PM2.5',
        value: 0,
    },
    {
        label: 'PM10',
        value: 0,
    },
    {
        label: 'NO2',
        value: 0,
    },
    {
        label: 'O3',
        value: 0,
    },
    {
        label: 'CO',
        value: 0,
    },
]);

const ptuList = ref([
    {
        label: '土壤湿度(%)',
        value: 0,
    },
    {
        label: '土壤温度°C',
        value: 0,
    },
    {
        label: '土壤PH',
        value: 0,
    },
    {
        label: '土壤电导率μs/cm',
        value: 0,
    },
]);

const waterList = ref([
    {
        label: 'CwQI',
        value: 0,
    },
    {
        label: 'PH',
        value: 0,
    },
    {
        label: '溶解氧mg/L',
        value: 0,
    },
    {
        label: '电导率μs/cm',
        value: 0,
    },
    {
        label: '浊度NTU',
        value: 0,
    },
    {
        label: '温度°c',
        value: 0,
    },
]);

const windList = ref([
    {
        label: '风速mls',
        value: 0,
    },
    {
        label: '风力',
        value: '1级',
    },
]);

const deviceList = ref([
    {
        label: '设备数量',
        value: 0,
    },
    {
        label: '在线',
        value: 0,
    },
    {
        label: '离线',
        value: 0,
    },
]);

const mapPoint = ref([
    {
        left: 40,
        top: 10,
    },
    {
        left: 50,
        top: 20,
    },
    {
        left: 45,
        top: 50,
    },
    {
        left: 25,
        top: 50,
    },
    {
        left: 35,
        top: 30,
    },
    {
        left: 75,
        top: 10,
    },
    {
        left: 15,
        top: 60,
    },
]);
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

    .center {
        width: calc(100% - 600px);
        position: relative;

        .center-point {
            height: 5vh;
            cursor: pointer;
            position: absolute;
            top: 0;
            left: 0;
        }
    }

    .left,
    .right {
        width: 480px;

        .list-con {
            display: flex;
            margin-top: 1vh;
            align-items: center;
            img {
                height: 5vh;
                margin-left: 25px;
            }
            .water-ul {
                flex-wrap: wrap;

                li {
                    width: 33%;
                }
            }
            .ptu-ul {
                li {
                    width: 22%;
                    &:last-child {
                        width: 35%;
                    }
                }
            }
            ul {
                display: flex;
                // margin-left: 20px;
                width: 100%;

                li {
                    width: 33%;
                    text-align: center;
                    p:first-child {
                        color: #fff;
                        height: 2vh;
                        line-height: 2vh;
                        font-size: 12px;
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
                background: linear-gradient(to bottom, #88ddff, #ffffff);
                -webkit-background-clip: text;
                color: transparent;
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
