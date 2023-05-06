<template>
    <div class="main-content history-con">
        <ElRow class="search-row">
            <ElCol :span="6">
                <span class="search-label">微站选择：</span>
                <ElSelect v-model="params.stationId" placeholder="请选择" size="default" @change="searchChange">
                    <ElOption
                        v-for="(item, i) in stationArr"
                        :key="i"
                        :label="item.stationName"
                        :value="item.stationId"
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
            id="historyTable"
            class="table"
            :data="tableData"
            :style="{ height: `${maxTableHeight}px`, overflow: 'auto' }"
        >
            <ElTableColumn prop="deviceId" label="名称" width="150" />
            <ElTableColumn prop="aqi" label="AQI" />
            <ElTableColumn prop="pm10" label="PM10（ug/m3）" />
            <ElTableColumn prop="pm25" label="PM2.5（ug/m3）" />
            <ElTableColumn prop="co" label="一氧化碳（ug/m3）" />
            <ElTableColumn prop="no2" label="二氧化氮（ug/m3）" />
            <ElTableColumn prop="o3" label="臭氧（ug/m3）" />
            <ElTableColumn prop="so2" label="二氧化硫（ug/m3）" />
            <ElTableColumn prop="temp" label="温度" />
            <ElTableColumn prop="humi" label="湿度" />
            <ElTableColumn prop="wsp" label="风速" />
            <ElTableColumn prop="" label="风压">
                <template #default="scope">
                    <p>/</p>
                </template>
            </ElTableColumn>
            <ElTableColumn prop="wd" label="风向" />
            <ElTableColumn prop="createTime" label="上传时间" width="170" />
        </ElTable>
        <ElPagination
            class="pagination"
            background
            layout="total,sizes,prev, pager, next,jumper"
            :total="total"
            :current-page="params.pageNum"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="params.pageSize"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import useTableSetting from '@/hooks/useTableSetting';
import { getMonitorData } from '@/api/analyse';
import { getFormatDate } from '@/utils/common';
import { storeMenu } from '@/store/app';
import { getDeviceList } from '@/api/device';

const store = storeMenu();

const tableData: any = ref([]);
const total: any = ref(0);

const date: any = ref([]);
const params: any = ref({
    pageNum: 1,
    pageSize: 20,
    startTime: '',
    endTime: '',
    stationId: '',
});

const timeChange = (val: any) => {
    date.value = val;
    params.value.startTime = val[0] ? getFormatDate(new Date(val[0]), 'YYYY-mm-dd HH:MM:SS') : '';
    params.value.endTime = val[1] ? getFormatDate(new Date(val[1]), 'YYYY-mm-dd HH:MM:SS') : '';
    params.value.pageNum = 1;
    getList();
};
const searchChange = () => {
    params.value.pageNum = 1;
    getList();
};

const setDefaultTime = () => {
    params.value.endTime = getFormatDate(new Date(), 'YYYY-mm-dd HH:MM:SS');
    params.value.startTime = getFormatDate(
        new Date(new Date().getTime() - 7 * 24 * 3600 * 1000),
        'YYYY-mm-dd HH:MM:SS'
    );
    date.value = [params.value.startTime, params.value.endTime];
    searchChange();
};

const getList = async () => {
    try {
        const res: any = await getMonitorData(params.value);
        tableData.value = res.list;
        params.value.pageNum = res.pageNum;
        params.value.pageSize = res.pageSize;
        total.value = res.total;
    } catch (err) {}
};
const handleSizeChange = (rows: number) => {
    params.value.pageNum = 1;
    params.value.pageSize = rows;
    getList();
};
const handleCurrentChange = (page: number) => {
    params.value.pageNum = page;
    getList();
};

const stationArr: any = ref([]);
const getStationList = async () => {
    try {
        const res: any = await getDeviceList({ bizModule: store.bizModule });
        stationArr.value = [{ stationName: '全部微站', stationId: '' }, ...res];
    } catch (err) {}
};

onMounted(() => {
    getStationList();
    setDefaultTime();
    // getList();
});

const { maxTableHeight, setTableMaxHeight } = useTableSetting({ id: 'historyTable', offsetBottom: 120 });
</script>

<style scoped lang="scss">
.history-con {
}
</style>

