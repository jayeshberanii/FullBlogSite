const route=require('express').Router()
const Passport=require('../Auth/Passport')

route.get('/google', Passport.authenticate('google', { scope: ['profile', 'email'] }));

route.get('/google/callback',
    Passport.authenticate('google', { 
        failureRedirect: '/login' ,
        successRedirect:'/'
    })
);
module.exports=route