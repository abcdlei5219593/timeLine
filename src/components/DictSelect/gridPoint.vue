<template>
    <ElSelect v-model="selfValue" filterable @change="change">
        <ElOption v-for="item in gridPoints" :key="item.id" :value="item.id" :label="item.name"></ElOption>
    </ElSelect>
</template>

<script lang="ts" setup>
import { listGridPoints } from '@/api/siteManage';
import { useFormItem } from 'element-plus';
import { computed, ref, onMounted } from 'vue';

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

const gridPoints = ref<any>([]);

onMounted(async() => {
    try {
        gridPoints.value = await listGridPoints() as unknown as any[];
    } catch(error) {
        console.log(error);
    }
})


</script>

<style lang='less' scoped></style>