const express = require("express");
const router = express.Router();
const {db, query} = require("../database");

router.get("/", (req,res) => {
    let sql = `SELECT 
      f.film_id,
      f.title,
      f.description,
      f.release_year,
      f.rating,
      c.name AS 'category'
      FROM
      film_category fc
          JOIN
      film f ON fc.film_id = f.film_id
          JOIN
      CATEGORY c ON fc.category_id = c.category_id`
      const {rating, category} = req.query
      // console.log(rating);
      // console.log(category);
      if (rating && category) {
        sql+=` WHERE c.name = '${category}' AND rating = "${rating}"`
      }
      else if (rating) {
        sql+=  ` WHERE rating = "${rating}" order by f.film_id limit 20`
      }
      else if (category) {
        sql+= ` WHERE c.name = "${category}" order by f.film_id limit 20`
      }
      // console.log(sql);
      db.query(sql, (err, data) => {
        if (err) {
          return res.status(500).send(err.message);
        }
        return res.status(200).send(data);
      });
  });
module.exports = router