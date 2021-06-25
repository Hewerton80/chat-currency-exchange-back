import "reflect-metadata";
import 'dotenv/config';
import 'express-async-errors';
import express from 'express';
import { routes } from './routes';
import { join } from 'path';
import cors from 'cors';
import './database/connection';
import { errorRequestHandler } from "./app/exceptions/handler";

const app = express();

//middlewares globais
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//routes
app.use(routes);

//public files
app.use(express.static(join(__dirname, '..', 'public')));

//handler globals errors
app.use(errorRequestHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>
    console.log(`Server listing on ${process.env.HOST}:${process.env.PORT}`)
)