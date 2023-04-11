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
pic:{
    type:String,
    default:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYL0P24lyWNtnwKoAaMhbpaDUctiDXj_ttlg&usqp=CAU'
},
userType:{
    type:String,
    default:"user"
},
refreshToken:{
    type:String
}
},{timestamps:true})

const User= mongoose.model('users',userSchema)
module.exports=User