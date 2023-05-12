export interface UserInfoType {
    nickName: string;
    gender: string;
    mobilePhone: string;
    // realName: string;
    userName: string;
    email: string;
}

export interface UserParamsType {
    userName: string;
    pageNum: number;
    pageSize: number;
}

export interface addUserType {
    mobilePhone: string;
    roleIds: string | number;
    status: string | number;
    userName: string;
    remark: string;
    password: string;
    newPwdAgain: string;
    userId?: string | number;
}
export interface roleParamsType {
    roleName: string;
    pageNum: number;
    pageSize: number;
}

export interface addRoleType {
    roleName: string;
    roleDesc: string;
    roleId?: string;
}
export interface editPasswordType {
    userId: number | null,
    password: string,
    newPwdAgain: string,
}
