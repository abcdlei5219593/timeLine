<template>
    <div class="main-content device-con">
        <ElTable
            id="sensorTable"
            class="table"
            :data="tableData"
            :style="{ height: `${maxTableHeight}px`, overflow: 'auto' }"
        >
            <ElTableColumn prop="deviceId" label="编号ID" />
            <ElTableColumn prop="sensorCode" label="传感器类型" />
            <ElTableColumn prop="standardValue" label="校准" />
            <ElTableColumn prop="threshold1" label="预警阈值" />
            <ElTableColumn prop="threshold2" label="告警阈值" />
            <ElTableColumn prop="threshold3" label="严重告警阈值" />
            <ElTableColumn fixed="right" label="操作">
                <template #default="scoped">
                    <ElButton
                        link
                        type="primary"
                        size="default"
                        v-permission="'/setThreshold'"
                        @click="setShowFun(scoped.row)"
                    >
                        设置阈值
                    </ElButton>
                </template>
            </ElTableColumn>
        </ElTable>
        <!-- <ElPagination class="pagination" background layout="total,sizes,prev, pager, next,jumper" :total="1000" /> -->
    </div>

    <!--设置阈值-->
    <ElDialog class="dialog" v-model="isThreshold" title="阈值设置" width="30%">
        <div class="device-dialog">
            <ElForm ref="form" :model="formData" label-width="120px" label-position="top" class="demo-ruleForm">
                <ElFormItem label="预警阈值" prop="threshold1">
                    <el-input v-model.number="formData.threshold1" size="default" />
                </ElFormItem>
                <ElFormItem label="告警阈值" prop="threshold2">
                    <el-input v-model.number="formData.threshold2" size="default" />
                </ElFormItem>
                <ElFormItem label="严重告警阈值" prop="threshold3">
                    <el-input v-model.number="formData.threshold3" size="default" />
                </ElFormItem>
            </ElForm>
        </div>
        <span slot="footer" class="dialog-footer">
            <ElButton size="default" @click="isThreshold = false">取 消</ElButton>
            <ElButton type="primary" size="default" @click="setThreshold">保存提交</ElButton>
        </span>
    </ElDialog>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import useTableSetting from '@/hooks/useTableSetting';
import { FormType } from './../ModelDefines';
import { getSensors, deviceSet } from '@/api/device';
import { ElMessage } from 'element-plus';
import { storeMenu } from '@/store/app';
const store = storeMenu();

const router = useRoute();

const formData = reactive<FormType>({
    deviceId: null,
    sensorCode: null,
    threshold1: null,
    threshold2: null,
    threshold3: null,
    bizModule: store.bizModule,
});

const tableData: any = ref([]);

// 是否显示阈值弹窗
const isThreshold = ref<boolean>(false);

// 设置阈值调用接口
const setThreshold = async () => {
    try {
        const res: any = await deviceSet(formData);
        ElMessage.success('操作成功');
        isThreshold.value = false;
        getSensorsList(formData.deviceId);
    } catch (err) {}
};

const getSensorsList = async (deviceId: any) => {
    try {
        const res: any = await getSensors({ deviceId: deviceId, bizModule: store.bizModule });
        tableData.value = res;
    } catch (err) {}
};
// 显示设置阈值
const setShowFun = (row: any) => {
    formData.sensorCode = row.sensorCode;
    formData.threshold1 = row.threshold1;
    formData.threshold2 = row.threshold2;
    formData.threshold3 = row.threshold3;
    isThreshold.value = true;
};

onMounted(() => {
    const res: any = router.query.deviceId;
    formData.deviceId = res;
    getSensorsList(router.query.deviceId);
});

const { maxTableHeight, setTableMaxHeight } = useTableSetting({ id: 'sensorTable', offsetBottom: 20 });
</script>

<style scoped lang="scss">
:deep(.el-dialog__body) {
    padding: 0 24px 24px 24px !important;
}

.device-dialog {
    height: 300px;

    p {
        color: #000;
        font-size: 14px;
        margin-bottom: 10px;
    }
}
</style>
