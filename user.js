const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema for the stokc
 const stockSchema = Schema({
     symbol: String,
     quantity: Number,
     purchasePrice: Number
});

// create an schema
 const userSchema = Schema({
    email: String,
    password: String,
    username: String,
    cash: Number, 
    stocks: [stockSchema]
});


const userModel = mongoose.model("User",userSchema);

module.exports = userModel;
