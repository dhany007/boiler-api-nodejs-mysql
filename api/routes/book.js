import { Router } from 'express';

import booksContr from '../controllers/book';

const router = Router();

router
  .get('/', booksContr.getAll)
  .get('/:isbnBook', booksContr.getOne)
  .post('/', booksContr.Add)
  .patch('/:isbnBook', booksContr.Update)
  .delete('/:isbnBook', booksContr.Delete);

export default router;
