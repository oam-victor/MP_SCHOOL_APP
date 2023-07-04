import express from 'express';
import cors from 'cors';
import { db_connect } from './db/connect';
import routes from './routes/router'

export const app = express();
app.use(cors());
app.use(express.json());

//Connect to DB
db_connect();
//Access Routes

app.use('/api', routes);

app.listen(3000, ()=>{
    console.log('Listening at PORT:3000');
})