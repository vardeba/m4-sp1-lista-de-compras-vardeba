import express, { Application } from "express";

const app: Application = express();
app.use(express.json());

app.post("/", (request, response) => {
    return response.send("deu certo");
});

app.listen(3000, () => {
    console.log("Server is running!");
});
