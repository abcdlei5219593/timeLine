<template>
    <div class="container">
        <ElAmap
            :center="store.mapCenter"
            :zoom="15"
        >
            <el-amap-layer-labels>
                <el-amap-label-marker
                    v-for="(item, index) in deviceList"
                    :key="index"
                    :position="[item.longitude, item.latitude]"
                    :text="item.hv"
                    :icon=" {
                        image: 'https://a.amap.com/jsapi_demos/static/images/poi-marker.png',
                        anchor: 'bottom-center',
                        size: [25, 34],
                        clipOrigin: [459, 92],
                        clipSize: [50, 68]
                    }"
                />
            </el-amap-layer-labels>
        </ElAmap>
    </div>
</template>

<script setup lang="ts" name="Map">
import { getDeviceData, getDeviceList } from '@/api/device';
import { ref } from 'vue';
import { useSettingStore } from '@/store/app';

const store = useSettingStore();
const deviceList = ref([]);

const getDeviceListHandler = async () => {
    // deviceList.value
    const data = await getDeviceList();
    const deviceIds = data.map(({ deviceId }) => deviceId);
    const deviceData = await getDeviceData(deviceIds);

    for (const item of data) {
        const idx = deviceData.findIndex(({ deviceId }) => deviceId === item.deviceId);

        if(idx > -1) {
            item.data = deviceData[idx];
        }

    }
    deviceList.value = data;
};

getDeviceListHandler();
</script>

<style scoped>

</style>
