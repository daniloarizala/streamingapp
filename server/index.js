import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./src/routes/authRoutes.js";

dotenv.config();

const PORT = process.env.PORT || process.env.API_PORT;

const app = express();

app.use(express.json())

app.use(cors());

app.get("/", (req, res) => {
    return res.send("Hello Server LIGHT UP");
});

app.use("/api/auth", authRoutes);

const server = http.createServer(app);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        server.listen(PORT, () => {
            console.log(`Server is listening on ${PORT}`);
        });
    }).catch(err => {
        console.log("Database connection failed. Server not started.");
    });

