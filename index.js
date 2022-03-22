//Required Modules:
const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const finnhub = require('finnhub');




//Connect with the Database: 
const mongoDB = "mongodb+srv://Leon:Lebanon10@learning.vf90l.mongodb.net/LearningDatabase?retryWrites=true&w=majority";
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true}).then((result) => {
    app.listen(PORT, () => {
        console.log(`Server listening on ${PORT}`);
    });
}).catch((error) => {
    console.log(error);
});


//MongoDB Schemas:
const Company = require('./models/company.js');
const User = require('./models/user.js');


//Connect with Stock API:
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "c8h2ccqad3i9rgv9d7cg"
const finnhubClient = new finnhub.DefaultApi()



//Initialization:
const PORT = process.env.PORT || 3001;
const app = express();
app.use(bodyParser.json());
app.use(cors());


//API Endpoints:

app.post('/search-company-name', (req, res) => {
    const val = "^"+req.body.name;
    Company.find({Name: {$regex : new RegExp(val), $options: 'i'}}).limit(10).then((result) => {
        res.send(result);
    }).catch((error) => {
        console.log(error.message)
    })
});

app.post('/search-company-symbol', (req, res) => {
    const val = "^"+req.body.symbol;
    Company.find({Symbol: {$regex: new RegExp(val), $options: 'i'}}).limit(10).then((result) => {
        res.send(result);
    }).catch((error) => {
        console.log(error.message);
    });
})

app.post('/get-current-price-symbol', (req, res) => {
    console.log(req.body.symbol);
    finnhubClient.quote(req.body.symbol, (error, data, response) => {res.send({...data, symbol: req.body.symbol})});
});

app.post('/get-current-price-name', (req, res) => {
    const companyName = req.body.name;
    Company.findOne({Name: companyName}).then((result) => {
        finnhubClient.quote(result.Symbol, (error, data, response) => {res.send({...data, symbol: result.Symbol})});
    }).catch((error) => {
        console.log(error.message)
    })
});


app.post('/get-current-price-name', (req, res) => {
    const companyName = req.body.name;
    Company.findOne({Name: companyName}).then((result) => {
        finnhubClient.quote(result.Symbol, (error, data, response) => {res.send({...data, symbol: result.Symbol})});
    }).catch((error) => {
        console.log(error.message)
    })
});

app.post('/purchase-stock', (req, res) => {

    const user = new User({
        email: 'assaad.ziade@lau.edu',
        password: 'lau@2018',
        username: 'Leon', 
        cash: 100000,
        stocks: []
    });
    user.save(function (err, user) {
      if (err) return console.error(err);
      console.log(user.username + " saved to database.");
    })
});

app.post('/purchase-existing', (req, res) => {
    const stock = {
        symbol: req.body.symbol,
        quantity: req.body.quantity,
        purchasePrice: req.body.stock.c };

    const amount = req.body.quantity*req.body.stock.c;

    User.findOneAndUpdate({username: "Leon"}, {
        $push: {stocks: stock},
        $inc: { cash: -amount } 
    }, function (error, success) {
        if (error) {
            console.log("Error");
        } else {
            console.log("Success");
        }
    });
})



//User Authentication:

app.post('/login-user', (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email, password: password}).then((result) => {
        if(result == null) {
            res.send(null);
        } else {
            res.send(result);
        }
    });
})
