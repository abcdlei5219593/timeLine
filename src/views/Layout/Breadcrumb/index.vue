<template>
    <el-breadcrumb
        class="breadcrumb"
        :separator-icon="ArrowRight"
        v-if="breadcrumbList[0] && breadcrumbList[0].title !== '首页'"
    >
        <el-breadcrumb-item v-for="(route, index) in breadcrumbList" :key="index" :to="route.path">
            {{ route.title }}
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>
<script setup lang="ts">
import { ElBreadcrumb, ElBreadcrumbItem } from 'element-plus';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { ArrowRight } from '@element-plus/icons-vue';
const router = useRouter();
const breadcrumbList = ref([]);
const mapRoutes = () => {
    const routes = router.currentRoute.value.matched;
    const _routes: any = [];
    routes.forEach((r) => {
        if (r.meta && r.meta.title) {
            _routes.push({
                // 这个组件中断言 meta 这个属性是存在的
                title: r.meta?.title || '',
                path: r.path,
            });
        }
    });
    console.log(_routes, '_routes_routes_routes');
    breadcrumbList.value = _routes;
};
mapRoutes();
</script>
<style lang="scss" scoped>
.breadcrumb {
    font-size: 14px;
    height: $breadcrumbHeight;
    line-height: $breadcrumbHeight;
}
</style>
