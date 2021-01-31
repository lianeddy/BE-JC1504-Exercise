const app = require("express")();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 2000;

const { actorRouter, filmRouter } = require("./router");

app.use(bodyParser());
app.use(cors());

app.get("/", (req, res) => {
	res.status(200).send("<h1>Express API</h1>");
});

app.use("/actor", actorRouter);
app.use("/film", filmRouter);

app.listen(port, () => console.log(`API active at port ${port}`));
