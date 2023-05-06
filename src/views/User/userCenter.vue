<template>
    <div class="main-content">
        <ElRow class="search-row">
            <ElCol :span="6">
                <span class="search-label">搜索：</span>
                <ElInput v-model="userParams.userName" size="default" placeholder="请输入关键词搜索"></ElInput>
            </ElCol>
            <ElCol :span="3">
                <ElButton type="primary" size="default" @click="getList"> 搜索 </ElButton>
            </ElCol>
            <ElButton class="add-btn" type="primary" size="default" @click="addFun"> 新增用户 </ElButton>
        </ElRow>
        <ElTable
            id="userTable"
            class="table"
            :data="tableData"
            :style="{ height: `${maxTableHeight}px`, overflow: 'auto' }"
        >
            <ElTableColumn prop="userName" label="账号" />
            <ElTableColumn prop="belongRole" label="角色" />
            <ElTableColumn prop="status" label="状态">
                <template #default="scope">
                    <span v-if="scope.row.status === '1'">启用</span>
                    <span v-else-if="scope.row.status === '2'">禁用</span>
                </template>
            </ElTableColumn>
            <ElTableColumn prop="remark" label="备注" />
            <ElTableColumn prop="address" fixed="right" label="操作" width="200">
                <template #default="scope">
                    <ElButton link type="primary" size="default" @click="editFun(scope.row)"> 编辑 </ElButton>
                    <ElButton link type="primary" size="default" @click="showChangePassword(scope.row)">
                        密码修改
                    </ElButton>
                </template>
            </ElTableColumn>
        </ElTable>

        <ElPagination
            class="pagination"
            background
            layout="total,sizes,prev, pager, next,jumper"
            :total="total"
            :current-page="userParams.pageNum"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="userParams.pageSize"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />

        <!--新增或编辑用户-->
        <ElDialog class="dialog" v-model="addShow" :title="isEdit ? '编辑' : '新增'" width="600px">
            <div class="dialog dialog-content">
                <ElForm
                    ref="formAdd"
                    :model="addData"
                    :rules="isEdit ? rulesEdit : rulesAdd"
                    label-width="120px"
                    label-position="top"
                    class="demo-ruleForm"
                >
                    <ElFormItem label="手机号" prop="mobilePhone">
                        <el-input v-model.number="addData.mobilePhone" size="default" />
                    </ElFormItem>
                    <ElFormItem v-if="!isEdit" label="密码" prop="password">
                        <el-input v-model="addData.password" type="password" size="default" placeholder="请输入密码" />
                    </ElFormItem>
                    <ElFormItem v-if="!isEdit" label="确认密码" prop="newPwdAgain">
                        <el-input
                            v-model="addData.newPwdAgain"
                            type="password"
                            size="default"
                            placeholder="请确认密码"
                        />
                    </ElFormItem>
                    <ElFormItem label="角色分配" prop="roleIds">
                        <ElSelect v-model="addData.roleIds" placeholder="请选择" size="default">
                            <ElOption
                                v-for="(item, i) in roleListArray"
                                :key="i"
                                :label="item.roleName"
                                :value="item.roleId"
                            />
                        </ElSelect>
                    </ElFormItem>
                    <ElFormItem label="状态" prop="status">
                        <el-radio-group v-model="addData.status">
                            <el-radio :label="'0'"> 禁用 </el-radio>
                            <el-radio :label="'1'"> 启用 </el-radio>
                        </el-radio-group>
                    </ElFormItem>
                    <ElFormItem label="备注说明">
                        <el-input v-model="addData.remark" type="textarea" size="default" />
                    </ElFormItem>
                </ElForm>
            </div>
            <span slot="footer" class="dialog-footer">
                <ElButton size="default" @click="addShow = false">取 消</ElButton>
                <ElButton type="primary" size="default" @click="submitAdd(formAdd)">保存提交</ElButton>
            </span>
        </ElDialog>

        <!--密码修改-->
        <ElDialog class="dialog" v-model="passwordShow" title="密码修改" width="600px">
            <div class="dialog dialog-content">
                <ElForm ref="formDataRef" :model="editPassword" :rules="rules" label-position="top">
                    <ElFormItem label="新密码" prop="password">
                        <el-input
                            v-model="editPassword.password"
                            type="password"
                            size="default"
                            placeholder="请输入新密码"
                        />
                    </ElFormItem>
                    <ElFormItem label="再次输入密码" prop="newPwdAgain">
                        <el-input
                            v-model="editPassword.newPwdAgain"
                            type="password"
                            size="default"
                            placeholder="请确认密码"
                        />
                    </ElFormItem>
                </ElForm>
            </div>
            <span slot="footer" class="dialog-footer">
                <ElButton size="default" @click="passwordShow = false">取 消</ElButton>
                <ElButton type="primary" size="default" @click="submitForm(formDataRef)">保存提交</ElButton>
            </span>
        </ElDialog>
    </div>
</template>

<script setup lang="ts">
import { FormInstance, ElMessage } from 'element-plus';
import useTableSetting from '@/hooks/useTableSetting';
import { ref, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { userList, userAdd, listRoleSelect, resetPassword, userEdit } from '@/api/user';
import { UserParamsType, addUserType, editPasswordType } from './ModelDefines';
import md5 from 'js-md5';

const tableData: any = ref([]);
const addShow = ref<boolean>(false);
const total = ref<number>(0);
const roleListArray: any = ref([]);
const editPassword = reactive<editPasswordType>({
    userId: null,
    password: '',
    newPwdAgain: '',
});
const passwordShow = ref<boolean>(false);
const isEdit = ref<boolean>(false);

const userParams = reactive<UserParamsType>({
    userName: '',
    pageNum: 1,
    pageSize: 20,
});
const addData = reactive<addUserType>({
    mobilePhone: '',
    roleIds: '',
    status: '1',
    userName: '',
    remark: '',
    password: '',
    newPwdAgain: '',
});

const getList = async () => {
    try {
        const res: any = await userList(userParams);
        tableData.value = res.list;
        userParams.pageNum = res.pageNum;
        userParams.pageSize = res.pageSize;
        total.value = res.total;
    } catch (err) {}
};

const handleSizeChange = (rows: number) => {
    userParams.pageNum = 1;
    userParams.pageSize = rows;
    getList();
};
const handleCurrentChange = (page: number) => {
    userParams.pageNum = page;
    getList();
};

// 获取角色列表
const getRoleList = async () => {
    try {
        roleListArray.value = await listRoleSelect({});
    } catch (err) {}
};

const save = async () => {
    const userName: any = addData.mobilePhone;
    const password: any = md5(addData.password).substr(8, 16);
    addData.userName = userName;
    addData.password = password;
    try {
        const res: any = isEdit.value ? await userEdit(addData) : await userAdd(addData);
        addShow.value = false;
        ElMessage.success('操作成功');
        getList();
    } catch (err) {}
};

const addFun = () => {
    addData.mobilePhone = '';
    addData.roleIds = '';
    addData.status = '1';
    addData.userName = '';
    addData.remark = '';
    addData.userId = '';
    isEdit.value = false;
    addShow.value = true;
};

const editFun = (row: any) => {
    addData.mobilePhone = row.mobilePhone;
    addData.roleIds = row.belongRoleIds ? parseInt(row.belongRoleIds) : null; // eslint-disable-line
    addData.status = row.status;
    addData.userName = row.userName;
    addData.remark = row.remark;
    addData.userId = row.userId;
    isEdit.value = true;
    addShow.value = true;
};

const formAdd = ref<FormInstance>();
// 新增编辑提交
const submitAdd = async (formEl: FormInstance | undefined) => {
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

// 新增用户里的密码
const validatePassAdd = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请再次输入密码'));
        // password 是表单上绑定的字段
    } else if (value !== addData.password) {
        callback(new Error('两次输入密码不一致!'));
    } else {
        callback();
    }
};
const rulesAdd = reactive({
    mobilePhone: [
        { required: true, message: '请输入手机号', trigger: 'blur' },
        { required: true, pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' },
    ],
    roleIds: [{ required: true, message: '请请选择角色', trigger: 'change' }],
    password: [
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
        { required: true, validator: validatePassAdd, message: '两次输入不相同', trigger: 'blur' },
    ],
});
const rulesEdit = reactive({
    mobilePhone: [
        { required: true, message: '请输入手机号', trigger: 'blur' },
        { required: true, pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' },
    ],
    roleIds: [{ required: true, message: '请请选择角色', trigger: 'change' }],
});

const showChangePassword = (row: any) => {
    editPassword.userId = row.userId;
    passwordShow.value = true;
};

// 重置密码再次输入校验
const validatePass = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请再次输入密码'));
        // password 是表单上绑定的字段
    } else if (value !== editPassword.password) {
        callback(new Error('两次输入密码不一致!'));
    } else {
        callback();
    }
};
const rules = reactive({
    password: [
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

// 重置密码
const resetPasswordFun = async () => {
    try {
        const res: any = await resetPassword({
            password: md5(editPassword.password).substr(8, 16),
            userId: editPassword.userId,
        });
        ElMessage.success('操作成功');
        passwordShow.value = false;
    } catch (err) {}
};

const formDataRef = ref<FormInstance>();
// 修改密码的提交
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) {
        return;
    }
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('submit!');
            resetPasswordFun();
        } else {
            console.log('error submit!', fields);
        }
    });
};

onMounted(() => {
    getList();
    getRoleList();
});
const { maxTableHeight, setTableMaxHeight } = useTableSetting({ id: 'userTable', offsetBottom: 100 });
</script>

<style scoped lang="scss">
.search-row {
    justify-content: space-between;

    .add-btn {
        margin-left: auto;
    }
}

.dialog {
    height: 400px;

    .el-form {
        display: flex;
        flex-wrap: wrap;
    }

    .el-form-item {
        width: 100%;
    }
}
</style>
