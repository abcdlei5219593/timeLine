<template>
    <div class="main-content flag-con">
        <ElRow class="search-row">
            <ElCol :span="6"
                ><span class="search-label">时间：</span>
                <ElDatePicker
                    v-model="date"
                    type="datetimerange"
                    range-separator="To"
                    @change="timeChange"
                    size="default"
                />
            </ElCol>
        </ElRow>
        <ElTable
            class="table"
            id="flagTable"
            :data="tableData"
            :style="{ height: `${maxTableHeight}px`, overflow: 'auto' }"
        >
            <ElTableColumn prop="date" label="用户名" />
            <ElTableColumn prop="name" label="操作" />
            <ElTableColumn prop="address" label="时间" />
        </ElTable>
        <ElPagination class="pagination" background layout="total,sizes,prev, pager, next,jumper" :total="1000" />
    </div>
</template>

<script setup lang="ts">
import {
    ElTable,
    ElTableColumn,
    ElPagination,
    ElDialog,
    ElButton,
    ElInput,
    ElRow,
    ElCol,
    ElForm,
    ElFormItem,
    ElSelect,
    ElDatePicker,
} from 'element-plus';
import { ref, reactive } from 'vue';
import useTableSetting from '@/hooks/useTableSetting';

const tableData = [
    {
        date: '2016-05-03',
        name: 'Tom',
        address: '1111',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: '1111',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: '1111',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: '1111',
    },
];

const date: any = ref([]);
const params: any = ref({});

const timeChange = (val: any) => {
    date.value = val;
    params.startTime = val[0];
    params.endTime = val[1];
};

const { maxTableHeight, setTableMaxHeight } = useTableSetting({ id: 'flagTable', offsetBottom: 100 });
</script>

<style scoped lang="scss">
.flag-con {
}
</style>
