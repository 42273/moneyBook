import express from "express";
import account from "./route/account.js";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import history from "./route/history.js";

dotenv.config();
mongoose.connect(process.env.MONGODB_URI, { dbName: "study_0825" });

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use("/api/account", account);
app.use("/api/history", history);


app.listen(8080, _ => console.log('[SERVER] and the "START"'));