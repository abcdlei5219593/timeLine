
<template>
    <ElConfigProvider size="small" :locale="zhCn">
        <RouterView :key="key"></RouterView>
    </ElConfigProvider>
</template>

<script setup lang="ts" name="App">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
import { getPositioninStr } from '@/utils/common';

const route = useRoute();
// 路由keys值，只截取/app/key之间的路由
const key = computed(() => route.fullPath.substring(0, getPositioninStr(route.fullPath, '/', 3)));
</script>

<style scoped>
</style>


