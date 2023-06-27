<template>
    <div shadow="never" class="container">
        <div class="title">
            <h3>{{ store.factroyName }}</h3>

            <elForm>
                <ElFormItem label="类型:">
                    <ElSelect v-model="dataType" size="medium">
                        <ElOption
                            v-for="item in store.measureList"
                            :key="item.code"
                            :label="item.name"
                            :value="item.code"
                        ></ElOption>
                    </ElSelect>
                </ElFormItem>
            </elForm>
        </div>
        <div class="map-container">
            <ElAmap class="map" :pitch-enable="true" :pitch="30" :center="store.mapCenter" :zoom="14">
                <el-amap-layer-buildings />
                <el-amap-marker
                    v-for="(item, index) in deviceList"
                    :key="index"
                    :position="[item.longitude, item.latitude]"
                    :content="markerText(item.data)"
                    @mouseover="(e) => mouseoverHandler(e, item)"
                    @mouseout="visible = false"
                />
                <el-amap-info-window
                    v-model:visible="visible"
                    :auto-move="true"
                    :avoid="true"
                    :offset="[15, -10]"
                    :position="markerPosition"
                >
                    <div class="header">
                        <span class="station">{{ currentMaker.stationName }}</span>
                        <span>{{ currentMaker.data.createTime }}</span>
                    </div>
                    <ul class="info">
                        <li v-for="(item, index) in store.currentApp.meta.markerWindowField" :key="index" class="item">
                            <template v-for="(column, idx) in item" :key="idx">
                                <span class="value">{{ column.label }}</span>
                                <span class="label mb24">{{
                                    column.render
                                        ? column.render(currentMaker.data[column.prop])
                                        : currentMaker.data[column.prop]
                                }}</span>
                            </template>
                        </li>
                    </ul>
                </el-amap-info-window>
            </ElAmap>
        </div>
    </div>
</template>

<script setup lang="ts" name="Map">
import { ElCard, ElForm, ElFormItem, ElSelect, ElOption } from 'element-plus';
import { getDeviceList } from '@/api/device';
import http from '@/api/analyse';
import { computed, ref } from 'vue';
import { useSettingStore } from '@/store/app';

const store = useSettingStore();
const deviceList = ref([]);
const dataType = ref(store.currentApp.defaultMeasure);
const visible = ref(false);
import markerUrl from '@/assets/img/marker.png';

const currentMaker = ref({ data: { api: '' } });
const markerPosition = ref(store.mapCenter);
const markerText = computed(
    () => (data) =>
        `<div
                class="marker-content"
                style="background-image:url(${markerUrl});width:30px;height:36px;color:#fff;line-height:30px;text-align:center;">

              ${data ? String(parseInt(data[dataType.value]), 10) : ''}
              </div>`
);

const getDeviceListHandler = async () => {
    // deviceList.value
    let data = await getDeviceList({ bizModule: store.currentApp.bizModule });

    const deviceIds = data.map(({ deviceId }) => deviceId);

    if (deviceIds.length) {
        let deviceData = await http[store.currentApp.url].getDeviceData(deviceIds);
        if (store.currentApp.bizModule === 1) {
            deviceData = deviceData.map((item) => ({
                ...item,
                pm2_5: item.pm25,
            }));
        }
        const temp = [];
        for (const item of deviceData) {
            const target = data.find(({ deviceId }) => deviceId === item.deviceId);
            if (target) {
                temp.push({
                    ...target,
                    data: item,
                });
            }
        }
        deviceList.value = temp;
    }
};

const mouseoverHandler = (e, marker) => {
    if (marker.data) {
        currentMaker.value = marker;
        markerPosition.value = [marker.longitude, marker.latitude];
        visible.value = true;
    }
};
getDeviceListHandler();
</script>

<style scoped lang="scss">
.container {
    padding: 24px;
    background: #fff;
    border-radius: 4px;
    @include flex();
    flex-direction: column;
    .title {
        width: 100%;
        @include flex(space-between, center);
        h3 {
            font-weight: 600;
            font-size: 16px;
            color: #000;
        }
        .el-form-item {
            align-items: center;
            margin-bottom: 0;
        }
    }
    .map-container {
        margin-top: 24px;
        width: 100%;
        flex: 1;
    }
}
.header {
    color: #333;
    min-width: 370px;
    @include flex(space-between, center);
    padding: 12px 20px;
    border-bottom: 1px solid #ededed;
    .station {
        font-weight: 500;
        font-size: 14px;
    }
}
.info {
    padding: 16px 15px 22px;
    @include flex();
    .item {
        span {
            line-height: 20px;
            display: block;
            text-align: center;
            &.label {
                color: #666666;
            }
            &.value {
                margin-bottom: 2px;
                font-weight: 700;
                font-size: 16px;
            }
        }

        & + .item {
            margin-left: 25px;
        }
    }
    .mb24 {
        margin-bottom: 24px;
    }
}
</style>
