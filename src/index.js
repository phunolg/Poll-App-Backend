import express from "express";
import multer from 'multer';
import { MongoClient, ObjectId } from 'mongodb';
import path, { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

import router from "./routes/app.route.js";
import errorHandler from "./middleware/errorHandle.middleware.js";
import templateEngineConfig from "./config/templateEngine.config.js";
import hashProvider from "./providers/hash.provides.js";
import 'dotenv/config';
import { connectDB } from './config/db.config.js';
import pollRouter from './routes/poll.router.js';
import voteRouter from './routes/vote.route.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const upload = multer({ dest: 'uploads/' });

const startApp = async () => {
    const app = express();
    const port = 3000;

    app.use(express.json());
    app.use("/abc", express.static(path.join(__dirname, 'public')));
    app.use("/", router);
    app.use("/polls", pollRouter);
    app.use("/votes", voteRouter);

    templateEngineConfig(app);
    app.use(errorHandler);

    

    // Xử lý Single File
    app.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
        const file = req.file;
        if (!file) {
            const error = new Error('Please upload a file');
            error.httpStatusCode = 400;
            return next(error);
        }
        res.send(file);
    });
    
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });

    
};

const runApp = async () => {
    try {
        await connectDB();
        startApp();
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1);
    }
};

runApp();