<template>
    <div class="main-content warn-con">
        <ElRow class="search-row">
            <ElCol :span="6">
                <span class="search-label">告警类型：</span>
                <ElSelect v-model="AirWarnParams.type" placeholder="请选择" size="default">
                    <ElOption v-for="item in warnOptions" :key="item.value" :label="item.label" :value="item.value" />
                </ElSelect>
            </ElCol>
            <ElCol :span="6">
                <span class="search-label">微站选择：</span>
                <ElSelect v-model="AirWarnParams.microStation" placeholder="请选择" size="default">
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
                <ElSelect v-model="AirWarnParams.sensorType" placeholder="请选择" size="default">
                    <ElOption v-for="item in sensorTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
                </ElSelect>
            </ElCol>
            <ElCol :span="5">
                <ElCheckbox v-model="AirWarnParams.unclosed" class="search-checkbox" size="default">
                    筛选{{ AirWarnParams.unclosed ? '关闭' : '未关闭' }}
                </ElCheckbox>
            </ElCol>
        </ElRow>
        <ElTable id="deviceWarnTable" class="table" :data="tableData"
            :style="{ height: `${maxTableHeight}px`, overflow: 'auto' }">
            <ElTableColumn prop="date" label="主板" />
            <ElTableColumn prop="name" label="微站名称" />
            <ElTableColumn prop="address" label="告警值" />
            <ElTableColumn prop="address" label="传感器类型" />
            <ElTableColumn prop="address" label="告警类型" />
            <ElTableColumn prop="address" label="时间" />
            <ElTableColumn prop="address" fixed="right" label="操作">
                <template #default>
                    <ElButton link type="primary" size="default">
                        关闭告警
                    </ElButton>
                    <ElButton link type="primary" size="default">
                        已关闭
                    </ElButton>
                </template>
            </ElTableColumn>
        </ElTable>
        <ElPagination class="pagination" background layout="total,sizes,prev, pager, next,jumper" :total="1000" />
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
    alarmType: 1,
    stationId: null,
    startTime: '',
    endTime: '',
    sensorCode: '',
    unclosed: false,
    pageNum: 1,
    pageSize: 20,
});

const timeChange = (val: any) => {
    date.value = val;
    AirWarnParams.startTime = val[0];
    AirWarnParams.endTime = val[1];
};

const setDefaultTime = () => {
    AirWarnParams.endTime = getFormatDate(new Date(), 'YYYY-mm-dd HH:MM:SS');
    AirWarnParams.startTime = getFormatDate(new Date(new Date().getTime() - 7 * 24 * 3600 * 1000), 'YYYY-mm-dd HH:MM:SS');
    date.value = [AirWarnParams.startTime, AirWarnParams.endTime];
};

// 获取微站
const geStationList = async () => {
    try {
        await getDataDictionary('stationId');
    } catch (err) { }
};

const getList = async () => {
    try {
        tableData.value = await alarmList(AirWarnParams);
    } catch (err) { }
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
