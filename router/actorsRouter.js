const express = require("express");
const router = express.Router();
const {db, query} = require("../database");

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await query(
      `SELECT a.first_name,a.last_name,f.title,f.description,f.release_year FROM actor a JOIN film_actor fa ON a.actor_id = fa.actor_id JOIN film f ON fa.film_id = f.film_id WHERE a.actor_id = ${id} ORDER BY a.actor_id LIMIT 20;`
    );
    let newData = data.map((val) => {
      return {
        title: `${val.title}`,
        description: `${val.description}`,
        release_year: val.release_year,
      };
    });
    let lastData = {
      actorBiodata: {
        firstName: data[0].first_name,
        lastName: data[0].last_name,
      },
      appearedIn: newData,
    };
    return res.status(200).send(lastData);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});
module.exports = router;
