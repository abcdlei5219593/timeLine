<template>
    <div class="user-top">
        <p class="user-title">
            个人信息
        </p>
        <div class="user-btn">
            <el-button v-if="!isEdit" size="default" @click="editFun">
                编辑
            </el-button>
            <el-button v-if="isEdit" size="default" @click="cancel">
                取消
            </el-button>
            <el-button v-if="isEdit" size="default" @click="save">
                保存
            </el-button>
        </div>
        <ElRow>
            <ElCol :span="7">
                <span class="user-label">姓名：</span>
                <span v-if="!isEdit">{{ userInfo.realName }}</span>
                <ElInput v-else v-model="userInfo.realName" placeholder="请输入" size="default"></ElInput>
            </ElCol>
            <ElCol :span="7">
                <span class="user-label">邮箱：</span>
                <span v-if="!isEdit">{{ userInfo.email }}</span>
                <ElInput v-else v-model="userInfo.email" placeholder="请输入" size="default"></ElInput>
            </ElCol>
            <ElCol :span="7">
                <span class="user-label">性别：</span>
                <span v-if="!isEdit">测试</span>
                <ElRadioGroup v-else v-model="userInfo.gender">
                    <ElRadio label="男" size="default">
                        男
                    </ElRadio>
                    <ElRadio label="女" size="default">
                        女
                    </ElRadio>
                </ElRadioGroup>
            </ElCol>
            <ElCol :span="7">
                <span class="user-label">登录名：</span>
                <span v-if="!isEdit">{{ userInfo.userName }}</span>
                <ElInput v-else v-model="userInfo.userName" placeholder="请输入" size="default"></ElInput>
            </ElCol>
            <ElCol :span="7">
                <span class="user-label">手机号：</span>
                <span v-if="!isEdit">{{ userInfo.mobilePhone }}</span>
                <ElInput v-else v-model="userInfo.mobilePhone" placeholder="请输入" size="default"></ElInput>
            </ElCol>
        </ElRow>
    </div>
    <div class="user-bottom">
        <p class="user-title">
            修改密码
        </p>
        <ElForm ref="formDataRef" :model="formData" :rules="rules" label-width="80px" status-icon>
            <ElFormItem label="旧密码" prop="oldPwd">
                <el-input v-model="formData.oldPwd" type="password" size="default" placeholder="请输入旧密码" />
            </ElFormItem>
            <ElFormItem label="新密码" prop="newPwd">
                <el-input v-model="formData.newPwd" type="password" size="default" placeholder="请输入新密码" />
            </ElFormItem>
            <ElFormItem label="确认密码" prop="newPwd">
                <el-input v-model="formData.newPwdAgain" type="password" size="default" placeholder="请确认密码" />
            </ElFormItem>
            <ElFormItem>
                <ElButton type="primary" size="default" @click="submitForm(formDataRef)">
                    确认修改
                </ElButton>
            </ElFormItem>
        </ElForm>
    </div>
</template>

<script setup lang="ts">
import { ElButton, ElInput, ElRow, ElCol, ElForm, ElFormItem, FormInstance, ElMessage, ElRadioGroup, ElRadio } from 'element-plus';
import { ref, reactive, getCurrentInstance, onMounted } from 'vue';
import md5 from 'js-md5';
import { basic, changePassword, editUserInfo } from '@/api/user';
import { useRouter } from 'vue-router';
import { UserInfoType } from './ModelDefines';
import { useUserStore } from '@/store/app';

const router = useRouter();

const formDataRef = ref<FormInstance>();

const formData = reactive<any>({
    oldPwd: '',
    newPwd: '',
    newPwdAgain: '',
});

const validatePass = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请再次输入密码'));
        // password 是表单上绑定的字段
    } else if (value !== formData.newPwd) {
        console.log(value, '988888');
        callback(new Error('两次输入密码不一致!'));
    } else {
        callback();
    }
};
const rules = reactive({
    oldPwd: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    newPwd: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    newPwdAgain: [
        { required: true, message: '请确认密码', trigger: 'blur' },
        { required: true, validator: validatePass, trigger: 'blur' }],
});

const userInfo = reactive<UserInfoType>({
    nickName: '',
    gender: '',
    mobilePhone: '',
    realName: '',
    userName: '',
    email: '',
});
const isEdit = ref<boolean>(false);

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) {
        return;
    }
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
        const res: any = await basic();
        userInfo.nickName = res.nickName;
        userInfo.gender = res.gender;
        userInfo.mobilePhone = res.mobilePhone;
        userInfo.realName = res.realName;
        userInfo.userName = res.userName;
        userInfo.email = res.email;
        const store = useUserStore();
        store.getUserInfo(res);
    } catch (err) { }
};

const { proxy } = getCurrentInstance() as any;
proxy.$md5 = md5;
const changePasswordFun = async () => {
    try {
        const oldPwd: any = ref(proxy.$md5(formData.oldPwd).substr(8, 16));
        const newPwd: any = ref(proxy.$md5(formData.newPwd).substr(8, 16));
        const res = await changePassword({
            oldPwd: oldPwd.value,
            newPwd: newPwd.value,
        });
        ElMessage.success('修改成功');
        router.push('/login');
    } catch (err) { }
};

const editFun = () => {
    isEdit.value = true;

};
const cancel = () => {
    isEdit.value = false;
};
const save = async () => {
    try {
        await editUserInfo(userInfo);
        isEdit.value = false;
    } catch (err) { }
};

onMounted(() => {
    getUser();
});
</script>

<style scoped lang="scss">
.user-top {
    background: #fff;
    padding: 20px;
    position: relative;

    .user-btn {
        position: absolute;
        right: 20px;
        top: 20px;
    }

    .el-col {
        color: #333333;
        margin-top: 20px;
        display: flex;
        line-height: 32px;

        .user-label {
            color: #999999;
            width: 60px;
            text-align: right;
            white-space: nowrap;
            display: block;
            line-height: 32px;
        }

        .el-input {
            padding-right: 20px;
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
