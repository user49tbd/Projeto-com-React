import express from "express";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import cors from "cors"
import path from 'path';
import { fileURLToPath } from 'url';

import {usr} from "./Routes/usrRoutes.js"
import {email} from "./Routes/emailRoutes.js"
import { service } from "./Routes/serviceRoutes.js";
import { pass } from "./Routes/passRoutes.js";

const PORT = process.env.PORT || 8080
const HOST = process.env.HOST || "127.0.0.1"

const app = express()
app.use(express.json())
app.use(cors());
app.use("/usuario",usr)
app.use("/emails",email)
app.use("/service",service)
app.use("/pass",pass)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'config', 'uploads')));

app.get("/",(req,res)=>{
    res.status(200).send("ok")
})

app.listen(PORT,()=>{
    console.log(`http://${HOST}:${PORT}`)
})