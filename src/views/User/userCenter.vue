<template>
    <div class="main-content">
        <ElRow class="search-row">
            <ElCol :span="6">
                <span class="search-label">搜索：</span>
                <ElInput v-model="userParams.userName" size="default" placeholder="请输入关键词搜索"></ElInput>
            </ElCol>
            <ElCol :span="3">
                <ElButton type="primary" size="default" @click="getList">
                    搜索
                </ElButton>
            </ElCol>
            <ElCol :span="3">
                <ElButton type="primary" size="default" @click="addShow = true">
                    新增用户
                </ElButton>
            </ElCol>
        </ElRow>
        <ElTable id="userTable" class="table" :data="tableData"
            :style="{ height: `${maxTableHeight}px`, overflow: 'auto' }">
            <ElTableColumn prop="userName" label="账号" />
            <ElTableColumn prop="belongRole" label="角色" />
            <ElTableColumn prop="status" label="状态" />
            <ElTableColumn prop="remark" label="备注" />
            <ElTableColumn prop="address" fixed="right" label="操作" width="200">
                <template #default="scope">
                    <ElButton link type="primary" size="default">
                        编辑
                    </ElButton>
                    <ElButton link type="primary" size="default" @click="addPasswordShow = true">
                        密码修改
                    </ElButton>
                </template>
            </ElTableColumn>
        </ElTable>

        <ElPagination class="pagination" background layout="total,sizes,prev, pager, next,jumper" :total="total"
            :current-page="userParams.pageNum" :page-sizes="[10, 20, 50, 100]" :page-size="userParams.pageSize"
            @size-change="handleSizeChange" @current-change="handleCurrentChange" />

        <!--新增或编辑用户-->
        <ElDialog v-model="addShow" title="新增" width="50%">
            <div class="dialog">
                <ElForm ref="form" :model="addData" label-width="120px" label-position="top" class="demo-ruleForm">
                    <ElFormItem label="手机号" prop="pass">
                        <el-input v-model.number="addData.mobilePhone" size="default" />
                    </ElFormItem>
                    <ElFormItem label="角色分配" prop="checkPass">
                        <ElSelect v-model="addData.roleIds" placeholder="请选择" size="default">
                            <ElOption v-for="item in roleList" :key="item.value" :label="item.label" :value="item.value" />
                        </ElSelect>
                    </ElFormItem>
                    <ElFormItem label="状态" prop="status">
                        <el-radio-group v-model="addData.status">
                            <el-radio :label="3">
                                禁用
                            </el-radio>
                            <el-radio :label="6">
                                启用
                            </el-radio>
                        </el-radio-group>
                    </ElFormItem>
                    <ElFormItem label="备注说明">
                        <el-input v-model="addData.remark" type="textarea" size="default" />
                    </ElFormItem>
                </ElForm>
            </div>
            <span slot="footer" class="dialog-footer">
                <ElButton size="default" @click="addShow = false">取 消</ElButton>
                <ElButton type="primary" size="default" @click="save">保存提交</ElButton>
            </span>
        </ElDialog>

        <!--密码修改-->
        <ElDialog v-model="addPasswordShow" title="密码修改" width="50%">
            <div class="dialog">
                <ElForm ref="formDataRef" :model="editPassword" :rules="rules" label-width="80px" status-icon>
                    <ElFormItem label="新密码" prop="newPwd">
                        <el-input v-model="editPassword.newPwd" type="password" size="default" placeholder="请输入新密码" />
                    </ElFormItem>
                    <ElFormItem label="再次输入密码" prop="newPwdAgain">
                        <el-input v-model="editPassword.newPwdAgain" type="password" size="default" placeholder="请确认密码" />
                    </ElFormItem>
                </ElForm>
            </div>
            <span slot="footer" class="dialog-footer">
                <ElButton size="default" @click="addPasswordShow = false">取 消</ElButton>
                <!-- <ElButton type="primary" size="default" @click="submitForm(formDataRef)">保存提交</ElButton> -->
            </span>
        </ElDialog>
    </div>
</template>

<script setup lang="ts">
import useTableSetting from '@/hooks/useTableSetting';
import { ref, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { userList, userAdd, listRoleSelect } from '@/api/user';
import { UserParamsType, addUserType, editPasswordType } from './ModelDefines';
import { ElMessage } from 'element-plus';

const tableData: any = ref([]);
const addShow = ref<boolean>(false);
const total = ref<number>(0);
const roleList: any = ref([]);
const editPassword = ref<editPasswordType>({
    newPwd: '',
    newPwdAgain: ''
});
const addPasswordShow = ref<boolean>(false);

const userParams = reactive<UserParamsType>({
    userName: '',
    pageNum: 1,
    pageSize: 20,
});
const addData = reactive<addUserType>({
    mobilePhone: '',
    password: '',
    realName: '',
    roleIds: '',
    status: '',
    userName: '',
});

const getList = async () => {
    try {
        const res: any = await userList();
        tableData.value = res.list;
        userParams.pageNum = res.pageNum;
        userParams.pageSize = res.pageSize;
        total.value = res.total;
    } catch (err) { }
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
const getRoleList = () => {
    try {
        const res: any = listRoleSelect();
        roleList.value = res;
    } catch (err) {

    }
};

const save = async () => {
    try {
        await userAdd();
        addShow.value = false;
        ElMessage.success('操作成功');
    } catch (err) { }

};

onMounted(() => {
    getList();
    getRoleList();
});
const { maxTableHeight, setTableMaxHeight } = useTableSetting({ id: 'userTable', offsetBottom: 100 });
</script>

<style scoped lang="scss">
.dialog {
    height: 400px;

    .el-form {
        display: flex;
        flex-wrap: wrap;
    }

    .el-form-item {
        width: 50%;
        margin-right: 20px;

        &:nth-child(2n) {
            margin-right: 0 !important;
        }
    }
}
</style>
