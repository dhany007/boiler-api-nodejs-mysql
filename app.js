import express from 'express';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

import routerDev from './api/index';

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
app.use(morgan('dev'));

app.use('/', routerDev);

export default app;
