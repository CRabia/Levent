import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

//init
const app = express();

//Config server
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: true }));
