<template>
    <div class="main-content flag-con">
        <ElRow class="search-row">
            <ElCol :span="6">
                <span class="search-label">时间：</span>
                <ElDatePicker v-model="date" type="datetimerange" range-separator="-" size="default" @change="timeChange" />
            </ElCol>
        </ElRow>
        <ElTable id="flagTable" class="table" :data="tableData"
            :style="{ height: `${maxTableHeight}px`, overflow: 'auto' }">
            <ElTableColumn prop="userName" label="用户名" />
            <ElTableColumn prop="operationContent" label="操作" />
            <ElTableColumn prop="operationTime" label="时间" />
        </ElTable>
        <ElPagination class="pagination" background layout="total,sizes,prev, pager, next,jumper" :total="total"
            :current-page="params.pageNum" :page-sizes="[10, 20, 50, 100]" :page-size="params.pageSize"
            @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import useTableSetting from '@/hooks/useTableSetting';
import { operationLog } from '@/api/system';
import { ParamsType } from './ModelDefines';
import { getFormatDate } from '@/utils/common';

const tableData: any = ref([]);

const date: any = ref([]);
const params = reactive<ParamsType>({
    userName: '',
    startTime: '',
    endTime: '',
    pageNum: 1,
    pageSize: 20,
});
const total = ref<number>(0);
const getList = async () => {
    try {
        const res: any = await operationLog(params);
        tableData.value = res.list;
        params.pageNum = res.pageNum;
        params.pageSize = res.pageSize;
        total.value = res.total;
    } catch (err) { }
};

const timeChange = (val: any) => {
    date.value = val;
    params.startTime = val[0] ? getFormatDate(new Date(val[0]), 'YYYY-mm-dd HH:MM:SS') : '';
    params.endTime = val[1] ? getFormatDate(new Date(val[1]), 'YYYY-mm-dd HH:MM:SS') : '';
    params.pageNum = 1;
    getList();
};

const handleSizeChange = (rows: number) => {
    params.pageNum = 1;
    params.pageSize = rows;
    getList();
};
const handleCurrentChange = (page: number) => {
    params.pageNum = page;
    getList();
};

onMounted(() => {
    getList();
});

const { maxTableHeight, setTableMaxHeight } = useTableSetting({ id: 'flagTable', offsetBottom: 100 });
</script>

<style scoped lang="scss">
.flag-con {}
</style>
