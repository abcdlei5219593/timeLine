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
