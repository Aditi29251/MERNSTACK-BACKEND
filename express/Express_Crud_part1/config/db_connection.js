const mongoose=require('mongoose')


// option 1
// const connection=mongoose.connect('mongodb://localhost:27017/Sample_db')

// .then(()=>{console.log("Db connection done")})
// .catch((err)=>{console.log("Db connection failed",err)})


//mordern way

const connection = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/Sample_data');
            console.log("Db connect successfully");

            // readyState

            console.log(mongoose.connection.readyState)

    } catch (err) {
        console.log("Db connection failed", err);
         console.log(mongoose.connection.readyState)
    }
};

connection()
module.exports=connection