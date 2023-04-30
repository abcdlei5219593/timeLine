<template>
    <div class="main-content history-con">
        <ElRow class="search-row">
            <ElCol :span="5">
                <span class="search-label">微站选择：</span>
                <ElSelect v-model="params.microStation" placeholder="请选择" size="default">
                    <ElOption v-for="item in microStationOptions" :key="item.value" :label="item.label"
                        :value="item.value" />
                </ElSelect>
            </ElCol>
            <ElCol :span="6">
                <span class="search-label">时间：</span>
                <ElDatePicker v-model="date" type="datetimerange" range-separator="To" size="default"
                    @change="timeChange" />
            </ElCol>
        </ElRow>
        <ElTable id="historyTable" class="table" :data="tableData"
            :style="{ height: `${maxTableHeight}px`, overflow: 'auto' }">
            <ElTableColumn prop="date" label="用户名" />
            <ElTableColumn prop="name" label="操作" />
            <ElTableColumn prop="address" label="时间" />
        </ElTable>
        <ElPagination class="pagination" background layout="total,sizes,prev, pager, next,jumper" :total="1000" />
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import useTableSetting from '@/hooks/useTableSetting';
import { getMonitorData } from '@/api/analyse';


const tableData: any = ref([]);

const date: any = ref([]);
const params: any = ref({});
const microStationOptions = ref<any>([{ label: '微站', value: 0 }]);

const timeChange = (val: any) => {
    date.value = val;
    params.value.startTime = val[0];
    params.value.endTime = val[1];
};

const getList = async () => {
    try {
        tableData.value = await getMonitorData();
    } catch (err) { }
};
onMounted(() => {
    getList();
});

const { maxTableHeight, setTableMaxHeight } = useTableSetting({ id: 'historyTable', offsetBottom: 120 });
</script>

<style scoped lang="scss">
.history-con {}
</style>

