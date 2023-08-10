
<script setup lang="ts">
import { ElLoading, ElMessage } from 'element-plus';
import { ref } from 'vue';
import { listUserModule, ssoLogin } from '@/api/login';
import { storeMenu, useUserStore } from '@/store/app';
import Cookie from 'js-cookie';
import { useRouter } from 'vue-router';
import { basic } from '@/api/user';
import { getDeepTreeData } from '@/utils/common';
import { APP_LIST } from '@/config';
import { GetQueryString } from '@/helper/index';
// import QC from 'qc';

const router = useRouter();

const isFromThirdPlatform = ref(false);

const getUserMenu = async () => {
    const store = storeMenu();
    try {
        const res: any = await listUserModule();

        let menu: any = res.menu;
        const authMenu = await getDeepTreeData(APP_LIST, menu);
        store.getMenu(authMenu, res.button);
        // 设置默认 bizModule
        const bizModule = APP_LIST.find((m) => {
            return m.url === menu[0].url;
        });
        store.getBizModule(bizModule.bizModule ? bizModule.bizModule : 1);
        return authMenu;
    } catch (err) { }
};

// 获取用户基本信息
const getUser = async () => {
    try {
        const res: any = await basic();
        const store = useUserStore();
        console.log(res, '9888888');
        store.getUserInfo(res);
    } catch (err) { }
};

const thirdPlatformLogin = async () => {
    // eslint-disable-next-line new-cap
    const ticket = GetQueryString('ticket');
    if (ticket) {
        let loading = ElLoading.service({
            lock: true,
            text: '登录中...',
        });
        isFromThirdPlatform.value = true;
        try {
            const res = await ssoLogin({ ticket });
            Cookie.set('token', res.token);
            const userMenu = await getUserMenu();
            await getUser();
            if (userMenu.length) {
                // router.push(userMenu[0].children[0].url);
                router.push('/dashboard');
            } else {
                ElMessage.error('您没有系统操作权限，请联系管理员！');
            }
        } finally {
            loading.close();
        }
    }
};

thirdPlatformLogin();

</script>

<style scoped lang="scss">
.login {
    background: #2d8cf0 url(@/assets/login/bg.png) no-repeat;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    min-height: 100vh;
    width: 100vw;
    overflow: hidden;
    background-position: 50%;
    background-size: 100%;

    .login-main {
        width: 480px;
        height: 550px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin: -275px 0 0 -240px;

        .login-title {
            font-size: 36px;
            font-weight: 600;
            color: #fff;
            text-align: center;
            margin-bottom: 40px;
        }

        .login-box {
            width: 480px;
            height: 486px;
            background-color: #fff;
            box-shadow: 0 8px 24px 0 #0000001a;
            border-radius: 8px;
            padding: 40px;
            box-sizing: border-box;

            .login-text {
                font-size: 30px;
                color: #000;
                font-weight: 600;
            }

            .el-form {
                margin-top: 40px;

                :deep(.el-input__inner),
                .el-button {
                    height: 46px !important;
                    width: 100%;
                }

                :deep(.el-input__inner) {
                    font-size: 16px;
                }

                .iconfont {
                    font-size: 18px;
                    margin-right: 15px;
                }

                .el-form-item {
                    margin-bottom: 20px;
                }

                .el-button {
                    margin-top: 20px;
                    font-size: 16px;
                }
            }
        }

        .login-other {
            margin-top: 30px;

            p {
                text-align: center;
                height: 20px;
                line-height: 20px;
                color: #666666;
            }

            .login-method {
                display: flex;
                justify-content: center;
                margin-top: 40px;
                position: relative;

                .wx-code {
                    position: absolute;
                    top: -240px;
                    background-color: #fff;
                }

                i {
                    width: 40px;
                    height: 40px;
                    border: 1px solid #dcdcdc;
                    border-radius: 100%;
                    display: block;
                    font-size: 24px;
                    text-align: center;
                    line-height: 40px;
                    color: #04be02;
                    margin-right: 30px;
                    cursor: pointer;

                    &:nth-child(2) {
                        color: #1fa9f5;
                        margin-right: 0;
                    }
                }
            }
        }
    }
}
</style>
