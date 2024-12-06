import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';


import authRoute from './routers/auth.js';


const app =express();


//basic configuration
app.use(bodyParser.urlencoded({extended:tru}));
app.use(bodyParser.json());
app.use(cookieParser());