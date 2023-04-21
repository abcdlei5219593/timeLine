
export interface MenuItem {
    url: string,
    name: string,
    icon?: string,
    children?: MenuItem[],
    menu?: MenuItem[]
}

export type Menu = MenuItem[]
