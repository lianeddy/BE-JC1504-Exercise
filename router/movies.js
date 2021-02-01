const express = require ("express");
const router = express.Router();
const db = require("../database")

router.get("/", (req, res) => {
    const id = parseInt(req.params.id);
    db.query(
        
        `SELECT
        film_id, 
        title, 
        description, 
        release_year, 
        rating 
        from film limit ${0,20}`, (err, data) => {
      if (err) {
        return res.status(500).send(err.message);
      }
      if (data.length === 0) {
        res.status(404).send("Data not found");
      }
      return res.status(200).send(data[0]);
    });
    
  });

module.exports = router; 