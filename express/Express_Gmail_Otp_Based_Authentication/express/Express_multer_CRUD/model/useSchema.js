const mongoose=require('mongoose')

// structure oof your document
const useSchema=new mongoose.Schema({
    "name":String,
    "email":String,
    "password":String

})

// .define model- we need to create a model if.e blueprint of a schema

// we are creating collection for this schema
// export it

module.exports=mongoose.model("user",useSchema)