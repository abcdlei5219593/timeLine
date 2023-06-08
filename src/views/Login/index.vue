<template>
    <div v-if="!isFromThirdPlatform" class="login">
        <div class="login-main">
            <p class="login-title">
                <img class="login-logo" src="@/assets/login/logo.png" />
                <!-- 智慧环境监测系统 -->
                <div>
                <p>长江工业园未来城市</p>
                <p>智慧环境监测系统</p>
                </div>
            </p>
            <div class="login-box">
                <p class="login-text">账号登录</p>
                <ElForm ref="formDataRef" :model="formData" :rules="rules">
                    <ElFormItem label="" prop="userName">
                        <ElInput
                            v-model="formData.userName"
                            size="large"
                            placeholder="请输入账号/手机号"
                            maxlength="20"
                        >
                            <template #prefix>
                                <i class="iconfont icon-zhanghao"></i>
                            </template>
                        </ElInput>
                    </ElFormItem>
                    <ElFormItem label="" prop="password">
                        <ElInput
                            v-model="formData.password"
                            type="password"
                            size="large"
                            placeholder="请输入密码"
                            maxlength="20"
                        >
                            <template #prefix>
                                <i class="iconfont icon-mima"></i>
                            </template>
                        </ElInput>
                    </ElFormItem>
                    <ElFormItem>
                        <ElButton type="primary" :loading="loading" @click="submitForm(formDataRef)">
                            {{ loading ? '登录中' : '登录' }}
                        </ElButton>
                    </ElFormItem>
                </ElForm>
                <!-- <div class="login-other">
                    <p>使用其他方式登录</p>
                    <div class="login-method">
                        <i
                            class="iconfont icon-weixin"
                            @mouseenter="showWeixin = true"
                            @mouseleave="showWeixin = false"
                        ></i>
                        <i id="qqLogin" class="iconfont icon-qq"></i>
                        <div v-if="showWeixin" class="wx-code">
                            <Qrcode></Qrcode>
                        </div>
                    </div>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ElButton, ElInput, ElForm, ElFormItem, FormInstance, ElMessage } from 'element-plus';
import { ref, reactive, getCurrentInstance } from 'vue';
import { FormType } from './ModelDefines';
import { login, listUserModule } from '@/api/login';
import md5 from 'js-md5';
import { storeMenu, useUserStore } from '@/store/app';
import Cookie from 'js-cookie';
import { useRouter } from 'vue-router';
import { basic } from '@/api/user';
import Qrcode from './Qrcode.vue';
import { getDeepTreeData } from '@/utils/common';
import { APP_LIST } from '@/config';

// import QC from 'qc';

const router = useRouter();
const showWeixin = ref<boolean>(false);
const loading = ref<boolean>(false);

const formDataRef = ref<FormInstance>();
const rules = reactive({
    userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        {
            required: true,
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
            message: '请输入6-20位字母+数字的密码',
            trigger: 'blur',
        },
    ],
});

const formData = reactive<FormType>({
    userName: '',
    password: '',
});

const { proxy } = getCurrentInstance() as any;
proxy.$md5 = md5;
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) {
        return;
    }
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('submit!');
            loginFun();
        } else {
            console.log('error submit!', fields);
        }
    });
};

const loginFun = async () => {
    try {
        loading.value = true;
        const password: any = ref(proxy.$md5(formData.password).substr(8, 16));
        const res: any = await login({
            userName: formData.userName,
            password: password.value,
        });
        Cookie.set('token', res.token);
        const userMenu = await getUserMenu();
        await getUser();
        loading.value = false;
        if (userMenu.length) {
            router.push(userMenu[0].children[0].url);
        } else {
            ElMessage.error('您没有系统操作权限，请联系管理员！');
        }
    } catch (err) {
        loading.value = false;
    }
};

// 获取用户菜单
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
    } catch (err) {}
};

// 获取用户基本信息
const getUser = async () => {
    try {
        const res: any = await basic();
        const store = useUserStore();
        console.log(res, '9888888');
        store.getUserInfo(res);
    } catch (err) {}
};
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
        height: 538px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin: -279px 0 0 -240px;

        .login-title {
            font-size: 26px;
            font-weight: 600;
            color: #fff;
            text-align: center;
            margin-bottom: 40px;
            letter-spacing: 2px;
            display: flex;
            height: 72px;
            line-height: 38px;
            margin-bottom: 40px;
            justify-content: center;
            // text-align: left;

            .login-logo {
                width: 80px;
                height: 72px;
                margin-right: 12px;
            }
        }

        .login-box {
            width: 480px;
            height: 416px;
            background-color: #fff;
            box-shadow: 0 8px 24px 0 #0000001a;
            border-radius: 8px;
            padding: 40px;
            box-sizing: border-box;

            .login-text {
                font-size: 30px;
                color: #000;
                font-weight: 600;
                letter-spacing: 2px;
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
                position: relative;
                letter-spacing: 1px;

                &::before {
                    content: '';
                    position: absolute;
                    width: 120px;
                    height: 1px;
                    border-top: 1px dotted #dcdcdc;
                    left: 0;
                    top: 10px;
                }
                &::after {
                    content: '';
                    position: absolute;
                    width: 120px;
                    height: 1px;
                    border-top: 1px dotted #dcdcdc;
                    right: 0;
                    top: 10px;
                }
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
