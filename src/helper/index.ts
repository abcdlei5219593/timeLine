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


// 获取路径中的字段
export function GetQueryString(name: string): string | null {
    // let allQuery = this.$route.query;
    // return allQuery[name] ? allQuery[name] :null
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    const search = window.location.search ? window.location.search : `?${location.href.split('?')[1]}`;
    const r = search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

// 获取风向
export const getWindDirection = (num: number) => {
    let result = '';
    if(+num === 0 || +num === 360) {
        result = '北风';
    }else if (+num > 0 && +num < 90) {
        result = '东北风';
    }else if (+num === 90) {
        result = '东风';
    }else if (+num > 90 && +num < 180) {
        result = '东南风';
    }else if (+num === 180) {
        result = '南风';
    }else if (+num > 180 && +num < 270) {
        result = '西南风';
    }else if (+num === 270) {
        result = '西风';
    }else if (+num > 270 && +num < 269) {
        result = '西北风';
    }
    return result;
};
