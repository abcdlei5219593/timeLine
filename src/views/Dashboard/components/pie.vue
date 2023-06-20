<!--联网占比-->
<template>
    <div id="pie" style="width: 100%; height: 100%"></div>
</template>
  <script lang="ts" setup>
import { defineProps, ref, watch, onMounted } from 'vue';
import * as echarts from 'echarts';

const props = defineProps({
    pieData: {
        type: Object,
        default() {
            return {
                pieValue: [],
            };
        },
    },
});

const echartInit = () => {
    var myChart = echarts.init(document.getElementById('pie'));
    // 指定图表的配置项和数据
    var option = {
        tooltip: {
            trigger: 'item',
        },
        legend: {
            top: '10%',
            right: '10%',
            // left: 'center',
            orient: 'vertical',
            itemWidth: 16,
            itemHeight: 16,
            itemStyle: {},
            textStyle: {
                color: '#fft',
                lineHeight: 20,
            },
            // formatter: (v) => {
            //     console.log(v, '00000');
            //     return v;
            // },
        },
        color: ['#24EACD', '#FFFA92', '#13E7FF', '#00B5FF', '#35CCFF'],
        series: [
            {
                name: '',
                type: 'pie',
                top: 20,
                center: ['30%', '35%'],
                radius: ['40%', '60%'],
                avoidLabelOverlap: true,
                itemStyle: {
                    // borderRadius: 10,
                    borderColor: '#000',
                    borderWidth: 10,
                },
                label: {
                    normal: {
                        show: true,
                        textStyle: {
                            fontSize: 14,
                            color: '#000',
                        },
                        formatter: (v) => {
                            return `${v.data.name}`;
                        },
                    },
                },
                labelLine: {
                    show: false,
                    normal: {
                        length: 1,
                        smooth: 0.2,
                        lineStyle: {
                            color: 'rgba(0,0,0,.45)',
                        },
                    },
                },
                emphasis: {
                    label: {
                        show: false,
                        fontSize: 40,
                        fontWeight: 'bold',
                    },
                },
                data: props.pieData.pieValue,
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
    () => [props.pieData],
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