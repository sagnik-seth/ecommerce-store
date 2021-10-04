const User = require('../models/user')
const { check, validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

exports.signup = (req,res) => {
    const user = new User(req.body)
    user.save((err, user)=> {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return res.status(422).json({
            error: errors.array()[0].msg
          });
        }
      
        if(err){
           return res.status(400).json({
               err: "Not able to save the user in DB"
           })
        }
        res.json({
            user:user.name,
            email:user.email,
            id:user._id
        })
    })
}
exports.signin=(req,res) => {
    const errors = validationResult(req);
    const {email, password} = req.body
    if (!errors.isEmpty()) {
        return res.status(422).json({
          error: errors.array()[0].msg
        });
      }
    User.findOne({email}, (err, user) => {
        if (err || !user){
            res.status(400).json({
            error: "User Email does not exist"
        })
      }
      if(!user.autheeticate(password)){
          return res.status(401).json({
              error: "Email and password do not match"
          })
      }
      //token created
    const token = jwt.sign({_id: user._id}, "shhh")
    //put token in cookie
    res.cookie("token",token,{expire:new Date() + 9999})
    //send res to front end
    const {_id, name, email,role} = user;
    return res.json({token, user: {_id, name, email, role}})
    })
}
exports.signout = (req,res) => {
    res.json({
        message: "User signout"
    });
}