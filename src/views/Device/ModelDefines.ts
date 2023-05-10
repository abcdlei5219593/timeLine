export interface FormType {
    deviceId: string;
    sensorCode: string | null;
    threshold1: number | null;
    threshold2: number | null;
    threshold3: number | null;
    bizModule: any,
}

export interface ParamsType {
    pageNum: number;
    pageSize: number;
    bizModule: any,
}

export interface deviceDataType {
    deviceId: string,
    stationName: string,
    // stationId: number | null,
    stationAddress: string,
    latitude: number,
    longitude: number,
    bizModules: any,
}
