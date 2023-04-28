interface FormType {
    warning: number;
    alarm: number;
    seriousAlarm: number;
}

export const FormData: FormType = {
    warning: 0, // 预警阈值
    alarm: 0, // 告警阈值
    seriousAlarm: 0, // 严重告警阈值
};
