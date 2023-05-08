import dayjs from './dayjs';
import Cookie from 'js-cookie';

export const setToken = (token: string): void => {
    Cookie.set(
        'token',
        token,
        {
            expires: new Date(new Date().getTime() + 120 * 60 * 1000)
        }
    );
};


export const getColrByApi = (aqiVal: number): string | undefined => {
    if (aqiVal >= 0 && aqiVal < 20) {
        return 'background-color:green';
    } else if (aqiVal >= 20 && aqiVal < 100) {
        const bili = (aqiVal - 20) / 100 * 100;
        const one = (255 + 255) / 100;
        let r = 0;
        let g = 0;
        let b = 0;
        if (bili < 50) {
            // 比例小于50的时候红色是越来越多的,直到红色为255时(红+绿)变为黄色.
            r = one * bili;
            g = 128;
        }
        if (bili >= 50) {
            // 比例大于50的时候绿色是越来越少的,直到0 变为纯红
            g = 255 - (bili - 50) * one;
            r = 255;
        }
        r = parseInt(r, 10); // 取整
        g = parseInt(g, 10); // 取整
        b = parseInt(b, 10); // 取整
        return `background-color:rgb(${r},${g},${b})`;
    } else if (aqiVal >= 100) {
        return 'background-color:red';
    }
    return undefined;
};

export const getCurrentTime = () => {
    return dayjs().format('YYYY-MM-DD HH:MM:ss');
};

export const getLevelByMesure = ( mesure: number) => {
    if (mesure <= 50) {
        return {
            color: '#07A872',
            level: '优'
        };
    } else if (mesure <= 100) {
        return {
            color: '#F5BA18',
            level: '良'
        };
    } else if (mesure <= 150) {
        return {
            color: '#F57E18',
            level: '轻度污染'
        };
    } else if (mesure <= 200) {
        return {
            color: '#DA1811',
            level: '中度污染'
        };
    } else if (mesure <= 300) {
        return {
            color: '#792BBB',
            level: '重度污染'
        };
    } else if (mesure > 300) {
        return {
            color: '#A21A10',
            level: '严重污染'
        };
    }
};
