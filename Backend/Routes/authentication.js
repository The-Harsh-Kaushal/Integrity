const express = require('express')
const Routes = express.Router();
const User = require('../Modals/UserSchema');
const bcrypt = require('bcrypt')
const {LogMidware,SigMidware } = require('../Middleware/Auth');

Routes.post('/signup',SigMidware,async(req,res)=>{
    
})

Routes.post('/login',LogMidware,async(req,res)=>{

    const {user} = res.user;
    res.status(200).json({ message: "Login successful", user: user });

})

module.exports = Routes;