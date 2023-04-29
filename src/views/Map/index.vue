<template>
    <div shadow="never" class="container">
        <div class="title">
            <h3>微站检测平台</h3>

            <elForm>
                <ElFormItem label="类型:">
                    <ElSelect v-model="dataType" size="medium">
                        <ElOption label="AQI" value="aqi"></ElOption>
                        <ElOption label="PM2.5" value="pm25"></ElOption>
                    </ElSelect>
                </ElFormItem>
            </elForm>
        </div>
        <div class="map-container">
            <ElAmap
                class="map"
                :center="store.mapCenter"
                :zoom="15"
            >
                <el-amap-marker
                    v-for="(item, index) in deviceList"
                    :key="index"
                    :position="[item.longitude, item.latitude]"
                    :content="markerText(item.data)"
                    @mouseover="e => mouseoverHandler(e,item)"
                    @mouseout="visible = false"
                />
                <el-amap-info-window
                    v-model:visible="visible"

                    :avoid="true"
                    :auto-move="true"
                    :offset="[15, -10]"
                    :position="[104.06,30.59]"
                >
                    <div class="header">
                        <span class="station">{{ currentMaker.stationName }}</span>
                        <span>{{ currentMaker.updateTime }}</span>
                    </div>
                    <ul class="info">
                        <li class="item">
                            <span class="value">{{ currentMaker.data.aqi }}</span>
                            <span class="label mb24">AQI</span>
                            <span class="value">{{ currentMaker.data.pm25 }}</span>
                            <span class="label">PM2.5</span>
                        </li>
                        <li class="item">
                            <span class="value">{{ currentMaker.data.co }}</span>
                            <span class="label mb24">一氧化碳</span>
                            <span class="value">{{ currentMaker.data.pm10 }}</span>
                            <span class="label">PM10</span>
                        </li>
                        <li class="item">
                            <span class="value">{{ currentMaker.data.so2 }}</span>
                            <span class="label mb24">二氧化硫</span>
                            <span class="value">{{ currentMaker.data.temp }}</span>
                            <span class="label">温度</span>
                        </li>
                        <li class="item">
                            <span class="value">{{ currentMaker.data.no2 }}</span>
                            <span class="label mb24">二氧化氮</span>
                            <span class="value">{{ currentMaker.data.humi }}</span>
                            <span class="label">湿度</span>
                        </li>
                        <li class="item">
                            <span class="value">{{ currentMaker.data.h2s }}</span>
                            <span class="label">臭氧</span>
                        </li>
                    </ul>
                </el-amap-info-window>
            </ElAmap>
        </div>
    </div>
</template>

<script setup lang="ts" name="Map">
import { ElCard, ElForm, ElFormItem, ElSelect, ElOption } from 'element-plus';
import { getDeviceData, getDeviceList } from '@/api/device';
import { computed, ref } from 'vue';
import { useSettingStore } from '@/store/app';

const store = useSettingStore();
const deviceList = ref([]);
const dataType = ref('aqi');
const visible = ref(false);
import markerUrl from '@/assets/img/marker.png';

const currentMaker = ref({ data: {api: ''}});

const markerText = computed(() => (data) =>
    `<div
                class="marker-content"
                style="background-image:url(${markerUrl});width:30px;height:36px;color:#fff;line-height:30px;text-align:center;">

              ${String(parseInt(data[dataType.value]),10)}
              </div>`
);

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

const mouseoverHandler = (e, marker) => {
    currentMaker.value = marker;
    visible.value = true;
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
.header{
    color:#333;
    min-width: 370px;
    @include flex(space-between,center);
    padding: 12px 20px;
    border-bottom: 1px solid #EDEDED;
    .station{
        font-weight: 500;
        font-size: 14px;
    }
}
.info{
    padding: 16px  15px 22px;
    @include flex();
    .item{

        span{
            line-height: 20px;
            display: block;
            text-align: center;
            &.label{

                color: #666666;
            }
            &.value{
                margin-bottom: 2px;
                font-weight: 700;
                font-size: 16px;
            }
        }

        & +.item{
            margin-left: 25px;
        }
    }
    .mb24{
        margin-bottom: 24px;
    }
}
</style>
