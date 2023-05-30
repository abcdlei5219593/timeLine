<template>
    <div class="main-content warn-con">
        <ElRow class="search-row">
            <ElCol :span="6">
                <span class="search-label">微站选择：</span>
                <ElSelect v-model="AirWarnParams.deviceId" placeholder="请选择" size="default" @change="searchChange">
                    <ElOption
                        v-for="item in stationArr"
                        :key="item.deviceId"
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
            <ElCol :span="6">
                <span class="search-label">传感器类型：</span>
                <ElSelect v-model="AirWarnParams.sensorCode" placeholder="请选择" size="default" @change="searchChange">
                    <ElOption
                        v-for="item in sensorTypeOptions"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code"
                    />
                </ElSelect>
            </ElCol>
            <ElCol :span="2" @change="searchChange">
                <ElCheckbox v-model="AirWarnParams.unclosed" class="search-checkbox" size="default">
                    筛选{{ AirWarnParams.unclosed ? '关闭' : '未关闭' }}
                </ElCheckbox>
            </ElCol>
        </ElRow>
        <ElTable
            id="deviceWarnTable"
            class="table"
            :data="tableData"
            :style="{ height: `${maxTableHeight}px`, overflow: 'auto' }"
        >
            <!-- <ElTableColumn prop="deviceId" label="编号" /> -->
            <ElTableColumn prop="stationName" label="微站名称" />
            <ElTableColumn prop="status" label="值" />
            <ElTableColumn prop="sensorCode" label="传感器类型" />
            <ElTableColumn prop="status" label="状态">
                <template #default="scope">
                    <span v-if="scope.row.status === 1">告警中</span>
                    <span v-else-if="scope.row.status === 0">已关闭</span>
                </template>
            </ElTableColumn>
            <!-- <ElTableColumn prop="type" label="告警类型">
                <template #default="scope">
                    <span v-if="scope.row.type === 1">设备告警</span>
                    <span v-else-if="scope.row.type === 2">环境告警</span>
                    <span></span>
                </template>
            </ElTableColumn> -->
            <ElTableColumn prop="createTime" label="时间" />
            <ElTableColumn fixed="right" label="操作">
                <template #default="scope">
                    <ElButton
                        v-if="scope.row.status === 1"
                        v-permission="'/closeWarn'"
                        link
                        type="primary"
                        size="default"
                        @click="closeFun(scope.row.id)"
                    >
                        关闭告警
                    </ElButton>
                    <p v-else-if="scope.row.status === 0">已关闭</p>
                </template>
            </ElTableColumn>
        </ElTable>
        <ElPagination
            class="pagination"
            background
            layout="total,sizes,prev, pager, next,jumper"
            :total="total"
            :current-page="AirWarnParams.pageNum"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="AirWarnParams.pageSize"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
    </div>
</template>

<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus';
import { ref, reactive, onMounted } from 'vue';
import { AirWarnParamsType, warnOptions } from './../ModelDefines';
import useTableSetting from '@/hooks/useTableSetting';
import { getDataDictionary, getMeasureList } from '@/api/system';
import { alarmList, alarmClose } from '@/api/warn';
import { getFormatDate } from '@/utils/common';
import { getDeviceList } from '@/api/device';
import { storeMenu } from '@/store/app';

const store = storeMenu();

const tableData: any = ref([]);

const microStationOptions = ref<any>([]);
// const sensorTypeOptions = ref<any>([{ label: 'PM2.5', value: 0 }]);
const sensorTypeOptions = ref<any>([]);
const date: any = ref([]);

const AirWarnParams = reactive<AirWarnParamsType>({
    alarmType: 2,
    deviceId: '',
    startTime: '',
    endTime: '',
    sensorCode: '',
    unclosed: false,
    pageNum: 1,
    pageSize: 20,
    bizModule: store.bizModule,
});
const total = ref<number>(0);
const timeChange = (val: any) => {
    date.value = val;
    AirWarnParams.startTime = getFormatDate(new Date(val[0]), 'YYYY-mm-dd HH:MM:SS');
    AirWarnParams.endTime = getFormatDate(new Date(val[1]), 'YYYY-mm-dd HH:MM:SS');
    AirWarnParams.pageNum = 1;
    getList();
};

const getList = async () => {
    try {
        const res: any = await alarmList(AirWarnParams);
        tableData.value = res.list;
        AirWarnParams.pageNum = res.pageNum;
        AirWarnParams.pageSize = res.pageSize;
        total.value = res.total;
    } catch (err) {}
};

const searchChange = () => {
    AirWarnParams.pageNum = 1;
    getList();
};

const setDefaultTime = () => {
    AirWarnParams.endTime = getFormatDate(new Date(), 'YYYY-mm-dd HH:MM:SS');
    AirWarnParams.startTime = getFormatDate(
        new Date(new Date().getTime() - 7 * 24 * 3600 * 1000),
        'YYYY-mm-dd HH:MM:SS'
    );
    date.value = [AirWarnParams.startTime, AirWarnParams.endTime];
    searchChange();
};

const handleSizeChange = (rows: number) => {
    AirWarnParams.pageNum = 1;
    AirWarnParams.pageSize = rows;
    getList();
};
const handleCurrentChange = (page: number) => {
    AirWarnParams.pageNum = page;
    getList();
};

const alarmIdArr: any = ref([]);
// 关闭操作
const closeFun = async (alarmId: number) => {
    alarmIdArr.value = [];
    alarmIdArr.value.push(alarmId);
    ElMessageBox.confirm('确定关闭告警?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        buttonSize: 'default',
    })
        .then(async () => {
            try {
                await alarmClose(alarmIdArr.value);
                ElMessage.success('操作成功');
                getList();
            } catch (err) {}
        })
        .catch(() => {});
};

// 微站
const stationArr: any = ref([]);
const getStationList = async () => {
    try {
        const res: any = await getDeviceList({ bizModule: store.bizModule });
        stationArr.value = [{ stationName: '全部微站', deviceId: '' }, ...res];
    } catch (err) {}
};

// 获取传感器类型
const getMeasureListInfo = async () => {
    const res: any = await getMeasureList({ bizModule: store.bizModule });
    sensorTypeOptions.value = [{ name: '全部', code: '' }, ...res];
};

onMounted(() => {
    getMeasureListInfo();
    getStationList();
    setDefaultTime();
    // getList();
});

const { maxTableHeight, setTableMaxHeight } = useTableSetting({ id: 'deviceWarnTable', offsetBottom: 100 });
</script>

<style scoped lang="scss">
.warn-con {
}
</style>
