<template>
    <div class="login-box">
        <ElForm ref="formDataRef" :model="formData" :rules="rules" label-width="120px" status-icon>
            <ElFormItem label="账号" prop="userName">
                <el-input v-model="formData.userName" size="default" />
            </ElFormItem>
            <ElFormItem label="密码" prop="password">
                <el-input type="password" v-model="formData.password" size="default" />
            </ElFormItem>
            <ElFormItem>
                <ElButton type="primary" @click="submitForm(formDataRef)"> 登录 </ElButton>
            </ElFormItem>
        </ElForm>
    </div>
</template>

<script setup lang="ts">
import { ElButton, ElInput, ElForm, ElFormItem, FormInstance } from 'element-plus';
import { ref, reactive, getCurrentInstance } from 'vue';
import { FormType } from './ModelDefines';
import { login } from '@/api/login';
import md5 from 'js-md5';
import { storeMenu } from '@/store/app';
import Cookie from 'js-cookie';
import { useRouter } from 'vue-router';

const router = useRouter();

const formDataRef = ref<FormInstance>();
const rules = reactive({
    userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
});

const formData = reactive<FormType>({
    userName: '',
    password: '',
    token: 'token',
});

const { proxy } = getCurrentInstance() as any;
proxy.$md5 = md5;
const submitForm = async (formEl: FormInstance | undefined) => {
    console.log(formEl, 'formElformElformEl');
    if (!formEl) return;
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
        const { res } = await login(formData);
        const store = storeMenu();
        store.getMenu(res.menu);
        Cookie.set('token', res.token);
        router.push('/app/airContent/home');
    } catch (err) {}
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
