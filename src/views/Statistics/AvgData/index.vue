<template>
    <ElCard shadow="never">
        <section class="lengend">
            <span>正常</span>
            <div class="lengend-bar"></div>
            <span>高值</span>
        </section>

        <ElTable id="xc-table" class="table" :data="tableData" border="" :cell-style="cellStyle" :height="maxTableHeight">
            <ElTableColumn
                v-for="(item, index) in tableColumn"
                :key="index"
                :label="item.label"
                :prop="item.prop"
                :width="(index === 0 || index === tableColumn.length - 1) ? 120 : 60"
                align="center"
            >
            </ElTableColumn>
        </eltable>
    </ElCard>
</template>

<script setup lang="ts">
import { ElCard, ElTable, ElTableColumn } from 'element-plus';
import http from '@/api/analyse';
import useTableSetting from '@/hooks/useTableSetting';
import { useSettingStore } from '@/store/app';
import { computed, ref } from 'vue';

const store = useSettingStore();
const { maxTableHeight } = useTableSetting({ id: 'xc-table', offsetBottom: 50 });
const cellStyle = ({ row, column, rowIndex, columnIndex }) => {
    if(columnIndex !== 0 && columnIndex !== tableColumn.value.length - 1) {
        const val = row[column.property];
        if (val >= 0 && val < 20) {
            return {background: 'green'};
        } else if (val >= 20 && val < 100) {
            let bili = (val - 20) / 100 * 100;
            let one = (255 + 255) / 100;
            let r = 0;
            let g = 0;
            let b = 0;
            if (bili < 50) {
                // 比例小于50的时候红色是越来越多的,直到红色为255时(红+绿)变为黄色.
                r = one * bili;
                g = 128;
            }
            if (bili >= 50) {
                // 比例大于50的时候绿色是越来越少的,直到0 变为纯红
                g = 255 - (bili - 50) * one;
                r = 255;
            }
            r = parseInt(r,10); // 取整
            g = parseInt(g,10); // 取整
            b = parseInt(b,10); // 取整
            return {background: `rgb(${r},${g},${b})`};
        } else if (val >= 100) {
            return {
                background: 'red'
            };
        }

    }
};


const tableData = ref([]);

const tableColumn = computed(() =>
    [
        { prop: 'stationName', label: '微站名称'},
        { prop: 'hour_0', label: '0点'},
        { prop: 'hour_1', label: '1点'},
        { prop: 'hour_2', label: '2点'},
        { prop: 'hour_3', label: '3点'},
        { prop: 'hour_4', label: '4点'},
        { prop: 'hour_5', label: '5点'},
        { prop: 'hour_6', label: '6点'},
        { prop: 'hour_7', label: '7点'},
        { prop: 'hour_8', label: '8点'},
        { prop: 'hour_9', label: '9点'},
        { prop: 'hour_10', label: '10点'},
        { prop: 'hour_11', label: '11点'},
        { prop: 'hour_12', label: '12点'},
        { prop: 'hour_13', label: '13点'},
        { prop: 'hour_14', label: '14点'},
        { prop: 'hour_15', label: '15点'},
        { prop: 'hour_16', label: '16点'},
        { prop: 'hour_17', label: '17点'},
        { prop: 'hour_18', label: '18点'},
        { prop: 'hour_19', label: '19点'},
        { prop: 'hour_20', label: '20点'},
        { prop: 'hour_21', label: '21点'},
        { prop: 'hour_22', label: '22点'},
        { prop: 'hour_23', label: '23点'},
        { prop: 'avg', label: store.currentApp?.meta.avgLabel },
    ]
);

const getTableData = async () => {
    const data = await http[store.currentApp.url].getAQIHourAvgInMonth({year: new Date().getFullYear(), month: new Date().getMonth() + 1});
    console.log(data);
    const arr = [];
    for(const [index,station] of data.entries()) {
        let total = 0;
        station.data.forEach(hour => {
            station[`hour_${hour.time}`] = hour.avg;
            total += hour.avg;
        });
        station.avg = (total / station.data.length).toFixed(2);
        arr[index] = station;
    }
    tableData.value = arr;

};
getTableData();

</script>

<style scoped lang="scss">
.el-table{
    margin-top: 27px;
}
.lengend{
    @include flex(center);
    color: #000;
    .lengend-bar {
        margin: 0 12px;
        width: 240px;
        height: 16px;
        background-image: linear-gradient(270deg, #FE1D00 0%, #FF9601 15%, #FFBE01 31%, #D1FF03 46%, #A6FA00 62%, #81F451 75%, #24D22C 88%, #00A561 100%);
    }
}
</style>
