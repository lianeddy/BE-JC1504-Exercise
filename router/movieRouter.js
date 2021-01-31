const express = require("express");
const db = require("../database");
const router = express.Router();

router.get("/", (req, res) => {
  const { rating, category } = req.query;
  let sql = `SELECT 
    f.film_id,
    f.title,
    f.description,
    f.release_year,
    f.rating,
    c.name
    FROM film f 
    JOIN film_category fc ON fc.film_id = f.film_id
    JOIN category c ON c.category_id = fc.category_id`;

  if (rating && category) {
    sql += ` WHERE f.rating = '${rating}' AND c.name = '${category}' LIMIT 20`;
  } else if (rating) {
    sql += ` WHERE f.rating = '${rating}' LIMIT 20`;
  } else if (category) {
    sql += ` WHERE c.name = '${category}' LIMIT 20`;
  }
  db.query(sql, (err, data) => {
    if (err) res.status(500).send(err.message);
    return res.status(200).send(data);
  });
});

module.exports = router;
