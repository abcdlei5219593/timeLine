<template>
    <div class="main-content device-con">
        <ElTable id="deviceTable" class="table" :data="tableData"
            :style="{ height: `${maxTableHeight}px`, overflow: 'auto' }">
            <ElTableColumn prop="deviceId" label="主板" />
            <ElTableColumn prop="stationName" label="微站名称" />
            <ElTableColumn prop="stationAdress" label="微站地址" />
            <ElTableColumn prop="hv" label="硬件版本" />
            <ElTableColumn prop="sv" label="软件版本" />
            <ElTableColumn prop="longitude" label="经度" />
            <ElTableColumn prop="latitude" label="纬度" />
            <ElTableColumn prop="status" label="状态">
                <template #default="scope">
                    <span v-if="scope.row.status === 1">在线</span>
                    <span v-else-if="scope.row.status === 2">离线</span>
                </template>
            </ElTableColumn>
            <ElTableColumn prop="address" fixed="right" label="操作" width="200">
                <template #default="scope">
                    <ElButton link type="primary" size="default" @click="reportInterval(scope.row)">
                        上报间隔
                    </ElButton>
                    <ElButton link type="primary" size="default" @click="toSensor(scope.row)">
                        传感器
                    </ElButton>
                    <ElButton link type="primary" size="default" class="red-text-btn">
                        重启
                    </ElButton>
                </template>
            </ElTableColumn>
        </ElTable>
    </div>

    <!--上报间隔-->
    <ElDialog v-model="isTimeSet" title="上报间隔时间设置" width="30%">
        <div class="device-dialog">
            <ElRow>
                <ElCol :span="8">
                    间隔时间
                </ElCol>
                <ElCol :span="16">
                    <ElInput v-model="intervalTime" type="number" placeholder="请输入内容"></ElInput>
                </ElCol>
            </ElRow>
        </div>
        <span slot="footer" class="dialog-footer">
            <ElButton @click="isTimeSet = false">取 消</ElButton>
            <ElButton type="primary" @click="isTimeSet = false">保存提交</ElButton>
        </span>
    </ElDialog>
</template>

<script lang="ts" setup>
import { ElTable, ElTableColumn, ElPagination, ElDialog, ElButton, ElInput, ElRow, ElCol } from 'element-plus';
import { ref, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import useTableSetting from '@/hooks/useTableSetting';
import { deviceList } from '@/api/device';

const router = useRouter();

const tableData = ref([]);

const isTimeSet = ref<boolean>(false);

const intervalTime = ref<number>(0);

const reportInterval = () => {
    isTimeSet.value = true;
};

const toSensor = (row: any) => {
    router.push({ path: '/app/airContent/device/Sensor', query: { deviceId: row.deviceId } });
};
const getList = async () => {
    try {
        const res: any = await deviceList();
        tableData.value = res;
    } catch (err) { }
};

onMounted(() => {
    getList();
});

const { maxTableHeight, setTableMaxHeight } = useTableSetting({ id: 'deviceTable', offsetBottom: 20 });
</script>

<style scoped lang="scss">
.device-con {}

.device-dialog {
    height: 100px;
    display: flex;
}

.red-text-btn {
    color: $redTextBtnColor;
}
</style>
