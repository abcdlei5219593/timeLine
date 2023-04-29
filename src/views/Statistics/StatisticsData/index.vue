<template>
    <div>
        热力22
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getMonitorData } from '@/api/analyse';

getMonitorData({ pageNum: 1, pageSize: 10 });
</script>

<style scoped>

</style>
