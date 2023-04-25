
export interface MenuItem {
    url: string,
    name: string,
    icon?: string,
    noSubMenu?: boolean,
    children?: MenuItem[],
    menu?: MenuItem[],
    isButton?: boolean
}

export type Menu = MenuItem[]
