import { dict } from './type.d';

// 字典类型
export enum DictType {
    TYPE = 'type',
    FEATURE = 'feature',
    APPENDANT = 'appendant',
    LID_STATUS = 'lid_status',
    SAFE_GRID = 'safe_grid',
    EDGE_MATERIAL = 'edge_material',
    WALL_MATERIAL = 'wall_material',
    PIPE_MATERIAL = 'pipe_material',
    DIRECTION = 'direction',
    BURY_TYPE = 'bury_type',
    LID_SHAPE= 'lid_shape',
    LID_MATERIAL = 'lid_material',
    DIC_TYPE = 'dictType',
}


// 所有的 是否
export const yesOrNo: dict[] = [{
    dictDesc: '是',
    dictValue: '1',
    dictType: 'yesOrNo',
}, {
    dictDesc: '否',
    dictValue: '0',
    dictType: 'yesOrNo',
}];

// 生效状态
export const effectiveStatus: dict[] = [{
    dictDesc: '激活',
    dictValue: '1',
    dictType: 'effectiveStatus',
}, {
    dictDesc: '失效',
    dictValue: '0',
    dictType: 'effectiveStatus',
}];

// 告警状态
export const warningStatus: dict[] = [{
    dictDesc: '全部',
    dictValue: '',
    dictType: 'warningStatus',
}, {
    dictDesc: '发生中',
    dictValue: '0',
    dictType: 'warningStatus',
}, {
    dictDesc: '已结束',
    dictValue: '1',
    dictType: 'warningStatus',
}];


// 告警等级
export const warningLevel: dict[] = [{
    dictDesc: '一级',
    dictValue: '1',
    dictType: 'warningLevel',
}, {
    dictDesc: '二级',
    dictValue: '2',
    dictType: 'warningLevel',
}, {
    dictDesc: '三级',
    dictValue: '3',
    dictType: 'warningLevel',
}
// , {
//     dictDesc: '四级',
//     dictValue: '3',
//     dictType: 'warningLevel',
// }
];

// 日期类型
export const dateTypes = [
    {
        dictDesc: '日',
        dictValue: 0,
        dictType: 'dateTypes',
    },
    {
        dictDesc: '月',
        dictValue: 1,
        dictType: 'dateTypes',
    },
    {
        dictDesc: '年',
        dictValue: 2,
        dictType: 'dateTypes',
    },
];



export const dictType: dict[] = [
    { dictDesc: '管线性质', dictValue: DictType.TYPE, dictType: 'dictType' },
    { dictDesc: '特征', dictValue: DictType.FEATURE, dictType: 'dictType' },
    { dictDesc: '附属物', dictValue: DictType.APPENDANT, dictType: 'dictType' },
    { dictDesc: '井盖状态', dictValue: DictType.LID_STATUS, dictType: 'dictType' },
    { dictDesc: '井盖形状', dictValue: DictType.LID_SHAPE, dictType: 'dictType' },
    { dictDesc: '井盖材质', dictValue: DictType.LID_MATERIAL, dictType: 'dictType' },
    { dictDesc: '防坠网', dictValue: DictType.SAFE_GRID, dictType: 'dictType' },
    { dictDesc: '井圈材质', dictValue: DictType.EDGE_MATERIAL, dictType: 'dictType' },
    { dictDesc: '井壁材质', dictValue: DictType.WALL_MATERIAL, dictType: 'dictType' },
    { dictDesc: '管道材质', dictValue: DictType.PIPE_MATERIAL, dictType: 'dictType' },
    { dictDesc: '流向', dictValue: DictType.DIRECTION, dictType: 'dictType' },
    { dictDesc: '埋设类型', dictValue: DictType.BURY_TYPE, dictType: 'dictType' },


];

export enum deviceType {
    INVERTER = 'DT02',
    PCS = 'DT03',
    BATTERY_GROUP = 'DT04', // 电池组，电池组 都是这个
    BATTERY_PACK = 'DT05', // 电池簇
    BATTERY_CELL = 'DT06' // 单体电池
}
