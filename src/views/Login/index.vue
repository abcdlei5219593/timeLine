<template>
    <div class="login">
        <div class="login-main">
            <p class="login-title">
                大气污染监测系统
            </p>
            <div class="login-box">
                <p class="login-text">
                    账号登录
                </p>
                <ElForm ref="formDataRef" :model="formData" :rules="rules" status-icon>
                    <ElFormItem label="" prop="userName">
                        <ElInput v-model="formData.userName" size="large">
                            <template #prefix>
                                <i class="iconfont icon-zhanghao"></i>
                            </template>
                        </ElInput>
                    </ElFormItem>
                    <ElFormItem label="" prop="password">
                        <ElInput v-model="formData.password" type="password" size="large">
                            <template #prefix>
                                <i class="iconfont icon-mima"></i>
                            </template>
                        </ElInput>
                    </ElFormItem>
                    <ElFormItem>
                        <ElButton type="primary" @click="submitForm(formDataRef)">
                            登录
                        </ElButton>
                    </ElFormItem>
                </ElForm>
                <div class="login-other">
                    <p>使用其他方式登录</p>
                    <div class="login-method">
                        <i class="iconfont icon-weixin"></i>
                        <i class="iconfont icon-qq"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ElButton, ElInput, ElForm, ElFormItem, FormInstance } from 'element-plus';
import { ref, reactive, getCurrentInstance } from 'vue';
import { FormType } from './ModelDefines';
import { login, listUserModule } from '@/api/login';
import md5 from 'js-md5';
import { storeMenu, useUserStore } from '@/store/app';
import Cookie from 'js-cookie';
import { useRouter } from 'vue-router';
import { basic } from '@/api/user';

const router = useRouter();

const formDataRef = ref<FormInstance>();
const rules = reactive({
    userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        // { required: true, pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/, message: '请输入6-20位字母+数字的密码', trigger: 'blur' }
    ],
});

const formData = reactive<FormType>({
    userName: 'superadmin',
    password: '123456',
    token: 'token',
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
        const password: any = ref(proxy.$md5(formData.password).substr(8, 16));
        formData.password = password;
        const res: any = await login(formData);
        Cookie.set('token', res.token);
        await getUserMenu();
        await getUser();
        router.push('/app/airContent/home');
    } catch (err) { }
};

// 获取用户菜单
const getUserMenu = async () => {
    try {
        const res: any = await listUserModule();
        const store = storeMenu();
        store.getMenu(res.menu);
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


</script>

<style scoped lang="scss">
.login {
    background: #2D8CF0 url(@/assets/login/bg.png) no-repeat;
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

                i {
                    width: 40px;
                    height: 40px;
                    border: 1px solid #DCDCDC;
                    border-radius: 100%;
                    display: block;
                    font-size: 24px;
                    text-align: center;
                    line-height: 40px;
                    color: #04BE02;
                    margin-right: 30px;
                    cursor: pointer;

                    &:nth-child(2) {
                        color: #1FA9F5;
                        margin-right: 0;
                    }
                }
            }
        }
    }

}
</style>
