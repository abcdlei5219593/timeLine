<template>
    <div class="main-content device-con">
        <ElTable id="sensorTable" class="table" :data="tableData"
            :style="{ height: `${maxTableHeight}px`, overflow: 'auto' }">
            <ElTableColumn prop="date" label="主板ID" />
            <ElTableColumn prop="name" label="传感器类型" />
            <ElTableColumn prop="address" label="校准" />
            <ElTableColumn prop="address" label="预警阈值" />
            <ElTableColumn prop="address" label="告警阈值" />
            <ElTableColumn prop="address" label="严重告警阈值" />
            <ElTableColumn prop="address" fixed="right" label="操作">
                <template #default>
                    <ElButton link type="primary" size="default" @click="calibrationFun">
                        校准
                    </ElButton>
                    <ElButton link type="primary" size="default" @click="setThreshold">
                        设置阈值
                    </ElButton>
                </template>
            </ElTableColumn>
        </ElTable>
        <ElPagination class="pagination" background layout="total,sizes,prev, pager, next,jumper" :total="1000" />
    </div>
    <!--校准-->
    <ElDialog v-model="isCalibration" title="校准" width="30%">
        <div class="device-dialog">
            <p>校准</p>
            <ElInput v-model="intervalTime" type="number" placeholder="请输入" size="default" />
        </div>
        <span slot="footer" class="dialog-footer">
            <ElButton size="default" @click="isCalibration = false">取 消</ElButton>
            <ElButton type="primary" size="default" @click="isCalibration = false">保存提交</ElButton>
        </span>
    </ElDialog>
    <!--设置阈值-->
    <ElDialog v-model="isThreshold" title="阈值设置" width="30%">
        <div class="device-dialog">
            <ElForm ref="form" :model="formData" label-width="120px" label-position="top" class="demo-ruleForm">
                <ElFormItem label="预警阈值" prop="pass">
                    <el-input v-model.number="formData.warning" size="default" />
                </ElFormItem>
                <ElFormItem label="告警阈值" prop="checkPass">
                    <el-input v-model.number="formData.alarm" size="default" />
                </ElFormItem>
                <ElFormItem label="严重告警阈值" prop="age">
                    <el-input v-model.number="formData.seriousAlarm" size="default" />
                </ElFormItem>
            </ElForm>
        </div>
        <span slot="footer" class="dialog-footer">
            <ElButton size="default" @click="isThreshold = false">取 消</ElButton>
            <ElButton type="primary" size="default" @click="isThreshold = false">保存提交</ElButton>
        </span>
    </ElDialog>
</template>

<script lang="ts" setup>
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
} from 'element-plus';
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import useTableSetting from '@/hooks/useTableSetting';
import { FormData } from './../ModelDefines';

const router = useRouter();

const formData = reactive(FormData);

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
// 是否显示校准弹窗
const isCalibration = ref<boolean>(false);
// 是否显示阈值弹窗
const isThreshold = ref<boolean>(false);
const calibrationFun = () => {
    isCalibration.value = true;
};
const setThreshold = () => {
    isThreshold.value = true;
};
const { maxTableHeight, setTableMaxHeight } = useTableSetting({ id: 'sensorTable', offsetBottom: 100 });
</script>

<style scoped lang="scss">
:deep(.el-dialog__body) {
    padding: 0 24px 24px 24px !important;
}

.device-dialog {
    height: 240px;

    p {
        color: #000;
        font-size: 14px;
        margin-bottom: 10px;
    }
}
</style>
