const express = require('express')
const Routes = express.Router();
const User = require('../Modals/UserSchema');
const bcrypt = require('bcrypt')

Routes.post('/signup',async(req,res)=>{
    const email = req.body.email ;
    const password = req.body.password ;
    const name = req.body.name ;
   const AUser = await User.findOne({ email: email });
   if(AUser){
       return res.status(400).json({ message: "User already exists" });
   }
   const saltRounds = 10;
   const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = new User({
         name: name,
         email: email,
         password: hashedPassword,
    });
    try {
        await user.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error: error.message });
    }
})

Routes.post('/login',async(req,res)=>{
    if(!req.body.email || !req.body.password){
        return res.status(400).json({ message: "Email and password are required" });
    }

    const email = req.body.email ;
    const password = req.body.password ;
   const AUser = await User.findOne({ email: email });
    if(!AUser){
         return res.status(400).json({ message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password,AUser.password);
    if(!isMatch){
        return res.status(400).json({ message: "Invalid password" });
    } 
    res.status(200).json({ message: "Login successful", user: AUser });

})

module.exports = Routes;