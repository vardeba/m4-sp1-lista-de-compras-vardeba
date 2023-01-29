export interface IItemList {
    name: string;
    quantity: string;
}

export interface IPurchaseListRequest {
    listName: string;
    data: IItemList[];
}

export interface IPurchaseList extends IPurchaseListRequest {
    id: number;
}

export type ItemListRequiredKeys = "name" | "quantity";

export type PurchaseListRequiredKeys = "listName" | "data";
