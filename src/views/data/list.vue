<template>
    <div class="main-content">
        <el-tabs v-model="activeProject" @tab-click="handleClick">
            <el-tab-pane label="天府新区项目" name="first"></el-tab-pane>
            <el-tab-pane label="武侯区项目" name="second"></el-tab-pane>

        </el-tabs>
        <section class="data-type">
            <div :class="[dataType === 1 ? 'active' : '', 'tab-button']" @click="changeDataType(1)">管井数据</div>
            <div :class="[dataType === 2 ? 'active' : '', 'tab-button']" @click="changeDataType(2)">管线数据</div>
        </section>
        <ElForm ref="searchFormRef" inline class="search-form" label-width="68px" label-position="left">
            <ElFormItem label="物探点号">
                <ElInput
                    v-model="searchForm.code"
                    size="default"
                    placeholder="请输入"
                ></ElInput>
            </ElFormItem>
            <ElFormItem label="数据状态">
                <ElSelect
                    v-model="searchForm.user"
                    size="default"
                    placeholder="请选择"
                >
                </ElSelect>
            </ElFormItem>
            <ElFormItem label="处理人">
                <ElInput
                    v-model="searchForm.name"
                    size="default"
                    placeholder="请输入"
                ></ElInput>
            </ElFormItem>
            <ElFormItem label="道路">
                <ElInput
                    v-model="searchForm.unit"
                    size="default"
                    placeholder="请输入"
                ></ElInput>
            </ElFormItem>
            <template v-if="dataType === 2">
                <ElFormItem label="管线性质">
                <ElSelect
                    v-model="searchForm.user"
                    size="default"
                    placeholder="请选择"
                >
                </ElSelect>
            </ElFormItem>

            <ElFormItem label="项目">
                <ElSelect
                    v-model="searchForm.status"
                    size="default"
                    placeholder="请选择"
                >
                </ElSelect>
            </ElFormItem>
            </template>

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
                    @click="reset(searchFormRef)"
                >
                    重置
                </ElButton>
            </ElFormItem>
        </elform>
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
               :height="maxTableHeight"
               :span-method="objectSpanMethod"
               @cell-dblclick="doubleClick"
               :row-class-name="tableRowClassName"
            >
                <ElTableColumn type="selection" width="55px" fixed="left" />
                <ElTableColumn v-for="(item,index) in tableColumn" :key="index" :fixed ="item.fixed" :prop="item.field" :label="item.label" :width="item.width">
                    <template v-if="item.edit" #default="scope">
                        <ElInput
                            v-if="scope.row[item.field+'Show'] && scope.row.canEdit"
                            v-model="scope.row[item.field]"
                            size="default"
                            placeholder="请输入"
                            @blur="scope.row[item.field+'Show'] = false"
                        ></ElInput>
                        <span v-else>{{ scope.row[item.field] }}</span>
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
            <ElDialog v-model="addShow"  :title="isEdit ? '编辑项目' : '创建项目'" width="480px">
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
                        <ElButton size="default" @click="closeFun">取 消</ElButton>
                        <ElButton color="#4371EE" size="default" @click="submitForm(addFormRef)">提 交</ElButton>
                    </span>
                </template>

            </ElDialog>



    </div>
</template>

<script setup lang="ts">
import useTableSetting from '@/hooks/useTableSetting';
import { ref, onMounted, reactive, nextTick, computed } from 'vue';


import { ElMessage, ElTree, FormInstance } from 'element-plus';

import { getFlatDeepTreeData } from '@/utils/common';
import { Search, Plus } from '@element-plus/icons-vue';
import { validateForm } from '@/helper/index';

const { maxTableHeight, setTableMaxHeight } = useTableSetting({ id: 'userTable', offsetBottom: 92 });
const activeProject = ref('first');

const dataType = ref(1);

const changeDataType = async (val) => {
    dataType.value = val;
    setTimeout(() => {
        maxTableHeight.value = setTableMaxHeight('userTable', 92);
    }, 100);

};
const rowSapnArry = computed(() => {
    let temp = tableData.value.map(item => item.id);
    let spanArr = [];
    let pos;
    for (let i = 0; i < temp.length; i++) {
        if (i === 0) {
            spanArr.push(1);
            pos = 0;
        } else if (temp[i] === temp[i - 1]) {
            spanArr[pos] += 1;
            spanArr.push(0);
        } else {
            spanArr.push(1);
            pos = i;
        }
    }

    return spanArr;
});

const objectSpanMethod = ({ row, column, rowIndex, columnIndex }) => {

    if ( columnIndex <2 ) {
        return {
            rowspan: rowSapnArry.value[rowIndex],
            colspan: 1
        };
    }
};

const tableColumn = computed(() => {
    const temp_1 = [
        { label: '物探点号', field: 'wtdh', width: '140px',fixed: 'left'},
        { label: '数据状态', field: 'sjzt', width: '140px',fixed: 'left'},
        { label: '处理人', field: 'clr', width: '140px',fixed: 'left'},
        { label: '管线性质', field: 'gxxz', width: '140px', edit: true,fixed: false},
        { label: '特征', field: 'tz', width: '140px', edit: true,fixed: false},
        { label: '附属物', field: 'fsw', width: '140px', edit: true,fixed: false},
        { label: '井底深', field: 'jds', width: '140px', edit: true,fixed: false},
        { label: '水深', field: 'ss', width: '140px', edit: true,fixed: false},
        { label: '淤泥深', field: 'yns', width: '140px', edit: true,fixed: false},
        { label: '井盖状态', field: 'jgzt', width: '140px', edit: true,fixed: false},
        { label: '井盖材质', field: 'jgcz', width: '140px', edit: true,fixed: false},
        { label: '备注', field: 'bz', width: '140px', edit: true,fixed: false},

    ];
    const temp_2 = [
        { label: '道路', field: 'wtdh', width: '140px',fixed: 'left'},
        { label: '起止点号', field: 'dh', width: '140px',fixed: 'left'},
        { label: '数据状态', field: 'sjzt', width: '140px',fixed: 'left'},
        { label: '处理人', field: 'clr', width: '140px',fixed: 'left'},
        { label: '管线性质', field: 'gxxz', width: '140px', edit: true},
        { label: '起点埋深', field: 'fsw', width: '140px', edit: true},
        { label: '终点埋深', field: 'zdms', width: '140px', edit: true},
        { label: '起点管底高程', field: 'gc', width: '140px', edit: true},
        { label: '管径', field: 'gj', width: '140px', edit: true},
        { label: '材质', field: 'cz', width: '140px', edit: true},
        { label: '流向', field: 'lx', width: '140px', edit: true},
        { label: '埋设类型', field: 'lx', width: '140px', edit: true},
        { label: '备注', field: 'bz', width: '140px', edit: true},

    ];
    // MOCK表格数据
    let table = [1,2,3,4].map(num => {
        const obj = {};
        [...temp_1,...temp_2].forEach(item => {
            obj[item.field] = Math.random().toFixed(2) * 1000;
            if(item.edit) {
                obj[item.field+'Show'] = false;
            }
        });
        obj.id = num;
        if(num === 2) {
            obj.histroy = true;
        }
        obj.canEdit = true;
        obj.editing = false;
        return obj;

    });
    let testData = {}; // 插入一条历史数据
    Object.keys(table[1]).forEach(key => {
        const target = [...temp_1,...temp_2].find(item => item.field === key);
        let isEdit = target?.edit;

        testData[key] = isEdit ? table[1][key] + 1 : table[1][key];
        testData.canEdit = false;

    });
    table.splice(2,0,testData);
    // 测试数据完毕。
    tableData.value = table;

    return dataType.value === 1 ? temp_1 : temp_2;
});

const doubleClick = (row, column) => {
    row[column.property+'Show'] = true;

};

const tableRowClassName = ({row, rowIndex}) => {
    if(row.histroy) {
        return 'error-row';
    }
    return '';
};
const tableData: any = ref([
]);
const addShow = ref<boolean>(false);
const total = ref<number>(0);
const isEdit = ref<boolean>(false);
const showRoot = ref<boolean>(false);
const currentRole: any = ref('');
const addFormRef = ref<FormInstance>();
const searchFormRef = ref<FormInstance>();

const details = ref({});

const props = {
    label: 'label',
};

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
const addForm = reactive<addRoleType>({
    roleName: '',
    roleDesc: '',
});

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

const reset = (formRef) => {
    formRef.resetFields();
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


const submitForm = async (formEl: FormInstance | undefined) => {
    await validateForm(formEl);
};



const editFun = async (row: any) => {

};

const closeFun = () => {


};



onMounted(() => {

    getList();
});

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
.data-type {
    padding: 5px 0 20px;
    display: flex;
    .tab-button{
        cursor: pointer;
        padding: 8px 15px;
        background: #E4E5EA;
        border-radius: 3px;
        &.active{
            color: #4371EE;
            background: #D9E3FC;
        }
        & + .tab-button{
            margin-left: 20px;
        }
    }
}
.el-table .warning-row {
  --el-table-tr-bg-color: red;
}
</style>

