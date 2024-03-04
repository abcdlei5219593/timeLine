<template>
    <ElSelect v-model="selfValue" filterable @change="change" :disabled="!gridPointId">
        <ElOption v-for="item in unitOps" :key="item.id" :value="item.id" :label="item.name"></ElOption>
    </ElSelect>
</template>

<script lang="ts" setup>
import { listDeviceUnits } from '@/api/siteManage';
import { useFormItem } from 'element-plus';
import { computed, ref, watch } from 'vue';

const props = defineProps<{
    modelValue: string;
    gridPointId: string;
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

const unitOps = ref<any>([]);

const getList = async () => {
    unitOps.value = await listDeviceUnits({
        gridPointId: props.gridPointId,
    }) as unknown as any[];
}

watch(() => props.gridPointId, () => {
    if (props.gridPointId) {
        getList();
    }
}, {
    immediate: true
})


</script>

<style lang='less' scoped></style>