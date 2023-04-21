<template>
    <ElMenu :default-active="defaultActive" v-bind="$attrs">
        <template v-for="(node, index) in menuList" :key="index">
            <ElSubMenu v-if="node.children && node.children.length" :index="node.url">
                <template #title>
                    {{ node.name }}
                </template>
                <ElMenuItem v-for="(sub, subIndex) in node.children" :key="subIndex" :index="sub.url">
                    {{ sub.name }}
                </ElMenuItem>
            </ElSubMenu>
            <ElMenuItem v-else :index="node.url">
                {{ node.name }}
            </ElMenuItem>
        </template>
    </ElMenu>
</template>

<script setup lang="ts" name="Menu">
import { ElMenu, ElMenuItem, ElSubMenu } from 'element-plus';
import { Menu } from '../types/menu';
import { useRoute } from 'vue-router';

const props = defineProps<{
    menuList: Menu;
}>();

const route = useRoute();

const defaultActive = route.fullPath;
</script>

<style scoped>
</style>
