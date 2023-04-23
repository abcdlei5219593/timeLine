<template>
    <div class="main-content device-con">
        <ElTable class="table" :data="tableData" :height="tableHeight" style="width: 100%">
            <ElTableColumn prop="date" label="主板ID" />
            <ElTableColumn prop="name" label="传感器类型" />
            <ElTableColumn prop="address" label="校准" />
            <ElTableColumn prop="address" label="预警阈值" />
            <ElTableColumn prop="address" label="告警阈值" />
            <ElTableColumn prop="address" label="严重告警阈值" />
            <ElTableColumn prop="address" fixed="right" label="操作">
                <template #default>
                    <ElButton link type="primary" size="small" @click="calibrationFun">校准</ElButton>
                    <ElButton link type="primary" size="small">设置阈值</ElButton>
                </template>
            </ElTableColumn>
        </ElTable>
        <ElPagination class="pagination" background layout="prev, pager, next" :total="1000" />
    </div>
    <!--校准-->
    <ElDialog title="校准" v-model="isCalibration" width="30%">
        <div class="device-dialog">
            <ElRow>
                <ElCol :span="8">间隔时间</ElCol>
                <ElCol :span="16"
                    ><ElInput type="number" v-model="intervalTime" placeholder="请输入内容"></ElInput
                ></ElCol>
            </ElRow>
        </div>
        <span slot="footer" class="dialog-footer">
            <ElButton @click="isCalibration = false">取 消</ElButton>
            <ElButton type="primary" @click="isCalibration = false">保存提交</ElButton>
        </span>
    </ElDialog>
    <!--设置阈值-->
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
const isCalibration = ref<Boolean>(false);
const calibrationFun = () => {
    isCalibration.value = true;
};

//table高度自适应
const tableHeight = ref<number>(setTableHeight(720));
window.addEventListener('resize', () => {
    tableHeight.value = setTableHeight(720);
});
</script>
<style scoped lang="scss">
.device-dialog {
    height: 100px;
    display: flex;
}
</style>