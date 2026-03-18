const mongoose=require('mongoose')
const connection=async()=>{
    try{
       await mongoose.connect('mongodb://localhost:27017/Sample_data')
        console.log("Db connection done")
        console.log(mongoose.connection.readyState)    
    }catch(err)
    {
        console.log("Db connectionv failed",err)
    }

}
    connection()

module.exports=connection