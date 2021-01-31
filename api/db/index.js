const mysql = require('mysql');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'bangjekss',
  password: 'lolipop9098',
  database: 'sakila',
  port: 3306,
});

module.exports = db;
