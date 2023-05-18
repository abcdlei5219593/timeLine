<template>
    <div shadow="never" class="container">
        <ElRow class="search-row">
            <ElCol :span="6">
                <span class="search-label">微站选择：</span>
                <ElSelect
                    v-model="searchForm.deviceId"
                    value-key="deviceId"
                    collapse-tags size="default"
                    multiple=""
                    @change="handleSearch"
                >
                    <ElOption
                        v-for="item in deviceList"
                        :key="item.deviceId"
                        :label="item.stationName"
                        :value="item"
                        :disabled="
                            searchForm.deviceId.length === 1
                                && searchForm.deviceId[0].deviceId === item.deviceId
                        "
                    >
                    </ElOption>
                </ElSelect>
            </ElCol>
            <ElCol :span="6">
                <span class="search-label">类型：</span>
                <ElSelect v-model="searchForm.measure" size="default" @change="handleSearch">
                    <template
                        v-for="item in store.measureList"
                        :key="item.code"
                    >
                        <ElOption
                            v-if="item.code !== 'wd'"
                            :label="item.name"
                            :value="item.code"
                        ></ElOption>
                    </template>
                </ElSelect>
            </ElCol>
            <ElCol :span="8">
                <span class="search-label">时间：</span>
                <el-date-picker
                    v-model="searchForm.date" size="default" :disabled-date="disabledDate" type="datetimerange"
                    value-format="YYYY-MM-DD HH:mm:ss" @change="handleSearch"
                />
            </ElCol>
        </ElRow>
        <div class="map-container">
            <v-chart class="chart" :option="chartOptions" autoresize />
        </div>
    </div>
</template>

<script setup lang="ts" name="Map">
import { ElCard, ElForm, ElFormItem, ElSelect, ElOption, ElDatePicker } from 'element-plus';
import { getDeviceList, getStations } from '@/api/device';
import http from '@/api/analyse';
import { watch, ref, reactive } from 'vue';
import VChart from 'vue-echarts';
import { useSettingStore } from '@/store/app';
import dayjs from '@/helper/dayjs';
import useDefaultDate from '@/hooks/useDefaultDate';

const { startDate, endDate } = useDefaultDate();
const store = useSettingStore();
const deviceList: any = ref([]);
const searchForm = reactive({
    deviceId: [],
    measure: store.currentApp.defaultMeasure,
    date: [startDate, endDate],
    startTime: startDate,
    endTime: endDate,
});

const chartOptions = ref({
    title: {
        text: '',
    },
    tooltip: {
        trigger: 'axis',
        position: ['40%', '20%'],
        // formatter: (params) => {
        //     let res = '';
        //     for (let i = 0; i < params.length; i++) {
        //         res += '<li>' + params[i].seriesName + '：' + params[i].value + '</li>';
        //     }
        //     return res;
        // },
    },
    legend: {
        data: [],
    },
    xAxis: {
        type: 'category',
        splitLine: {
            show: false,
        },
        axisLabel: {
            formatter(value) {
                const date = value.split(' ');
                return `${date[1]}\n${date[0]}`;
            }
        }
    },
    yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
    },
    series: [],
    // color: ['#0052D9', '#029CD4']
});

const disabledDate = (time: Date) => {
    return time.getTime() > Date.now();
};
// getStations({pageNum: 1, pageSize: 1000, bizModule: store.currentApp.bizModule});

const handleSearch = async () => {
    const params = {
        deviceId: searchForm.deviceId.map(({ deviceId }) => deviceId),
        startTime: searchForm.date.length ? searchForm.date[0] : '',
        endTime: searchForm.date.length ? searchForm.date[1] : '',
        measure: searchForm.measure,
    };
    const data = await http[store.currentApp.url].getCurvesData(params);
    const lengend = searchForm.deviceId.map(({ stationName }) => stationName);

    let series = [];
    for (const device of searchForm.deviceId) {
        const temp = {
            showSymbol: false,
            type: 'line',
            name: device.stationName,
            data: [],
        };

        const deviceData = data.find((item) => item.deviceId === device.deviceId);

        if (deviceData) {
            temp.data = deviceData.data.sort((prev,current) => prev.time - current.time).map(({ avg, time }) => ({
                name: dayjs(time).format('YYYY-MM-DD HH:mm:ss'),
                value: [dayjs(time).format('YYYY-MM-DD HH:mm:ss'), avg],
            }));
        }
        series.push(temp);
    }
    chartOptions.value = {
        ...chartOptions.value,
        series,
        legend: {
            data: lengend
        }
    };


};

// watch(
//     () => searchForm.deviceId,
//     (newVal,oldVal) => {
//         if(!newVal.length) {
//             searchForm.deviceId.push(oldVal[0]);
//         }
//     }
// );


const getDeviceListHandler = async () => {
    // deviceList.value
    const res = await getDeviceList({ bizModule: store.currentApp.bizModule });
    // deviceList.value = [{ stationName: '全部微站', stationId: '' }, ...res];
    deviceList.value = res;
    searchForm.deviceId = [res[0]];
    handleSearch();
};

getDeviceListHandler();
</script>

<style scoped lang="scss">
.container {
    padding: 24px;
    background: #fff;
    border-radius: 4px;
    @include flex();
    flex-direction: column;

    .title {
        width: 100%;
        @include flex(space-between, center);

        h3 {
            font-weight: 600;
            font-size: 16px;
            color: #000;
        }

        .el-form-item {
            align-items: center;
            margin-bottom: 0;
        }
    }

    .map-container {
        margin-top: 24px;
        width: 100%;
        flex: 1;
    }

    :deep(.el-select__tags) {
        .el-tag {
            background: #e7e7e7;
            font-size: 12px;
            color: #000000;
        }
    }
}
</style>
