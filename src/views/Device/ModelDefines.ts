export interface FormType {
    deviceId: string | null;
    sensorCode: string | null;
    threshold1: number | null;
    threshold2: number | null;
    threshold3: number | null;
}

export interface ParamsType {
    pageNum: number;
    pageSize: number;
}

export interface deviceDataType {
    deviceId: number | null,
    stationName: string,
    stationId: number | null,
    stationAddress: string,
    hv: string,
    sv: string,
    latitude: number,
    longitude: number,
    bizModule: any,
}
