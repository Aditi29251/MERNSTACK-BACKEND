const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({

    "productName":{
        type:String,
        require:true,

    },
    "productPrice":Number,
    "productQuantity":Number,
    "productInStock":Boolean,
    "crateAt":{
        type:Date,
        default:Date.now()
    }
})

// export and create model
module.exports=mongoose.model('product',productSchema)