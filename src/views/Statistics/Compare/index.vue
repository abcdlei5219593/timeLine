<template>
    <div shadow="never" class="container">
        <elForm inline>
            <ElFormItem label="微站:">
                <ElSelect v-model="searchForm.deviceId" collapse-tags size="default" multiple="">
                    <ElOption
                        v-for="item in deviceList"
                        :key="item.deviceId"
                        :label="item.stationName"
                        :value="item.deviceId"
                    ></ElOption>
                </ElSelect>
            </ElFormItem>
            <ElFormItem label="类型">
                <ElSelect v-model="searchForm.measure" size="default">
                    <ElOption label="AQI" value="aqi"></ElOption>
                    <ElOption label="PM2.5" value="pm_25"></ElOption>
                </ElSelect>
            </ElFormItem>
            <ElFormItem label="时间:">
                <el-date-picker
                    v-model="searchForm.date"
                    size="default"
                    type="datetimerange"
                    value-format="YYYY-MM-DD HH:mm:ss"
                    @change="handleSearch"
                />
            </ElFormItem>
        </elForm>
        <div class="map-container">
            <ElAmap
                class="map"
                :center="store.mapCenter"
                :zoom="15"
            >
                <!-- <el-amap-marker
                    v-for="(item, index) in deviceList"
                    :key="index"
                    :position="[item.longitude, item.latitude]"
                    :content="markerText(item.data)"
                /> -->
            </ElAmap>
        </div>
    </div>
</template>

<script setup lang="ts" name="Map">
import { ElCard, ElForm, ElFormItem, ElSelect, ElOption,ElDatePicker } from 'element-plus';
import { getDeviceList, getStations } from '@/api/device';
import { getHotmapData, getCurvesData } from '@/api/analyse';
import { computed, ref, reactive } from 'vue';
import { useSettingStore } from '@/store/app';

const store = useSettingStore();
const deviceList = ref([]);
const searchForm = reactive({
    deviceId: [],
    measure: 'aqi',
    date: [],
    startTime: '',
    endTime: ''
});
getStations({pageNum: 1, pageSize: 1000});

const handleSearch = async () => {
    const params = {
        deviceId: searchForm.deviceId,
        startTime: searchForm.date.length ? searchForm.date[0] : '',
        endTime: searchForm.date.length ? searchForm.date[1] : '',
        measure: searchForm.measure
    };
    getCurvesData(params);
};

const getDeviceListHandler = async () => {
    // deviceList.value
    deviceList.value = await getDeviceList();
    // getDeviceDataHandler();
};

getDeviceListHandler();

</script>

<style scoped lang="scss">
.container {
    padding:24px;
    background: #fff;
    border-radius: 4px;
    @include flex();
    flex-direction: column;
    .title{
        width: 100%;
        @include flex(space-between, center);
        h3{
            font-weight: 600;
            font-size: 16px;
            color: #000;
        }
        .el-form-item {
            align-items: center;
            margin-bottom: 0;
        }
    }
    .map-container{
        margin-top: 24px;
        width: 100%;
        flex: 1;
    }

}
</style>
