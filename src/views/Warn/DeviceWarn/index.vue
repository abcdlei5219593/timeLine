<template>
    <div class="main-content warn-con">
        <ElRow class="search-row">
            <!-- <ElCol :span="6">
                <span class="search-label">告警类型：</span>
                <ElSelect v-model="DevceWarnParams.alarmType" placeholder="请选择" size="default" @change="searchChange">
                    <ElOption v-for="item in warnOptions" :key="item.value" :label="item.label" :value="item.value" />
                </ElSelect>
            </ElCol> -->
            <ElCol :span="6">
                <span class="search-label">微站选择：</span>
                <ElSelect v-model="DevceWarnParams.deviceId" placeholder="请选择" size="default" @change="searchChange">
                    <ElOption
                        v-for="(item, i) in stationArr"
                        :key="i"
                        :label="item.stationName"
                        :value="item.deviceId"
                    />
                </ElSelect>
            </ElCol>
            <ElCol :span="8">
                <span class="search-label">时间：</span>
                <ElDatePicker
                    v-model="date"
                    type="datetimerange"
                    range-separator="-"
                    size="default"
                    @change="timeChange"
                />
            </ElCol>
        </ElRow>
        <ElTable
            id="deviceWarnTable"
            class="table"
            :data="tableData"
            :style="{ height: `${maxTableHeight}px`, overflow: 'auto' }"
        >
            <ElTableColumn prop="deviceId" label="主板" />
            <ElTableColumn prop="stationName" label="微站名称" />
            <ElTableColumn prop="value" label="告警值" />
            <ElTableColumn prop="sensorCode" label="传感器类型" />
            <ElTableColumn prop="alarmDesc" label="告警类型" />
            <!-- <ElTableColumn prop="type" label="告警类型">
                <template #default="scope">
                    <span v-if="scope.row.type === 1">设备告警</span>
                    <span v-else-if="scope.row.type === 2">环境告警</span>
                    <span></span>
                </template>
            </ElTableColumn> -->
            <ElTableColumn prop="createTime" label="时间" />
        </ElTable>
        <ElPagination
            class="pagination"
            background
            layout="total,sizes,prev, pager, next,jumper"
            :total="total"
            :current-page="DevceWarnParams.pageNum"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="DevceWarnParams.pageSize"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { DevceWarnParamsType, warnOptions } from './../ModelDefines';
import useTableSetting from '@/hooks/useTableSetting';
import { alarmList } from '@/api/warn';
import { getStations } from '@/api/device';
import { getFormatDate } from '@/utils/common';
import { getDeviceList } from '@/api/device';
import { storeMenu } from '@/store/app';

const store = storeMenu();

const tableData: any = ref([]);
const DevceWarnParams = reactive<DevceWarnParamsType>({
    alarmType: 1,
    deviceId: '',
    startTime: '',
    endTime: '',
    pageNum: 1,
    pageSize: 20,
    bizModule: store.bizModule,
});
const total = ref<number>(0);
const microStationOptions = ref<any>([]);
const date: any = ref([]);

const timeChange = (val: any) => {
    date.value = val;
    DevceWarnParams.startTime = val[0];
    DevceWarnParams.endTime = val[1];
};

const getList = async () => {
    try {
        const res: any = await alarmList(DevceWarnParams);
        tableData.value = res.list;
        DevceWarnParams.pageNum = res.pageNum;
        DevceWarnParams.pageSize = res.pageSize;
        total.value = res.total;
    } catch (err) {}
};

// 查询微站
// const getStationslist = async () => {
//     try {
//         await getStations({
//             pageNum: 1,
//             pageSize: 20,
//         });
//     } catch (err) { }
// };

const searchChange = () => {
    DevceWarnParams.pageNum = 1;
    getList();
};

const handleSizeChange = (rows: number) => {
    DevceWarnParams.pageNum = 1;
    DevceWarnParams.pageSize = rows;
    getList();
};
const handleCurrentChange = (page: number) => {
    DevceWarnParams.pageNum = page;
    getList();
};

const setDefaultTime = () => {
    DevceWarnParams.endTime = getFormatDate(new Date(), 'YYYY-mm-dd HH:MM:SS');
    DevceWarnParams.startTime = getFormatDate(
        new Date(new Date().getTime() - 7 * 24 * 3600 * 1000),
        'YYYY-mm-dd HH:MM:SS'
    );
    date.value = [DevceWarnParams.startTime, DevceWarnParams.endTime];
    searchChange();
};

// 微站
const stationArr: any = ref([]);
const getStationList = async () => {
    try {
        const res: any = await getDeviceList({ bizModule: store.bizModule });
        stationArr.value = [{ stationName: '全部微站', deviceId: '' }, ...res];
    } catch (err) {}
};

onMounted(() => {
    getStationList();
    setDefaultTime();
    // getList();
});

const { maxTableHeight, setTableMaxHeight } = useTableSetting({ id: 'deviceWarnTable', offsetBottom: 100 });
</script>

<style scoped lang="scss">
.flag-con {
}
</style>
