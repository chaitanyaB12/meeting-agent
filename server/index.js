import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import extract from "./routes/extract.js";
import actions from "./routes/actions.js";
import history from "./routes/history.js";
import status from "./routes/status.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const app = express();
app.use(cors());
app.use(express.json());

app.use("/extract", extract);
app.use("/actions", actions);
app.use("/history", history);
app.use("/status", status);


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log("Backend running on 8000"));
