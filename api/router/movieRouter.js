const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  console.log(Object.keys(req.query).length);
  let sql_getMovie = `SELECT f.film_id, f.title, f.description, f.release_year, f.rating, c.name as 'category' FROM film f join film_category fc on fc.film_id = f.film_id join category c on c.category_id = fc.category_id`;
  if (Object.keys(req.query).length >= 1) sql_getMovie += ' WHERE';
  if (req.query.rating)
    sql_getMovie += ` rating = '${req.query.rating}' ${
      Object.keys(req.query).length > 1 ? 'AND' : ''
    }`;
  if (req.query.category)
    sql_getMovie += ` name = '${req.query.category}' ${
      Object.keys(req.query).length > 1 ? 'AND' : ''
    }`;
  sql_getMovie += ' LIMIT 0, 20;';
  if (Object.keys(req.query).length >= 2) {
    const a = sql_getMovie.lastIndexOf('AND');
    const b = sql_getMovie.slice(0, a - 1);
    const c = sql_getMovie.slice(a + 3);
    sql_getMovie = b + c;
    console.log(sql_getMovie);
    console.log(Object.keys(req.query).length);
  }
  db.query(sql_getMovie, (err, data_getMovie) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(data_getMovie);
  });
});

module.exports = router;
