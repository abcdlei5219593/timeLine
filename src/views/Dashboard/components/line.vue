<template>
    <div :id="'echartline' + lineData.id" style="width: 100%; height: 100%" />
</template>
  <script lang="ts" setup>
import { defineProps, ref, watch, onMounted } from 'vue';
import * as echarts from 'echarts';

const props = defineProps({
    lineData: {
        type: Object,
        default() {
            return {
                lineValue: [],
                lineLabel: [],
                id: 0,
            };
        },
    },
});

const echartInit = () => {
    var myChart = echarts.init(document.getElementById(`echartline${props.lineData.id}`));
    // 指定图表的配置项和数据
    var option = {
        xAxis: {
            type: 'category',
            data: props.lineData.lineLabel,
            axisLine: {
                lineStyle: {
                    color: 'rgba(255,255,255,.8)',
                },
            },
        },
        grid: {
            containLabel: true,
            x: 30, // 左留白
            y: 20, // 上留白
            x2: 50, // 右留白
            y2: 70, // 下留白
        },
        yAxis: {
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: 'rgba(255,255,255,.8)',
                },
            },
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                    color: ['rgba(147,147,147,.3)'],
                },
            },
        },
        series: [
            {
                data: props.lineData.lineValue,
                type: 'line',
                itemStyle: {
                    normal: {
                        lineStyle: {
                            color: '#05B6FF',
                        },
                        areaStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: 'rgba(5,182,255,0.5)',
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(5,182,255,0)',
                                },
                            ]),
                        },
                    },
                },
            },
        ],
    };

    myChart.setOption(option);
    window.addEventListener('resize', () => {
        myChart.resize();
    });
};

onMounted(() => {
    echartInit();
});

watch(
    () => [props.lineData],
    () => {
        setTimeout(() => {
            echartInit();
        }, 50);
    },
    {
        deep: true,
        immediate: true,
    }
);
</script>
  <style lang="scss" scoped>
</style>