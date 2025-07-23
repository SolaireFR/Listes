export interface Item {
    title: string;
    description?: string;
}

export interface List {
    _id: string;
    title: string;
    items: Item[];
}
