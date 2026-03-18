const mongoose=require('mongoose')

const sliderSchema=new mongoose.Schema({
    sliderTitle:{
        type:String,
        require:true
    },

    sliderCaption:{
        type:String,
        require:true
    },
    sliderImage:{type:[String],
        require:true
    },
    createAt:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model('carousel',sliderSchema)