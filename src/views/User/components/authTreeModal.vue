<template>
    <ElDialog :model-value="modelValue" @close="handleClose">
        <ElTree></ElTree>
        <template #footer>
            <span class="dialog-footer">
                <ElButton @click="handleClose">取 消</ElButton>
                <ElButton type="primary">确 定</ElButton>
            </span>
        </template>
    </ElDialog>
</template>

<script setup lang="ts">
import { ElDialog, ElTree, ElButton } from 'element-plus';
import { APP_LIST } from '@/config';

const props = defineProps<{
    modelValue: boolean
}>();
const emits = defineEmits<{
    (e: 'update:modelValue', value: boolean):void
}>();
const handleClose = () => {
    emits('update:modelValue', false);
};
</script>

<style scoped>

</style>
