<template>
    <ElSelect v-model="selfValue" filterable remote :remote-method="remoteMethod" :loading="loading" remote-show-suffix @change="change">
        <ElOption v-for="item in options" :key="item.merchantCode" :value="item.merchantCode" :label="item.merchantName"></ElOption>
    </ElSelect>
</template>

<script lang="ts" setup>
import { getTableData } from '@/api/merchant';
import { useFormItem } from 'element-plus';
import { computed, ref } from 'vue';

const props = defineProps<{
    modelValue: string;
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

const options = ref<any>([]);

const loading = ref<boolean>(false);

const remoteMethod = async (query: string) => {
    if (query) {
        loading.value = true
        const res = await getTableData({
            merchantName: query
        }) as any;
        loading.value = false
        options.value  = res.list;
    } else {
        options.value = []
    }
}


</script>

<style lang='less' scoped></style>