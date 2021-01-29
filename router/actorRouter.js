const express = require("express");
const query = require("../database");
const router = express.Router();

router.get("/:id", async (req, res) => {
	const id = req.params.id;
	try {
		const data = await query(
			`SELECT a.first_name,a.last_name,f.title,f.description,f.release_year FROM actor a JOIN film_actor fa ON a.actor_id = fa.actor_id JOIN film f ON fa.film_id = f.film_id WHERE a.actor_id = ${id} ORDER BY a.actor_id LIMIT 20;`
		);
		if (data.length !== 0) {
			const { first_name, last_name } = data[0];
			return res.send({
				actorBiodata: { first_name, last_name },
				appearedIn: data.map((val) => {
					return {
						title: val.title,
						description: val.description,
						release_year: val.release_year,
					};
				}),
			});
		} else {
			return res.send({
				message: "Actor not found",
			});
		}
	} catch (err) {
		return res.send(err);
	}
});
module.exports = router;
