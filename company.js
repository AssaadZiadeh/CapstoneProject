const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create an schema
 const companySchema = Schema({
    Symbol: String,
    Name: String
});

const CompanyModel = mongoose.model("Company",companySchema);

module.exports = CompanyModel;
