import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import { authRouter, recipeRouter } from "./routes/index.js";
import passport from "passport";
import { authenticate } from "./config/index.js";

import records from "./routes/record.js";
import userRouter from "./routes/user.js";

import fileUpload from "express-fileupload";

import {CONST} from './constants/constants.js'

// Reads from the .env file to set process.env
dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/records", records);

// if fileSize is larger than 50 MB, abort
app.use(
    fileUpload({ 
        limits: {fileSize: CONST.MAX_FILE_SIZE*1024*1024},
        abortOnLimit: true
    })
);

app.use(passport.initialize()); // initialize passport (for authentication)

authenticate(passport);  // validates the route, only logged in users can access the database

app.use('/auth', authRouter);  // authenticate user
app.use('/recipe', recipeRouter);
app.use('/users', userRouter);

// Start Express server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

app.get('/', function(req, res, next) {
    res.send("ReciShare is in the oven, let us cook!");
});


