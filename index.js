//Required Modules:
const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const finnhub = require('finnhub');
const https = require('https');
var axios = require("axios").default;




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


app.post('/get-prices', (req, res) => {

    var symbolString = req.body.symbolString;

    var options = {
  method: 'GET',
  url: 'https://yh-finance.p.rapidapi.com/market/v2/get-quotes',
  params: {region: 'US', symbols: `${symbolString}`},
  headers: {
    'X-RapidAPI-Host': 'yh-finance.p.rapidapi.com',
    'X-RapidAPI-Key': '7524583ebfmsh48d81ae8e516f24p181178jsn64c9e2150d68'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
    res.send(response.data);
}).catch(function (error) {
	console.error(error);
});

});


app.post('/get-history-name', (req, res) => {

        var name = req.body.name;
        Company.findOne({Name: name}).then((result) => {
            var symbol = result.Symbol;

            var options = {
            method: 'GET',
            url: 'https://alpha-vantage.p.rapidapi.com/query',
            params: {symbol: `${symbol}`, function: 'TIME_SERIES_MONTHLY', datatype: 'json'},
            headers: {
                'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com',
                'X-RapidAPI-Key': '7524583ebfmsh48d81ae8e516f24p181178jsn64c9e2150d68'
            }
            };

            axios.request(options).then(function (response) {
                console.log(response.data);
                res.send(response.data);
            }).catch(function (error) {
                console.error(error);
            });
        }).catch((error) => {
            console.log(error.message)
        })

});


app.post('/get-history-symbol', (req, res) => {

            var symbol = req.body.symbol;

            var options = {
            method: 'GET',
            url: 'https://alpha-vantage.p.rapidapi.com/query',
            params: {symbol: `${symbol}`, function: 'TIME_SERIES_MONTHLY', datatype: 'json'},
            headers: {
                'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com',
                'X-RapidAPI-Key': '7524583ebfmsh48d81ae8e516f24p181178jsn64c9e2150d68'
            }
            };

            axios.request(options).then(function (response) {
                console.log(response.data);
                res.send(response.data);
            }).catch(function (error) {
                console.error(error);
            });
});


app.post('/get-stock-price-symbol', (req, res) => {
    const symbol = req.body.symbol;

    var options = {
        method: 'GET',
        url: 'https://alpha-vantage.p.rapidapi.com/query',
        params: {function: 'GLOBAL_QUOTE', symbol: `${symbol}`, datatype: 'json'},
        headers: {
            'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com',
            'X-RapidAPI-Key': '7524583ebfmsh48d81ae8e516f24p181178jsn64c9e2150d68'
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
        res.send(response.data);
    }).catch(function (error) {
        console.error(error);
    });
});


app.get("/market-status", (req, res) => {
    
    const options = {
        method: 'GET',
        url: 'https://financialmodelingprep.com/api/v3/is-the-market-open',
        params: {apikey: '7d19b4dfb47f3efa815fb69544973395'},
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
        res.send(response.data);
    }).catch(function (error) {
        console.error(error);
    });
})

