import express from "express";
import router from "./routes/routes.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

mongoose
    .connect("mongodb://127.0.0.1:27017", {
    dbName: "genReview",
    })
    .then((c) => console.log('Database Connected'))
    .catch((e) => console.log(e));

export const app = express();
dotenv.config();
const port = process.env.PORT;
app.use(bodyParser.json());
app.use(cors());

app.use("/",router);

app.get("/", (req, res) => {
    res.send("Nice working");
  });

app.listen(port, ()=> {
    console.log(`Server is running on ${port}`)
});


