const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../keys');
const User = require("../models/User");

module.exports = (req, res, next) => {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');

     const authorization = req.headers.cookie;
     if(!authorization){
         return res.status(401).json({error:"you are not authorized"});
     }
    
    const token = authorization.replace("Brearer=", "");
    jwt.verify(token, JWT_SECRET, async(err, payload) => {
        if(err){
            return res.status(401).json({error:"you are not authorized"})
        }
        const {_id} = payload;
        await User.findById(_id).then(userdata => {
            req.user = userdata;
        })
        next();
    })
}