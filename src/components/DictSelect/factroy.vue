<template>
    <ElSelect v-model="selfValue" filterable @change="change">
        <ElOption v-for="item in factroy" :key="item.id" :value="item.id" :label="item.name"></ElOption>
    </ElSelect>
</template>

<script lang="ts" setup>
import { queryFactroy } from '@/api/device';
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

const factroy = ref<any>([]);
onMounted(async () => {
    try {
        const { list } = await queryFactroy() as unknown as { list: any };
        factroy.value = list;
    } catch (error) {
        console.log(error);
    }
})


</script>

<style lang='less' scoped></style>