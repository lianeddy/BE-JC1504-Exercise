const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const sql_getActor = `SELECT a.first_name, a.last_name, f.title, f.description, f.release_year FROM actor a JOIN film_actor fa ON fa.actor_id = a.actor_id JOIN film f ON f.film_id = fa.film_id WHERE a.actor_id = ${id}`;
  db.query(sql_getActor, (err, data_getActor) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(data_getActor);
  });
});

module.exports = router;
