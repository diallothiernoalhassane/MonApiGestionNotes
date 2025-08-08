const mongoose = require('mongoose');
const { type } = require('../validateurs/userValidateur');

const noteModel= new mongoose.Schema({
    matiere:{
        type:String,
        required:true
    },
    note:{
        type:Number,
        required:true
    },
    dateNote:{
        type:Date,
        default:Date.now
    },
    fichier:{
        type:String
    }
})

module.exports = mongoose.model('Notes',noteModel);
