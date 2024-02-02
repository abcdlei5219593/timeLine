<template>
    <div class="main-content">
        <ElForm
            ref="searchFormRef"
            :model="searchForm"
            inline
            class="search-form"
            label-width="68px"
            label-position="left">
            <ElFormItem label="道路编号" prop="code">
                <ElInput
                    v-model="searchForm.code"
                    size="default"
                    placeholder="请输入"
                ></ElInput>
            </ElFormItem>
            <ElFormItem label="道路名称" prop="name">
                <ElInput
                    v-model="searchForm.name"
                    size="default"
                    placeholder="请输入"
                ></ElInput>
            </ElFormItem>
            <ElFormItem label="项目" prop="status">
                <ElSelect
                    v-model="searchForm.unit"
                    size="default"
                    placeholder="请选择"
                >
                </ElSelect>
            </ElFormItem>
            <ElFormItem label="状态" prop="status">
                <ElSelect
                    v-model="searchForm.unit"
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
                    创建道路
                </ElButton>
            </div>
            <ElTable
                border
                id="userTable"
                class="table"
                :data="tableData"
                :style="{ height: `${maxTableHeight}px`, overflow: 'auto' }"
            >
                <ElTableColumn prop="code" label="项目编号" width="120px" />
                <ElTableColumn prop="name" label="项目名称" width="120px" />
                <ElTableColumn prop="unit" label="道路名称 " width="120px" />
                <ElTableColumn prop="status" label="状态" width="120px" >
                    <template #default="scope">

                    </template>
                </ElTableColumn>
                <ElTableColumn prop="kaigong" label="管井管线数" width="120px" />
                <ElTableColumn prop="date" label="检测任务数" width="120px" />
                <ElTableColumn prop="user" label="清淤任务数" width="120px" />

                <ElTableColumn prop="kaigong" label="判读任务数" width="120px" />
                <ElTableColumn prop="date" label="待审任务数" width="120px" />
                <ElTableColumn prop="user" label="清淤任务数" width="120px" />
                <ElTableColumn  fixed="right" label="操作" width="350px">
                    <template #default="scope">

                        <el-upload
                            class="upload-demo"
                            ref="upload"
                            action="https://jsonplaceholder.typicode.com/posts/"

                            :show-file-list="false"
                            :auto-upload="false">
                        <ElButton
                            link
                            type="text"
                            size="default"
                            @click="editFun(scope.row)"
                            >
                            导入CAD
                            </ElButton>
                        </el-upload>

                        <ElButton  link type="text" size="default" @click="editFun(scope.row)">
                            导出CAD
                        </ElButton>
                        <ElButton  link type="text" size="default" @click="editFun(scope.row)">
                            导出数据
                        </ElButton>
                        <ElButton  link type="text" size="default" @click="editFun(scope.row)">
                            导入报告数据
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
            <ElDialog   class="main-dialog" v-model="addShow"  :title="addForm.id ? '编辑道路' : '创建道路'" width="480px">
                <div class="dialog-form">
                    <ElForm
                        ref="addFormRef"
                        :model="addForm"
                        :rules="rules"
                        label-width="80px"
                        label-position="left"
                    >
                        <ElFormItem label="道路编号" prop="roleName">
                            <el-input v-model="addForm.code" size="default" placeholder="请输入角色名" maxlength="10" />
                        </ElFormItem>
                        <ElFormItem label="道路名称" prop="roleName">
                            <el-input v-model="addForm.name" size="default" placeholder="请输入角色名" maxlength="10" />
                        </ElFormItem>

                        <ElFormItem label="所属项目">
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

};



onMounted(() => {

    getList();
});
const { maxTableHeight, setTableMaxHeight } = useTableSetting({ id: 'userTable', offsetBottom: 92 });
</script>

<style scoped lang="scss">
.upload-demo{
    margin-right: 12px;
    display: inline-block;
}
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

