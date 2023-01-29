import express, { Application, Request, Response } from "express";
import {
    createPurchaseList,
    deletePurchaseList,
    listPurchaseList,
    retrievePurchaseList,
    updatePurchaseList,
} from "./logic";
import { ensurePurchaseListExists } from "./middlewares";

const app: Application = express();
app.use(express.json());

app.post("/purchaseList", createPurchaseList);

app.get("/purchaseList", listPurchaseList);

app.get("/purchaseList/:id", ensurePurchaseListExists, retrievePurchaseList);

app.get("/purchaseList/:id", ensurePurchaseListExists, retrievePurchaseList);

app.delete("/purchaseList/:id", ensurePurchaseListExists, deletePurchaseList);

app.patch(
    "/purchaseList/:id/:name",
    ensurePurchaseListExists,
    updatePurchaseList
);

app.listen(3000, () => {
    console.log("Server is running!");
});
