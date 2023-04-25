<template>
    <div class="main-content warn-con">
        <ElRow class="search-row">
            <ElCol :span="6"
                ><span class="search-label">告警类型：</span>
                <ElSelect v-model="AirWarnParams.type" placeholder="请选择" size="default">
                    <ElOption v-for="item in warnOptions" :key="item.value" :label="item.label" :value="item.value" />
                </ElSelect>
            </ElCol>
            <ElCol :span="6"
                ><span class="search-label">微站选择：</span>
                <ElSelect v-model="AirWarnParams.microStation" placeholder="请选择" size="default">
                    <ElOption
                        v-for="item in microStationOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    /> </ElSelect
            ></ElCol>
            <ElCol :span="8"
                ><span class="search-label">时间：</span>
                <ElDatePicker
                    v-model="date"
                    type="datetimerange"
                    range-separator="To"
                    @change="timeChange"
                    size="default"
                />
            </ElCol>
            <ElCol :span="6"
                ><span class="search-label">传感器类型：</span>
                <ElSelect v-model="AirWarnParams.sensorType" placeholder="请选择" size="default">
                    <ElOption
                        v-for="item in sensorTypeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    /> </ElSelect
            ></ElCol>
            <ElCol :span="5">
                <ElCheckbox class="search-checkbox" size="default" v-model="AirWarnParams.closeType"
                    >筛选未关闭</ElCheckbox
                >
            </ElCol>
        </ElRow>
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
            <ElTableColumn prop="address" fixed="right" label="操作">
                <template #default>
                    <ElButton link type="primary" size="default"> 关闭告警 </ElButton>
                    <ElButton link type="primary" size="default"> 已关闭 </ElButton>
                </template>
            </ElTableColumn>
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
    ElCheckbox,
} from 'element-plus';
import { ref, reactive } from 'vue';
import { AirWarnParams } from './../ModelDefines';
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
const sensorTypeOptions = ref<any>([{ label: 'PM2.5', value: 0 }]);
const closeType = ref<any>([{ label: '已关闭', value: 0 }]);
const date: any = ref([]);

const timeChange = (val: any) => {
    date.value = val;
    AirWarnParams.startTime = val[0];
    AirWarnParams.endTime = val[1];
};

const { maxTableHeight, setTableMaxHeight } = useTableSetting({ id: 'deviceWarnTable', offsetBottom: 100 });
</script>

<style scoped lang="scss">
.warn-con {
}
</style>