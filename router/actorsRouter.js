const express = require ("express");
const router = express.Router();
const db = require("../database")

router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    db.query(
        
        `SELECT
        first_name,
        last_name,
        title,
        description,
        release_year
        from actor 
        join film on actor.actor_id = film.film_id
        WHERE actor_id = ${id}`, (err, data) => {
      if (err) {
        return res.status(500).send(err.message);
      }
      if (data.length === 0) {
        res.status(404).send("Data not found");
      }
      return res.status(200).send(data[0]);
    });
    
  });

module.exports = router; 