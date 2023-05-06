<template>
    <ElDialog class="dialog" custom-class="tree-dialog" :model-value="modelValue" @close="handleClose">
        <ElTree ref="tree" :data="allMenu" :props="{ label: 'name' }" show-checkbox node-key="url" highlight-current>
        </ElTree>
        {{ allMenu }}
        <!-- <template #footer>
            <span class="dialog-footer">
                <ElButton @click="handleClose">取 消</ElButton>
                <ElButton type="primary">确 定</ElButton>
            </span>
        </template> -->
    </ElDialog>
</template>

<script setup lang="ts">
import { ElDialog, ElTree, ElButton } from 'element-plus';
import { APP_LIST } from '@/config';
import { Menu } from '@/types/menu';
import { ref } from 'vue';

const props = defineProps<{
    modelValue: boolean;
    allMenu: {
        type: Object;
        default: () => {};
    };
}>();
const emits = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
}>();

// const appData = ref<Menu>(APP_LIST);
const handleClose = () => {
    emits('update:modelValue', false);
};
</script>

<style scoped lang="scss"></style>
