<template>
    <div class="main-content history-con">
        <ElRow class="search-row">
            <ElCol :span="6">
                <span class="search-label">微站选择：</span>
                <ElSelect v-model="params.stationId" placeholder="请选择" size="default" @change="searchChange">
                    <ElOption v-for="(item, i) in stationArr" :key="i" :label="item.stationName" :value="item.stationId" />
                </ElSelect>
            </ElCol>
            <ElCol :span="8">
                <span class="search-label">时间：</span>
                <ElDatePicker v-model="date" type="datetimerange" range-separator="-" size="default" @change="timeChange" />
            </ElCol>
        </ElRow>
        <ElTable
            id="historyTable" class="table" :data="tableData"
            :style="{ height: `${maxTableHeight}px`, overflow: 'auto' }"
        >
            <ElTableColumn prop="deviceId" label="名称" width="150" />
            <ElTableColumn
                v-for="(item, index) in appStore.currentApp.meta.stasticsColumns"
                :key="index"
                :label="item.label"
                :width="item.width"
            >
                <template #default="scope">
                    <div v-if="item.prop && scope.row[item.prop] ">
                        {{ scope.row[item.prop] }}
                    </div>
                    <div v-else>
                        /
                    </div>
                </template>
            </ElTableColumn>
            <ElTableColumn prop="createTime" label="上传时间" width="170" />
        </ElTable>
        <ElPagination
            class="pagination" background layout="total,sizes,prev, pager, next,jumper" :total="total"
            :current-page="params.pageNum" :page-sizes="[10, 20, 50, 100]" :page-size="params.pageSize"
            @size-change="handleSizeChange" @current-change="handleCurrentChange"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import useTableSetting from '@/hooks/useTableSetting';
import http from '@/api/analyse';
import { getFormatDate } from '@/utils/common';
import { storeMenu } from '@/store/app';
import { getDeviceList } from '@/api/device';
import { useSettingStore } from '@/store/app';

const store = storeMenu();
const appStore = useSettingStore();

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
        const res: any = await http[appStore.currentApp.url].getMonitorData(params.value);
        tableData.value = res.list;
        params.value.pageNum = res.pageNum;
        params.value.pageSize = res.pageSize;
        total.value = res.total;
    } catch (err) { }
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
    } catch (err) { }
};

onMounted(() => {
    getStationList();
    setDefaultTime();
    // getList();
});

const { maxTableHeight, setTableMaxHeight } = useTableSetting({ id: 'historyTable', offsetBottom: 120 });
</script>

<style scoped lang="scss">
.history-con {}
</style>

