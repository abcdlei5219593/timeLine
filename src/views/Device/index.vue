<template>
    <div class="main-content"></div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const zoom = ref(12);
const center = ref([121.59996, 31.197646]);
const init = (e) => {
    const marker = new AMap.Marker({
        position: [121.59996, 31.197646],
    });
    e.add(marker);
};
const add = () => {
    const marker = new AMap.Marker({
        position: [121.59996, 31.177646],
    });
};
</script>

<style scoped>
#container {
    padding: 0px;
    margin: 0px;
    width: 100%;
    height: 800px;
}
</style>
