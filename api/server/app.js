import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import model from './models';
import routes from './routes';
import cors from 'cors';

const app = express();
// mongoose instance connection url connection with the local host
mongoose.connect('mongodb+srv://saurabh:saurabh@cluster0.frb0e.mongodb.net/test', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify:false
}).then(()=>console.log('Connected to Database')).catch((e)=>{console.log('Error: ',e);})

mongoose.Promise = global.Promise;

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Adding app object to the routes
routes(app);

//exporting app object
export default app;
