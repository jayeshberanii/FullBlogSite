const passport=require('passport')
const Strategy=require('passport-google-oauth20')
const User = require('../models/userModel')

passport.use(new Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
},async(accessToken, refreshToken, profile, done)=>{
    const exists=await User.findOne({googleId:profile.id})
    if(exists){
        done(null,exists)
    }else{
        const newUser=new User({
            googleId:profile.id,
            displayName:profile.displayName,
            email:profile.emails[0].value
        })
    }
}))