import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';


import { logger } from './middlewares/eventLogger.js';
import authRoute from './routers/auth.js';



dotenv.config();

const app =express();


const PORT = process.env.PORT || 3000

//basic configuration
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(logger)

app.use('/auth', authRoute);


app.listen(PORT, () => {
    console.log('Server Started at Port '+PORT)
});