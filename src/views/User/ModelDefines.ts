export interface UserInfoType {
    nickName: string;
    gender: string;
    mobilePhone: string;
    realName: string;
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
    password: string;
    realName: string;
    roleIds: string;
    status: string;
    userName: string;
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
    newPwd: string,
    newPwdAgain: string,
}
