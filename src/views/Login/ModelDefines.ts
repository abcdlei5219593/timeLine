import { listUserModule } from '@/api/login';

export interface FormType {
    userName: string;
    password: string;
    token: string;
}

export const getUserMenu = async () => {
    let menu: any = [];
    try {
        const res: any = await listUserModule();
        menu = res.menu;
    } catch (err) { }
    return menu;
};
