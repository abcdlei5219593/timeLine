<template>
    <div class="main-content device-con">
        <ElRow class="search-row">
            <ElCol :span="6">
                <span class="search-label">微站选择：</span>
                <ElSelect v-model="stationId" placeholder="请选择" size="default" @change="selectChange">
                    <ElOption v-for="item in tableData" :key="item.stationId" :label="item.stationName"
                        :value="item.stationId" />
                </ElSelect>
            </ElCol>
            <ElButton class="add-btn" type="primary" size="default" @click="addFun">
                新增设备
            </ElButton>
        </ElRow>
        <ElTable id="deviceTable" class="table" :data="tableData"
            :style="{ height: `${maxTableHeight}px`, overflow: 'auto' }">
            <ElTableColumn prop="deviceId" label="主板" />
            <ElTableColumn prop="stationName" label="微站名称" />
            <ElTableColumn prop="stationAddress" label="微站地址" />
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
            <ElTableColumn prop="address" fixed="right" label="操作" width="240">
                <template #default="scope">
                    <!-- <ElButton link type="primary" size="default" @click="reportInterval(scope.row)">
                        上报间隔
                    </ElButton> -->
                    <ElButton v-permission="'/deviceSensor'" link type="primary" size="default"
                        @click="toSensor(scope.row)">
                        传感器
                    </ElButton>
                    <!-- <ElButton link type="primary" size="default" class="red-text-btn">
                        重启
                    </ElButton> -->
                    <ElButton link type="primary" size="default" @click="editFun(scope.row)">
                        编辑
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

    <!--添加编辑设备-->
    <ElDialog v-model="addShow" :title="isEdit ? '编辑设备' : '新增设备'" width="50%">
        <div class="device">
            <ElForm ref="formDataRef" :model="deviceData" :rules="rules" label-width="80px" status-icon>
                <ElFormItem label="主板ID" prop="deviceId">
                    <el-input v-model="deviceData.deviceId" size="default" placeholder="请输入" />
                </ElFormItem>
                <ElFormItem label="微站名" prop="stationName">
                    <el-input v-model="deviceData.stationName" size="default" placeholder="请输入" />
                </ElFormItem>
                <ElFormItem label="微站地址" prop="stationAddress">
                    <el-input v-model="deviceData.stationAddress" size="default" placeholder="请输入" />
                </ElFormItem>
                <ElFormItem label="硬件版本" prop="hv">
                    <el-input v-model="deviceData.hv" size="default" placeholder="请输入" />
                </ElFormItem>
                <ElFormItem label="软件版本" prop="sv">
                    <el-input v-model="deviceData.sv" size="default" placeholder="请输入" />
                </ElFormItem>
                <ElFormItem label="经度" prop="longitude">
                    <el-input v-model="deviceData.longitude" size="default" placeholder="请输入" />
                </ElFormItem>
                <ElFormItem label="维度" prop="latitude">
                    <el-input v-model="deviceData.latitude" size="default" placeholder="请输入" />
                </ElFormItem>
                <ElFormItem label="微站类型" prop="bizModule">
                    <el-checkbox-group v-model="deviceData.bizModule">
                        <el-checkbox v-for="(item, i) in stationType" :key="i" :label="item.value" :value="item.value">
                            {{ item.label }}
                        </el-checkbox>
                    </el-checkbox-group>
                </ElFormItem>
            </ElForm>
        </div>
        <span slot="footer" class="dialog-footer">
            <ElButton size="default" @click="addShow = false">取 消</ElButton>
            <ElButton type="primary" size="default" @click="submitForm(formDataRef)">保存提交</ElButton>
        </span>
    </ElDialog>
</template>

<script lang="ts" setup>
import { FormInstance, ElMessage } from 'element-plus';
import { ref, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import useTableSetting from '@/hooks/useTableSetting';
import { getDeviceList, getStations, deviceAdd, deviceEdit } from '@/api/device';
import { deviceDataType } from './ModelDefines';
import { getDataDictionary } from '@/api/system';
import { storeMenu } from '@/store/app';

const store = storeMenu();

const router = useRouter();

const stationId: any = ref('');
const microStationOptions = ref<any>([]);
const tableData: any = ref([]);
const addShow = ref<boolean>(false);
const isEdit = ref<boolean>(false);

const isTimeSet = ref<boolean>(false);

const intervalTime = ref<number>(0);

const reportInterval = () => {
    isTimeSet.value = true;
};
const deviceData = reactive<deviceDataType>({
    deviceId: null,
    stationName: '',
    stationId: null,
    stationAddress: '',
    hv: '',
    sv: '',
    latitude: 0,
    longitude: 0,
    bizModule: [],
    // bizModule: store.bizModule,
});

const toSensor = (row: any) => {
    router.push({ path: '/app/airContent/device/Sensor', query: { deviceId: row.deviceId } });
};

// 获取微站类型
const stationType: any = ref([
    {
        label: '大气监测',
        value: 1,
    },
    {
        label: '水质监测',
        value: 2,
    },
]);

const selectChange = () => {
    getList();
};
const getList = async () => {
    try {
        const res: string[] = await getDeviceList({ bizModule: store.bizModule, stationId: stationId.value });
        tableData.value = [{ stationName: '全部微站', deviceId: '' }, ...res];
    } catch (err) { }
};

// 新增或编辑
const save = async () => {
    try {
        await isEdit.value ? deviceEdit(deviceData) : deviceAdd(deviceData);
        addShow.value = false;
        ElMessage.success('操作成功');
        getList();
    } catch (err) { }
};
// 提交
const formDataRef = ref<FormInstance>();
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) {
        return;
    }
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('submit!');
            save();
        } else {
            console.log('error submit!', fields);
        }
    });
};

// 显示新增设备
const addFun = () => {
    addShow.value = true;
    isEdit.value = true;
    deviceData.deviceId = null;
    deviceData.stationName = '';
    deviceData.stationId = null;
    deviceData.stationAddress = '';
    deviceData.hv = '';
    deviceData.sv = '';
    deviceData.latitude = 0;
    deviceData.longitude = 0;
    deviceData.bizModule = [];
};

// 编辑设备
const editFun = (row: any) => {
    addShow.value = true;
    isEdit.value = true;
    deviceData.deviceId = row.deviceId;
    deviceData.stationName = row.stationName;
    deviceData.stationId = row.stationId;
    deviceData.stationAddress = row.stationAddress;
    deviceData.hv = row.hv;
    deviceData.sv = row.sv;
    deviceData.latitude = row.latitude;
    deviceData.longitude = row.longitude;
    deviceData.bizModule = row.bizModules;
};

onMounted(() => {
    // getStationslist();
    getList();
});

const { maxTableHeight, setTableMaxHeight } = useTableSetting({ id: 'deviceTable', offsetBottom: 20 });
</script>

<style scoped lang="scss">
.search-row {
    justify-content: space-between;

    .add-btn {
        margin-left: auto;
    }
}

.device-con {}

.device-dialog {
    height: 100px;
    display: flex;
}

.device {
    height: 400px;
}

.red-text-btn {
    color: $redTextBtnColor;
}
</style>
