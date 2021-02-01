const express = require("express");
const db = require("../database");
const router = express.Router();

router.get("/", (req, res) => {
  const { rating, category } = req.query;
  let sql = `SELECT 
    film.film_id,
    film.title,
    film.description,
    film.release_year,
    film.rating,
    category.name as category
    FROM film  
    JOIN film_category ON film_category.film_id = film.film_id
    JOIN category ON category.category_id = film_category.category_id`;

  if (rating && category) {
    sql += ` WHERE film.rating = '${rating}' AND category.name = '${category}' LIMIT 20`;
  } else if (rating) {
    sql += ` WHERE category.name = '${category}' LIMIT 20`;
  } else if (category) {
    sql += ` WHERE film.rating = '${rating}' LIMIT 20`;
  }

  console.log(sql);
  db.query(sql, (err, data) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    return res.status(200).send(data);
  });
});

module.exports = router;