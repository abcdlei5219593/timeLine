export interface DevceWarnParamsType {
    alarmType: number;
    stationId: number;
    startTime: string;
    endTime: string;
}

interface AirWarnParamsType {
    alarmType: number;
    stationId: number;
    startTime: string;
    endTime: string;
    sensorCode: string;
    unclosed: string,
}

export const AirWarnParams: AirWarnParamsType = {
    alarmType: 0, // 告警类型
    stationId: 0, // 微站
    startTime: '', // 开始时间
    endTime: '', // 结束时间
    sensorCode: '', // 传感器类型
    unclosed: '', // 关闭状态
};
