const express = require("express");
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");


const User = require("../../models/User");


// @route POST api/users
// @desc  Register User
// @access Public
router.post("/" ,
[
check('name').notEmpty(),//Adds a validator to check if a value is not empty
check('email' , "Please include a valid email").isEmail() ,//checks if it is a email
check('password' , "Please include password of length >= 6").isLength({min : 6}) 
], // checks for length of password
async (req , res) => {


   const errors = validationResult(req);
   if(!errors.isEmpty()){// it has errors
    return res.status(400).json({errors : errors.array()});
   }

   
    //destructuring req.body.whatweneed
    const {name , email , password} = req.body;


   try{
       //first check if user exists
       let user = await User.findOne({email : email});

       if(user){// if user exits then it is a bad request
        return res.status(400).json({errors : [{msg : "User already exits"}]});
       }

       const avatar = gravatar.url(email , {
           s : "200",
           r : "pg",
           d : "mm"
       })

       user = new User({ // creating new instance by passing these attributes
           name ,
           email ,
           avatar ,
           password
       })

       const salt = await bcrypt.genSalt(10);

       user.password = await bcrypt.hash(password , salt);

       await user.save();

       res.send("User Registered");

   }catch(err){
       console.error(err.message);
      res.status(500).send("server error");// the problem is here 
   }
    
})

module.exports = router ; 