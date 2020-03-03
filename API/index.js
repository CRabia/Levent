import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import database from "./src/models/database";
import router from "./src/routes/routes";
import jwt from "./src/config/jwt";
import path from "path";

//init
const app = express();

//Config server
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: true }));

app.use("/public", express.static(__dirname + "/public"));
//Auth
app.use(jwt());

//Make route
app.use(router);

//Config database mongo
const port = 3001;

database.connectDb().then(() => {
    console.log("Database server is connected !");
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
});
