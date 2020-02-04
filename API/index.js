import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import database from "./src/models/database";
import router from "./src/routes/routes";

//init
const app = express();

//Config server
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: true }));

//Make route
app.use(router);

//Config database mongo
const port = 3000;

database.connectDb().then(() => {
  console.log("Database server is connected !");
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
});
