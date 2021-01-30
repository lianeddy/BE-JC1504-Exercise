const express = require("express")
const router = express.Router()
const query = require("../database")

router.get("/:id", async (req,res) => {
  const id = parseInt(req.params.id)
  try{
    let response = await query(
      `SELECT 
        actor.first_name,
        actor.last_name,
        film.title,
        film.description,
        film.release_year
      FROM film_actor 
      JOIN film ON film.film_id = film_actor.film_id
      JOIN actor ON actor.actor_id = film_actor.actor_id
      WHERE actor.actor_id = ${id}`)

    let newResponse = response.map((val) => {
      return {
        title: `${val.title}`,
        description : `${val.description}`,
        release_year : val.release_year
      }
    })
    let newResponse2 = {actorBiodata : {
      firstName : response[0].first_name ,
      lastName : response[0].last_name
    },
    appearedIn : newResponse
  }
  return res.status(200).send(newResponse2)

  } catch (err) {
    return res.status(500).send(err.message)
  }

})

module.exports = router