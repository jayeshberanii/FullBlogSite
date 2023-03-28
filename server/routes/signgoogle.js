const route=require('express').Router()
const Passport=require('../Auth/Passport')

route.get('/google', Passport.authenticate('google', { scope: ['email'] }));

// route.get('/google/callback',
//     Passport.authenticate('google', { 
//         failureRedirect: '/login' ,
//         successRedirect:'http://localhost:3000/login'
//     })
// );
module.exports=route