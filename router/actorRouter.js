const express = require("express");
const router = express.Router();
const db = require("../database");

router.get("/:id", (req, res) => {
  const { id } = req.params;
  let sql = `SELECT 
    a.first_name AS firstName,
    a.last_name AS lastName,
    f.title,
    f.description,
    f.release_year
    FROM actor a 
    JOIN film_actor fa ON fa.actor_id = a.actor_id
    JOIN film f ON f.film_id = fa.film_id
    WHERE a.actor_id = ${id}
    LIMIT 20`;

  db.query(sql, (err, data) => {
    if (err) res.status(500).send(err.message);
    if (data.length !== 0) {
      const { firstName, lastName } = data[0];
      return res.send({
        actorBiodata: { firstName, lastName },
        appearedIn: data.map((val) => {
          return {
            title: val.title,
            description: val.description,
            release_year: val.release_year,
          };
        }),
      });
    } else {
      return res.send({
        message: "Actor not found",
      });
    }
  });
});

module.exports = router;
