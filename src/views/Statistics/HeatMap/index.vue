<template>
    <div shadow="never" class="container">
        <div class="title">
            <h3>微站检测平台</h3>

            <elForm inline>
                <ElFormItem label="类型:">
                    <ElSelect v-model="searchForm.measure" size="medium">
                        <ElOption
                            v-for="item in store.measureList"
                            :key="item.code"
                            :label="item.name"
                            :value="item.code"
                        ></ElOption>
                    </ElSelect>
                </ElFormItem>
                <ElFormItem label="时间:">
                    <el-date-picker
                        v-model="searchForm.date"
                        :disabled-date="disabledDate"
                        type="daterange"

                        value-format="YYYY-MM-DD"
                    />
                </ElFormItem>
            </elForm>
        </div>
        <div class="map-container">
            <HeatMap :search-form="searchForm"></HeatMap>
        </div>
    </div>
</template>

<script setup lang="ts" name="Map">
import { ElCard, ElForm, ElFormItem, ElSelect, ElOption,ElDatePicker } from 'element-plus';

import { computed, ref, reactive } from 'vue';
import HeatMap from './HeatMap.vue';
import dayjs from '@/helper/dayjs';
import { useSettingStore } from '@/store/app';

const store = useSettingStore();

const searchForm = reactive({
    measure: 'aqi',
    date: [
        dayjs().subtract(3,'day').format('YYYY-MM-DD'),
        dayjs().format('YYYY-MM-DD')
    ]
});
const disabledDate = (time: Date) => {
    return time.getTime() > Date.now();
};


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
