const express = require("express")
const router = express.Router()
const query = require("../database")

router.get("/:id", async(req, res) => {
  const id = parseInt(req.params.id)
  try{
    let kevin = await query(
      `SELECT
      actor.first_name,
      actor.last_name,
      film.title,
      film.description,
      film.rating,
      film.release_year
      from film_actor
      JOIN film ON film.film_id = film_actor.film_id
      JOIN actor ON actor.actor_id = film_actor.actor_id
      WHERE film_actor.actor_id = ${id}`
    )
    let kevinmahen = kevin.map((val) => {
      return {
        title: `${val.title}`,
        description: `${val.description}`,
        release_year: val.release_year,
      }
    })
    let reza = 
      {
        actorBiodata : {
          firstName : kevin[0].first_name,
          lastName: kevin[0].last_name
    },
        appearedIn: kevinmahen
      }

      return res.status(200).send(reza)
  }catch(err){
    return res.status(500).send(err.message)
  }
})

module.exports = router