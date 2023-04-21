<template>
    <div>
        <AuthTreeModal v-model="showAuthTree" width="500">
        </authtreemodal>
    </div>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue';

const AuthTreeModal = defineAsyncComponent(() => import('./components/authTreeModal.vue'));
const showAuthTree = ref(true);
</script>

<style scoped>

</style>
