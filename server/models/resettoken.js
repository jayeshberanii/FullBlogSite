const mongoose=require('mongoose')

const resettokenSchema = new mongoose.Schema({
    token: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    expiryDate: Date,
});

const ResetToken=new mongoose.model('ResetToken',resettokenSchema)
module.exports=ResetToken