import db from '../configs/db';

const getAll = async () => {
  const sql = 'SELECT * FROM libraries.books';
  return db.query(sql);
};

const getOne = async (isbnBook) => {
  const sql = 'SELECT * FROM libraries.books WHERE isbn = ?';
  return db.query(sql, [isbnBook]);
};

const Add = async (data) => {
  const sql = 'INSERT INTO libraries.books SET ?';
  return db.query(sql, [data]);
};

const Update = async (data, isbn) => {
  const sql = 'UPDATE libraries.books SET ? WHERE isbn = ?';
  return db.query(sql, [data, isbn]);
};

const Delete = async (isbn) => {
  const sql = 'DELETE FROM libraries.books WHERE isbn = ?';
  return db.query(sql, [isbn]);
};

const booksModel = {
  getAll, getOne, Add, Update, Delete,
};

export default booksModel;
