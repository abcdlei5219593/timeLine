<template>
    <div>
    </div>
</template>

<script setup lang="ts">
import { getDeviceData, getDeviceList } from '@/api/device';

const deviceList = ref([]);

const getDeviceListHandler = async () => {
    await getDeviceList();
};

getDeviceListHandler();
</script>

<style scoped>

</style>
