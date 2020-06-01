import express from 'express';

require('dotenv').config();

const app = express();

const { port } = process.env;

app.listen(port, () => {
  console.log('Server listening on port', port);
});

export default app;
