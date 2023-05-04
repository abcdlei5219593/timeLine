<template>
    <ElRow :gutter="20">
        <ElCol :span="12" class="h-340">
            <ElCard shadow="never" class="welcome ">
                <h3>欢迎你，{{ store.userInfo?.name }}</h3>
                <article class="inner-title">
                    微站检测平台
                </article>
                <article class="flex">
                    AQI:{{ AQI }} <div class="tag">
                        良
                    </div>
                </article>
                <article class="">
                    2023年更新
                </article>
            </ElCard>
        </ElCol>
        <ElCol :span="12" class="h-340">
            <ElCard shadow="never" class="msg ">
                <h3>消息情况</h3>
                <ul>
                    <li v-for="msg in msgList" :key="msg.id">
                        {{ msg.title }}
                        <p class="date">
                            {{ msg.createTime }}
                        </p>
                    </li>
                </ul>
            </ElCard>
        </ElCol>
        <ElCol :span="12" class="h-390">
            <ElCard shadow="never" class="draw-container">
                <h3>热力图</h3>
                <div class="map-layout">
                    <HeatMap :search-form="searchForm" />
                </div>
            </ElCard>
        </ElCol>
        <ElCol :span="12" class="h-390">
            <ElCard shadow="never" class="draw-container">
                <div class="chat-title">
                    <h3>微站24小时平均值</h3>
                    <ElSelect v-model="measure" size="medium" @change="drawBar">
                        <ElOption label="AQI" value="aqi" />
                        <ElOption label="PM2.5" value="pm2_5" />
                    </ElSelect>
                </div>
                <div class="map-layout">
                    <v-chart class="chart" :option="option" autoresize />
                </div>
            </ElCard>
        </ElCol>
    </elrow>
</template>

<script setup lang="ts">
import { ElCard, ElSelect, ElRow, ElCol } from 'element-plus';
import { useUserStore } from '@/store/app';
import { get24AvgData, getAQI, getLastestAlarms } from '@/api/home';
import { getHotmapData } from '@/api/analyse';
import { ref, onMounted } from 'vue';
import VChart from 'vue-echarts';
import HeatMap from '../Statistics/HeatMap/HeatMap.vue';
import dayjs from '@/helper/dayjs';

const AQI = ref<number>(null);
const msgList = ref([]);
const option = ref({
    tooltip: {},
    legend: {
        data: ['产量'],
    },
    xAxis: {
        data: ['大米', '棉花', '小米'],
    },
    yAxis: {},
    series: [{ name: '产量', type: 'bar', data: [100, 200, 300] }],
},
);
const measure = ref('aqi');

const searchForm = {
    measure: 'aqi',
    date: [
        dayjs().subtract(3, 'day').format('YYYY-MM-DD'),
        dayjs().format('YYYY-MM-DD')
    ]
};

const drawBar = async () => {
    const data = await get24AvgData({ measure: 'so2' });
    option.value = {
        xAxis: {

            data: data.map(item => dayjs(item.time).format('YYYY-MM-DD HH:mm:ss')),

        },
        yAxis: {},
        grid: {
            left: 0,
            right: 0,
            top: 10,
            bottom: 0,
            containLabel: true
        },
        series: [
            {
                type: 'bar',
                data: data.map(item => item.avg)
            },
        ],
    };
};
onMounted(() => {
    drawBar();
});
const getAQIHandler = async () => {
    AQI.value = await getAQI();
};
const getLastestAlarmsHandler = async () => {
    msgList.value = await getLastestAlarms({ pageNum: 1, pageSize: 5 });
};
getAQIHandler();
getLastestAlarmsHandler();
const store = useUserStore();
</script>

<style scoped lang="scss">
.h-340 {
    height: calc((100% - 40px) * 0.47);
}

.h-390 {
    height: calc((100% - 40px) * 0.53);
}

.el-col {

    margin-top: $containerSpace;
    align-items: stretch;

    .el-card {

        box-sizing: border-box;
        height: 100%;

        h3,
        .inner-title {
            font-weight: 600;
            font-size: 18px;
            color: #252525;
        }

        h3 {
            font-size: 18px;
        }

        .inner-title {
            font-size: 16px;
        }
    }

    .welcome {
        .flex {
            @include flex(flex-start, center);
        }

        article {
            margin-top: 24px;

            .tag {
                margin-left: 10px;
                font-size: 12px;
                background: #F5BA18;
                border-radius: 4px;

                padding: 4px 8px;
                color: #fff;
            }
        }
    }

    .msg {
        ul {
            margin-top: 7px;
            padding-left: 15px;

            li {
                @include flex(space-between, center);
                padding: 13px 0;
                list-style-type: disc;

                &+li {
                    border-top: 1px solid #18181814;
                    ;
                }

                .date {
                    flex-shrink: 0;
                    color: #999999;
                }
            }
        }
    }

    .draw-container ::v-deep(.el-card__body) {
        box-sizing: border-box;
        height: 100%;
        @include flex();
        flex-direction: column;

        .map-layout {
            margin-top: 20px;
            flex: 1;
            width: 100%;
        }

        .chat-title {
            margin-top: -8px;
            width: 100%;
            @include flex(space-between, center);

            .el-select {
                width: 80px;
            }
        }
    }
}</style>
