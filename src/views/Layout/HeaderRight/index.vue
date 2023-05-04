<template>
    <div class="header-right">
        <!-- <ElBadge :value="2" class="item">
            <i class="iconfont icon-xiaoxi header-message"></i>
        </ElBadge> -->
        <ElDropdown>
            <div class="user-box">
                <img class="avatar" />
                <p class="user-name">
                    {{ store.userInfo?.userName }}
                </p>
                <i class="iconfont icon-xiala"></i>
            </div>
            <template #dropdown>
                <ElDropdownMenu>
                    <ElDropdownItem
                        style="width: 120px; height: 30px; justify-content: center"
                        @click="toPersonalCenter"
                    >
                        个人中心
                    </ElDropdownItem>
                </ElDropdownMenu>
                <ElDropdownMenu>
                    <ElDropdownItem style="width: 120px; height: 30px; justify-content: center" @click="loginOut">
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
import Cookie from 'js-cookie';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useUserStore();

const loginOut = () => {
    Cookie.set('token', null);
    router.push('/login');
};
const toPersonalCenter = () => {
    router.push('/app/user/personalCenter');
};
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

        :deep(el-badge__content) {
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

        .icon-xiala {
            color: #fff;
            font-size: 14px;
            line-height: 32px;
        }
    }
}
</style>
