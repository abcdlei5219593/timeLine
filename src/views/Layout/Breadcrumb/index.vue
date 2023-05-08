<template>
    <ElBreadcrumb
        class="breadcrumb"
        :separator-icon="ArrowRight"
    >
        <ElBreadcrumbItem v-for="(route, index) in breadcrumbList" :key="index" :to="route.path">
            {{ route.title }}
        </ElBreadcrumbItem>
    </ElBreadcrumb>
</template>

<script setup lang="ts">
import { ElBreadcrumb, ElBreadcrumbItem } from 'element-plus';
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import { ArrowRight } from '@element-plus/icons-vue';

const router = useRouter();
// const breadcrumbList = ref([]);
const breadcrumbList = computed(() => {
    const routes = router.currentRoute.value.matched;
    const appkey: any = router.currentRoute.value.params.appkey;
    const _routes: any = [];
    routes.forEach((r) => {
        if (r.meta && r.meta.title) {
            _routes.push({
                // 这个组件中断言 meta 这个属性是存在的
                title: r.meta?.title || '',
                path: r.path.replace(/:appkey/g, appkey),
            });
        }
    });
    console.log(_routes, '_routes_routes_routes', router.currentRoute);
    return _routes;
});

</script>

<style lang="scss" scoped>
.breadcrumb {
    font-size: 14px;
    height: $breadcrumbHeight;
    line-height: $breadcrumbHeight;
}
</style>
