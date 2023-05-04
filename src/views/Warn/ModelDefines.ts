export interface DevceWarnParamsType {
    alarmType: number | null;
    stationId: number | null;
    startTime: string;
    endTime: string;
    pageNum: number;
    pageSize: number;
    bizModule: number | string;
}

export interface AirWarnParamsType {
    alarmType: number | null;
    stationId: number | null;
    startTime: string;
    endTime: string;
    sensorCode: string;
    unclosed: boolean,
    pageNum: number;
    pageSize: number;
    bizModule: number | string;
}

export interface options {
    label: string;
    value: number;
}

export const warnOptions: options[] = [
    { label: '设备告警', value: 1 },
    { label: '环境告警', value: 2 },
];

