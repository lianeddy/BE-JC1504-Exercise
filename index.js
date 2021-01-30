// Code Here

// Use database sakila di mysql
// Routes
// GET("/movies")
// Get with query (Rating & Category Name)
// eg. /movies?rating=R&category=Action
// eg. /movies?category=Animation
// eg. /movies?rating=NC-17
// Limit to 20 Data per call
// 
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

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { filmRouter, actorRouter } = require("./router");
const port = 2000;

app.use(cors());
app.use(bodyParser());

app.use("/films", filmRouter);
app.use("/actors", actorRouter);

app.listen(port, () => console.log(`Server listens at port ${port}`));
