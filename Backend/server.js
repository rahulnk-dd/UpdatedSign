const express = require('express')
const bodyParser = require('body-parser');
const url = 'mongodb://localhost/AlienDBex'
const mongoose = require('mongoose')
const routesUrls = require('./routes/routes')
var cors = require('cors')
const app = express();

mongoose.connect(url, { useNewUrlParser: true })
const con = mongoose.connection

con.on('open', () => {
    console.log("Mongoose Database is connected....")
})

app.use(bodyParser.json())
app.use(cors())
app.use('/app', routesUrls)


app.listen(5000, (req, res) => {
    console.log("server is running on 5000");
})



// "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoicmFodWwiLCJhZ2UiOjIyfSwiaWF0IjoxNjIyNTYzNTc5fQ.NVNSMLJg0ycEyGKE4wfb2gECzf0iRP7rEgDdXH2n6oo"