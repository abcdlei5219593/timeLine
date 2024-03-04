<template>
    <!-- prd 上面 叫 采集因子，后端叫 pcs指标 ， 我佛了-->
    <ElSelect v-model="selfValue" filterable :disabled="!stationId" :multiple="multiple" @change="change">
        <ElOption v-for="item in gridPoints" :key="item.id" :value="item.id" :label="item.name"></ElOption>
    </ElSelect>
</template>

<script lang="ts" setup>
import { getTableData as queryDevice } from '@/api/device';
import { useFormItem } from 'element-plus';
import { watch } from 'vue';
import { computed, ref } from 'vue';

const props = defineProps<{
    modelValue: string;
    stationId: string;
    multiple?: boolean;
    autoSelect?: boolean;
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', val: string): void;
    (e: 'change', val: string): void;
}>();

const { formItem } = useFormItem();

const selfValue = computed({
    get() {
        return props.modelValue;
    },
    set(val: string) {
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
        const res = await queryDevice({
            deviceType: 'DT03', // DT03 表示设备类型是 PCS
            stationId: props.stationId,
            pageSize: 10000,
        }) as unknown as any;
        gridPoints.value = res.list;
        if (props.autoSelect) {
            if (props.multiple) {
                selfValue.value = gridPoints.value.slice(0, 3).map((item: { id: string }) => item.id);
            } else if (gridPoints.value.length) {
                selfValue.value = gridPoints.value[0].id;
            }
        }
    } catch (error) {
        console.log(error);
    }
};

watch(() => props.stationId, async () => {
    getOptions();
});



</script>

<style lang='less' scoped></style>
