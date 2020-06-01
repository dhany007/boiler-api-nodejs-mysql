import booksModel from '../models/book';

const getAll = async (req, res) => {
  try {
    const resBooks = await booksModel.getAll();
    if (resBooks.length === 0) {
      return res.status(400).send({ status: 'failed', message: 'no data' });
    }
    return res.json({ status: 'success', message: 'success get all books', data: resBooks });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ status: 'failed', message: error.message });
  }
};

const getOne = async (req, res) => {
  const { isbnBook } = req.params;
  try {
    const resBook = await booksModel.getOne(isbnBook);
    if (resBook.length === 0) {
      return res.status(400).send({ status: 'failed', message: 'book not found' });
    }
    return res.json({ status: 'success', message: 'success get all book', data: resBook });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ status: 'failed', message: error.message });
  }
};

const Update = async (req, res) => {
  const { isbnBook } = req.params;
  const { name } = req.body;
  try {
    const resBook = await booksModel.getOne(isbnBook);
    if (resBook.length === 0) {
      return res.status(400).send({ status: 'failed', message: 'book not found' });
    }
    const dataUpdate = {
      name,
    };
    await booksModel.Update(dataUpdate, isbnBook);
    return res.json({ status: 'success', message: 'success updated book' });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ status: 'failed', message: error.message });
  }
};

const Add = async (req, res) => {
  const { name, isbnBook } = req.body;
  try {
    const resBook = await booksModel.getOne(isbnBook);
    if (resBook.length > 0) {
      return res.status(400).send({ status: 'failed', message: 'isbn book exist' });
    }
    const createdAt = new Date();
    // cek database
    const dataBook = {
      name,
      isbn: isbnBook,
      createdAt,
      updatedAt: createdAt,
    };
    await booksModel.Add(dataBook);
    return res.json({ status: 'success', message: 'success added book' });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ status: 'failed', message: error.message });
  }
};

const Delete = async (req, res) => {
  const { isbnBook } = req.params;
  try {
    const resBook = await booksModel.getOne(isbnBook);
    if (resBook.length === 0) {
      return res.status(400).send({ status: 'failed', message: 'book not found' });
    }
    await booksModel.Delete(isbnBook);
    return res.json({ status: 'success', message: 'success deleted book' });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ status: 'failed', message: error.message });
  }
};

const booksContr = {
  getAll, getOne, Update, Delete, Add,
};

export default booksContr;
