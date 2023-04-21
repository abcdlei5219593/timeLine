<template>
    <div class="header-right">
        <el-badge :value="2" class="item">
            <i class="iconfont icon-message header-message"></i>
        </el-badge>
        <el-dropdown>
            <div class="user-box">
                <img class="avatar" />
                <p class="user-name">
                    {{ userInfo.name }}
                </p>
                <i class="iconfont icon-dropdown"></i>
            </div>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item style="width: 120px; height: 30px; justify-content: center">
                        退出登录
                    </el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup lang="ts">
import { ElDropdown, ElIcon, ElBadge, ElDropdownMenu, ElDropdownItem } from 'element-plus';
import { useUserStore } from '@/store/app';

const userInfo = useUserStore();

</script>

<style lang="scss" scoped>
.el-dropdown:hover {
    border: 0 !important;
    padding: 0 !important;
    box-shadow: none !important;
}
.header-right {
    display: flex;
    justify-content: right;
    padding: 16px 24px;
    .header-message {
        color: #fff;
        font-size: 24px;
    }
    .el-badge {
        margin: 4px 50px 0 0;
        :deep(.el-badge__content) {
            width: 14px;
            height: 14px;
            border-radius: 100%;
            padding: 2px;
            border: 0;
        }
    }
    .el-dropdown {
        min-width: 100px;
    }
    .user-box {
        display: flex;
        .avatar {
            width: 32px;
            height: 32px;
            border-radius: 100%;
        }
        .user-name {
            height: 32px;
            line-height: 32px;
            color: #ffffff;
            padding: 0 10px;
        }
        .icon-dropdown {
            color: #fff;
            font-size: 14px;
            line-height: 32px;
        }
    }
}
</style>
