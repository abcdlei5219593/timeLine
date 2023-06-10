<template>
    <ElAmap class="map" :center="store.mapCenter" :zoom="14">
        <el-amap-layer-heat-map :data-set="dataSet"></el-amap-layer-heat-map>
    </ElAmap>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed } from 'vue';
import { useSettingStore } from '@/store/app';
import { getDeviceList } from '@/api/device';
import http from '@/api/analyse';
import { APP_LIST } from '@/config';

const max = ref(100);
const url = window.location.href;
if (url.indexOf('/app/wind') >= 1) {
    max.value = 10;
} else if (url.indexOf('/app/rain') >= 1) {
    max.value = 5;
} else if (url.indexOf('/app/city') >= 1) {
    max.value = 5;
}

const props = defineProps<{
    searchForm: object
}>();
const store = useSettingStore();
const timeLine = reactive([]);
const deviceList = ref([]);
const dataSet = ref({
    data: [],
    max: 100
});

const gradient = {
    0.1: '#30123B',
    0.2: '#4454C4',
    0.3: '#4490FE',
    0.4: '#1FC8DE',
    0.5: '#29EFA2',
    0.6: '#C1F334',
    0.7: '#F1CA3A',
    0.8: '#FE922A',
    0.9: '#BE2102',
    1.0: '#7A0403'
};
let timer;
watch(
    () => props.searchForm,
    (val) => {
        getDeviceDataHandler();
    },
    {
        deep: true
    }
);
const start = () => {
    if (timeLine.length) {
        if (timer) {
            clearInterval(timer);
        }
        let idx = 0;
        timer = setInterval(() => {
            dataSet.value = timeLine[idx];
            if (idx === timeLine.length - 1) {
                idx = 0;
            } else {
                idx++;
            }
        }, 500);
    }
};

const getDeviceDataHandler = async () => {
    const params = {
        deviceId: deviceList.value.map(({ deviceId }) => deviceId),
        startTime: props.searchForm.date.length ? `${props.searchForm.date[0]} 00:00:00` : '',
        endTime: props.searchForm.date.length ? `${props.searchForm.date[1]} 23:59:59` : '',
        measure: props.searchForm.measure
    };
    const data = await http[store.currentApp.url].getHotmapData(params);
    for (const device of data) {
        const current = deviceList.value.find(item => item.deviceId === device.deviceId);
        if (current) {
            device.longitude = current.longitude;
            device.latitude = current.latitude;
        }
    }
    for (const [index, timeData] of data[0].data.entries()) {
        const temp = {
            max: max,

            time: timeData.time,
            data: data.map(item => ({
                lng: item.longitude,
                lat: item.latitude,
                count: item.data[index].avg
            }))
        };
        console.log(temp, 'temptemp');
        timeLine.push(temp);
    }
    start();

};

const getDeviceListHandler = async () => {
    // deviceList.value

    deviceList.value = await getDeviceList({ bizModule: store.currentApp.bizModule });
    if (deviceList.value && deviceList.value.length) {
        getDeviceDataHandler();
    }
};

getDeviceListHandler();
</script>

<style scoped></style>
