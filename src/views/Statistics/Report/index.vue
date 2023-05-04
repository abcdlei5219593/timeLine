<template>
    <div shadow="never" class="container">
        <elForm inline>
            <ElFormItem label="时间:">
                <el-date-picker
                    v-model="searchForm.date"
                    size="default"
                    :disabled-date="disabledDate"
                    type="daterange"
                    value-format="YYYY-MM-DD"
                    @change="handleSearch"
                />
            </ElFormItem>
        </elForm>
        <div class="map-container">
            <ElTable
                id="xc-table"
                :data="tableData"
                border=""
                :height="maxTableHeight"
                @row-click="handleColumnClick"
            >
                <ElTableColumn
                    label="空气质量指数报告"
                >
                    <template #default="scope">
                        <div class="table-column-layout">
                            <p>{{ scope.row.stationName }}</p>
                            <p>本周空气质量平均值为{{ scope.row.avgVal }}，最大值为{{ scope.row.maxVal }}，最小值为{{ scope.row.minVal }}</p>
                        </div>
                    </template>
                </ElTableColumn>
            </ElTable>
            <v-chart class="chart" :option="chartOptions" autoresize :style="{height: `${maxTableHeight}px`}" />
        </div>
    </div>
</template>

<script setup lang="ts" name="Map">
import { ElTable, ElForm, ElFormItem, ElTableColumn, ElOption,ElDatePicker } from 'element-plus';
import { getDeviceList, getStations } from '@/api/device';
import { getHotmapData, getCurvesData, getAllStationAnalyses } from '@/api/analyse';
import { computed, ref, reactive } from 'vue';
import VChart from 'vue-echarts';
import { useSettingStore } from '@/store/app';
import dayjs from '@/helper/dayjs';
import useTableSetting from '@/hooks/useTableSetting';


const { maxTableHeight } = useTableSetting();
const store = useSettingStore();
const deviceList = ref([]);
const tableData = ref([]);
const searchForm = reactive({


    date: [],
    startTime: '',
    endTime: ''
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
                res
                += '<li>'
                + params[i].seriesName
                + '：'
                + params[i].value
                + '</li>';
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
});
// getStations({pageNum: 1, pageSize: 1000, bizModule: store.currentApp.bizModule});

const disabledDate = (time: Date) => {
    return time.getTime() > Date.now();
};
const handleSearch = async () => {
    const params = {
        measure: 'aqi',
        startTime: searchForm.date.length ? `${searchForm.date[0]} 00:00:00`: '',
        endTime: searchForm.date.length ? `${searchForm.date[1]} 23:59:59`: '',
        bizModule: 1
    };
    const data = await getAllStationAnalyses(params);

    tableData.value = data;

};

const handleColumnClick = async (row, column, event) => {
    const params = {
        deviceId: [row.deviceId],
        startTime: searchForm.date.length ? `${searchForm.date[0]} 00:00:00`: '',
        endTime: searchForm.date.length ? `${searchForm.date[1]} 23:59:59`: '',
        measure: 'aqi'
    };
    const data = await getCurvesData(params);
    // const lengend = searchForm.deviceId.map(({ stationName }) => stationName);
    chartOptions.value.legend.data = [row.stationName];

    let series = [];
    for (const device of params.deviceId) {
        const temp = {
            type: 'line',
            name: row.stationName,
            data: []
        };

        const deviceData = data.find(item => item.deviceId === device);

        if(deviceData) {
            temp.data = deviceData.data.map(({ avg, time }) => ({
                name: dayjs(time).format('YYYY-MM-DD HH:mm:ss'),
                value: [
                    dayjs(time).format('YYYY-MM-DD HH:mm:ss'),
                    avg
                ]
            }));
        }
        series.push(temp);
    }
    chartOptions.value.series = series;
};


const getDeviceListHandler = async () => {
    // deviceList.value
    deviceList.value = await getDeviceList({bizModule: store.currentApp.bizModule});
    // getDeviceDataHandler();
};

getDeviceListHandler();

</script>

<style scoped lang="scss">
.container {
    padding:24px;
    background: #fff;
    border-radius: 4px;
    @include flex();
    flex-direction: column;
    .title{
        width: 100%;
        @include flex(space-between, center);
        h3{
            font-weight: 600;
            font-size: 16px;
            color: #000;
        }
        .el-form-item {
            align-items: center;
            margin-bottom: 0;
        }
    }
    .map-container{
        @include flex();
        margin-top: 24px;
        width: 100%;
        flex: 1;
        .el-table{
            width:40%;
        }
        .echarts{
            width:60%;
        }
    }

}
</style>
