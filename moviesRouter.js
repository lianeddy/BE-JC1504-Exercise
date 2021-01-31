const express = require("express")
const router = express.Router()
const query = require("../database")

router.get("/", (req, res) => {
  let sql = 
  `SELECT 
      film.film_id, 
      film.title, 
      film.description, 
      film.release_year, 
      film.rating,
      category.name 
      from film_category
      JOIN film ON film.film_id = film_category.film_id
      JOIN category ON category.category_id = film_category.category_id `
      
      if(req.query.rating && req.query.category) {
        sql += ` WHERE rating = '${req.query.rating}' AND name = '${req.query.category}' limit 20`
      }
      else if(req.query.rating) {
        sql += ` WHERE rating = '${req.query.rating}' limit 20`
      }
      else if(req.query.category) {
        sql += ` WHERE name = '${req.query.category}' limit 20`
      }
      query(sql, (err, data) => {
        if(err) {
          return res.status(500).send(err.message)
        }
        return res.status(200).send(data)
      })
    })
      
module.exports = router