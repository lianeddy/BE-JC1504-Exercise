const express = require("express");
const router = express.Router();
const query = require("../database");

router.get("/:actor_id", async (req, res) => {
	const id = parseInt(req.params.actor_id);
	try {
		const response = await query(`
    SELECT a.actor_id,
      a.first_name,
      a.last_name,
      f.title,
      f.description,
      f.release_year
    FROM film_actor fa
    join film f on fa.film_id = f.film_id
    join actor a on a.actor_id = fa.actor_id
    WHERE fa.actor_id = (${id})`);

		let newResponse = response.map((val) => {
			return {
				title: `${val.title}`,
				description: `${val.description}`,
				release_year: val.release_year,
			};
		});

		let newData = {
			actorBiodata: {
				firstName: response[0].first_name,
				lastName: response[0].last_name,
			},
			appearedIn: newResponse,
		};

		return res.status(200).send(newData);
	} catch (err) {
		return res.status(500).send(err);
	}
});

// router.get("/:actor_id", (req, res) => {
// 	const id = parseInt(req.params.actor_id);
// 	let sql = `
//   SELECT
//     a.actor_id,
//     a.first_name,
//     a.last_name,
//     f.title,
//     f.description,
//     f.release_year
//   FROM film_actor fa
//   join film f on fa.film_id = f.film_id
//   join actor a on a.actor_id = fa.actor_id
//   WHERE fa.actor_id = ${id}`;

// let newResponse = response.map((val) => {
// 	return {
// 		title: `${val.title}`,
// 		description: `${val.description}`,
// 		release_year: val.release_year,
// 	};
// });

// let newData = {
// 	actorBiodata: {
// 		firstName: response[0].first_name,
// 		lastName: response[0].last_name,
// 	},
// 	appearedIn: newResponse,
// };
// 	query(sql, (err, data) => {
// 		if (err) {
// 			res.status(500).send(err);
// 		}
// 		res.status(200).send(newData);
// 	});
// });

module.exports = router;
