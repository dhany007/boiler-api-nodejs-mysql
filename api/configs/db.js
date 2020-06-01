import { createPool } from 'mysql';
import { promisify } from 'util';

require('dotenv').config();

const { host, user, password } = process.env;

const db = createPool({
  host,
  user,
  password,
  connectionLimit: 10,
});

db.getConnection((err, connection) => {
  if (err) {
    console.log('Error to connect', err);
  } else if (connection) {
    console.log(`Database ${host} connected`);
    connection.release();
  }
});

db.query = promisify(db.query);

export default db;
