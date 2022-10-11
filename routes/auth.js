const router = require('express').Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../keys');

router.post('/login', (req, res) => {
    const {email, password} = req.body;
    User.findOne({email:email})
    .then(savedUser => {
        if(!savedUser){
            console.log("invalid email");
            return res.status(422).json({error:"invalid email or password"});
        }
        bcrypt.compare(password, savedUser.password)
        .then(match => {
            if(match){
                const token = jwt.sign({_id : savedUser._id}, JWT_SECRET);
                res.cookie("Brearer", token, {
                    httpOnly: true
                })
                if(savedUser.isadmin)
                {
                    res.redirect("/alltodo");
                }
                else{
                    res.redirect("/home");
                }
            }
            else{
                console.log("invalid password");
                return res.status(422).json({error:"invalid email or password"});
            }
        }).catch(err => {
            console.log(err);
        })
    }).catch(err => {
        console.log(err);
    })
})
router.get('/logout', (req, res) => {
    res.cookie("Brearer ", {expires: Date.now()});
    res.redirect("/");
})

module.exports = router;
