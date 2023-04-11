const Passport = require('passport')
const Strategy = require('passport-google-oauth20').Strategy
const User = require('../models/userModel')
const cors=require('cors')
Passport.use(cors())

Passport.use(new Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
    origin: "http://localhost:3000" 
}, async (accessToken, refreshToken, profile, done) => {
    const exists = await User.findOne({ email: profile.emails[0].value })
    if (exists) {
        done(null, exists)
    } else {
        const newUser = new User({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value
        })
        await newUser.save().then(res => done(null, res)).catch(err => done(err))
    }
}))

Passport.serializeUser((user, done) => {
    console.log("passport serialized");
    done(null, user.id);
})

Passport.deserializeUser((id, done) => {
    console.log("passport deserialized");
    User.findById(id).then(res => done(null, res)).catch(err => done(err))
});

module.exports = Passport