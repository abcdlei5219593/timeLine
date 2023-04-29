<template>
    <div class="main-content warn-con">
        <ElRow class="search-row">
            <ElCol :span="6">
                <span class="search-label">告警类型：</span>
                <ElSelect v-model="DevceWarnParams.alarmType" placeholder="请选择" size="default">
                    <ElOption v-for="item in warnOptions" :key="item.value" :label="item.label" :value="item.value" />
                </ElSelect>
            </ElCol>
            <ElCol :span="6">
                <span class="search-label">微站选择：</span>
                <ElSelect v-model="DevceWarnParams.stationId" placeholder="请选择" size="default">
                    <ElOption v-for="item in microStationOptions" :key="item.value" :label="item.label"
                        :value="item.value" />
                </ElSelect>
            </ElCol>
            <ElCol :span="8">
                <span class="search-label">时间：</span>
                <ElDatePicker v-model="date" type="datetimerange" range-separator="-" size="default" @change="timeChange" />
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
        </ElTable>
        <!-- <ElPagination class="pagination" background layout="total,sizes,prev, pager, next,jumper" :total="1000" /> -->
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { DevceWarnParamsType, warnOptions } from './../ModelDefines';
import useTableSetting from '@/hooks/useTableSetting';
import { alarmList } from '@/api/warn';
import { getStations } from '@/api/device';
import { getFormatDate } from '@/utils/common';

const tableData: any = ref([]);
const DevceWarnParams = reactive<DevceWarnParamsType>({
    alarmType: 1,
    stationId: null,
    startTime: '',
    endTime: '',
    pageNum: 1,
    pageSize: 20,
});
const microStationOptions = ref<any>([]);
const date: any = ref([]);

const timeChange = (val: any) => {
    date.value = val;
    DevceWarnParams.startTime = val[0];
    DevceWarnParams.endTime = val[1];
};

const setDefaultTime = () => {
    DevceWarnParams.endTime = getFormatDate(new Date(), 'YYYY-mm-dd HH:MM:SS');
    DevceWarnParams.startTime = getFormatDate(new Date(new Date().getTime() - 7 * 24 * 3600 * 1000), 'YYYY-mm-dd HH:MM:SS');
    date.value = [DevceWarnParams.startTime, DevceWarnParams.endTime];
};

const getList = async () => {
    try {
        tableData.value = await alarmList(DevceWarnParams);
    } catch (err) { }
};

// 查询微站
const getStationslist = async () => {
    try {
        await getStations({
            pageNum: 1,
            pageSize: 20,
        });
    } catch (err) { }
};

onMounted(() => {
    getStationslist();
    setDefaultTime();
    getList();
});

const { maxTableHeight, setTableMaxHeight } = useTableSetting({ id: 'deviceWarnTable', offsetBottom: 100 });
</script>

<style scoped lang="scss">
.flag-con {}
</style>
