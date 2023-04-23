<template>
    <div class="main-content device-con">
        <el-table class="table" :data="tableData" :height="tableHeight" style="width: 100%">
            <el-table-column prop="date" label="主板ID" />
            <el-table-column prop="name" label="传感器类型" />
            <el-table-column prop="address" label="校准" />
            <el-table-column prop="address" label="预警阈值" />
            <el-table-column prop="address" label="告警阈值" />
            <el-table-column prop="address" label="严重告警阈值" />
            <el-table-column prop="address" fixed="right" label="操作">
                <template #default>
                    <el-button link type="primary" size="small" @click="calibrationFun">校准</el-button>
                    <el-button link type="primary" size="small">设置阈值</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="pagination" background layout="prev, pager, next" :total="1000" />
    </div>
    <!--校准-->
    <el-dialog title="校准" v-model="isCalibration" width="30%">
        <div class="device-dialog">
            <el-row>
                <el-col :span="8">间隔时间</el-col>
                <el-col :span="16"
                    ><el-input type="number" v-model="intervalTime" placeholder="请输入内容"></el-input
                ></el-col>
            </el-row>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="isCalibration = false">取 消</el-button>
            <el-button type="primary" @click="isCalibration = false">保存提交</el-button>
        </span>
    </el-dialog>
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