import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import 'dayjs/locale/zh-cn';

dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(customParseFormat);
dayjs.locale('zh-cn');

export default dayjs;
