import dayjs from '@/helper/dayjs';

export default function useDefaultDate() {
    const endDate = dayjs().format('YYYY-MM-DD 23:59:59');
    const startDate = dayjs().subtract(7, 'day').format('YYYY-MM-DD 00:00:00');
    return {
        startDate,
        endDate
    };
}
