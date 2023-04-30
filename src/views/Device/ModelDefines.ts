export interface FormType {
    deviceId: string | null;
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
    stationAdress: string,
    hv: string,
    sv: string,
    latitude: string,
    longitude: string,
    bizModule: any,
}
