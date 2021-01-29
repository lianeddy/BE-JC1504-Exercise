const query = require("../database");
const router = require("express").Router();

// GET("/actors/:id")
// Get with id
// eg. /actors/1
// eg. /actors/2
// eg. /actors/3
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    let sql = `SELECT 
      actor.first_name,
      actor.last_name,
      film.title,
      film.description,
      film.release_year
  FROM actor
  INNER JOIN film_actor ON actor.actor_id = film_actor.actor_id
  INNER JOIN film ON film_actor.film_id = film.film_id `;

    if (id) {
      sql += `WHERE actor.actor_id = ${id} ORDER BY actor.actor_id LIMIT 20`;
    } else {
      sql += `ORDER BY actor.actor_id LIMIT 20`;
    }

    const response = await query(sql);
    let newResponse = response.map((val) => {
      return {
        title: `${val.title}`,
        description: `${val.description}`,
        release_year: val.release_year,
      };
    });

    let newData = {
      actorBiodata: {
        firstName: response[0].first_name,
        lastName: response[0].last_name,
      },
      appearedIn: newResponse,
    };

    return res.status(200).send(newData);
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = router;
