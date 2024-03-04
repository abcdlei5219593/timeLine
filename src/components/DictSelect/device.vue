<template>
    <!-- prd 上面 叫 采集因子，后端叫 pcs指标 ， 我佛了-->
    <ElSelect v-model="selfValue" filterable :disabled="!stationId" :multiple="multiple" @change="change">
        <ElOption v-for="item in gridPoints" :key="item.id" :value="item.id" :label="item.name"></ElOption>
    </ElSelect>
</template>

<script lang="ts" setup>
import { queryBattery, getTableData as queryDevice } from '@/api/device';
import { useFormItem } from 'element-plus';
import { watch } from 'vue';
import { computed, ref } from 'vue';
import { deviceType } from './localDictDefine';

const props = defineProps<{
    modelValue: any;
    stationId: string;
    needInit?: boolean;
    clusterId?: string; // 如果 deviceType === deviceType.BATTERY_CELL，那么这个必传
    deviceType: typeof deviceType[keyof typeof deviceType];
    autoSelect?: boolean;
    multiple?: boolean;
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', val: any): void;
    (e: 'change', val: string): void;
    (e: 'dataReady', val: any[]): void
}>();

const { formItem } = useFormItem();

const selfValue = computed({
    get() {
        return props.modelValue;
    },
    set(val: any) {
        emit('update:modelValue', val);
    },
});

const change = () => {
    emit('change', selfValue.value);
    formItem?.validate('change').catch((err: any) => console.log(err));
};

const gridPoints = ref<any>([]);

const getOptions = async () => {
    try {
        if ([deviceType.BATTERY_PACK, deviceType.BATTERY_CELL].includes(props.deviceType)) {
            const res = await queryBattery({
                deviceType: props.deviceType, // DT03 表示设备类型是 PCS
                heapId: props.stationId,// 在此处 stationId 表示电池组id
                clusterId: props.clusterId,
                type: props.deviceType === deviceType.BATTERY_PACK ? 1 : 3,
                pageSize: 10000,
            }) as unknown as any;
            gridPoints.value = res;
        } else {
            const res = await queryDevice({
                deviceType: props.deviceType, // DT03 表示设备类型是 PCS
                stationId: props.stationId,
                pageSize: 10000,
            }) as unknown as any;
            gridPoints.value = res.list;
        }

        if (props.autoSelect) {
            if (props.multiple) {
                selfValue.value = gridPoints.value.slice(0, 3).map((item: { id: string }) => item.id);
            } else if (gridPoints.value.length) {
                selfValue.value = gridPoints.value[0].id;
            }
        }
        props.needInit && emit('dataReady', gridPoints.value);
    } catch (error) {
        console.log(error);
    }
};

watch(() => props.stationId, async () => {
    if (props.stationId) {
        getOptions();
    }
});



</script>

<style lang='less' scoped></style>
