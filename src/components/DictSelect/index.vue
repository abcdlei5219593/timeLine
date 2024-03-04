<template>
    <ElSelect v-model="selfValue" :clearable="clearable || true" @change="change">
        <ElOption v-for="item in dictDataList" :key="item.dictValue" :label="item.dictDesc" :value="item.dictValue" />
    </ElSelect>
</template>

<script lang="ts" setup>
import { computed, watch } from 'vue';
import { ElOption, ElSelect, useFormItem } from 'element-plus';
import { DictType } from './localDictDefine';
import useDictData from './useDictData';

const props = defineProps<{
    modelValue: string;
    parentId?: number;
    type: DictType;
    clearable?: boolean;
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

const { dictDataList, getDeviceTypeFromStation } = useDictData({ type: props.type });
watch(() => props.parentId, val => {
    if(val) {
        getDeviceTypeFromStation(val);
    }
},
{ immediate: true}
);
</script>

<style lang="scss" scoped></style>
