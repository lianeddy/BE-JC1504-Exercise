const express = require('express');
const router = express.Router();
const db = require('../database');
const _ = require('lodash');

router.get('/', (req,res) => {
    let sql = `SELECT 
                f.film_id, f.title,
                f.description, f.release_year,
                f.rating, c.name as 'category'
                FROM film f JOIN film_category fc
                ON f.film_id = fc.film_id
                JOIN category c 
                ON c.category_id = fc.category_id
                `;
    if(!_.isEmpty(req.query)){
        sql += ` WHERE `;
    };
    if(req.query.rating){
        sql += `rating = '${req.query.rating}'
                ${Object.keys(req.query).length>1 ? " AND " : ""}`;
    };
    if(req.query.category){
        sql += `name = '${req.query.category}'`;
    };

    sql += `LIMIT 20`;
    db.query(sql, (err, data) => {
        if(err) return res.status(500).send(err);

        return res.status(200).send(data);
    });
});

module.exports = router;