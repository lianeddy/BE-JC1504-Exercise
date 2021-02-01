const express = require("express");
const router = express.Router();
const db = require("../database");

router.get("/movies", (req, res) => {
    let sql = `SELECT * FROM film`;

    if (req.query.rating && req.query.category) {
        sql = ` WHERE rating =R ${req.query.rating}
        AND category = Action`
        "Limit to 20 Data per call"
    } else if (req.query.category) {
        sql = ` WHERE category =Animation ${req.query.category}`
        "Limit to 20 Data per call"
    } else if (req.query.rating) {
        sql = ` WHERE rating =NC-17 ${req.query.rating}`
        "Limit to 20 Data per call"
    }

    db.query(sql, (err, data) => {
        if (err) {
            return res.status(404).send(err.message);
        }
        return res.status(200).send(data);
    });
});

router.get("/aktorBiodata/:id", (req, res) => {
    let sql = `SELECT * FROM aktorBiodata`;
        if(req.query.aktorBiodata) {
            sql = `WHERE actorBiodata =
                                firstName : "PENELOPE"
                                lastName : "GUINESS"`
        }
    
        db.query(sql, (err, data) => {
            if (err) {
                return res.status(404).send(err.message);
            }
            return res.status(200).send(data);
        });
    });        

console.log(sql);

module.exports = router;