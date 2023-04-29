<template>
    <div class="main-content warn-con">
        <ElRow class="search-row">
            <ElCol :span="6">
                <span class="search-label">告警类型：</span>
                <ElSelect v-model="AirWarnParams.alarmType" placeholder="请选择" size="default" @change="searchChange">
                    <ElOption v-for="item in warnOptions" :key="item.value" :label="item.label" :value="item.value" />
                </ElSelect>
            </ElCol>
            <ElCol :span="6">
                <span class="search-label">微站选择：</span>
                <ElSelect v-model="AirWarnParams.stationId" placeholder="请选择" size="default" @change="searchChange">
                    <ElOption v-for="item in microStationOptions" :key="item.value" :label="item.label"
                        :value="item.value" />
                </ElSelect>
            </ElCol>
            <ElCol :span="8">
                <span class="search-label">时间：</span>
                <ElDatePicker v-model="date" type="datetimerange" range-separator="-" size="default" @change="timeChange" />
            </ElCol>
            <ElCol :span="6">
                <span class="search-label">传感器类型：</span>
                <ElSelect v-model="AirWarnParams.sensorType" placeholder="请选择" size="default" @change="searchChange">
                    <ElOption v-for="item in sensorTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
                </ElSelect>
            </ElCol>
            <ElCol :span="5" @change="searchChange">
                <ElCheckbox v-model="AirWarnParams.unclosed" class="search-checkbox" size="default">
                    筛选{{ AirWarnParams.unclosed ? '关闭' : '未关闭' }}
                </ElCheckbox>
            </ElCol>
        </ElRow>
        <ElTable id="deviceWarnTable" class="table" :data="tableData"
            :style="{ height: `${maxTableHeight}px`, overflow: 'auto' }">
            <ElTableColumn prop="deviceId" label="主板" />
            <ElTableColumn prop="stationName" label="微站名称" />
            <ElTableColumn prop="status" label="告警值" />
            <ElTableColumn prop="sensorCode" label="传感器类型" />
            <ElTableColumn prop="type" label="告警类型">
                <template #default="scope">
                    <span v-if="scope.row.type === 1">设备告警</span>
                    <span v-else-if="scope.row.type === 2">环境告警</span>
                    <span></span>
                </template>
            </ElTableColumn>
            <ElTableColumn prop="createTime" label="时间" />
        </ElTable>
        <ElPagination class="pagination" background layout="total,sizes,prev, pager, next,jumper" :total="total"
            :current-page="DevceWarnParams.pageNum" :page-sizes="[10, 20, 50, 100]" :page-size="DevceWarnParams.pageSize"
            @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { AirWarnParamsType } from './../ModelDefines';
import useTableSetting from '@/hooks/useTableSetting';
import { getDataDictionary } from '@/api/system';
import { alarmList, alarmClose } from '@/api/warn';
import { getFormatDate } from '@/utils/common';

const tableData: any = ref([]);

const warnOptions = ref<any>([{ label: '告警类型', value: 0 }]);
const microStationOptions = ref<any>([]);
const sensorTypeOptions = ref<any>([{ label: 'PM2.5', value: 0 }]);
const date: any = ref([]);

const AirWarnParams = reactive<AirWarnParamsType>({
    alarmType: null,
    stationId: null,
    startTime: '',
    endTime: '',
    sensorCode: '',
    unclosed: false,
    pageNum: 1,
    pageSize: 20,
});
const total = ref<number>(0);
const timeChange = (val: any) => {
    date.value = val;
    AirWarnParams.startTime = val[0];
    AirWarnParams.endTime = val[1];
};

// 获取微站
const geStationList = async () => {
    try {
        await getDataDictionary('stationId');
    } catch (err) { }
};

const getList = async () => {
    try {
        const res: any = await alarmList(AirWarnParams);
        tableData.value = res.list;
        AirWarnParams.pageNum = res.pageNum;
        AirWarnParams.pageSize = res.pageSize;
        total.value = res.total;
    } catch (err) { }
};

const searchChange = () => {
    AirWarnParams.pageNum = 1;
    getList();
};

const setDefaultTime = () => {
    AirWarnParams.endTime = getFormatDate(new Date(), 'YYYY-mm-dd HH:MM:SS');
    AirWarnParams.startTime = getFormatDate(new Date(new Date().getTime() - 7 * 24 * 3600 * 1000), 'YYYY-mm-dd HH:MM:SS');
    date.value = [AirWarnParams.startTime, AirWarnParams.endTime];
    searchChange();
};

const handleSizeChange = (rows: number) => {
    AirWarnParams.pageNum = 1;
    AirWarnParams.pageSize = rows;
    getList();
};
const handleCurrentChange = (page: number) => {
    AirWarnParams.pageNum = page;
    getList();
};

onMounted(() => {
    setDefaultTime();
    getList();
    geStationList();
});

const { maxTableHeight, setTableMaxHeight } = useTableSetting({ id: 'deviceWarnTable', offsetBottom: 100 });
</script>

<style scoped lang="scss">
.warn-con {}
</style>
