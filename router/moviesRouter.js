const express = require('express')
const { query } = require('../database')
const router = express.Router()

router.get("/", async (req, res) => {
    const { rating, category } = req.query

    let whereSql = ""

    if(rating && category) {
        whereSql = `WHERE f.rating = '${rating}' and c.name = '${category}'`
    }
    else if(rating) {
        whereSql = `WHERE f.rating = '${rating}'`
    }
    else if(category) {
        whereSql = `WHERE c.name = '${category}'`
    }

    const sql = `
        SELECT
            f.film_id,
            f.title,
            f.description,
            f.release_year,
            f.rating,
            c.name as 'category'
        FROM film f
        JOIN film_category fc ON f.film_id = fc.film_id
        JOIN category c ON fc.category_id = c.category_id
        ${whereSql}
        ORDER BY f.film_id
        LIMIT 20
    `

    try {
        const data = await query(sql)

        res.status(200).send({
            responsedata: data
        })
    }
    catch(err) {
        res.status(500).send(err)
    }
})

module.exports = router