const express = require('express')
const session = require('express-session')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const coockie=require('cookie-parser')
const Passport=require('./Auth/Passport')
const cors=require('cors')


require('./DBconn/conn')
app.use(session({
    secret:process.env.SECRET_KEY,
    resave:true,
    saveUninitialized:true,
    cookie:{
        secure:false,
        maxAge:300000
    }
}))
app.use(express.json())
app.use(cors())
app.use(coockie())
app.use(express.urlencoded({extended:true}))

app.use(Passport.initialize());
app.use(Passport.session());

// app.get('/auth/google', Passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
    Passport.authenticate('google', { 
        failureRedirect: '/login' ,
        successRedirect:'/'
    })
);


app.use('/api/users', require('./routes/userRoute'))
app.use('/api/todos', require('./routes/todoRoute'))
app.use('/auth', require('./routes/signgoogle'))

app.listen(process.env.PORT, () => {
    console.log("server is successfully run on ", process.env.PORT);
})
