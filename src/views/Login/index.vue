<template>
    <div v-if="!isFromThirdPlatform" class="login">
        <div class="login-main">
            <div class="login-title">
                <img class="login-logo" src="@/assets/logo.png" />
            </div>
            <div class="login-box">
                <p class="login-text">
                    用户登录
                </p>
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
                            <template #suffix>
                                <img
                                    style="cursor: pointer;"
                                    class="password-img"
                                    :src="codeImage"
                                    @click="setRandomKey"
                                />

                            </template>
                        </ElInput>
                    </ElFormItem>
                    <ElFormItem label="" prop="vcodeValue">
                        <ElInput
                            v-model="formData.vcodeValue"
                            type="text"
                            size="large"
                            placeholder="请输入验证码"
                            maxlength="20"
                        >

                        </ElInput>
                    </ElFormItem>


                    <ElFormItem>
                        <ElButton color="#4371EE" :loading="loading" @click="submitForm(formDataRef)">
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
import { ref, reactive, getCurrentInstance, onMounted, computed } from 'vue';
import { FormType } from './ModelDefines';
import { listUserModule } from '@/api/login';
import { routes } from '@/router/index';
import md5 from 'js-md5';
import { useMenuStore, useUserStore } from '@/store/app';
import Cookie from 'js-cookie';
import { useRouter } from 'vue-router';
import { basic } from '@/api/user';
import Qrcode from './Qrcode.vue';
import { getDeepTreeData } from '@/utils/common';
import { APP_LIST } from '@/config';
import { getLoginCode, login} from '@/api/index';

const menuList = routes.find(item => item.meta?.auth)?.children;
const menuStore = useMenuStore();

// import QC from 'qc';
const formData = reactive<FormType>({
    userName: '',
    password: '',
    vcodeKey: '',
    vcodeValue: ''
});
function randomString(e) {

    let t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678',
        a = t.length,
        n = '';
    for (let i = 0; i < e; i++) {
        n += t.charAt(Math.floor(Math.random() * a));
    }
    return n;
}
const setRandomKey = () => {
    formData.vcodeKey = randomString(16);
};

setRandomKey();


const codeImage = computed( () => {
    return `${import.meta.env.VITE_URL}/ips/image/code?width=70&height=33&codeCount=4&lineCount=1&key=${formData.vcodeKey}`;

});


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
            // pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
            message: '请输入6-20位字母+数字的密码',
            trigger: 'blur',
        },
    ],
    vcodeValue: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
});



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
    // router.push('/workbench/project');

    try {
        loading.value = true;
        const password: any = ref(md5(formData.password).substr(8, 16));
        const res = await login({
            ...formData,
            password: password.value,
        });
        Cookie.set('token', res.token);
        debugger;
        const userMenu = getDeepTreeData(res.menu);
        const finalMenu = getUserMenu(menuList, userMenu);
        menuStore.setMenu(finalMenu);
        // await getUser(res);
        loading.value = false;
        if (finalMenu.length) {
            router.push(finalMenu[0].path);
        } else {
            ElMessage.error('您没有系统操作权限，请联系管理员！');
        }
    } catch (err) {
        setRandomKey();
        loading.value = false;
    }
};

// 获取用户菜单
const getUserMenu = (menu, idList) => {
    let temp = [];
    debugger;
    menu?.forEach(item => {
        const isArryMenu = Array.isArray(item.meta.id);

        if(isArryMenu) {
            const contain = item.meta.id.some(id => idList.includes(id));
            if(contain) {
                let target = JSON.parse(JSON.stringify(item));
                if(target.children && target.children.length) {
                    target.children = getUserMenu(target.children, idList);
                }
                temp.push(target);
            }
        }else if (idList.includes(item.meta.id)) {
            let target = JSON.parse(JSON.stringify(item));

            temp.push(target);
        }
    });
    return temp;
};

// 获取用户基本信息
const getUser = async (res) => {
    try {

        const store = useUserStore();
        console.log(res, '9888888');
        store.getUserInfo(res);
    } catch (err) {}
};

const keyDown = (e: any) => {
    // 如果是回车则执行登录方法 喜欢的可以多研究下其他的按键keyCode
    if (e.keyCode === 13) {
        submitForm(formDataRef.value);
    }
};

onMounted(() => {
    window.addEventListener('keydown', keyDown);
});
</script>

<style scoped lang="scss">
.login {
    background:  url(@/assets/login_bg.png) no-repeat ;
    background-size:100% 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    min-height: 100vh;
    width: 100vw;
    overflow: hidden;
    background-position: 50%;


    .login-main {
        width: 480px;
        height: 538px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin: -279px 0 0 -240px;

        .login-title {

            margin-bottom: 30px;
            text-align: center;

            .login-logo {
                width: 235px;

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

                font-weight: 600;
                font-size: 24px;
                color: #333333;
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
