<template>
    <div class="main-content" style="padding-top: 5px !important;">
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
                    @click="handleMultiple"
                >
                    提交审核
                </ElButton>
                <ElButton
                    plain
                    class="add-btn"
                    color="#4371EE"
                    size="default"
                    @click="handleMultiple"
                >
                    打回给测绘
                </ElButton>
                <ElButton
                    plain
                    class="add-btn"
                    color="#4371EE"
                    size="default"
                    @click="handleMultiple"
                >
                    审核通过
                </ElButton>
                <ElButton
                    plain
                    class="add-btn"
                    color="#4371EE"
                    size="default"
                    @click="addTest = true"
                >
                    发起检测
                </ElButton>
                <ElButton
                    plain
                    class="add-btn"
                    color="#4371EE"
                    size="default"
                    @click="addClean = true"
                >
                    发起清淤
                </ElButton>
                <ElButton
                    plain
                    class="add-btn"
                    color="#4371EE"
                    size="default"
                    @click="handleMultiple"
                >
                    复核完成
                </ElButton>
                <ElButton
                    plain
                    class="add-btn"
                    color="#4371EE"
                    size="default"
                    @click="handleMultiple"
                >
                    导出数据
                </ElButton>
                <ElButton
                    plain
                    class="add-btn"
                    color="#4371EE"
                    size="default"
                    @click="addShow = true; importText ='测绘导入'"
                >
                    测绘导入
                </ElButton>
                <ElButton
                    v-if="dataType === 1"
                    plain
                    class="add-btn"
                    color="#4371EE"
                    size="default"
                    @click="addShow = true; importText ='判读导入'"
                >
                    判读导入
                </ElButton>
                <ElButton
                    plain
                    class="add-btn"
                    color="#4371EE"
                    size="default"
                    @click="handleMultiple"
                >
                    标记为完成
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
               @selection-change="handleSelectionChange"
            >
                <ElTableColumn type="selection" width="55px" fixed="left" />
                <ElTableColumn v-for="(item,index) in tableColumn" :key="index" :fixed ="item.fixed" :prop="item.field" :label="item.label" :width="item.width">
                    <template v-if="item.edit" #default="scope">
                        <ElInput
                            :ref="(el:refItem) => handleSetInputMap(el, item.field, scope.row.id )"
                            v-if="scope.row[item.field+'Show'] && scope.row.canEdit"
                            v-model="scope.row[item.field]"
                            size="default"
                            placeholder="请输入"
                            @blur="scope.row[item.field+'Show'] = false"
                        ></ElInput>
                        <span v-else>{{ scope.row[item.field] }}</span>
                    </template>
                </ElTableColumn>


                <ElTableColumn  fixed="right" label="操作" width="120">
                    <template #default="scope">
                        <ElButton

                            link
                            type="text"
                            size="default"
                            @click="addRemark = true"
                        >
                            写批注
                        </ElButton>
                        <ElButton  link type="text" size="default" @click="goDetail(scope.row)">
                            详情
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
            <ElDialog v-model="addShow"  :title="importText" width="480px">
                <div class="dialog-form">
                    <ElForm
                        ref="addFormRef"
                        :model="addForm"
                        :rules="rules"
                        label-width="110px"
                        label-position="left"
                    >
                        <ElFormItem label="CAD文件" prop="roleName">
                            <div class="uploader">
                                <div :class="[addForm.code ? '' : 'empty','btns']">
                                    {{ addForm.code ? addForm.code : '还未选择文件' }}
                                    <el-icon v-if="addForm.code"><CircleCheckFilled /></el-icon>
                                </div>
                                <el-upload
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :on-change="file => handleFileChange(file,'code')"
                                :show-file-list="false"
                                :auto-upload="false">
                                <ElButton

                                    plain
                                    size="default"
                                    >
                                    选择文件
                                    </ElButton>
                                </el-upload>
                                </div>
                        </ElFormItem>
                        <ElFormItem label="管井数据文件" prop="roleName">
                            <div class="uploader">
                                <div :class="[addForm.name ? '' : 'empty','btns']">
                                    {{ addForm.name ? addForm.name : '还未选择文件' }}
                                    <el-icon v-if="addForm.name"><CircleCheckFilled /></el-icon>
                                </div>
                                <el-upload
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :on-change="file => handleFileChange(file,'name')"
                                :show-file-list="false"
                                :auto-upload="false">
                                <ElButton

                                    plain
                                    size="default"
                                    >
                                    选择文件
                                    </ElButton>
                                </el-upload>
                                </div>
                        </ElFormItem>
                        <ElFormItem label="管线数据文件" prop="roleName">
                            <div class="uploader">
                                <div :class="[addForm.unit ? '' : 'empty','btns']">
                                    {{ addForm.unit ? addForm.unit : '还未选择文件' }}
                                    <el-icon v-if="addForm.unit"><CircleCheckFilled /></el-icon>
                                </div>
                                <el-upload
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :on-change="file => handleFileChange(file,'unit')"
                                :show-file-list="false"
                                :auto-upload="false">
                                <ElButton

                                    plain
                                    size="default"
                                    >
                                    选择文件
                                    </ElButton>
                                </el-upload>
                                </div>
                        </ElFormItem>

                        <ElFormItem label="所属道路">
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


            <ElDialog   class="main-dialog" v-model="addTest"  title="发起检测" width="480px">
                <div class="dialog-form">
                    <ElForm
                        ref="addFormRef"
                        :model="addForm"
                        :rules="rules"
                        label-width="80px"
                        label-position="left"
                    >

                        <ElFormItem label="检测人">
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
                        <ElButton size="default" @click="addTest = false">取 消</ElButton>
                        <ElButton color="#4371EE" size="default" @click="submitForm(addFormRef)">提 交</ElButton>
                    </span>
                </template>

            </ElDialog>
            <ElDialog   class="main-dialog" v-model="addClean"  title="发起清淤" width="480px">
                <div class="dialog-form">
                    <ElForm
                        ref="addFormRef"
                        :model="addForm"
                        :rules="rules"
                        label-width="80px"
                        label-position="left"
                    >

                        <ElFormItem label="检测人">
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
                        <ElButton size="default" @click="addClean = false">取 消</ElButton>
                        <ElButton color="#4371EE" size="default" @click="submitForm(addFormRef)">提 交</ElButton>
                    </span>
                </template>

            </ElDialog>

            <ElDialog   class="main-dialog" v-model="addRemark"  title="写批注" width="480px">
                <div class="dialog-form">
                    <ElForm
                        ref="addFormRef"
                        :model="addForm"
                        :rules="rules"
                        label-width="60x"
                        label-position="left"
                    >

                        <ElFormItem label="批注">
                            <ElInput
                                v-model="addForm.status"
                                type="textarea"
                                :row="7"
                                size="default"
                                placeholder="请输入"
                            >
                            </ElInput>
                        </ElFormItem>
                    </ElForm>
                </div>
                <template #footer>
                    <span  class="dialog-footer">
                        <ElButton size="default" @click="addClean = false">取 消</ElButton>
                        <ElButton color="#4371EE" size="default" @click="submitForm(addFormRef)">提 交</ElButton>
                    </span>
                </template>

            </ElDialog>


            <ElDialog   class="main-dialog" v-model="detailShow"  title="项目详情" width="720px">
                <div class="dialog-form">
                    <ul class="details">
                        <li class="details-item"><label>起止点号：</label> xc001</li>
                        <li class="details-item"><label>所属道路：</label> {{ details.name }}武汉路</li>
                        <li class="details-item"><label>管线性质：</label> {{ details.unit }}水质</li>
                        <li class="details-item"><label>数据状态：</label> {{ details.date }}完好</li>
                        <li class="details-item"><label>当前处理人：</label> {{ details.user }}rays</li>
                        <li class="details-item"><label>初始导入时间：</label> {{ details.phone }}2023-01-01</li>
                        <li class="details-item"><label>最后处理时间：</label> {{ details.status }}2023-01-01</li>
                        <li class="details-item"> </li>
                        <li class="details-item"><label>处理记录：</label> </li>
                    </ul>
                    <ElTable
                        border
                        class="table"
                        :data="tableData"
                        style="margin-top: 10px;"
                    >
                        <ElTableColumn prop="code" label="时间" />
                        <ElTableColumn prop="user" label="状态" />
                        <ElTableColumn prop="name" label="操作名" />
                        <ElTableColumn prop="date" label="操作人" />
                        <ElTableColumn prop="date" label="批注" />
                    </ElTable>

                </div>

            </ElDialog>



    </div>
</template>

<script setup lang="ts">
import useTableSetting from '@/hooks/useTableSetting';
import { ref, onMounted, reactive, nextTick, computed } from 'vue';


import { ElMessage, ElTree, FormInstance, ElMessageBox } from 'element-plus';

import { getFlatDeepTreeData } from '@/utils/common';
import { Search, Plus, CircleCheckFilled, MessageBox } from '@element-plus/icons-vue';
import { validateForm } from '@/helper/index';

const { maxTableHeight, setTableMaxHeight } = useTableSetting({ id: 'userTable', offsetBottom: 92 });
const activeProject = ref('first');

const dataType = ref(1);

const importText = ref('');

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

const multipleSelection = ref([]);

const handleSelectionChange = (val: User[]) => {
    multipleSelection.value = val;
};

const handleMultiple = async (e) => {
    if(!multipleSelection.value.length) {
        return ElMessage.error('请选择数据');
    }
    await ElMessageBox.confirm(`确认要将选中的 <span style="color:#FFFB3B3F;">${multipleSelection.value.length}</span> 条数据${e.target.innerText}吗？`, e.target.innerText, {
        confirmButtonText: '确  定',
        cancelButtonText: '取  消',
        dangerouslyUseHTMLString: true
    });
};

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
        { label: '物探点号', field: 'wtdh', width: '120px',fixed: 'left'},
        { label: '数据状态', field: 'sjzt', width: '120px',fixed: 'left'},
        { label: '处理人', field: 'clr', width: '120px',fixed: 'left'},
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
        { label: '道路', field: 'wtdh', width: '120px',fixed: 'left'},
        { label: '起止点号', field: 'dh', width: '120px',fixed: 'left'},
        { label: '数据状态', field: 'sjzt', width: '120px',fixed: 'left'},
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

const doubleClick = (row, column, cell) => {
    console.log(row,column, cell);
    row[column.property+'Show'] = true;
    setTimeout(() => {
        inputRefMap.value[`Input_Ref_${column.property}_${row.id}`].input.focus();
    },100);

};

const tableRowClassName = ({row, rowIndex}) => {
    if(row.histroy) {
        return 'error-row';
    }
    return '';
};
const inputRefMap = ref({});

/** 动态设置Input Ref */
const handleSetInputMap = (el: refItem, key: number, id) => {
    if (el) {
        inputRefMap.value[`Input_Ref_${key}_${id}`] = el;
    }
};


const tableData: any = ref([
]);
const addRemark = ref<boolean>(false);
const addShow = ref<boolean>(false);
const addTest = ref<boolean>(false);
const addClean = ref<boolean>(false);
const total = ref<number>(0);
const isEdit = ref<boolean>(false);
const showRoot = ref<boolean>(false);
const currentRole: any = ref('');
const addFormRef = ref<FormInstance>();
const searchFormRef = ref<FormInstance>();


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



const detailShow = ref(false);
const details = ref(
    {
        id: 1,
        code: 'xc-001',
        name: '测试项目',
        unit: '单位名称',
        date: '2023-09-10',
        user: '张三',
        kaigong: '2023-09-10',
        phone: '1277001122',
        status: 1,
    }
);

const goDetail = (row) => {
    detailShow.value = true;
    details.value = JSON.parse(JSON.stringify(row));
};


const handleFileChange = (file,field) => {
    addForm[field] = file.name;
};



onMounted(() => {

    getList();
});

</script>

<style scoped lang="scss">
.details{
    display: flex;
    align-items: center;
    flex-flow: wrap;
    .details-item{

        margin-top: 10px;
        width: 50%;

    }
}
.uploader{
    width: 100%;
    display: flex;
    align-items: center;
    .btns{
        padding: 0 10px;
        margin-right: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color:#1B1B1E;
        height: 32px;
        border: 1px solid #DCDCDC;
        border-radius: 3px;
        flex: 1;
        &.empty{
            color:#91949F
        }
        .el-icon{
            color:#2EB68D;
        }
    }
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

</style>

