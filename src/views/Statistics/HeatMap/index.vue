<template>
    <div shadow="never" class="container">
        <div class="title">
            <h3>微站检测平台</h3>

            <elForm inline>
                <ElFormItem label="类型:">
                    <ElSelect v-model="searchForm.measure" size="medium">
                        <ElOption label="AQI" value="aqi"></ElOption>
                        <ElOption label="PM2.5" value="pm_25"></ElOption>
                    </ElSelect>
                </ElFormItem>
                <ElFormItem label="时间:">
                    <el-date-picker
                        v-model="searchForm.date"
                        type="daterange"

                        value-format="YYYY-MM-DD"
                        @change="getDeviceDataHandler"
                    />
                </ElFormItem>
            </elForm>
        </div>
        <div class="map-container">
            <ElAmap
                class="map"
                :center="store.mapCenter"
                :zoom="15"
            >
                <el-amap-layer-heat-map :data-set="dataSet"></el-amap-layer-heat-map>
            </ElAmap>
        </div>
    </div>
</template>

<script setup lang="ts" name="Map">
import { ElCard, ElForm, ElFormItem, ElSelect, ElOption,ElDatePicker } from 'element-plus';
import { getDeviceList } from '@/api/device';
import { getHotmapData } from '@/api/analyse';
import { computed, ref, reactive } from 'vue';
import { useSettingStore } from '@/store/app';
import dayjs from '@/helper/dayjs';
import { start } from '@popperjs/core';

const store = useSettingStore();
const deviceList = ref([]);
const searchForm = reactive({
    measure: 'aqi',
    date: [
        dayjs().subtract(3,'day').format('YYYY-MM-DD'),
        dayjs().format('YYYY-MM-DD')
    ]
});

const timeLine = reactive([]);

const dataSet = ref({
    data: [],
    max: 500
});

const start = () => {
    if(timeLine.length) {
        let idx = 0;
        setInterval(() => {
            dataSet.value = timeLine[idx];
            if(idx === timeLine.length - 1) {
                idx = 0;
            }else {
                idx++;
            }
        },500);
    }
};

const getDeviceDataHandler = async () => {
    const params = {
        deviceId: deviceList.value.map(({ deviceId }) => deviceId),
        startTime: searchForm.date.length ? `${searchForm.date[0]} 00:00:00` : '',
        endTime: searchForm.date.length ? `${searchForm.date[1]} 23:59:59` : '',
        measure: searchForm.measure
    };
    const data = await getHotmapData(params);
    for (const device of data) {
        const current = deviceList.value.find(item => item.deviceId === device.deviceId);
        if(current) {
            device.longitude = current.longitude;
            device.latitude = current.latitude;
        }
    }
    for (const [index, timeData] of data[0].data.entries()) {
        const temp = {
            max: 500,
            time: timeData.time,
            data: data.map(item => ({
                lng: item.longitude,
                lat: item.latitude,
                count: item.data[index].avg
            }))
        };
        timeLine.push(temp);
    }
    start();

};

const getDeviceListHandler = async () => {
    // deviceList.value
    deviceList.value = await getDeviceList();
    getDeviceDataHandler();
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
