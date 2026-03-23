const mongoose=require('mongo"createdAt":{
        type:Date,
        default:Date.now()
    }ose')
const userSchema=new mongoose.Schema({

    "userName":{
    type:String,
    unique:true,
    require:true
    },

    "userPhone":String,
    "userEmail":String,
    "userPassword":String,
    "userProfile":String,
    

})

module.exports=mongoose.model("user",userSchema)