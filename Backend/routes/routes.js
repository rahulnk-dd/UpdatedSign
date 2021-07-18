const express = require('express')
const router = express.Router()
const jwt = require("jsonwebtoken")
const e = require('express');
const secretykey = "rahul@321"
const sigin = require('../modules/modules')
const note = require('../modules/module-note')

router.get('/:email/getData', (req, res) => {
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

router.post('/note', (req,res)=>{
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


router.post('/reg', (request, response) => {

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

router.post('/login', (req, res) => {
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



router.post('/login/post' , verifyToken, (req,res)=>{
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

module.exports = router