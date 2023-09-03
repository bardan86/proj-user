const express = require("express")
const router = express.Router()
const asynchandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const {User, userValidation,validateUpdateUser} = require("../models/User")


/**
 * @desc Get all Users
 * @route /users
 * @method get
 * @access Public
 */
router.get("/users" ,asynchandler( async (req , res)=>{
    try {
        const users =await User.find()
        res.status(200).send(users)
    } catch (err) {
        res.status(400).send(" error has been found" , err)
    }
    

    
}))

/**
 * @desc get user by id 
 * @route /user/:id
 * @method Get
 * @access Public
 */
router.get("/users/:id" , asynchandler(async(req , res)=>{

    const user = await User.findById(req.params.id)
    if(!user){return res.status(404).send("no user found")}
    res.status(200).send(user)
}))

/**
 * @desc update User by id
 * @route /users/id
 * @method patch
 * @access Public
 */
router.patch("/users/:id" , asynchandler (async(req,res)=>{
      
    const {error} = validateUpdateUser(req.body)
    if(error){
        return res.status(400).json({messsage:error.details[0].message})
    }

  try {
    
    const arrobj = Object.keys(req.body)
    

    if (req.body.password){
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password, salt)
    }
   
    const user = await User.findById(req.params.id)
    if(!user){
        return res.status(404).send('No user is found')
    }
arrobj.forEach((ele) => (user[ele] = req.body[ele]))

await user.save()

    res.status(200).send(user)
    } catch (err) {
        res.status(500).send(err)
        console.log(err)
    }
}))

/**
 * @desc delete by id 
 * @route /users/:id
 * @method Delete
 * @access Public
 */
router.delete("/users/:id" , asynchandler(async(req,res)=>{
    try {
        const user = await User.findByIdAndDelete(req.params.id)
    if(!user){return res.status(404).send("no user found")}
    res.status(200).send("user deleted")
    } catch (err) {
        res.status(500).send(err)
    }
    
}))

module.exports = router