const { response } = require('express');
const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/:id', (req,res) => {
    const id = parseInt(req.params.id);
    let sql = `SELECT
                f.title, 
                f.description,
                f.release_year
                FROM 
                film_actor fa 
                JOIN film f ON f.film_id = fa.film_id
                WHERE fa.actor_id = ${id}`;
    db.query(sql, (err, data) => {
        if(err) return res.status(500).send(err);

        if(data.length === 0) return res.status(404).send("Data Not Found");

        db.query(`SELECT
                first_name, last_name
                FROM actor WHERE actor_id = ${id}`,
                (err2, data2) => {
                    if(err2) return res.status(500).send(err);

                    let response = {
                        actorBiodata: {
                            firstName: data2[0].first_name,
                            lastName: data2[0].last_name,
                        },
                        appearedIn: data
                    }
                    return res.status(200).send(response);
                }
        );
    });
});

module.exports = router;