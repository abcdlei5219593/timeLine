<template>
    <div class="user-top">
        <p class="user-title">个人信息</p>
        <div class="user-btn">
            <ElButton class="border-btn" type="" v-if="!isEdit" size="default" @click="editFun"> 编辑 </ElButton>
            <ElButton type="" v-if="isEdit" size="default" @click="cancel"> 取消 </ElButton>
            <ElButton class="border-btn" type="" v-if="isEdit" size="default" @click="submitFormEdit(formEditRef)">
                保存
            </ElButton>
        </div>
        <ElForm ref="formEditRef" :model="userInfo" :rules="editRules">
            <ElRow>
                <ElCol :span="7">
                    <span class="user-label">姓名：</span>
                    <span v-if="!isEdit">{{ userInfo.nickName }}</span>
                    <ElFormItem prop="nickName" v-else>
                        <ElInput v-model="userInfo.nickName" placeholder="请输入" size="default"></ElInput>
                    </ElFormItem>
                </ElCol>
                <ElCol :span="7">
                    <span class="user-label">邮箱：</span>
                    <span v-if="!isEdit">{{ userInfo.email }}</span>
                    <ElFormItem prop="email" v-else>
                        <ElInput v-model="userInfo.email" placeholder="请输入" size="default"></ElInput>
                    </ElFormItem>
                </ElCol>
                <ElCol :span="7">
                    <span class="user-label">性别：</span>
                    <span v-if="!isEdit">{{ userInfo.gender }}</span>
                    <ElFormItem prop="gender" v-else>
                        <ElRadioGroup v-model="userInfo.gender">
                            <ElRadio label="男" size="default"> 男 </ElRadio>
                            <ElRadio label="女" size="default"> 女 </ElRadio>
                        </ElRadioGroup>
                    </ElFormItem>
                </ElCol>
                <ElCol :span="7">
                    <span class="user-label">登录名：</span>
                    <span>{{ userInfo.userName }}</span>
                </ElCol>
                <ElCol :span="7">
                    <span class="user-label">手机号：</span>
                    <span>{{ userInfo.mobilePhone }}</span>
                </ElCol>
            </ElRow>
        </ElForm>
    </div>
    <div class="user-bottom">
        <p class="user-title">修改密码</p>
        <ElForm ref="formDataRef" :model="formData" :rules="rules" label-width="80px">
            <ElFormItem label="旧密码" prop="oldPwd">
                <el-input v-model="formData.oldPwd" type="password" size="default" placeholder="请输入旧密码" />
            </ElFormItem>
            <ElFormItem label="新密码" prop="newPwd">
                <el-input v-model="formData.newPwd" type="password" size="default" placeholder="请输入新密码" />
            </ElFormItem>
            <ElFormItem label="确认密码" prop="newPwdAgain">
                <el-input v-model="formData.newPwdAgain" type="password" size="default" placeholder="请确认密码" />
            </ElFormItem>
            <ElFormItem>
                <ElButton type="primary" size="default" @click="submitForm(formDataRef)"> 确认修改 </ElButton>
            </ElFormItem>
        </ElForm>
    </div>
</template>

<script setup lang="ts">
import { FormInstance, ElMessage } from 'element-plus';
import { ref, reactive, getCurrentInstance, onMounted } from 'vue';
import md5 from 'js-md5';
import { basic, changePassword, editUserInfo } from '@/api/user';
import { useRouter } from 'vue-router';
import { UserInfoType } from './ModelDefines';
import { useUserStore } from '@/store/app';
import Cookie from 'js-cookie';

const router = useRouter();

const formDataRef = ref<FormInstance>();
const formEditRef = ref<FormInstance>();

const formData = reactive<any>({
    oldPwd: '',
    newPwd: '',
    newPwdAgain: '',
});

const validatePass = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请再次输入密码'));
        // password 是表单上绑定的字段
    } else if (value !== formData.newPwd) {
        callback(new Error('两次输入密码不一致!'));
    } else {
        callback();
    }
};

//修改个人信息rules
const editRules = reactive({
    mobilePhone: [
        { required: true, message: '请输入手机号', trigger: 'blur' },
        {
            required: true,
            pattern: /^1[3-9]\d{9}$/,
            message: '请输入正确的手机号',
            trigger: 'blur',
        },
    ],
    email: [
        {
            required: false,
            pattern: /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/,
            message: '请输入正确的邮箱',
            trigger: 'blur',
        },
    ],
});

//修改密码rules
const rules = reactive({
    oldPwd: [
        { required: true, message: '请输入旧密码', trigger: 'blur' },
        {
            required: true,
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
            message: '请输入6-20位字母+数字的密码',
            trigger: 'blur',
        },
    ],
    newPwd: [
        { required: true, message: '请输入新密码', trigger: 'blur' },
        {
            required: true,
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
            message: '请输入6-20位字母+数字的密码',
            trigger: 'blur',
        },
    ],
    newPwdAgain: [
        { required: true, message: '请确认密码', trigger: 'blur' },
        {
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
            message: '请输入6-20位字母+数字的密码',
            trigger: 'blur',
        },
        { required: true, validator: validatePass, message: '两次输入不相同', trigger: 'blur' },
    ],
});

const userInfo = reactive<UserInfoType>({
    nickName: '',
    gender: '',
    mobilePhone: '',
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
        // userInfo.realName = res.realName;
        userInfo.userName = res.userName;
        userInfo.email = res.email;
        const store = useUserStore();
        store.getUserInfo(res);
    } catch (err) {}
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
        Cookie.set('token', null);
        router.push('/login');
    } catch (err) {}
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
        getUser();
    } catch (err) {}
};

const submitFormEdit = async (formEl: FormInstance | undefined) => {
    if (!formEl) {
        return;
    }
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('submit!');
            save();
        } else {
            console.log('error submit!', fields);
        }
    });
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
        z-index: 10;

        .border-btn {
            border: 1px solid #2d8cf0;
            color: #2d8cf0;
        }
    }

    .el-row {
        padding: 6px 0 10px 0;
    }

    .el-col {
        color: #333333;
        margin-top: 16px;
        display: flex;
        line-height: 32px;
        height: 32px;

        .user-label {
            color: #999999;
            width: 60px;
            text-align: right;
            white-space: nowrap;
            display: block;
            height: 32px;
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
    :deep(.el-form-item__label) {
        line-height: 32px;
    }
    :deep(.el-form-item) {
        margin-bottom: 24px;
    }
}

.user-title {
    font-size: 16px;
    color: #333;
    line-height: 22px;
}
</style>
