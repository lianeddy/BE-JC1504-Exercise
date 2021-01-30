const express = require('express')
const { query } = require('../database')
const router = express.Router()

router.get("/:id", async (req, res) => {
    const { id } = req.params

    const sql = `
        SELECT
            a.first_name as 'firstName',
            a.last_name as 'lastName',
            f.title,
            f.description,
            f.release_year
        FROM film_actor fa
        JOIN actor a ON fa.actor_id = a.actor_id
        JOIN film f ON fa.film_id = f.film_id
        WHERE fa.actor_id = ${id}`

    try {
        const data = await query(sql)
    
        const { firstName, lastName } = data[0]
        const actorBiodata = {
            firstName,
            lastName
        }
    
        const appearedIn = data.map((val) => {
            const {title, description, release_year} = val
            return {
                title,
                description,
                release_year
            }
        })
    
        res.status(200).send({
            responseData: {
                actorBiodata,
                appearedIn
            }
        })
    }
    catch(err) {
        res.status(500).send(err)
    }
})

module.exports = router