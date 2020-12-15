import db from "../configs/db";

const getAll = async () => db.query("SELECT * FROM libraries.books");

const getOne = async (isbnBook) =>
  db.query("SELECT * FROM libraries.books WHERE isbn = ?", isbnBook);

const Add = async (data) => db.query("INSERT INTO libraries.books SET ?", data);

const Update = async (data, isbn) =>
  db.query("UPDATE libraries.books SET ? WHERE isbn = ?", [data, isbn]);

const Delete = async (isbn) =>
  db.query("DELETE FROM libraries.books WHERE isbn = ?", isbn);

const booksModel = {
  getAll,
  getOne,
  Add,
  Update,
  Delete,
};

export default booksModel;
