
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

const key = computed(() => useRoute().fullPath);
</script>

<style scoped>
</style>
