interface DevceWarnParamsType {
    alarmType: Number;
    stationId: Number;
    startTime: String;
    endTime: String;
}

export const DevceWarnParams: DevceWarnParamsType = {
    alarmType: 0, // 告警类型
    stationId: 0, // 微站
    startTime: '', // 开始时间
    endTime: '', // 结束时间
};

interface AirWarnParamsType {
    alarmType: Number;
    stationId: Number;
    startTime: String;
    endTime: String;
    sensorCode: String;
    unclosed: String,
}

export const AirWarnParams: AirWarnParamsType = {
    alarmType: 0, // 告警类型
    stationId: 0, // 微站
    startTime: '', // 开始时间
    endTime: '', // 结束时间
    sensorCode: '', // 传感器类型
    unclosed: '', // 关闭状态
};