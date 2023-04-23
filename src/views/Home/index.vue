<template>
    <ElRow :gutter="20">
        <ElCol :span="12">
            <ElCard shadow="never"></ElCard>
        </ElCol>
        <ElCol :span="12">
            <ElCard shadow="never"></ElCard>
        </ElCol>
        <ElCol :span="12">
            <ElCard shadow="never"></ElCard>
        </ElCol>
        <ElCol :span="12">
            <ElCard shadow="never"></ElCard>
        </ElCol>
    </elrow>
</template>

<script setup lang="ts">
import { ElCard, ElSpace, ElRow, ElCol } from 'element-plus';
</script>

<style scoped lang="scss">
.el-col{
    margin-top: $containerSpace;
    .el-card{

        height:100%;
    }
}
</style>
