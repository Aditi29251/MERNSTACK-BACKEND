const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({

    userName: String,
    userEmail: String,
    userPass: String,
    userProfile: String,

    createdAt:{
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('user', profileSchema)