const query = require("../database");
const router = require("express").Router();

// GET("/films")
// Get with query (Rating & Category Name)
// eg. /films?rating=R&category=Action
// eg. /films?category=Animation
// eg. /films?rating=NC-17
// Limit to 20 Data per call
router.get("/", async (req, res) => {
  const { rating, category } = req.query;
  console.log(rating, category);
  try {
    let sql = `SELECT 
	film.film_id,
    film.title,
    film.description,
    film.release_year,
    film.rating,
    category.name AS category
 FROM film 
 INNER JOIN film_category ON film.film_id = film_category.film_id 
 INNER JOIN category ON film_category.category_id = category.category_id `;
    if (rating && category) {
      sql += `WHERE film.rating='${rating}' AND category.name='${category}' ORDER BY film.film_id LIMIT 20`;
    } else if (rating) {
      sql += `WHERE film.rating='${rating}' ORDER BY film.film_id LIMIT 20`;
    } else if (category) {
      sql += `WHERE category.name='${category}' ORDER BY film.film_id LIMIT 20`;
    } else {
      sql += `ORDER BY film.film_id LIMIT 20`;
    }
    console.log(sql);
    const response = await query(sql);
    return res.status(200).send(response);
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = router;
