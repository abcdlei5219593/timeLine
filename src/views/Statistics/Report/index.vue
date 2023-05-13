<template>
    <div shadow="never" class="container">
        <ElRow class="search-row">
            <ElCol :span="8">
                <span class="search-label">时间：</span>
                <el-date-picker
                    v-model="searchForm.date"
                    size="default"
                    :disabled-date="disabledDate"
                    type="daterange"
                    value-format="YYYY-MM-DD"
                    @change="handleSearch"
                />
            </ElCol>
            <ElButton class="add-btn" type="primary" size="default" @click="exportFun">
                导出预览
            </ElButton>
        </ElRow>
        <div class="map-container">
            <ElTable
                id="xc-table"
                class="report-table"
                :data="tableData"
                border=""
                :height="maxTableHeight"
                :row-class-name="tableRowClassName"
                @row-click="handleColumnClick"
            >
                <ElTableColumn :label="`${store.currentApp.meta.categoryName}指数报告`">
                    <template #default="scope">
                        <div class="table-column-layout" @click="active = scope.$index">
                            <p>{{ scope.row.stationName }}</p>
                            <p>
                                本周{{ store.currentApp.meta.categoryName }}平均值为{{
                                    scope.row.avgVal
                                }}，最大值为{{ scope.row.maxVal }}，最小值为{{ scope.row.minVal }}
                            </p>
                        </div>
                    </template>
                </ElTableColumn>
            </ElTable>
            <v-chart class="chart" :option="chartOptions" autoresize :style="{ height: `${maxTableHeight}px` }" />
        </div>
    </div>
    <!--导出预览-->
    <ElDialog v-model="exportShow" class="dialog" title="导出预览" width="70%">
        <div class="dialog-export dialog-content">
            <ExportPreview
                :table-data="tableData"
                :chart-options-arr="chartOptionsArr"
                :search-form="searchForm"
                @handleColumnClick="handleColumnClick"
                @cancel="cancel"
            ></ExportPreview>
        </div>
    </ElDialog>
</template>

<script setup lang="ts" name="Map">
import { ElTable, ElForm, ElFormItem, ElTableColumn, ElOption, ElDatePicker } from 'element-plus';
import { getDeviceList, getStations } from '@/api/device';
import http from '@/api/analyse';
import { computed, ref, reactive } from 'vue';
import VChart from 'vue-echarts';
import { useSettingStore } from '@/store/app';
import dayjs from '@/helper/dayjs';
import useTableSetting from '@/hooks/useTableSetting';
import useDefaultDate from '@/hooks/useDefaultDate';
import ExportPreview from './ExportPreview.vue';
import { getFormatDate } from '@/utils/common';

const { maxTableHeight } = useTableSetting({ id: 'xc-table', offsetBottom: 50 });
const { startDate, endDate } = useDefaultDate();
const store = useSettingStore();
const deviceList = ref([]);
const tableData = ref([]);
const searchForm: any = reactive({
    date: [],
    startTime: '',
    endTime: '',
});
const active = ref(0);
const exportShow = ref(false);

const tableRowClassName = ({ row, rowIndex }) => {
    if (rowIndex === active.value) {
        return 'active';
    }
};

const chartOptions = ref({
    title: {
        text: '',
    },
    tooltip: {
        trigger: 'axis',
        position: ['40%', '20%'],

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
    grid: {
        left: 25,
        right: 0,
        top: 50,
        bottom: 0,
        containLabel: true,
    },
    series: [],
    color: ['#0052D9', '#029CD4'],
});
// getStations({pageNum: 1, pageSize: 1000, bizModule: store.currentApp.bizModule});
// 导出使用
const chartOptionsExport = ref({
    title: {
        text: '',
    },
    tooltip: {
        trigger: 'axis',
        position: ['40%', '20%'],

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
    grid: {
        left: 25,
        right: 0,
        top: 50,
        bottom: 0,
        containLabel: true,
    },
    series: [],
    color: ['#0052D9', '#029CD4'],
});
// 导出折线图的数组
const chartOptionsArr = reactive([]);
const disabledDate = (time: Date) => {
    return time.getTime() > Date.now();
};
const handleSearch = async () => {
    const params = {
        measure: store.currentApp.defaultMeasure,
        startTime: searchForm.date.length ? `${searchForm.date[0]} 00:00:00` : '',
        endTime: searchForm.date.length ? `${searchForm.date[1]} 23:59:59` : '',
        bizModule: store.currentApp.bizModule,
    };
    const data = await http[store.currentApp.url].getAllStationAnalyses(params);
    tableData.value = data;
    tableData.value.length && handleColumnClick(tableData.value[0], '', '');
};

const cancel = () => {
    exportShow.value = false;
};

const handleColumnClick = async (row: any, column: any, event: any, index: any) => {
    const params = {
        deviceId: [row.deviceId],
        startTime: searchForm.date.length ? `${searchForm.date[0]} 00:00:00` : '',
        endTime: searchForm.date.length ? `${searchForm.date[1]} 23:59:59` : '',
        measure: store.currentApp.defaultMeasure,
    };
    const data = await http[store.currentApp.url].getCurvesData(params);
    // const lengend = searchForm.deviceId.map(({ stationName }) => stationName);
    chartOptions.value.legend.data = [row.stationName];
    let series = [];
    for (const device of params.deviceId) {
        const temp = {
            showSymbol: false,
            type: 'line',
            name: row.stationName,
            data: [],
        };

        const deviceData = data.find((item) => item.deviceId === device);

        if (deviceData) {
            temp.data = deviceData.data.sort((prev,current) => prev.time - current.time).map(({ avg, time }) => ({
                name: dayjs(time).format('YYYY-MM-DD HH:mm'),
                value: [dayjs(time).format('YYYY-MM-DD HH:mm'), avg],
            }));
        }
        series.push(temp);
    }
    chartOptions.value.series = series;
};
// 另外提出是因为会影响弹窗外的图表
const handleColumnExportClick = async (row: any, column: any, event: any, index: any) => {
    // eslint-disable-next-line no-new
    new Promise(async (resolve, reject) => {
        // 导出预览
        if (index >= 0) {
            const params = {
                deviceId: [row.deviceId],
                startTime: searchForm.date.length ? `${searchForm.date[0]} 00:00:00` : '',
                endTime: searchForm.date.length ? `${searchForm.date[1]} 23:59:59` : '',
                measure: store.currentApp.defaultMeasure,
            };
            const data = await http[store.currentApp.url].getCurvesData(params);
            // const lengend = searchForm.deviceId.map(({ stationName }) => stationName);
            chartOptionsExport.value.legend.data = [row.stationName];
            let series = [];
            for (const device of params.deviceId) {
                const temp = {
                    type: 'line',
                    name: row.stationName,
                    data: [],
                };

                const deviceData = data.find((item) => item.deviceId === device);

                if (deviceData) {
                    temp.data = deviceData.data.sort((prev,current) => prev.time - current.time).map(({ avg, time }) => ({
                        name: dayjs(time).format('YYYY-MM-DD HH:mm:ss'),
                        value: [dayjs(time).format('YYYY-MM-DD HH:mm:ss'), avg],
                    }));
                }
                series.push(temp);
            }
            chartOptionsExport.value.series = series;

            // chartOptionsArr[index].series = series;
            const chartOptionsValue = JSON.parse(JSON.stringify(chartOptionsExport.value));
            chartOptionsArr[index] = chartOptionsValue;
        }
    });
};

// 初始化默认一周
const setDefaultTime = () => {
    searchForm.endTime = endDate;
    searchForm.startTime = startDate;
    searchForm.date = [searchForm.startTime, searchForm.endTime];
};
const getDeviceListHandler = async () => {
    // deviceList.value
    deviceList.value = await getDeviceList({ bizModule: store.currentApp.bizModule });
};

// 导出预览
const exportFun = async () => {
    exportShow.value = true;
    await Promise.all(
        tableData.value.map(async (item, index) => {
            await handleColumnExportClick(item, '', '', index);
        })
    );
};

setDefaultTime();
handleSearch();
getDeviceListHandler();
</script>

<style scoped lang="scss">
.container {
    padding: 24px;
    background: #fff;
    border-radius: 4px;
    @include flex();
    flex-direction: column;

    .search-row {
        justify-content: space-between;

        .add-btn {
            margin-left: auto;
        }
    }

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
        @include flex();
        margin-top: 24px;
        width: 100%;
        flex: 1;

        .el-table {
            width: 40%;
        }

        .echarts {
            width: 60%;
        }
    }

    .report-table {
        :deep(thead) {
            height: 62px;

            th {
                color: #000000;
                font-size: 16px;
                font-weight: 600;
            }
        }

        :deep(tbody tr) {
            height: 80px;
            cursor: pointer;

            .table-column-layout p {
                &:first-child {
                    color: #000000;
                }

                &:last-child {
                    color: #666666;
                }
            }
        }

        :deep(tbody tr:hover > td) {
            background-color: #f3f3f3;
        }

        :deep(tbody .active) {
            background: #ecf4fc !important;

            .table-column-layout p:first-child {
                color: #2d8cf0 !important;
            }

            &:hover > td {
                background: #ecf4fc !important;
            }
        }

        :deep(.cell) {
            padding: 0 23px !important;
        }
    }
}
.dialog-export {
    height: 500px;
    overflow-y: auto;
    padding-bottom: 66px;
}
</style>
