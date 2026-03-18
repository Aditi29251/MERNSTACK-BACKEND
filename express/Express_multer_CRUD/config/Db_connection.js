// mongodb sconnection code
const mongoose=require('mongoose')
const connection=mongoose.connect('mongodb://localhost:27017/')
.then(()=>{
    console.log("Db connection successfully")
}).catch((err)=>{
    console.log("Db connection fail",err)
})

module.exports=connection