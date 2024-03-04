<template>
    <ElSelect v-model="selfValue" filterable :disabled="getDisabled" :multiple="multiple" clearable @change="change">
        <ElOption v-for="item in gridPoints" :key="item.id" :value="item.id" :label="item.name"></ElOption>
    </ElSelect>
</template>

<script lang="ts" setup>
import { queryBattery, queryDeviceByType } from '@/api/device';
import { useFormItem } from 'element-plus';
import { computed, ref } from 'vue';
import { deviceType } from './localDictDefine';
import { onMounted } from 'vue';
import { watch } from 'vue';

const props = defineProps<{
    modelValue: any;
    needInit?: boolean;
    heapId?: string | string[]; // 电池组ID 如果 type !== 0 ，那么这个必传
    clusterId?: string | string[]; // 电池组ID 如果 type === 2 ，那么这个必传
    packId?: string | string[]; // 电池包ID 如果 type === 3 ，那么这个必传
    type: number; // 类型，1-电池组，2-电池包，3-电池单体
    autoSelect?: boolean;
    autoSelectNum?: number;
    multiple?: boolean;
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', val: any[]): void;
    (e: 'change', val: any[]): void;
    (e: 'dataReady', val: any[]): void
}>();

const { formItem } = useFormItem();

const selfValue = computed({
    get() {
        if (props.multiple) {
            return props.modelValue;
        }
        if (props.modelValue.length) {
            return props.modelValue[0];
        }
        return '';
    },
    set(val: any) {
        if (props.multiple) {
            emit('update:modelValue', val);
        } else {
            emit('update:modelValue', [val]);
        }
    },
});

const heapId = computed(() => {
    if (props.heapId) {
        return Array.isArray(props.heapId) ? props.heapId[0] : props.heapId;
    }
    return '';
});

const clusterId = computed(() => {
    if (props.clusterId) {
        return Array.isArray(props.clusterId) ? props.clusterId[0] : props.clusterId;
    }
    return '';
});

const packId = computed(() => {
    if (props.packId) {
        return Array.isArray(props.packId) ? props.packId[0] : props.packId;
    }
    return '';
});

const getDisabled = computed(() => {
    if (props.type === 0) {
        return false;
    } else if (props.type === 1) {
        return !heapId.value;
    } else if (props.type === 2) {
        return !heapId.value && !clusterId.value;
    } else if (props.type === 3) {
        return !heapId.value && !clusterId.value;
    }
    return false;
});

const change = () => {
    emit('change', [selfValue.value]);
    formItem?.validate('change').catch((err: any) => console.log(err));
};

const gridPoints = ref<any>([]);

const getOptions = async () => {
    try {
        if (props.type === 0) {
            const res = await queryDeviceByType({
                deviceType: deviceType.BATTERY_GROUP
            });
            gridPoints.value = res;
        } else {
            const res = await queryBattery({
                heapId: heapId.value,
                clusterId: clusterId.value,
                packId: packId.value,
                type: props.type,
            }) as unknown as any;
            gridPoints.value = res;
        }

        if (props.autoSelect) {
            if (props.multiple) {
                selfValue.value = gridPoints.value.slice(0, props.autoSelectNum || 3).map((item: { id: string }) => item.id);
            } else if (gridPoints.value.length) {
                selfValue.value = gridPoints.value[0].id;
            }
        }
        props.needInit && emit('dataReady', gridPoints.value);
    } catch (error) {
        console.log(error);
    }
};

onMounted(() => {
    if (props.type === 0) {
        getOptions();
    }
});

watch([() => props.heapId, () => props.clusterId, () => props.packId], async () => {
    if (props.heapId && !getDisabled.value) {
        getOptions();
    }
    selfValue.value = [];
});

</script>

<style lang='less' scoped></style>
