<template>
    <div class="main-content">
        <ElForm
            ref="searchFormRef"
            :model="searchForm"
            inline
            class="search-form"
            label-width="68px"
            label-position="left">

            <ElFormItem label="字典名称" prop="dictCode">
                    <DictSelect size="default" v-model="searchForm.dictCode" clearable :type="DictType.DIC_TYPE" placeholder="请选择" />
                </ElFormItem>
                <ElFormItem label="字典值" props="dicValue">
                    <ElInput size="default" v-model="searchForm.dictValue" clearable placeholder="请输入内容"></ElInput>
                </ElFormItem>


            <ElFormItem>
                <ElButton
                    size="default"
                    color="#4371EE"
                    @click="reset(false)"
                >
                    查询
                </ElButton>
                <ElButton
                    size="default"
                    plain=""
                    @click="reset(true)"
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
                    添加成员
                </ElButton>
            </div>
            <ElTable
                border
                id="userTable"
                class="table"
                :data="tableData"
                :style="{ height: `${maxTableHeight}px`, overflow: 'auto' }"
            >
                <ElTableColumn label="序号" width="80">
                    <template #default="scoped">
                        {{ ((searchForm.pageNum - 1) * searchForm.pageSize) + scoped.$index + 1 }}
                    </template>
                </ElTableColumn>
                <ElTableColumn label="字典类型">
                    <template #default="scoped">
                        {{ dictType.find((dict) => dict.dictValue === scoped.row.dictCode)?.dictDesc }}
                    </template>
                </ElTableColumn>
                <ElTableColumn prop="dictDesc" label="字典名称"></ElTableColumn>
                <ElTableColumn prop="dictValue" label="字典值"></ElTableColumn>

                <ElTableColumn prop="operator" label="最近操作人"></ElTableColumn>
                <ElTableColumn prop="updateTime" label="最近操作时间" width="150"></ElTableColumn>
                <ElTableColumn  fixed="right" label="操作" width="120">
                    <template #default="scope">
                        <ElButton

                            link
                            type="text"
                            size="default"
                            @click="editFun(scope.row)"
                        >
                            修改
                        </ElButton>
                        <ElButton  link type="text" size="default" @click="handleDelete(scope.row)">
                            删除
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
            <ElDialog   class="main-dialog" v-model="addShow"  :title="addForm.id ? '修改字典' : '添加字典'" width="480px">
                <div class="dialog-form">
                    <ElForm
                        ref="addFormRef"
                        :model="addForm"
                        :rules="rules"
                        label-width="80px"
                        label-position="left"
                    >

                    <ElFormItem label="字典名称" prop="dictDesc" class="full-item">
                        <el-input v-model="addForm.dictDesc" size="default" placeholder="请输入" maxlength="10" />
                    </ElFormItem>
                    <ElFormItem label="字典类型" prop="dictCode" class="full-item">
                        <DictSelect
                            v-model="addForm.dictCode"
                            :type="DictType.DIC_TYPE"
                            size="default"
                            placeholder="请输入"
                            maxlength="10"
                        />
                    </ElFormItem>
                    <ElFormItem label="字典值" prop="dictValue" class="full-item">
                        <el-input v-model="addForm.dictValue" size="default" placeholder="请输入" maxlength="10" />
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
import { DictType, dictType } from '@/components/DictSelect/localDictDefine';
import { ElMessage, ElTree, FormInstance, ElMessageBox } from 'element-plus';

import { getFlatDeepTreeData } from '@/utils/common';
import { Search, Plus } from '@element-plus/icons-vue';
import { validateForm } from '@/helper/index';
import authList from '@/router/auth.ts';
import { addDict, delDict, dictList, editDict } from '@/api/index.ts';

const treeRef = ref<InstanceType<typeof ElTree>>();
const tableData: any = ref([

]);



const searchFormRef = ref<FormInstance>(null);

const details = ref({});


const searchForm = reactive<searchFormType>({
    dictCode: '',
    dictValue: '',
    pageNum: 1,
    pageSize: 10,
});
const total = ref<number>(0);



const rules = reactive({
    dictValue: [{ required: true, message: '请输入字典值', trigger: 'blur' }],
    dictCode: [{ required: true, message: '请选择字典类型', trigger: 'change' }],
    dictDesc: [{ required: true, message: '请输入字典名称', trigger: 'blur' }],
});


const getList = async () => {
    try {
        const res: any = await dictList(searchForm);
        tableData.value = res.list;

        total.value = res.total;
    } catch (err) {}
};

const handleDelete = async (row) => {
    await ElMessageBox.confirm('确认要删除吗？', '提示', {
        confirmButtonText: '确  定',
        cancelButtonText: '取  消',
        type: 'warning'
    });
    await delDict({ id: row.id });
    ElMessage.success('删除成功！');
    reset();
};

const goDetail = (row) => {
    details.value = JSON.parse(JSON.stringify(row));
};

const reset = (reset: boolean) => {
    if(reset) {
        searchFormRef.value.resetFields();
    }
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
const addForm = reactive<addDictType>({
    id: null,
    dictDesc: null,
    dictName: null,
    dictValue: null,
    dictCode: null,
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
    addForm.dictName = dictType.find((dict) => dict.dictValue === addForm.dictCode)?.dictDesc;
    addForm.id ? await editDict(addForm) : await addDict(addForm);
    ElMessage.success('提交成功！');
    addShow.value = false;
    getList();
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
.authItem{
    align-items: flex-start;
}
.search-form{
   ::v-deep(){
    .el-input,.el-select{
        width: 265px !important;
    }
   }
}
</style>

