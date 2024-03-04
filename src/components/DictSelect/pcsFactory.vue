<template>
    <!-- prd 上面 叫 采集因子，后端叫 pcs指标 ， 我佛了-->
    <ElSelect v-model="selfValue" filterable collapse-tags :multiple="multiple" @change="change">
        <ElOption v-for="item in computedOptions" :key="item.factor" :value="item.factor" :label="item.title"></ElOption>
    </ElSelect>
</template>

<script lang="ts" setup>
import { getPCSData } from '@/api/energyAnalysis';
import { useFormItem } from 'element-plus';
import { computed, ref, onMounted, watch } from 'vue';

const props = withDefaults(defineProps<{
    modelValue: string;
    type?: number;
    multiple?: boolean;
    autoSelect?: boolean;
}>(), {
    type: -1
});

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

const computedOptions = computed(() => {
    if (props.type <= 0) {
        return gridPoints.value;
    }
    return gridPoints.value.filter((item: { type: number }) => item.type === props.type);
});

watch(() => props.type, () => {
    if (props.autoSelect) {
        if (props.multiple) {
            selfValue.value = computedOptions.value.slice(0, 3).map((item: { factor: string }) => item.factor);
        } else if (computedOptions.value.length) {
            selfValue.value = computedOptions.value[0].factor;
        }
    }
})

onMounted(async () => {
    try {
        gridPoints.value = await getPCSData() as unknown as any[];
        if (props.autoSelect) {
            if (props.multiple) {
                selfValue.value = computedOptions.value.slice(0, 3).map((item: { factor: string }) => item.factor);
            } else if (computedOptions.value.length) {
                selfValue.value = computedOptions.value[0].factor;
            }
        }
    } catch (error) {
        console.log(error);
    }
});


</script>

<style lang='less' scoped></style>
