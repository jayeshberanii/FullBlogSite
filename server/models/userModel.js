const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
fname:{
    type:String,
    require:true
},
lname:{
    type:String,
    require:true
},
email:{
    type:String,
    require:true,
    unique:true
},
password:{
    type:String,
    require:true
},
userType:{
    type:String,
    default:"user"
}
},{timestamps:true})

const User= mongoose.model('users',userSchema)
module.exports=User