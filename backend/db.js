const mysql = require("mysql");
require('dotenv').config()

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Błąd połączenia z bazą danych:", err);
    setTimeout(db.connect, 2000);
  } else {
    console.log("Połączono z bazą danych MySQL");
  }
});

module.exports = db;
