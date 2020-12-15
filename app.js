import express from 'express';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import logger from 'morgan';
import moment from 'moment';

import routerDev from './api/index';
import winston from './api/configs/winston';

require('dotenv').config();

const app = express();

const { port } = process.env;

app.listen(port, () => {
  console.log('Server listening on port', port);
});

app.use(json());
app.use(urlencoded({
  extended: false,
}));

app.use(cors());
// app.use(morgan('dev'));

app.use(logger('combined', { stream: winston.stream }));
logger.token('date', () => moment().format('YYYY-MM-DD HH:mm:ss'));


app.use('/', routerDev);

export default app;
