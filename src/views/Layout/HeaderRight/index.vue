<template>
    <div class="header-right">
        <ElBadge :value="2" class="item">
            <i class="iconfont icon-message header-message"></i>
        </ElBadge>
        <ElDropdown>
            <div class="user-box">
                <img class="avatar" />
                <p class="user-name">
                    {{ store.userInfo?.name }}
                </p>
                <i class="iconfont icon-dropdown"></i>
            </div>
            <template #dropdown>
                <ElDropdownMenu>
                    <ElDropdownItem style="width: 120px; height: 30px; justify-content: center">
                        退出登录
                    </ElDropdownItem>
                </ElDropdownMenu>
            </template>
        </ElDropdown>
    </div>
</template>

<script setup lang="ts">
import { ElDropdown, ElIcon, ElBadge, ElDropdownMenu, ElDropdownItem } from 'element-plus';
import { useUserStore } from '@/store/app';

const store = useUserStore();
store.getUserInfo();
</script>

<style lang="scss" scoped>
.ElDropdown:hover {
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
    .ElBadge {
        margin: 4px 50px 0 0;
        :deep(.ElBadge__content) {
            width: 14px;
            height: 14px;
            border-radius: 100%;
            padding: 2px;
            border: 0;
        }
    }
    .ElDropdown {
        min-width: 100px;
    }
    .user-box {
        display: flex;
        outline: 0 !important;
        cursor: pointer;
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
