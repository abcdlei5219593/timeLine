import { getDictByType } from '@/api/index';
import { computed, ref } from 'vue';
import * as localDictDefine from './localDictDefine';
import { dict } from './type';
import { DictType } from './localDictDefine';

export default (props: { type: DictType }) => {
    const KeyName = computed(() => `dict-name_${props.type}`);

    const _localDictDefine = computed(() => JSON.parse(JSON.stringify(localDictDefine)));
    const localDictKeys = computed(() => {
        return Object.keys(_localDictDefine.value);
    });

    const dictDataList = ref<dict[]>([]);
    const dictDataListCopy = ref<dict[]>([]);
    const _getDictData = async () => {
        // 取前端写死的，没得再取 sessionStorage 的
        if (
            localDictKeys.value.includes(props.type)
            && Array.isArray(_localDictDefine.value[props.type])
        ) {
            dictDataList.value = _localDictDefine.value[props.type];
            return;
        }
        // 从 sessionStorage 中获取，如果没有再从后台获取
        const options = sessionStorage.getItem(KeyName.value);
        if (options) {
            dictDataList.value = JSON.parse(options);
            dictDataListCopy.value = JSON.parse(options);
            return;
        }
        // 调后台接口取，取了再存 sessionStorage， 下次直接从 sessionStorage 拿
        try {
            const res = await getDictByType({ dictType: props.type });
            dictDataList.value = res;
            dictDataListCopy.value = JSON.parse(JSON.stringify(res));
            sessionStorage.setItem(KeyName.value, JSON.stringify(res));
        } catch (error) {
            console.log(error);
        }
    };

    _getDictData();

    const transToDictDesc = (dictValue: string) => {
        if (dictDataList.value.find) {
            const dict = dictDataList.value.find(item => item.dictValue === dictValue);
            return dict ? dict.dictDesc : dictValue;
        }
        return dictValue;
    };

    const tableDictFilter = (_row: any, _data: any, val: string) => {
        return transToDictDesc(val);
    };



    return {
        dictDataList,
        transToDictDesc,
        tableDictFilter
    };
};
