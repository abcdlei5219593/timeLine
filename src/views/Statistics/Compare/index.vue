<template>
    <div shadow="never" class="container">
        <elForm inline>
            <ElFormItem label="微站选择:">
                <ElSelect
                    v-model="searchForm.deviceId"
                    value-key="stationId"
                    collapse-tags
                    size="default"
                    multiple=""
                    @change="handleSearch"
                >
                    <ElOption v-for="item in deviceList" :key="item.stationId" :label="item.stationName" :value="item">
                    </ElOption>
                </ElSelect>
            </ElFormItem>
            <ElFormItem label="类型">
                <ElSelect v-model="searchForm.measure" size="default" @change="handleSearch">
                    <ElOption
                        v-for="item in store.measureList"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code"
                    ></ElOption>
                </ElSelect>
            </ElFormItem>
            <ElFormItem label="时间:">
                <el-date-picker
                    v-model="searchForm.date"
                    size="default"
                    :disabled-date="disabledDate"
                    type="datetimerange"
                    value-format="YYYY-MM-DD HH:mm:ss"
                    @change="handleSearch"
                />
            </ElFormItem>
        </elForm>
        <div class="map-container">
            <v-chart class="chart" :option="chartOptions" autoresize />
        </div>
    </div>
</template>

<script setup lang="ts" name="Map">
import { ElCard, ElForm, ElFormItem, ElSelect, ElOption, ElDatePicker } from 'element-plus';
import { getDeviceList, getStations } from '@/api/device';
import http from '@/api/analyse';
import { computed, ref, reactive } from 'vue';
import VChart from 'vue-echarts';
import { useSettingStore } from '@/store/app';
import dayjs from '@/helper/dayjs';

const store = useSettingStore();
const deviceList: any = ref([]);
const searchForm = reactive({
    deviceId: [],
    measure: store.currentApp.defaultMeasure,
    date: [],
    startTime: '',
    endTime: '',
});

const chartOptions = ref({
    title: {
        text: '',
    },
    tooltip: {
        trigger: 'axis',
        position: ['40%', '20%'],
        formatter: (params) => {
            let res = '';
            for (let i = 0; i < params.length; i++) {
                res += '<li>' + params[i].seriesName + '：' + params[i].value + '</li>';
            }
            return res;
        },
    },
    legend: {
        data: [],
    },
    xAxis: {
        type: 'time',
        splitLine: {
            show: false,
        },
    },
    yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
    },
    series: [],
    color: ['#0052D9','#029CD4']
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
            type: 'line',
            name: device.stationName,
            data: [],
        };

        const deviceData = data.find((item) => item.deviceId === device.deviceId);

        if (deviceData) {
            temp.data = deviceData.data.map(({ avg, time }) => ({
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

const getDeviceListHandler = async () => {
    // deviceList.value
    const res = await getDeviceList({ bizModule: store.currentApp.bizModule });
    // deviceList.value = [{ stationName: '全部微站', stationId: '' }, ...res];
    deviceList.value = res;
    searchForm.deviceId = res;
    // getDeviceDataHandler();
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
}
</style>
