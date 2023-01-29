import { request, Request, Response } from "express";
import { ids, purchaseList } from "./database";
import {
    IPurchaseList,
    IPurchaseListRequest,
    PurchaseListRequiredKeys,
    ItemListRequiredKeys,
} from "./interfaces";

let idToUse: number = 1;

export const validatePurchaseData = (payload: any): IPurchaseListRequest => {
    const keys: Array<string> = Object.keys(payload);

    const requiredKeys: Array<PurchaseListRequiredKeys> = ["listName", "data"];

    const containAllRequired: boolean = requiredKeys.every((key: string) => {
        return keys.includes(key);
    });

    if (!containAllRequired) {
        throw new Error(`Required Keys are ${requiredKeys}`);
    }

    const { listName, data } = payload;

    const validatedKeys = {
        listName,
        data,
    };

    return validatedKeys;
};

export const createPurchaseList = (
    request: Request,
    response: Response
): Response => {
    try {
        const purchaseData: IPurchaseListRequest = validatePurchaseData(
            request.body
        );

        const newPurchaseList: IPurchaseList = {
            id: idToUse,
            ...purchaseData,
        };

        ids.push(idToUse);

        purchaseList.push(newPurchaseList);

        idToUse++;

        return response.status(201).json(newPurchaseList);
    } catch (error) {
        if (error instanceof Error) {
            return response.status(400).json({
                message: error.message,
            });
        }

        console.log(error);

        return response.status(500).json({
            message: "Internal server error",
        });
    }
};

export const listPurchaseList = (
    request: Request,
    response: Response
): Response => {
    return response.json(purchaseList);
};

export const retrievePurchaseList = (
    request: Request,
    response: Response
): Response => {
    const indexPurchaseList: number = request.purchaseList.indexPurchaseList;

    return response.json(purchaseList[indexPurchaseList]);
};

export const deletePurchaseList = (
    request: Request,
    response: Response
): Response => {
    const indexPurchaseList: number = request.purchaseList.indexPurchaseList;

    purchaseList.splice(indexPurchaseList, 1);

    return response.status(204).send();
};

export const updatePurchaseList = (
    request: Request,
    response: Response
): Response => {
    const indexPurchaseList: number = request.purchaseList.indexPurchaseList;

    purchaseList[indexPurchaseList] = {
        ...purchaseList[indexPurchaseList],
        ...request.body,
    };

    return response.json(purchaseList[indexPurchaseList]);
};
