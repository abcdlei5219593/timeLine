/**
 * @description: 时间格式化
 * @param: date 时间戳, 不传默认返回发当前
 * @param: fmt 格式
 */
export function getFormatDate(dateStr: string, format = 'YYYY-mm-dd') {
    let ret;
    let fmt = format;
    const date = dateStr ? new Date(dateStr) : new Date();
    const opt = {
        'Y+': date.getFullYear().toString(), // 年
        'm+': (date.getMonth() + 1).toString(), // 月
        'd+': date.getDate().toString(), // 日
        'H+': date.getHours().toString(), // 时
        'M+': date.getMinutes().toString(), // 分
        'S+': date.getSeconds().toString(), // 秒
        'c+': date.getMilliseconds().toString(), // 毫秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (const k in opt) {
        ret = new RegExp('(' + k + ')').exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], ret[1].length === 1 ? opt[k] : opt[k].padStart(ret[1].length, '0'));
        }
    }
    return fmt;
}
