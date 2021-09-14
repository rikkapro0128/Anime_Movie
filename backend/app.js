import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import morgan from 'morgan';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import RouterManager from './src/router/manager.js';
import DbConfig from './src/db/config.js';
const app = express();
const port = 5000;
const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config();
app.use(cors({
    origin: ['http://localhost:8080'],
    methods: ['GET', 'POST', 'DELETE'],
}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'src', 'public')))
app.use('/video', express.static(process.env.PATH_MOVIE))
app.use('/img-mv', express.static(process.env.PATH_MOVIES_IMAGE))
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// manager route
RouterManager(app);

//config Database
DbConfig(mongoose);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})