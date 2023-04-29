<template>
    <div class="login-box">
        <ElForm ref="formDataRef" :model="formData" :rules="rules" label-width="120px" status-icon>
            <ElFormItem label="账号" prop="userName">
                <el-input v-model="formData.userName" size="default" />
            </ElFormItem>
            <ElFormItem label="密码" prop="password">
                <el-input v-model="formData.password" type="password" size="default" />
            </ElFormItem>
            <ElFormItem>
                <ElButton type="primary" @click="submitForm(formDataRef)">
                    登录
                </ElButton>
            </ElFormItem>
        </ElForm>
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
.login-box {
    width: 500px;
    height: 400px;
    border: 1px solid #000;
    margin: 10vh 0 0 30%;
    padding: 40px;
    box-sizing: border-box;
}
</style>
