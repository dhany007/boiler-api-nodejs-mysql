import { body, param, validationResult } from 'express-validator';

const ruleAddBook = () => [
  body('isbnBook')
    .notEmpty('field \'isbnBook\' can not empty'),
  body('name')
    .notEmpty('field \'name\' can not empty'),
];

const ruleDeleteBook = () => [
  param('isbnBook')
    .notEmpty('field \'isbnBook\' can not empty'),
];

const ruleUpdateBook = () => [
  param('isbnBook')
    .notEmpty('field \'isbnBook\' can not empty'),
  body('name')
    .notEmpty('field \'name\' can not empty'),
];

const ruleGetOneBook = () => [
  param('isbnBook')
    .notEmpty('field \'isbnBook\' can not empty'),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).send({
    status: 'failed',
    message: errors.errors[0].msg,
  });
};

const valid = {
  ruleAddBook,
  ruleDeleteBook,
  ruleUpdateBook,
  ruleGetOneBook,
  validate,
};

export default valid;
