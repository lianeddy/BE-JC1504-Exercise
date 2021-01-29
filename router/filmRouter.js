const express = require("express");
const query = require("../database");
const router = express.Router();

// GET FILMS
router.get("/", async (req, res) => {
	const { rating, category } = req.query;
	let sql = `SELECT f.film_id,f.title,f.description,f.release_year,f.rating,c.name AS 'category' FROM film_category fc
    JOIN film f ON fc.film_id = f.film_id join CATEGORY c ON fc.category_id = c.category_id
    `;
	try {
		if (rating && category) {
			const data = await query(
				`${sql} WHERE c.name = '${category}' AND rating = "${rating}" order by f.film_id limit 20`
			);
			return res.status(200).send(data);
		} else if (rating) {
			const data = await query(
				`${sql} WHERE  rating = "${rating}" order by f.film_id limit 20`
			);
			return res.status(200).send(data);
		} else if (category) {
			const data = await query(
				`${sql} WHERE c.name = '${category}' order by f.film_id limit 20`
			);
			return res.status(200).send(data);
		}
	} catch (err) {
		return res.status(500).send(err);
	}
});
module.exports = router;
