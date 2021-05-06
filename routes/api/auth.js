const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require('express-validator');


const User = require("../../models/User");


// @route GET api/auth
// @desc  Test route
// @access Public
router.get("/" , auth , async (req , res) => {// middleware added
    
    try {
        
        const user = await User.findById(req.user.id).select("-password");
        
        res.json(user);

        
    } catch (err) {
        console.error(err);
        res.status(500).send("server error");
        
    }
})



// @route POST api/auth
// @desc  Authenticate user and get token
// @access Public
router.post("/" ,
[
check('email' , "Please include a valid email").isEmail() ,//checks if it is a email
check('password' , "Password is required").exists() 
], // checks for length of password
async (req , res) => {


   const errors = validationResult(req);
   if(!errors.isEmpty()){// it has errors
    return res.status(400).json({errors : errors.array()});
   }

   
    //destructuring req.body.whatweneed
    const { email , password} = req.body;


   try{
       //first check if user exists
       let user = await User.findOne({email : email});

       if(!user){// if user exits then it is a bad request
        return res.status(400).json({errors : [{msg : "Invalid Credentials"}]});
       }

       const isMatch = await bcrypt.compare(password , user.password );

       if(!isMatch){//supplying same error message so as to avoid breaches (like they do not know if username is correct or not)
        return res.status(400).json({errors : [{msg : "Invalid Credentials"}]});
       }

     

       //JWT tokens

       const payload = {// sending this payload to jwt
        user :{
            id : user.id // here we are taking the id of user instance
           //because of mongoose abstraction _id can be called as id
        }
           
       }

       jwt.sign(payload , config.get('jsonTokenSecret') ,
        { expiresIn : 360000} ,
        (err , token) => {
            if(err) throw err;

            res.json({token});
        }) 
    

       

   }catch(err){
       console.error(err.message);
      res.status(500).send("server error");// the problem is here 
   }
    
})

module.exports = router ; 