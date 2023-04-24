<template>
    <div class="main-content warn-con">
        <ElRow class="main-row">
            <ElCol :span="5"
                ><span class="warn-label">告警类型</span>
                <ElSelect v-model="DevceWarnParams.type" placeholder="请选择" size="default">
                    <ElOption v-for="item in warnOptions" :key="item.value" :label="item.label" :value="item.value" />
                </ElSelect>
            </ElCol>
            <ElCol :span="5"
                ><span class="warn-label">微站</span>
                <ElSelect v-model="DevceWarnParams.microStation" placeholder="请选择" size="default">
                    <ElOption
                        v-for="item in microStationOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    /> </ElSelect
            ></ElCol>
            <ElCol :span="6"
                ><span class="warn-label">时间</span>
                <ElDatePicker
                    v-model="dete"
                    type="datetimerange"
                    range-separator="To"
                    @change="timeChange"
                    size="default"
                />
            </ElCol>
            <ElCol :span="3">
                <ElButton type="primary" size="default">搜索</ElButton>
            </ElCol>
        </ElRow>
        <div class="main-content device-con">
            <ElTable
                class="table"
                id="deviceWarnTable"
                :data="tableData"
                :style="{ height: `${maxTableHeight}px`, overflow: 'auto' }"
            >
                <ElTableColumn prop="date" label="主板" />
                <ElTableColumn prop="name" label="微站名称" />
                <ElTableColumn prop="address" label="告警值" />
                <ElTableColumn prop="address" label="传感器类型" />
                <ElTableColumn prop="address" label="告警类型" />
                <ElTableColumn prop="address" label="时间" />
            </ElTable>
            <ElPagination class="pagination" background layout="prev, pager, next" :total="1000" />
        </div>
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
import { DevceWarnParams } from './../ModelDefines';
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

const warnOptions = ref<any>([{ label: '告警类型', value: 0 }]);
const microStationOptions = ref<any>([{ label: '微站', value: 0 }]);
const date: any = ref([]);

const timeChange = (val: any) => {
    date.value = val;
    DevceWarnParams.startTime = val[0];
    DevceWarnParams.endTime = val[1];
};

const { maxTableHeight, setTableMaxHeight } = useTableSetting({ id: 'deviceWarnTable', offsetBottom: 100 });
</script>

<style scoped lang="scss">
.warn-con {
}
.main-row {
    .el-col {
        display: flex;

        .warn-label {
            min-width: 40px;
            white-space: nowrap;
            padding-right: 10px;
            line-height: 32px;
        }
    }
}
</style>
