<template>
    <div class="main-content device-con">
        <ElTable class="table" :data="tableData" :height="tableHeight" style="width: 100%">
            <ElTableColumn prop="date" label="主板" />
            <ElTableColumn prop="name" label="微站名称" />
            <ElTableColumn prop="address" label="微站地址" />
            <ElTableColumn prop="address" label="硬件版本" />
            <ElTableColumn prop="address" label="软件版本" />
            <ElTableColumn prop="address" label="经度" />
            <ElTableColumn prop="address" label="维度" />
            <ElTableColumn prop="address" label="状态" />
            <ElTableColumn prop="address" fixed="right" label="操作">
                <template #default>
                    <ElButton link type="primary" size="small" @click="reportInterval">上报间隔</ElButton>
                    <ElButton link type="primary" size="small" @click="toSensor">传感器</ElButton>
                    <ElButton link type="primary" size="small">重启</ElButton>
                </template>
            </ElTableColumn>
        </ElTable>
        <ElPagination class="pagination" background layout="prev, pager, next" :total="1000" />
    </div>

    <!--上报间隔-->
    <ElDialog title="上报间隔时间设置" v-model="isTimeSet" width="30%">
        <div class="device-dialog">
            <ElRow>
                <ElCol :span="8">间隔时间</ElCol>
                <ElCol :span="16"
                    ><ElInput type="number" v-model="intervalTime" placeholder="请输入内容"></ElInput
                ></ElCol>
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { setTableHeight } from '@/utils/tableHeight';

const router = useRouter();

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

const isTimeSet = ref<Boolean>(false);

const intervalTime = ref<Number>(0);

const reportInterval = () => {
    isTimeSet.value = true;
};

const toSensor = () => {
    router.push('/app/airContent/device/Sensor');
};

//table高度自适应
const tableHeight = ref<number>(setTableHeight(720));
window.addEventListener('resize', () => {
    tableHeight.value = setTableHeight(720);
});
</script>

<style scoped lang="scss">
.device-con {
}
.device-dialog {
    height: 100px;
    display: flex;
}
</style>
