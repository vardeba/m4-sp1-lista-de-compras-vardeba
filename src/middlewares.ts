import { Request, Response, NextFunction } from "express";
import { purchaseList } from "./database";
import { IItemList } from "./interfaces";

export const ensurePurchaseListExists = (
    request: Request,
    response: Response,
    next: NextFunction
): Response | void => {
    const id: number = parseInt(request.params.id);

    const indexPurchaseList = purchaseList.findIndex((el) => el.id === id);

    if (indexPurchaseList === -1) {
        return response.status(404).json({
            message: "Purchase list not found",
        });
    }

    request.purchaseList = {
        indexPurchaseList: indexPurchaseList,
    };

    return next();
};
