const express = require("express");
const router = express.Router();
const query = require("../database");

router.get("/", (req, res) => {
	let sql = `
  SELECT 
    f.film_id,
    f.title,
    f.description,
    f.release_year,
    f.rating,
    c.name 
  FROM film_category fc
  join film f on f.film_id = fc.film_id
  join category c on c.category_id = fc.category_id order by f.film_id`;
	if (req.query.rating && req.query.category) {
		sql += ` WHERE rating = '${req.query.rating}' AND name = '${req.query.category}' ORDER BY f.film_id limit 20`;
	} else if (req.query.rating) {
		sql += ` WHERE rating = '${req.query.rating}' ORDER BY f.film_id limit 20`;
	} else if (req.query.category) {
		sql += ` WHERE name = '${req.query.category}' ORDER BY f.film_id limit 20`;
	}
	query(sql, (err, data) => {
		if (err) {
			return res.status(500).send(err.message);
		}
		return res.status(200).send(data);
	});
});

module.exports = router;
