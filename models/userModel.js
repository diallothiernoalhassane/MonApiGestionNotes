const mongoose = require('mongoose');

// Le schema d'utilisateur:

const userSchema = mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique:true,
        match: /.+@.+\..+/
    },
    passWord:{
        type:String,
        required:true,
        minlength:8
    }
})

// L'exportation du modele:
module.exports = mongoose.model('User',userSchema);



