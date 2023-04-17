
export interface MenuItem {
    url: string,
    name: string,
    children?: MenuItem[],
    menu?: MenuItem[]
}

export type Menu = MenuItem[]
