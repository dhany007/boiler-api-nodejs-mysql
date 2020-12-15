import booksModel from '../models/book';
import log from '../configs/winston';

const getAll = async (req, res) => {
  try {
    const resBooks = await booksModel.getAll();
    if (resBooks.length === 0) {
      return res.status(400).send({ status: 'failed', message: 'no data' });
    }

    return res.json({
      status: 'success',
      message: 'success get all books',
      data: resBooks,
    });
  } catch (error) {
    const result = {
      body: '',
      response: {
        status: 'failed',
        message: error.message,
      },
    };
    log.bookLogger.error('Get Book', result);

    return res.status(400).send(result.response);
  }
};

const getOne = async (req, res) => {
  const { isbnBook } = req.params;

  try {
    const resBook = await booksModel.getOne(isbnBook);
    if (resBook.length === 0) {
      return res
        .status(400)
        .send({ status: 'failed', message: 'book not found' });
    }

    return res.json({
      status: 'success',
      message: 'success get all book',
      data: resBook,
    });
  } catch (error) {
    const result = {
      body: req.params,
      response: {
        status: 'failed',
        message: error.message,
      },
    };
    log.bookLogger.error('Get One Book', result);

    return res.status(400).send(result.response);
  }
};

const Update = async (req, res) => {
  const { isbnBook } = req.params;
  const { name } = req.body;

  try {
    const resBook = await booksModel.getOne(isbnBook);
    if (resBook.length === 0) {
      return res
        .status(400)
        .send({ status: 'failed', message: 'book not found' });
    }

    const dataUpdate = {
      name,
    };
    await booksModel.Update(dataUpdate, isbnBook);

    const result = {
      body: { ...req.params, ...req.body },
      response: { status: 'success', message: 'success updated book' },
    };
    log.bookLogger.info('Update Book', result);

    return res.json(result.response);
  } catch (error) {
    const result = {
      body: { ...req.params, ...req.body },
      response: {
        status: 'failed',
        message: error.message,
      },
    };
    log.bookLogger.error('Update Book', result);

    return res.status(400).send(result.response);
  }
};

const Add = async (req, res) => {
  const { name, isbnBook } = req.body;

  try {
    const resBook = await booksModel.getOne(isbnBook);
    if (resBook.length > 0) {
      return res
        .status(400)
        .send({ status: 'failed', message: 'isbn book exist' });
    }
    const createdAt = new Date();
    const dataBook = {
      name,
      isbn: isbnBook,
      createdAt,
      updatedAt: createdAt,
    };
    await booksModel.Add(dataBook);

    const result = {
      body: req.body,
      response: { status: 'success', message: 'success added book' },
    };
    log.bookLogger.info('Add Book', result);

    return res.json(result.response);
  } catch (error) {
    const result = {
      body: req.body,
      response: {
        status: 'failed',
        message: error.message,
      },
    };
    log.bookLogger.error('Add Book', result);

    return res.status(400).send(result.response);
  }
};

const Delete = async (req, res) => {
  const { isbnBook } = req.params;
  try {
    const resBook = await booksModel.getOne(isbnBook);
    if (resBook.length === 0) {
      return res
        .status(400)
        .send({ status: 'failed', message: 'book not found' });
    }
    await booksModel.Delete(isbnBook);

    const result = {
      body: req.params,
      response: { status: 'success', message: 'success deleted book' },
    };
    log.bookLogger.info('Delete Book', result);

    return res.json(result.response);
  } catch (error) {
    const result = {
      body: req.params,
      response: {
        status: 'failed',
        message: error.message,
      },
    };
    log.bookLogger.error('Delete Book', result);

    return res.status(400).send(result.response);
  }
};

const booksContr = {
  getAll,
  getOne,
  Update,
  Delete,
  Add,
};

export default booksContr;
