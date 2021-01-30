const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const { moviesRouter, actorsRouter } = require('./router')

const port = 2000

app.use(cors())
app.use(bodyParser())

app.get("/", (req, res) => {
    res.status(200).send('<h1>EXPRESS API<h1/>')
})

app.use('/movies', moviesRouter)
app.use('/actors', actorsRouter)

app.listen(port, () => console.log(`API active at port ${port}`))