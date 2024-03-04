<template>
    <ElSelect v-model="selfValue" filterable :loading="loading" remote-show-suffix :multiple="multiple" @change="change">
        <ElOption v-for="item in options" :key="item.id" :value="item.id" :label="item.name"></ElOption>
    </ElSelect>
</template>

<script lang="ts" setup>
import { getStationList } from '@/api/siteManage';
import { useFormItem } from 'element-plus';
import { computed, ref } from 'vue';

const props = withDefaults(defineProps<{
    modelValue: any;
    needInit?: boolean;
    isGetAll?: boolean;
    autoSelect?: boolean;
    multiple?: boolean;
}>(), {
    isGetAll: true,
    needInit: false, // 如果需要默认一个站点，那么应该打开这个开关，并且也设置 autoSelect 为 true ，然后监听 dataReady 事件
    autoSelect: false,
    multiple: false,
});

const emit = defineEmits<{
    (e: 'update:modelValue', val: any): void;
    (e: 'change', val: any): void;
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

const options = ref<any[]>([]);

const loading = ref<boolean>(false);


const remoteMethod = async (query: string) => {
    if (query) {
        loading.value = true;
        const res = await getStationList({
            name: query
        }) as any;
        loading.value = false;
        options.value = res.list;
    } else {
        options.value = [];
    }
};

const getAll = async () => {
    const res = await getStationList({ pageSize: 10000 }) as any;
    options.value = res.list;
    if (props.autoSelect) {
        if (props.multiple) {
            selfValue.value = options.value.slice(0, 3).map(item => item.id);
        } else if (options.value.length) {
            selfValue.value = options.value[0].id;
        }
    }
    props.needInit && emit('dataReady', options.value);
};

if (props.isGetAll) {
    getAll();
}

</script>

<style lang='less' scoped></style>
