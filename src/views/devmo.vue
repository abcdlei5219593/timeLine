<template>
    <div class="main-content">
        <ElForm
            ref="searchFormRef"
            :model="searchForm"
            inline
            class="search-form"
            label-width="68px"
            label-position="left">
            <ElFormItem label="项目编号" prop="code">
                <ElInput
                    v-model="searchForm.code"
                    size="default"
                    placeholder="请输入"
                ></ElInput>
            </ElFormItem>
            <ElFormItem label="项目名称" prop="name">
                <ElInput
                    v-model="searchForm.name"
                    size="default"
                    placeholder="请输入"
                ></ElInput>
            </ElFormItem>
            <ElFormItem label="委托单位" prop="unit">
                <ElInput
                    v-model="searchForm.unit"
                    size="default"
                    placeholder="请输入"
                ></ElInput>
            </ElFormItem>
            <ElFormItem label="项目工期" prop="date">
                <el-date-picker
                    v-model="searchForm.date"
                    type="date"
                    size="default"
                    placeholder="请选择"
                    value-format="YYYY-MM-DD"
                />
            </ElFormItem>
            <ElFormItem label="负责人" prop="user">
                <ElSelect
                    v-model="searchForm.user"
                    size="default"
                    placeholder="请选择"
                >
                </ElSelect>
            </ElFormItem>
            <ElFormItem label="项目状态" prop="status">
                <ElSelect
                    v-model="searchForm.status"
                    size="default"
                    placeholder="请选择"
                >
                </ElSelect>
            </ElFormItem>

            <ElFormItem>
                <ElButton
                    size="default"
                    color="#4371EE"
                >
                    查询
                </ElButton>
                <ElButton
                    size="default"
                    plain=""
                    @click="reset"
                >
                    重置
                </ElButton>
            </ElFormItem>
        </ElForm>
            <!-- </ElCol> -->
            <div class="btns">
                <ElButton

                    class="add-btn"
                    color="#4371EE"
                    size="default"
                    :icon="Plus"
                    @click="addShow = true"
                >
                    新增角色
                </ElButton>
            </div>
            <ElTable
                border
                id="userTable"
                class="table"
                :data="tableData"
                :style="{ height: `${maxTableHeight}px`, overflow: 'auto' }"
            >
                <ElTableColumn prop="code" label="项目编号" />
                <ElTableColumn prop="name" label="项目名称" />
                <ElTableColumn prop="unit" label="委托单位" />
                <ElTableColumn prop="kaigong" label="开工日项" />
                <ElTableColumn prop="date" label="验收日期" />
                <ElTableColumn prop="user" label="项目负责人" />
                <ElTableColumn prop="status" label="项目状态" >
                    <template #default="scope">

                    </template>
                </ElTableColumn>

                <ElTableColumn  fixed="right" label="操作" width="200">
                    <template #default="scope">
                        <ElButton

                            link
                            type="text"
                            size="default"
                            @click="goDetail(scope.row)"
                        >
                            详情
                        </ElButton>
                        <ElButton  link type="text" size="default" @click="editFun(scope.row)">
                            编辑
                        </ElButton>
                        <ElButton  link type="text" size="default" @click="editFun(scope.row)">
                            成员管理
                        </ElButton>
                    </template>
                </ElTableColumn>
            </ElTable>

            <ElPagination
                class="pagination"
                background
                layout="total,sizes,prev, pager, next,jumper"
                :total="total"
                :current-page="searchForm.pageNum"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="searchForm.pageSize"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            />

            <!--新增或编辑角色-->
            <ElDialog   class="main-dialog" v-model="addShow"  :title="addForm.id ? '编辑项目' : '创建项目'" width="480px">
                <div class="dialog-form">
                    <ElForm
                        ref="addFormRef"
                        :model="addForm"
                        :rules="rules"
                        label-width="80px"
                        label-position="left"
                    >
                        <ElFormItem label="项目编号" prop="roleName">
                            <el-input v-model="addForm.code" size="default" placeholder="请输入角色名" maxlength="10" />
                        </ElFormItem>
                        <ElFormItem label="项目名称" prop="roleName">
                            <el-input v-model="addForm.name" size="default" placeholder="请输入角色名" maxlength="10" />
                        </ElFormItem>
                        <ElFormItem label="委托单位" prop="roleName">
                            <el-input v-model="addForm.unit" size="default" placeholder="请输入角色名" maxlength="10" />
                        </ElFormItem>
                        <ElFormItem label="项目工期" prop="roleName">
                            <el-date-picker
                                v-model="addForm.date"
                                type="date"
                                size="default"
                                placeholder="请选择"
                                value-format="YYYY-MM-DD"
                            />
                        </ElFormItem>
                        <ElFormItem label="负责人" prop="roleName">
                            <el-input v-model="addForm.user" size="default" placeholder="请输入角色名" maxlength="10" />
                        </ElFormItem>
                        <ElFormItem label="联系电话" prop="roleName">
                            <el-input v-model="addForm.phone" size="default" placeholder="请输入角色名" maxlength="10" />
                        </ElFormItem>
                        <ElFormItem label="项目状态">
                            <ElSelect
                                v-model="addForm.status"
                                size="default"
                                placeholder="请选择"
                            >
                            </ElSelect>
                        </ElFormItem>
                    </ElForm>
                </div>
                <template #footer>
                    <span  class="dialog-footer">
                        <ElButton size="default" @click="addShow = false">取 消</ElButton>
                        <ElButton color="#4371EE" size="default" @click="submitForm(addFormRef)">提 交</ElButton>
                    </span>
                </template>

            </ElDialog>



    </div>
</template>

<script setup lang="ts">
import useTableSetting from '@/hooks/useTableSetting';
import { ref, onMounted, reactive, nextTick, watch } from 'vue';


import { ElMessage, ElTree, FormInstance } from 'element-plus';

import { getFlatDeepTreeData } from '@/utils/common';
import { Search, Plus } from '@element-plus/icons-vue';
import { validateForm } from '@/helper/index';

const tableData: any = ref([
    {
        id: 1,
        code: 'xc-001',
        name: '测试项目',
        unit: '单位名称',
        date: '2023-09-10',
        user: '张三',
        kaigong: '2023-09-10',
        status: 1,
    }
]);



const searchFormRef = ref<FormInstance>(null);

const details = ref({});


const searchForm = reactive<searchFormType>({
    code: '',
    name: '',
    unit: '',
    date: '',
    user: '',
    status: '',
    pageNum: 1,
    pageSize: 20,
});
const total = ref<number>(0);


const rules = reactive({
    roleName: [{ required: true, message: '请输入角色名', trigger: 'blur' }],
});


const getList = async () => {
    // try {
    //     const res: any = await roleList(searchForm);
    //     tableData.value = res.list;
    //     searchForm.pageNum = res.pageNum;
    //     searchForm.pageSize = res.pageSize;
    //     total.value = res.total;
    // } catch (err) {}
};

const goDetail = (row) => {
    details.value = JSON.parse(JSON.stringify(row));
};

const reset = () => {
    searchFormRef.value.resetFields();
    searchForm.pageNum = 1;
    getList();
};

const handleSizeChange = (rows: number) => {
    searchForm.pageNum = 1;
    searchForm.pageSize = rows;
    getList();
};
const handleCurrentChange = (page: number) => {
    searchForm.pageNum = page;
    getList();
};


const addShow = ref<boolean>(false);
const addFormRef = ref<FormInstance>(null);
const addForm = reactive<addRoleType>({
    id: '',
    code: '',
    name: '',
    unit: '',
    date: '',
    user: '',
    status: '',
    phone: ''
});

const resetForm = (form) => {
    Object.keys(form).forEach(key => addForm[key] = '');
};

watch(
    addShow,
    val => {
        if(!val) {
            addFormRef.value.clearValidate();
            resetForm(addForm);
        }
    }
);

const submitForm = async (formEl: FormInstance | undefined) => {
    await validateForm(formEl);
    resetForm();
};



const editFun = async (row: any) => {
    addShow.value = true;
    Object.keys(row).forEach(key => {
        if(key in addForm) {
            addForm[key] = row[key];
        }
    });
};



onMounted(() => {

    getList();
});
const { maxTableHeight, setTableMaxHeight } = useTableSetting({ id: 'userTable', offsetBottom: 92 });
</script>

<style scoped lang="scss">
.main-content > .btns{
    margin:10px 0 20px;
}
.search-form{
   ::v-deep(){
    .el-input,.el-select{
        width: 265px !important;
    }
   }
}
</style>

