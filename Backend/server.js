const express = require('express')
const jwt = require("jsonwebtoken")
const bodyParser = require('body-parser');
const e = require('express');
const secretykey = "rahul@321"
const url = 'mongodb://localhost/AlienDBex'
const mongoose = require('mongoose')
const sigin = require('../modules')
const note = require('../module-note')
var cors = require('cors')

const app = express();

mongoose.connect(url, { useNewUrlParser: true })
const con = mongoose.connection

con.on('open', () => {
    console.log("Mongoose Database is connected....")
})

app.use(bodyParser.json())
app.use(cors())

app.get('/:email/getData', (req, res) => {
    console.log(req.body)

    // const { username, password } = req.body

    sigin.find({ email: req.params.email }, function (err, user) {
        if (err) {
            console.log("err", err)
            res.status(500).send("" + err);
        }
        else {
            // console.log(user)
            user.forEach(element => {
                
                res.status(200).send(element)
                console.log("#####################")
                console.log(element)
                console.log("#####################")
            });


        }
    })
})

app.post('/note', (req,res)=>{
    console.log("//////////////");
    console.log(req.body);
    console.log("//////////////");

    const noteUser = new note({
        note: req.body.note
    })
    noteUser.save()
    .then(data=>res.json(data))
    .catch(error=>res.json(error))
})


app.post('/reg', (request, response) => {

    const signUpUser = new sigin({
        fullName: request.body.fullName,
        username: request.body.username,
        email: request.body.email,
        password: request.body.password
    })

    signUpUser.save()
        .then(data => {
            response.json(data)
        })
        .catch(error => {
            response.json(error)
        })
})

app.post('/login', (req, res) => {
    console.log(req.body)

    // const { username, password } = req.body

    sigin.find({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log("err", err)
            res.status(500).send("" + err);
        }
        console.log("*********************************")
        console.log(user.length)
        console.log(user)
        console.log(req.body)
        console.log("*********************************")
        if (user.length === 0) {
            res.status(404).send("User is not registered");
            console.log("user is not registered");
        }
        else {
            // console.log(user)
            user.forEach(element => {
                if (element.password === req.body.password) {
                    email = req.body.email;
                    
                    // sigin.find({email} ,(err,user)=>{
                    //     if(err){
                    //         console.log("error")
                    //     }else{
                    //         // console.log("Hi")
                    //         // res.status(200).send(user)
                    //         console.log(user)
                    //     }
                    // } )

                    // jwt.sign({ user }, secretykey, (err, token) => {
                    //     if (err) {
                    //         res.sendStatus(403)
                    //     } else {
                    //         res.json({
                    //             user
                    //         })
                    //     }
                    // })
                    res.status(200).send(element)
                    console.log("logged in successfully")

                }
                else {
                    res.status(403).send("Incorrect Username or Password")
                    // res.status(404).send("wrong password");
                    // console.log("wrong password");
                }
            });


        }
    })
})

function verifyToken(req, res , next){
    // Get auth header value
    const bearerHeader = req.headers['authorization']

    // FORMAT OF TOKEN
    // authorization : Bearer <token>

    if(typeof bearerHeader !== 'undefined'){
        // split by space & save token & req the token & next
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();

    }else{
        res.sendStatus(403);
    }

}



app.post('/login/post' , verifyToken, (req,res)=>{
    jwt.verify(req.token , secretykey , (err, user)=>{
        if(err){
            res.sendStatus(403);
        }else{
            res.json({
            message:"Post created...",
            user
    })
        }
    })
})

app.listen(5000, (req, res) => {
    console.log("server is running on 5000");
})



// "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoicmFodWwiLCJhZ2UiOjIyfSwiaWF0IjoxNjIyNTYzNTc5fQ.NVNSMLJg0ycEyGKE4wfb2gECzf0iRP7rEgDdXH2n6oo"