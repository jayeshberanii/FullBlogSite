const express=require('express')
const app=express()
const dotenv=require('dotenv')
const coockie=require('cookie-parser')
const cors=require('cors')
const session=require('express-session')
dotenv.config()
require('./DBconn/conn')
app.use(session({
    secret:process.env.SECRET_KEY,
    resave:true,
    saveUninitialized:true,
    cookie:{
        secure:true,
        maxAge:300000
    }
}))
app.use(express.json())
app.use(cors())
app.use(coockie())
app.use(express.urlencoded({extended:true}))

app.use('/api/users',require('./routes/userRoute'))
app.use('/api/todos',require('./routes/todoRoute'))

app.listen(process.env.PORT,()=>{
    console.log("server is successfully run on ",process.env.PORT);
})