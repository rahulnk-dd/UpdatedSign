const mongoose = require('mongoose')

const note = new mongoose.Schema({
   
    note:{
        type: String
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('note', note)