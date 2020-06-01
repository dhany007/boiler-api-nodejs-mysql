import { Router } from 'express';

import bookRoute from './routes/book';

const router = Router();

router
  .use('/book', bookRoute);

export default router;
