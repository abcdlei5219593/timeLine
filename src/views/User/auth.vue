<template>
    <div class="main-content">
        <ElRow class="search-row">
            <ElCol :span="6">
                <span class="search-label">搜索：</span>
                <ElInput
                    v-model="roleParams.roleName"
                    size="default"
                    placeholder="请输入角色关键词搜索"
                    :prefix-icon="Search"
                ></ElInput>
            </ElCol>
            <ElCol :span="3">
                <ElButton color="#4371EE" size="default" @click="getList"> 搜索 </ElButton>
            </ElCol>
            <!-- <ElCol :span="3"> -->
            <ElButton
                class="add-btn"
                color="#4371EE"
                size="default"
                @click="addShow = true"
                :icon="Plus"
                v-permission="'/addRole'"
            >
                新增角色
            </ElButton>
            <!-- </ElCol> -->
        </ElRow>
        <ElTable
            id="userTable"
            class="table"
            :data="tableData"
            :style="{ height: `${maxTableHeight}px`, overflow: 'auto' }"
        >
            <ElTableColumn prop="roleName" label="角色名" />
            <ElTableColumn prop="roleDesc" label="备注" />
            <ElTableColumn prop="address" fixed="right" label="操作" width="200">
                <template #default="scope">
                    <ElButton
                        link
                        color="#4371EE"
                        size="default"
                        @click="rootFun(scope.row)"
                        v-permission="'/authorized'"
                    >
                        授权
                    </ElButton>
                    <ElButton link color="#4371EE" size="default" @click="editFun(scope.row)" v-permission="'/editRole'">
                        编辑
                    </ElButton>
                </template>
            </ElTableColumn>
        </ElTable>

        <ElPagination
            class="pagination"
            background
            layout="total,sizes,prev, pager, next,jumper"
            :total="total"
            :current-page="roleParams.pageNum"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="roleParams.pageSize"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />

        <!--新增或编辑角色-->
        <ElDialog class="dialog" v-model="addShow" :title="isEdit ? '编辑' : '新增'" width="600px">
            <div class="dialog">
                <ElForm
                    ref="formDataRef"
                    :model="addData"
                    :rules="rules"
                    label-width="120px"
                    label-position="top"
                    class="demo-ruleForm"
                >
                    <ElFormItem label="角色名" prop="roleName">
                        <el-input v-model="addData.roleName" size="default" placeholder="请输入角色名" maxlength="10" />
                    </ElFormItem>
                    <ElFormItem label="备注">
                        <el-input
                            v-model="addData.roleDesc"
                            type="textarea"
                            size="default"
                            placeholder="请输入备注"
                            maxlength="50"
                        />
                    </ElFormItem>
                </ElForm>
            </div>
            <span slot="footer" class="dialog-footer">
                <ElButton size="default" @click="closeFun">取 消</ElButton>
                <ElButton color="#4371EE" size="default" @click="submitForm(formDataRef)">保存提交</ElButton>
            </span>
        </ElDialog>

        <!--授权-->
        <ElDialog class="dialog" v-model="showRoot" title="授权" width="600px">
            <div class="root-dialog dialog-content">
                <p class="root-title">
                    为“<span>{{ currentRole }}</span
                    >”授予权限
                </p>
                <p class="root-btn">权限资源</p>
                <ElTree
                    ref="tree"
                    :data="allMenu"
                    :props="props"
                    show-checkbox
                    node-key="moduleId"
                    @check-change="handleCheckChange"
                />
            </div>
            <span slot="footer" class="dialog-footer">
                <ElButton size="default" @click="closeFun">取 消</ElButton>
                <ElButton color="#4371EE" size="default" @click="rootSave">保存提交</ElButton>
            </span>
        </ElDialog>
    </div>
</template>

<script setup lang="ts">
import useTableSetting from '@/hooks/useTableSetting';
import { ref, onMounted, reactive, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { roleList, roleAdd, roleEdit } from '@/api/user';
import { listAllModule, getRoleList } from '@/api/system';
import { roleParamsType, addRoleType } from './ModelDefines';
import { ElMessage, ElTree, FormInstance } from 'element-plus';
import authTreeModal from './components/authTreeModal.vue';
import { getFlatDeepTreeData } from '@/utils/common';
import { Search, Plus } from '@element-plus/icons-vue';

const tableData: any = ref([]);
const addShow = ref<boolean>(false);
const total = ref<number>(0);
const isEdit = ref<boolean>(false);
const showRoot = ref<boolean>(false);
const currentRole: any = ref('');

const props = {
    label: 'label',
};

const roleParams = reactive<roleParamsType>({
    roleName: '',
    pageNum: 1,
    pageSize: 20,
});
const addData = reactive<addRoleType>({
    roleName: '',
    roleDesc: '',
});
const allMenu: any = ref([]);

const rules = reactive({
    roleName: [{ required: true, message: '请输入角色名', trigger: 'blur' }],
});

const getList = async () => {
    try {
        const res: any = await roleList(roleParams);
        tableData.value = res.list;
        roleParams.pageNum = res.pageNum;
        roleParams.pageSize = res.pageSize;
        total.value = res.total;
    } catch (err) {}
};

const handleSizeChange = (rows: number) => {
    roleParams.pageNum = 1;
    roleParams.pageSize = rows;
    getList();
};
const handleCurrentChange = (page: number) => {
    roleParams.pageNum = page;
    getList();
};

const formDataRef = ref<FormInstance>();
const submitForm = async (formEl: FormInstance | undefined) => {
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

const save = async () => {
    try {
        const res: any = isEdit.value ? await roleEdit(addData) : await roleAdd(addData);
        addShow.value = false;
        ElMessage.success('操作成功');
        getList();
    } catch (err) {}
};

const editFun = async (row: any) => {
    isEdit.value = true;
    addShow.value = true;
    addData.roleId = row.roleId;
    addData.roleName = row.roleName;
    addData.roleDesc = row.roleDesc;
};

const closeFun = () => {
    addData.roleId = '';
    isEdit.value = false;
    addShow.value = false;
    showRoot.value = false;
};

const tree = ref(null);
const moduleIds: any = ref('');
const rootFun = async (row: any) => {
    showRoot.value = true;
    currentRole.value = row.roleName;
    addData.roleId = row.roleId;
    addData.roleName = row.roleName;
    addData.roleDesc = row.roleDesc;
    await nextTick();
    const res: any = await getRoleList({
        roleId: row.roleId,
    });
    moduleIds.value = res;

    // 授权回显
    let node: any = [];
    tree.value.setCheckedNodes(getFlatDeepTreeData(res, node));

    // res.forEach((r: any) => {
    //     allMenu.value.forEach((a: any) => {
    //         if (r.moduleId === a.moduleId) {
    //             r.children.forEach((item: any) => {
    //                 a.children.forEach((t: any) => {
    //                     if (item.moduleId === t.moduleId) {
    //                         node.push(t);

    //                     }
    //                 });
    //             });
    //         }
    //     });
    // });

    // res[0].children.forEach((item: any) => {
    //     allMenu.value[0].children.forEach((t: any) => {
    //         if (item.moduleId === t.moduleId) {
    //             console.log('11');
    //             tree.value.setCheckedNodes([t]);
    //         }
    //     });
    // });
};

// 获取所有菜单
const getAllMenu = async () => {
    try {
        const res: any = await listAllModule();
        allMenu.value = res;
    } catch (err) {}
};

// 授权修改

const handleCheckChange = (val) => {
    // moduleIds.value = tree.value.getCheckedKeys().join(',');
    moduleIds.value = [...new Set([tree.value.getCheckedKeys(), ...tree.value.getHalfCheckedKeys()])].join(',');
    // console.log(moduleIds.value, 'moduleIds.valuemoduleIds.value');
};

// 授权保存
const rootSave = async () => {
    try {
        const res: any = await roleEdit({
            moduleIds: moduleIds.value,
            roleId: addData.roleId,
            roleName: addData.roleName,
        });
        ElMessage.success('操作成功');
        showRoot.value = false;
        getList();
    } catch (err) {}
};

// 获取角色授权
const getRoleRoot = async (roleId: any) => {
    try {
        await getRoleList(roleId);
    } catch (err) {}
};

onMounted(() => {
    getAllMenu();
    getList();
});
const { maxTableHeight, setTableMaxHeight } = useTableSetting({ id: 'userTable', offsetBottom: 100 });
</script>

<style scoped lang="scss">
.search-row {
    // justify-content: space-between;

    .add-btn {
        margin-left: auto;
    }
}

.dialog {
    height: 300px;

    .el-form {
        display: flex;
        flex-wrap: wrap;
    }

    .el-form-item {
        width: 100%;
        // margin-right: 20px;

        &:nth-child(2n) {
            margin-right: 0 !important;
        }
    }
}
.root-dialog {
    height: 450px;
    .root-title {
        color: #333333;

        span {
            color: #ff6600;
            font-weight: 600;
        }
    }
    .root-btn {
        width: 88px;
        height: 32px;
        text-align: center;
        line-height: 32px;
        background: rgba(45, 140, 240, 0.2);
        border-radius: 4px;
        display: block;
        color: #2d8cf0;
        font-weight: 500;
        margin: 22px 0 18px 0;
    }
}
:deep(.el-tree) {
    .el-tree-node {
        margin-bottom: 9px;

        &:last-child {
            margin-bottom: 0 !important;
        }
    }
    .el-tree-node__content {
        margin-top: 10px;
    }
    .el-tree-node__content > .el-tree-node__expand-icon {
        padding-left: 0;
    }
}
</style>

