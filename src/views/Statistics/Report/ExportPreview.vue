<template>
    <div id="export-container">
        <p class="p-title">{{ exportName() }}分析报告</p>
        <p class="p-date">
            时间：{{ getFormatDate(new Date(searchForm.date[0]), 'YYYY-mm-dd') }} -
            {{ getFormatDate(new Date(searchForm.date[1]), 'YYYY-mm-dd') }}
        </p>
        <div class="export-container" v-for="(item, index) in tableData" :key="index">
            <ElTable class="report-table" :data="[item]" :height="maxTableHeight" :row-class-name="tableRowClassName">
                <ElTableColumn>
                    <template #default="scope">
                        <div class="table-column-layout" @click="active = scope.$index">
                            <p>{{ scope.row.stationName }}</p>
                            <p>
                                本周{{ store.currentApp.meta.categoryName }}质量平均值为{{
                                    scope.row.avgVal
                                }}，最大值为{{ scope.row.maxVal }}，最小值为{{ scope.row.minVal }}
                            </p>
                        </div>
                    </template>
                </ElTableColumn>
            </ElTable>
            <v-chart
                class="chart"
                :option="chartOptionsArr[index]"
                autoresize
                :style="{ height: `${maxTableHeight}px` }"
            />
        </div>
    </div>
    <span slot="footer" class="dialog-footer">
        <ElButton size="default" @click="cancel">取 消</ElButton>
        <ElButton type="primary" size="default" @click="exportPDF">导出PDF</ElButton>
    </span>
</template>
<script setup lang="ts" name="Map">
import { ref, watch, defineProps, defineEmits } from 'vue';
import { useSettingStore, storeMenu } from '@/store/app';
import VChart from 'vue-echarts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { getFormatDate } from '@/utils/common';

const stores = storeMenu();
const props = defineProps({
    tableData: {
        type: Array,
        default: () => [],
    },
    chartOptionsArr: {
        type: Array,
        default: () => [],
    },
    searchForm: {
        type: Object,
        default: () => {},
    },
});

const maxTableHeight = ref(150);
const active = ref(0);

const store = useSettingStore();
const tableRowClassName = ({ row, rowIndex }) => {
    if (rowIndex === active.value) {
        return 'active';
    }
};
const emits = defineEmits(['handleColumnClick', 'cancel']);
const handleColumnClick = (row: any, column: any, event: any) => {
    emits('handleColumnClick', row, column, event);
};
const cancel = () => {
    emits('cancel');
};

const exportName = () => {
    let name = '';
    switch (stores.bizModule) {
        case 1:
            name = '空气质量';
            break;
        case 2:
            name = '水质质量';
            break;
        case 3:
            name = '风速';
            break;
        case 4:
            name = '土壤湿度';
            break;
        case 5:
            name = '雨量';
            break;
        default:
            name = '';
    }
    return name;
};

const exportPDF = () => {
    const ele: HTMLElement | null = document.getElementById('export-container');
    html2canvas(ele as HTMLElement, {
        dpi: 96, // 分辨率
        scale: 2, // 设置缩放
        useCORS: true, // 允许canvas画布内 可以跨域请求外部链接图片, 允许跨域请求。,
        // backgroundColor:'#ffffff',这样背景还是黑的
        bgcolor: '#ffffff', // 应该这样写
        logging: false, // 打印日志用的 可以不加默认为false
    }).then((canvas) => {
        const contentWidth = canvas.width;
        const contentHeight = canvas.height;
        // 一页pdf显示html页面生成的canvas高度;
        const pageHeight = (contentWidth / 592.28) * 841.89;
        // 未生成pdf的html页面高度
        let leftHeight = contentHeight;
        // 页面偏移
        let position = 0;
        // a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
        const imgWidth = 595.28;
        const imgHeight = (595.28 / contentWidth) * contentHeight;
        const ctx: any = canvas.getContext('2d');
        // 添加水印
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.rotate((25 * Math.PI) / 180);
        ctx.font = '20px Microsoft Yahei';
        ctx.fillStyle = 'rgba(184, 184, 184, 0.8)';
        for (let i = contentWidth * -1; i < contentWidth; i += 240) {
            for (let j = contentHeight * -1; j < contentHeight; j += 100) {
                // 填充文字，x 间距, y 间距
                // ctx.fillText('水印名', i, j);
            }
        }
        const pageData = canvas.toDataURL('image/jpeg', 1.0);
        const pdf = new jsPDF('', 'pt', 'a4');
        if (leftHeight < pageHeight) {
            // 在pdf.addImage(pageData, 'JPEG', 左，上，宽度，高度)设置在pdf中显示；
            pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
        } else {
            // 分页
            while (leftHeight > 0) {
                pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
                leftHeight -= pageHeight;
                position -= 841.89;
                // 避免添加空白页
                if (leftHeight > 0) {
                    pdf.addPage();
                }
            }
        }
        // 可动态生成
        pdf.save(`导出文件.pdf`);
    });
};
</script>
<style lang="scss" scoped>
#export-container {
    padding: 24px;
    .p-title {
        font-size: 20px;
        font-weight: 600;
        text-align: center;
        margin-bottom: 15px;
    }
    .p-date {
        text-align: center;
        margin-bottom: 15px;
    }
}
.export-container {
    // padding: 24px;
    background: #fff;
    border-radius: 4px;
    display: flex;
    margin-top: 24px;
    .search-row {
        justify-content: space-between;

        .add-btn {
            margin-left: auto;
        }
    }
    .el-table {
        width: 40%;
    }
    .chart {
        width: 60%;
    }
    .title {
        width: 100%;
        @include flex(space-between, center);
        h3 {
            font-weight: 600;
            font-size: 16px;
            color: #000;
        }
        .el-form-item {
            align-items: center;
            margin-bottom: 0;
        }
    }
    .map-container {
        @include flex();
        margin-top: 24px;
        width: 100%;
        flex: 1;
        .el-table {
            width: 40%;
        }
        .echarts {
            width: 60%;
        }
    }

    .report-table {
        margin-top: 50px;
        :deep(thead) {
            // height: 62px;
            display: none;

            th {
                color: #000000;
                font-size: 16px;
                font-weight: 600;
            }
        }
        :deep(tbody tr) {
            height: 80px;
            cursor: pointer;
            .table-column-layout p {
                &:first-child {
                    color: #000000;
                }
                &:last-child {
                    color: #666666;
                }
            }
        }
        :deep(tbody tr:hover > td) {
            background-color: #f3f3f3;
        }
        :deep(tbody .active) {
            background: #ecf4fc !important;
            .table-column-layout p:first-child {
                color: #2d8cf0 !important;
            }
            &:hover > td {
                background: #ecf4fc !important;
            }
        }
        :deep(.cell) {
            padding: 0 23px !important;
        }
        :deep(.el-table__inner-wrapper) {
            &::before {
                display: none;
            }
        }
    }
}
</style>
