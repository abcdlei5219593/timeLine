<template>
    <ElRow :gutter="20">
        <ElCol :span="12" class="h-340">
            <ElCard shadow="never" class="welcome ">
                <h3>欢迎你，{{ store.userInfo?.name }}</h3>
                <article class="inner-title">
                    宜宾市
                </article>
                <article class="flex">
                    AQI:99 <div class="tag">
                        良
                    </div>
                </article>
                <article class="">
                    2023年更新
                </article>
            </ElCard>
        </ElCol>
        <ElCol :span="12" class="h-340">
            <ElCard shadow="never" class="msg ">
                <h3>最新消息情况</h3>
                <ul>
                    <li>
                        需要
                        <p class="date">
                            2022-22-2
                        </p>
                    </li>
                    <li>
                        需要
                    </li>
                    <li>
                        需要
                    </li>
                    <li>
                        需要
                    </li>
                </ul>
            </ElCard>
        </ElCol>
        <ElCol :span="12" class="h-390">
            <ElCard shadow="never" class="draw-container">
                <h3>热力图</h3>
                <div class="map-layout">
                    <ElAmap :center="[121.59996, 31.197646]" :zoom="12" />
                </div>
            </ElCard>
        </ElCol>
        <ElCol :span="12" class="h-390">
            <ElCard shadow="never" class="draw-container">
                <div class="chat-title">
                    <h3>微站24小时平均值</h3>
                    <ElSelect size="medium">
                    </ElSelect>
                </div>
            </ElCard>
        </ElCol>
    </elrow>
</template>

<script setup lang="ts">
import { ElCard, ElSelect, ElRow, ElCol } from 'element-plus';
import{ useUserStore } from '@/store/app';
import { get24AvgData, getAQI } from '@/api/home';

get24AvgData({measure: 'AQI'});
getAQI();
const store = useUserStore();
</script>

<style scoped lang="scss">
.h-340{
   height: calc((100% - 40px) * 0.5 );
}
.h-390{
    height: calc((100% - 40px) * 0.5);
}
.el-col{

    margin-top: $containerSpace;
    align-items: stretch;
    .el-card{

        box-sizing: border-box;
        height:100%;
        h3,.inner-title{
            font-weight: 600;
            font-size: 18px;
            color: #252525;
        }
        h3{
            font-size: 18px;
        }
        .inner-title{
            font-size: 16px;
        }
    }
    .welcome{
        .flex{
            @include flex(flex-start,center);
        }
        article{
            margin-top: 24px;
            .tag{
                margin-left: 10px;
                font-size: 12px;
                background: #F5BA18;
                border-radius: 4px;

                padding:4px 8px;
                color:#fff;
            }
        }
    }
    .msg {
        ul {
            margin-top: 7px;
            padding-left: 15px;
            li{
                @include flex(space-between,center);
                padding: 13px 0;
                list-style-type:disc;
                & + li {
                    border-top: 1px solid  #18181814;;
                }
                .date{
                    flex-shrink: 0;
                    color:#999999;
                }
            }
        }
    }
    .draw-container ::v-deep(.el-card__body){
        box-sizing: border-box;
        height: 100%;
        @include flex();
        flex-direction: column;
        .map-layout{
            margin-top: 20px;
            flex:1;
            width: 100%;
        }
        .chat-title{
            margin-top: -8px;
            width: 100%;
            @include flex(space-between, center);
            .el-select{
                width: 80px;
            }
        }
    }
}
</style>
