const Joi = require("joi")
const mongoose = require("mongoose")
consJOI = require("joi")
const UserSchema = new mongoose.Schema({

    username : {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:8
    },
    Image:{
        type:String,
        
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})


function userValidation (obj){
const Schema = Joi.object({
    username:Joi.string().alphanum().min(6).max(30).required(),
    email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password:Joi.string().pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])")).required(),
    Image:Joi.string(),
})
return Schema.validate(obj)
}

function validateUpdateUser (obj) {
    const schema = Joi.object({
        email:Joi.string().trim().min(5).max(100).email(),
        username:Joi.string().trim().min(3).max(100),
        password:Joi.string().trim().min(6),
        Image:Joi.string(),
    })
    return schema.validate(obj)
}

UserSchema.methods.toJSON = function (){
    const user = this
    const userObjest = user.toObject() /// from json to object
    delete userObjest.password
    // delete userObjest.tokens
    return userObjest
    }
    // User model
const User = mongoose.model("User" , UserSchema)

module.exports = {
    User,
    userValidation,
    validateUpdateUser
} 