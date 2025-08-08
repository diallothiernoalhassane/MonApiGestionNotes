const mongoose = require('mongoose');
require('dotenv').config()

async function connecterDb(){
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        return console.log('Connxion réussie avec mongodb !');
    } catch (err) {
        return console.log("Erreur de connexion avec mongodb !", err);
    }
}

module.exports = connecterDb;
