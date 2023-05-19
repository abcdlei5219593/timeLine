<template>
    <div class="main-content device-con">
        <ElRow class="search-row">
            <ElCol :span="6">
                <span class="search-label">微站选择：</span>
                <ElSelect v-model="deviceId" placeholder="请选择" size="default" @change="selectChange">
                    <ElOption
                        v-for="item in stationArr"
                        :key="item.deviceId"
                        :label="item.stationName"
                        :value="item.deviceId"
                    />
                </ElSelect>
            </ElCol>
            <ElButton
                class="add-btn"
                v-permission="'/deviceAdd'"
                type="primary"
                size="default"
                @click="addFun"
                :icon="Plus"
            >
                新增设备
            </ElButton>
        </ElRow>
        <ElTable
            id="deviceTable"
            class="table"
            :data="tableData"
            :style="{ height: `${maxTableHeight}px`, overflow: 'auto' }"
        >
            <ElTableColumn prop="" label="序号" width="80">
                <template #default="scope">
                    <p>{{ scope.$index + 1 }}</p>
                </template>
            </ElTableColumn>
            <ElTableColumn prop="deviceId" label="主板" width="180" />
            <ElTableColumn prop="stationName" label="微站名称" />
            <ElTableColumn prop="stationAddress" label="微站地址" />
            <!-- <ElTableColumn prop="hv" label="硬件版本" />
            <ElTableColumn prop="sv" label="软件版本" /> -->
            <ElTableColumn prop="longitude" label="经度" />
            <ElTableColumn prop="latitude" label="纬度" />
            <ElTableColumn prop="status" label="状态">
                <template #default="scope">
                    <span v-if="scope.row.status === 1" class="status online">上线</span>
                    <span v-else-if="scope.row.status === 0" class="status">下线</span>
                </template>
            </ElTableColumn>
            <ElTableColumn prop="address" fixed="right" label="操作" width="240">
                <template #default="scope">
                    <!-- <ElButton link type="primary" size="default" @click="reportInterval(scope.row)">
                        上报间隔
                    </ElButton> -->
                    <ElButton
                        v-permission="'/deviceSensor'"
                        link
                        type="primary"
                        size="default"
                        @click="toSensor(scope.row)"
                    >
                        传感器
                    </ElButton>
                    <!-- <ElButton link type="primary" size="default" class="red-text-btn">
                        重启
                    </ElButton> -->
                    <ElButton
                        v-permission="'/deviceEdit'"
                        link
                        type="primary"
                        size="default"
                        @click="editFun(scope.row)"
                    >
                        编辑
                    </ElButton>
                </template>
            </ElTableColumn>
        </ElTable>
    </div>

    <!--上报间隔-->
    <ElDialog v-model="isTimeSet" class="dialog" title="上报间隔时间设置" width="30%">
        <div class="device-dialog">
            <ElRow>
                <ElCol :span="8"> 间隔时间 </ElCol>
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
    <ElDialog v-model="addShow" class="dialog" :title="isEdit ? '编辑设备' : '新增设备'" width="480px">
        <div class="device dialog-content">
            <ElForm ref="formDataRef" :model="deviceData" :rules="rules" label-position="top">
                <ElFormItem label="主板ID" prop="deviceId">
                    <el-input
                        v-model="deviceData.deviceId"
                        size="default"
                        :disabled="isEdit"
                        placeholder="请输入"
                        maxlength="50"
                    />
                </ElFormItem>
                <ElFormItem label="微站名" prop="stationName">
                    <el-input v-model="deviceData.stationName" size="default" placeholder="请输入" maxlength="50" />
                </ElFormItem>
                <ElFormItem label="微站地址" prop="stationAddress">
                    <el-input v-model="deviceData.stationAddress" size="default" placeholder="请输入" maxlength="100" />
                </ElFormItem>
                <ElFormItem label="经度" prop="longitude">
                    <el-input v-model="deviceData.longitude" type="number" size="default" placeholder="请输入" />
                </ElFormItem>
                <ElFormItem label="纬度" prop="latitude">
                    <el-input v-model="deviceData.latitude" type="number" size="default" placeholder="请输入" />
                </ElFormItem>
                <ElFormItem label="微站类型" prop="bizModules">
                    <el-checkbox-group v-model="deviceData.bizModules">
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
import { ref, onMounted, reactive, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import useTableSetting from '@/hooks/useTableSetting';
import { getDeviceList, getStations, deviceAdd, deviceEdit } from '@/api/device';
import { deviceDataType } from './ModelDefines';
import { storeMenu } from '@/store/app';
import { APP_LIST } from '@/config';
import { Plus } from '@element-plus/icons-vue';

const store = storeMenu();

const router = useRouter();
const routers = useRoute();

const deviceId: any = ref('');
const microStationOptions = ref<any>([]);
const tableData: any = ref([]);
const stationArr: any = ref([]);
const addShow = ref<boolean>(false);
const isEdit = ref<boolean>(false);

const isTimeSet = ref<boolean>(false);

const intervalTime = ref<number>(0);

const rules = reactive({
    deviceId: [{ required: true, message: '请输入主板ID', trigger: 'blur' }],
    stationName: [{ required: true, message: '请输入微站名', trigger: 'blur' }],
    stationAddress: [{ required: true, message: '请输入微站地址', trigger: 'blur' }],
    longitude: [{ required: true, message: '请输入经度', trigger: 'blur' }],
    latitude: [{ required: true, message: '请输入纬度', trigger: 'blur' }],
    bizModules: [{ required: true, message: '请选择微站类型', trigger: 'change' }],
});

const reportInterval = () => {
    isTimeSet.value = true;
};
const deviceData = reactive<deviceDataType>({
    deviceId: '',
    stationName: '',
    stationAddress: '',
    latitude: null,
    longitude: null,
    bizModules: [],
    // bizModule: store.bizModule,
});

const currentApp = computed(() => APP_LIST.find((app) => routers.path.includes(app.url)));
const toSensor = (row: any) => {
    router.push({ path: `${currentApp.value.url}/device/Sensor`, query: { deviceId: row.deviceId } });
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
    {
        label: '风速监测',
        value: 3,
    },
    {
        label: 'ptu监测',
        value: 4,
    },
    // {
    //     label: '雨量监测',
    //     value: 5,
    // },
]);

const selectChange = () => {
    getList();
};

const getList = async () => {
    try {
        const res: string[] = await getDeviceList({ bizModule: store.bizModule, deviceId: deviceId.value });
        tableData.value = res;
        searchDeviceList.value = res;
    } catch (err) {}
};
const getSearchList = async () => {
    try {
        const res: string[] = await getDeviceList({ bizModule: store.bizModule });
        stationArr.value = [{ stationName: '全部微站', deviceId: '' }, ...res];
    } catch (err) {}
};

// 新增或编辑
const save = async () => {
    console.log(typeof deviceData.latitude, '00000');
    try {
        const res: any = isEdit.value ? await deviceEdit(deviceData) : await deviceAdd(deviceData);
        addShow.value = false;
        ElMessage.success('操作成功');
        getList();
    } catch (err) {}
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
    isEdit.value = false;
    deviceData.deviceId = null;
    deviceData.stationName = '';
    deviceData.stationAddress = '';
    deviceData.latitude = null;
    deviceData.longitude = null;
    deviceData.bizModules = [];
};

// 编辑设备
const editFun = (row: any) => {
    addShow.value = true;
    isEdit.value = true;
    deviceData.deviceId = row.deviceId;
    deviceData.stationName = row.stationName;
    deviceData.stationAddress = row.stationAddress;
    deviceData.latitude = row.latitude;
    deviceData.longitude = row.longitude;
    deviceData.bizModules = row.bizModules;
};

onMounted(() => {
    getSearchList();
    getList();
});

const { maxTableHeight, setTableMaxHeight } = useTableSetting({ id: 'deviceTable', offsetBottom: 60 });
</script>

<style scoped lang="scss">
.search-row {
    // justify-content: space-between;

    .add-btn {
        margin-left: auto;
    }
}

.device-dialog {
    height: 100px;
    display: flex;
}

.device {
    height: 60vh;
    // padding-bottom: 186px;
}

.red-text-btn {
    color: $redTextBtnColor;
}
.status {
    position: relative;
    padding-left: 10px;

    &::before {
        content: '';
        width: 5px;
        height: 5px;
        border-radius: 100%;
        display: block;
        background: #fc5a5a;
        position: absolute;
        top: 50%;
        left: 0px;
        margin-top: -2.5px;
    }

    &.online::before {
        background: #22ac4e !important;
    }
}
</style>
