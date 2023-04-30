<template>
    <div class="main-content">
        <ElRow class="search-row">
            <ElCol :span="6">
                <span class="search-label">搜索：</span>
                <ElInput v-model="roleParams.roleName" size="default" placeholder="请输入关键词搜索"></ElInput>
            </ElCol>
            <ElCol :span="3">
                <ElButton type="primary" size="default" @click="getList">
                    搜索
                </ElButton>
            </ElCol>
            <ElCol :span="3">
                <ElButton type="primary" size="default" @click="addShow = true">
                    新增角色
                </ElButton>
            </ElCol>
        </ElRow>
        <ElTable id="userTable" class="table" :data="tableData"
            :style="{ height: `${maxTableHeight}px`, overflow: 'auto' }">
            <ElTableColumn prop="userName" label="账号" />
            <ElTableColumn prop="roleName" label="角色" />
            <ElTableColumn prop="status" label="状态" />
            <ElTableColumn prop="roleDesc" label="备注" />
            <ElTableColumn prop="address" fixed="right" label="操作" width="200">
                <template #default="scope">
                    <ElButton link type="primary" size="default" @click="rootFun(scope.row)">
                        授权
                    </ElButton>
                    <ElButton link type="primary" size="default" @click="editFun(scope.row)">
                        编辑
                    </ElButton>
                </template>
            </ElTableColumn>
        </ElTable>

        <ElPagination class="pagination" background layout="total,sizes,prev, pager, next,jumper" :total="total"
            :current-page="roleParams.pageNum" :page-sizes="[10, 20, 50, 100]" :page-size="roleParams.pageSize"
            @size-change="handleSizeChange" @current-change="handleCurrentChange" />

        <!--新增或编辑角色-->
        <ElDialog v-model="addShow" :title="isEdit ? '编辑' : '新增'" width="50%">
            <div class="dialog">
                <ElForm ref="form" :model="addData" label-width="120px" label-position="top" class="demo-ruleForm">
                    <ElFormItem label="角色名" prop="pass">
                        <el-input v-model="addData.roleName" size="default" />
                    </ElFormItem>
                    <ElFormItem label="备注">
                        <el-input v-model="addData.roleDesc" type="textarea" size="default" />
                    </ElFormItem>
                </ElForm>
            </div>
            <span slot="footer" class="dialog-footer">
                <ElButton size="default" @click="closeFun">取 消</ElButton>
                <ElButton type="primary" size="default" @click="save">保存提交</ElButton>
            </span>
        </ElDialog>

        <!--授权-->
        <ElDialog v-model="showRoot" title="授权" width="50%">
            <div class="dialog">
                <authTreeModal :all-menu="allMenu"></authTreeModal>
            </div>
            <span slot="footer" class="dialog-footer">
                <ElButton size="default" @click="closeFun">取 消</ElButton>
                <ElButton type="primary" size="default" @click="save">保存提交</ElButton>
            </span>
        </ElDialog>
    </div>
</template>

<script setup lang="ts">
import useTableSetting from '@/hooks/useTableSetting';
import { ref, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { roleList, roleAdd, roleEdit } from '@/api/user';
import { listAllModule, listUserModule } from '@/api/system';
import { roleParamsType, addRoleType } from './ModelDefines';
import { ElMessage } from 'element-plus';
import authTreeModal from './components/authTreeModal.vue';

const tableData: any = ref([]);
const addShow = ref<boolean>(false);
const total = ref<number>(0);
const isEdit = ref<boolean>(false);
const showRoot = ref<boolean>(false);

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

const getList = async () => {
    try {
        const res: any = await roleList(roleParams);
        tableData.value = res.list;
        roleParams.pageNum = res.pageNum;
        roleParams.pageSize = res.pageSize;
        total.value = res.total;
    } catch (err) { }
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

const save = async () => {
    try {
        await isEdit.value ? roleEdit(addData) : roleAdd(addData);
        addShow.value = false;
        ElMessage.success('操作成功');
        getList();
    } catch (err) { }

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
};

const rootFun = (row) => {
    showRoot.value = true;
};

// 获取所有菜单
const getAllMenu = async () => {
    try {
        allMenu.value = await listAllModule();
        console.log(allMenu.value, 'allMenu.valueallMenu.valueallMenu.value');
    } catch (err) { }
};

onMounted(() => {
    getAllMenu();
    getList();
});
const { maxTableHeight, setTableMaxHeight } = useTableSetting({ id: 'userTable', offsetBottom: 100 });
</script>

<style scoped lang="scss">
.dialog {
    height: 300px;

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

