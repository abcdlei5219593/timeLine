<template>
    <div class="main-content">
        <el-table class="table" :data="tableData" :height="tableHeight" style="width: 100%">
            <el-table-column prop="date" label="主板" />
            <el-table-column prop="name" label="微站名称" />
            <el-table-column prop="address" label="微站地址" />
            <el-table-column prop="address" label="硬件版本" />
            <el-table-column prop="address" label="软件版本" />
            <el-table-column prop="address" label="经度" />
            <el-table-column prop="address" label="维度" />
            <el-table-column prop="address" label="状态" />
            <el-table-column prop="address" fixed="right" label="操作">
                <template #default>
                    <el-button link type="primary" size="small">上报间隔</el-button>
                    <el-button link type="primary" size="small">传感器</el-button>
                    <el-button link type="primary" size="small">重启</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="pagination" background layout="prev, pager, next" :total="1000" />
    </div>
</template>

<script lang="ts" setup>
import { ElTable, ElTableColumn, ElPagination } from 'element-plus';
import { ref } from 'vue';
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

//table高度自适应
const tableHeight = ref(0);
const heightInit = (height: number) => {
    const lastH = 937 - height;
    tableHeight.value = document.body.clientHeight - lastH;
};
heightInit(720);
window.addEventListener('resize', () => {
    heightInit(720);
});
</script>

<style scoped lang="scss">
</style>
