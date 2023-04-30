<template>
    <ElAmap
        class="map"
        :center="store.mapCenter"
        :zoom="15"
    >
        <el-amap-layer-heat-map :data-set="dataSet"></el-amap-layer-heat-map>
    </ElAmap>
</template>

<script setup lang="ts">
import {ref , reactive, watch } from 'vue';
import { useSettingStore } from '@/store/app';
import { getDeviceList } from '@/api/device';
import { getHotmapData } from '@/api/analyse';

const props = defineProps<{
    searchForm: object
}>();
const store = useSettingStore();
const timeLine = reactive([]);
const deviceList = ref([]);
const dataSet = ref({
    data: [],
    max: 500
});

watch(
    () => props.searchForm,
    (val) => {
        getDeviceDataHandler();
    }
);
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
        startTime: props.searchForm.date.length ? `${props.searchForm.date[0]} 00:00:00` : '',
        endTime: props.searchForm.date.length ? `${props.searchForm.date[1]} 23:59:59` : '',
        measure: props.searchForm.measure
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
    deviceList.value = await getDeviceList({ bizModule: store.currentApp.bizModule});
    getDeviceDataHandler();
};

getDeviceListHandler();
</script>

<style scoped>

</style>
