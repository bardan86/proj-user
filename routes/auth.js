const express = require("express")
const router = express.Router()
const asynchandler = require("express-async-handler")
const {User, userValidation} = require("../models/User")
const bcrypt = require('bcrypt');


router.post("/register" , asynchandler(async(req , res)=>{
    const {error} = userValidation(req.body)
    if (error){
        return res.status(400).json({message : error.details[0].message})
    }
    try {
        let user = await  User.findOne({email:req.body.email })
    if (user) {return res.status(400).send("user already exist")}
    const salt = await bcrypt.genSalt(10)
    req.body.password = await bcrypt.hash(req.body.password , salt)
    user = new User (req.body)
    
    const result = await user.save()
    // const {password , ...other} = result._doc
    res.status(201).send(user)
    } catch (err) {
        res.status(500).send(err)
    }
    
}))

module.exports = router