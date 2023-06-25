<template>
    <div class="bg root">
        <header class="title">
            <img src="@/assets/img/title.png" alt="" />
        </header>
        <div class="app-list">
            <AppBar :menu-list="appList" :show-bg-image="true">
            </AppBar>
        </div>
        <section class="main">
            <div class="left">
                <div class="box box1 air-box">
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
                    <div class="title-con">
                        <span class="title">环境监测-AQI/趋势图</span>
                        <div class="title-tabs">
                            <span
                                v-for="(item, i) in tabs"
                                :key="i"
                                :class="{ active: item.value === active }"
                                @click="tabsChange(item.value)"
                            >{{ item.label }}</span>
                        </div>
                    </div>
                    <lineChart :line-data="airLine" />
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
                    <lineChart :line-data="rainLine" />
                </div>
            </div>
            <div class="center">
                <el-popover
                    v-for="(item, i) in mapPoint"
                    :key="i"
                    placement="top-start"
                    title=""
                    :width="200"
                    trigger="hover"
                    content=""
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
                        <img src="@/assets/img/water.png" />
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
                        <img src="@/assets/img/wind.png" />
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
                        <img src="@/assets/img/device.png" />
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
                    <pieChart :pie-data="pieData" />
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { storeMenu as useMenuStore } from '@/store/app';
import AppBar from '@/views/layout/Menu/appBar.vue';
import lineChart from './components/line.vue';
import pieChart from './components/pie.vue';
import * as dataBoardApi from '@/api/dataBoard';

const menuStore = useMenuStore();
const appList = computed(() =>
    menuStore.menuList.map(({ url, name }) => ({
        url,
        name,
        bgImage: `menu_${url.substring(url.lastIndexOf('/') + 1)}`,
    }))
);
const active = ref(0);
const tabs = ref([
    {
        label: '12h',
        value: 0,
    },
    {
        label: '15日',
        value: 1,
    },
    {
        label: '12月',
        value: 2,
    },
]);

const tabsChange = (i: number) => {
    active.value = i;
    if (i === 0) {
        getAQIIn12Hours();
    } else if (i === 1) {
        getAQIIn15Days();
    } else if (i === 2) {
        getAQIIn12Months();
    }
};

const toParseIntNum = (num: number) => {
    return parseInt(num * 100) + '%';
};

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

// 大气详情
const getAirDetail = async () => {
    try {
        const res = await dataBoardApi.getRealData();
        airList.value = [
            {
                label: 'SO2',
                value: res.so2,
            },
            {
                label: 'PM2.5',
                value: res.pm25,
            },
            {
                label: 'PM10',
                value: res.pm10,
            },
            {
                label: 'NO2',
                value: res.no2,
            },
            {
                label: 'O3',
                value: res.o3,
            },
            {
                label: 'CO',
                value: res.co,
            },
        ];
    } catch (err) {}
};

// aqi趋势12小时
const getAQIIn12Hours = async () => {
    airLine.value.lineLabel = [];
    airLine.value.lineValue = [];
    try {
        const res = await dataBoardApi.getAQIIn12Hours();
        res.forEach((item: any) => {
            airLine.value.lineLabel.push(item.time);
            airLine.value.lineValue.push(item.val);
        });
    } catch (err) {}
};

// 15日
const getAQIIn15Days = async () => {
    airLine.value.lineLabel = [];
    airLine.value.lineValue = [];
    try {
        const res = await dataBoardApi.getAQIIn15Days();
        res.forEach((item: any) => {
            airLine.value.lineLabel.push(item.time);
            airLine.value.lineValue.push(item.val);
        });
    } catch (err) {}
};

// 12月
const getAQIIn12Months = async () => {
    airLine.value.lineLabel = [];
    airLine.value.lineValue = [];
    try {
        const res = await dataBoardApi.getAQIIn12Months();
        res.forEach((item: any) => {
            airLine.value.lineLabel.push(item.time);
            airLine.value.lineValue.push(item.val);
        });
    } catch (err) {}
};

// ptu
const getPtuData = async () => {
    try {
        const res = await dataBoardApi.getPtuData();
        ptuList.value = [
            {
                label: '土壤湿度(%)',
                value: res.humi,
            },
            {
                label: '土壤温度°C',
                value: res.temp,
            },
            {
                label: '土壤PH',
                value: res.ph,
            },
            {
                label: '土壤电导率μs/cm',
                value: res.ec,
            },
        ];
    } catch (err) {}
};

// 降雨
const getPRCPEveryMonth = async () => {
    rainLine.value.lineLabel = [];
    rainLine.value.lineValue = [];
    try {
        const res = await dataBoardApi.getPRCPEveryMonth();
        res.forEach((item: any) => {
            rainLine.value.lineLabel.push(item.time);
            rainLine.value.lineValue.push(item.val);
        });
    } catch (err) {}
};

// 水质
const getWaterData = async () => {
    try {
        const res = await dataBoardApi.getWaterData();
        waterList.value = [
            {
                label: 'CwQI',
                value: res.cwqi,
            },
            {
                label: 'PH',
                value: res.ph,
            },
            {
                label: '溶解氧mg/L',
                value: res.d0,
            },
            {
                label: '电导率μs/cm',
                value: res.ec,
            },
            {
                label: '浊度NTU',
                value: res.wt,
            },
            {
                label: '温度°c',
                value: res.temp,
            },
        ];
    } catch (err) {}
};

// 风
const getWindData = async () => {
    try {
        const res = await dataBoardApi.getWindData();
        windList.value = [
            {
                label: '风速mls',
                value: res.wsp,
            },
            {
                label: '风力',
                value: res.wd,
            },
        ];
    } catch (err) {}
};

// 设备
const getDeviceData = async () => {
    try {
        const res = await dataBoardApi.getDeviceData();
        deviceList.value = [
            {
                label: '设备数量',
                value: res.total,
            },
            {
                label: '在线',
                value: res.online,
            },
            {
                label: '离线',
                value: res.offline,
            },
        ];
    } catch (err) {}
};

// 告警信息
const getAlarmData = async () => {
    try {
        const res = await dataBoardApi.getAlarmData();
        const count = res.gasCount + res.ptuCount + res.rainCount + res.waterCount + res.windCount;
        pieData.value.pieValue = [
            {
                name: '降雨告警数：' + toParseIntNum(res.rainCount / count),
                value: res.rainCount,
            },
            {
                name: '风速告警数：' + toParseIntNum(res.windCount / count),
                value: res.windCount,
            },
            {
                name: 'PTU告警数：' + toParseIntNum(res.ptuCount / count),
                value: res.ptuCount,
            },
            {
                name: '大气告警数：' + toParseIntNum(res.gasCount / count),
                value: res.gasCount,
            },
            {
                name: '水质告警数：' + toParseIntNum(res.waterCount / count),
                value: res.waterCount,
            },
        ];
    } catch (err) {}
};

// 地图
const stationData = async () => {
    try {
        const res = await dataBoardApi.stationData();
        console.log(res, '877666');
    } catch (err) {}
};

onMounted(() => {
    getAirDetail();
    getAQIIn12Hours();
    getPtuData();
    getPRCPEveryMonth();
    getWaterData();
    getWindData();
    getDeviceData();
    getAlarmData();
    stationData();
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
    overflow: hidden;
    padding: 0 2vw;
    background-image: url('@/assets/img/gis.png');
}
.title-con {
    display: flex;
    justify-content: space-between;
    .title {
        height: 2.5vh;
        line-height: 2.5vh;
        margin-top: 2vh;
    }
    .title-tabs {
        display: flex;
        margin-top: 3vh;
        padding-right: 20px;
        span {
            width: 35px;
            height: 2vh;
            line-height: 2vh;
            text-align: center;
            display: block;
            color: #fff;
            cursor: pointer;
        }
        span.active {
            background: rgba(4, 182, 255, 0.5);
        }
    }
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

        // .air-box {
        //     ul li p:last-child {
        //         font-size: 16px !important;
        //     }
        // }

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
                        color: rgba(255, 255, 255, 0.8);
                        height: 2vh;
                        line-height: 2vh;
                        font-size: 12px;
                    }
                    p:last-child {
                        font-size: 16px;
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
