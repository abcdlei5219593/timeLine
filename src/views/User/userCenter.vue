<template>
    <div class="user-top">
        <p class="user-title">个人信息</p>
        <ElRow>
            <ElCol :span="7"><span class="user-label">姓名：</span>测试</ElCol>
            <ElCol :span="7"><span class="user-label">邮箱：</span>测试</ElCol>
            <ElCol :span="7"><span class="user-label">性别：</span>测试</ElCol>
            <ElCol :span="7"><span class="user-label">登录名：</span>测试</ElCol>
            <ElCol :span="7"><span class="user-label">手机号：</span>测试</ElCol>
        </ElRow>
    </div>
    <div class="user-bottom">
        <p class="user-title">修改密码</p>
        <ElForm ref="formDataRef" :model="formData" :rules="rules" label-width="80px" status-icon>
            <ElFormItem label="旧密码" prop="oldPwd">
                <el-input type="password" v-model="formData.oldPwd" size="default" placeholder="请输入旧密码" />
            </ElFormItem>
            <ElFormItem label="新密码" prop="newPwd">
                <el-input type="password" v-model="formData.newPwd" size="default" placeholder="请输入新密码" />
            </ElFormItem>
            <ElFormItem label="确认密码" prop="newPwd">
                <el-input type="password" v-model="formData.newPwdAgain" size="default" placeholder="请确认密码" />
            </ElFormItem>
            <ElFormItem>
                <ElButton type="primary" @click="submitForm(formDataRef)" size="default"> 确认修改 </ElButton>
            </ElFormItem>
        </ElForm>
    </div>
</template>

<script setup lang="ts">
import { ElButton, ElInput, ElRow, ElCol, ElForm, ElFormItem, FormInstance, ElMessage } from 'element-plus';
import { ref, reactive, getCurrentInstance, onMounted } from 'vue';
import md5 from 'js-md5';
import { getUserInfo, changePassword } from '@/api/user';
import { useRouter } from 'vue-router';

const router = useRouter();

const formDataRef = ref<FormInstance>();
const rules = reactive({
    oldPwd: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    newPwd: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    newPwdAgain: [{ required: true, message: '请确认密码', trigger: 'blur' }],
});

const formData = reactive<any>({
    oldPwd: '',
    newPwd: '',
    newPwdAgain: '',
});

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('submit!');
            changePasswordFun();
        } else {
            console.log('error submit!', fields);
        }
    });
};

const getUser = async () => {
    try {
        const res = await getUserInfo();
        console.log(res, '用户基本');
    } catch (err) {}
};

const { proxy } = getCurrentInstance() as any;
proxy.$md5 = md5;
const changePasswordFun = async () => {
    try {
        const oldPwd: any = ref(proxy.$md5(formData.oldPwd).substr(8, 16));
        const newPwd: any = ref(proxy.$md5(formData.newPwd).substr(8, 16));
        const res = await changePassword({
            oldPwd: oldPwd,
            newPwd: newPwd,
        });
        ElMessage.success('修改成功');
        router.push('/login');
    } catch (err) {}
};
onMounted(() => {
    getUser();
});
</script>

<style scoped lang="scss">
.user-top {
    background: #fff;
    padding: 20px;
    .el-col {
        color: #333333;
        margin-top: 20px;
        display: flex;
        .user-label {
            color: #999999;
            width: 60px;
            text-align: right;
            white-space: nowrap;
            display: block;
        }
    }
}
.user-bottom {
    background: #fff;
    padding: 20px;
    margin-top: 20px;

    .el-form {
        width: 340px;
        margin-top: 20px;
    }
}
.user-title {
    font-size: 16px;
    color: #333;
}
</style>
