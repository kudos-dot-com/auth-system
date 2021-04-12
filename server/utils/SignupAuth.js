const router=require("express").Router();
const mongoose=require('mongoose');
const User=mongoose.model("User");
const bcrypt=require('bcryptjs');

const uservalidation=(user,role,res)=>{
const {email,
    password,
    name, 
    dob,
    number,
    state,
    country,
    pin,
    residence,
    city} = user;

if(!email || !password)
{
    res.status(422).json({err:"incomplete fields"});
}
User.findOne({email:email})
.then(getuser=>{
    if(getuser)
    {
        return res.status(422).json({err:"user already exist"});
    }
    bcrypt.hash(password,12)
    .then(hashed=>{
        const user=new User({
            email,
            password:hashed,
            name,
            dob,
            number,
            state,
            country,
            pin,
            residence,
            city,
            role
        })
        user.save()
        .then(response=>{
            res.json({success:"you are successfully registered"});
        })
        .catch(err=>{
            res.json({err:err})
        })
    })
    .catch(err=>{
        res.json({err:err})
    })
   
})
.catch(err=>{
    res.json({err:err})
})
}

module.exports={
    uservalidation
};