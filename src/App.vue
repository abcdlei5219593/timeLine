
<template>
    <ElConfigProvider size="small">
        <RouterView :key="key"></RouterView>
    </ElConfigProvider>
</template>

<script setup lang="ts" name="App">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { ElConfigProvider} from 'element-plus';

const key = computed(() => useRoute().fullPath);
</script>

<style scoped>

</style>
