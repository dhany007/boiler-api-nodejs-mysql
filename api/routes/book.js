import { Router } from 'express';

import booksContr from '../controllers/book';
import utils from '../helpers/utils';
import valid from '../helpers/validator';

const router = Router();

router
  .get('/', utils.access, booksContr.getAll)
  .get(
    '/:isbnBook',
    utils.access,
    valid.ruleGetOneBook(),
    valid.validate,
    booksContr.getOne,
  )
  .post('/', utils.access, valid.ruleAddBook(), valid.validate, booksContr.Add)
  .patch(
    '/:isbnBook',
    utils.access,
    valid.ruleUpdateBook(),
    valid.validate,
    booksContr.Update,
  )
  .delete(
    '/:isbnBook',
    utils.access,
    valid.ruleDeleteBook(),
    valid.validate,
    booksContr.Delete,
  );

export default router;
