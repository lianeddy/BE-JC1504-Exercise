// Code Here
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 2000;
// const {db, query} = require("./database");
const {filmRouter, actorsRouter} = require("./router")

const app = express();

app.use(cors());
app.use(bodyParser());

app.get("/", (req, res) => {
  res.status(200).send("<h1>Express API</h1>");
});

// Get Movies
// app.get("/movies", (req,res) => {
//   let sql = `SELECT 
//     f.film_id,
//     f.title,
//     f.description,
//     f.release_year,
//     f.rating,
//     c.name AS 'category'
//     FROM
//     film_category fc
//         JOIN
//     film f ON fc.film_id = f.film_id
//         JOIN
//     CATEGORY c ON fc.category_id = c.category_id`
//     const {rating, category} = req.query
//     // console.log(rating);
//     // console.log(category);
//     if (rating && category) {
//       sql+=` WHERE c.name = '${category}' AND rating = "${rating}"`
//     }
//     else if (rating) {
//       sql+=  ` WHERE rating = "${rating}" order by f.film_id limit 20`
//     }
//     else if (category) {
//       sql+= ` WHERE c.name = "${category}" order by f.film_id limit 20`
//     }
//     // console.log(sql);
//     db.query(sql, (err, data) => {
//       if (err) {
//         return res.status(500).send(err.message);
//       }
//       return res.status(200).send(data);
//     });
// });

// Get Actors
// app.get("/actors/:id", async (req, res) => {
// 	const id = req.params.id;
// 	try {
// 		const data = await query(
// 			`SELECT a.first_name,a.last_name,f.title,f.description,f.release_year FROM actor a JOIN film_actor fa ON a.actor_id = fa.actor_id JOIN film f ON fa.film_id = f.film_id WHERE a.actor_id = ${id} ORDER BY a.actor_id LIMIT 20;`
//     );
//     let newData = data.map((val) => {
//       return {
//         title : `${val.title}`,
//         description : `${val.description}`,
//         release_year : val.release_year
//       }
//     })
//     let lastData = {
//       actorBiodata : {
//         firstName : data[0].first_name,
//         lastName : data[0].last_name
//       },
//       appearedIn : newData
//     }
//     return res.status(200).send(lastData)
// 	} catch (err) {
// 		return res.status(500).send(err.message)
// 	}
// });

app.use("/actors", actorsRouter);
app.use("/movies", filmRouter);
app.listen(port, () => console.log(`API active at port ${port}`));




// Use database sakila di mysql
// Routes
// GET("/movies")
// Get with query (Rating & Category Name)
// eg. /movies?rating=R&category=Action
// eg. /movies?category=Animation
// eg. /movies?rating=NC-17
// Limit to 20 Data per call
// response data :
// [
//     {
//         film_id: 19,
//         title: "AMADEUS HOLY",
//         description: "A Emotional Display of a Pioneer And a Technical Writer who must Battle a Man in A Baloon",
//         release_year: 2006,
//         rating: "PG",
//         category: "Action"
//     },
//     {
//         ...
//     },
//     ...
// ]

// GET("/actors/:id")
// Get with id
// eg. /actors/1
// eg. /actors/2
// eg. /actors/3
// response data :
// {
//     actorBiodata : {
//         firstName : "PENELOPE",
//         lastName: "GUINESS"
//     },
//     appearedIn: [
//         {
//             title: "ACADEMY DINOSAUR",
//             description : "A Epic Drama of a Feminist And a Mad Scientist who must Battle a Teacher in The Canadian Rockies",
//             release_year: 2006
//         },
//         ...
//     ]
// }
