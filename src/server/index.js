const express = require('express');
const mongoose = require('mongoose');
const BusinessModel = require('./models/Business');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/sharkdb', 
    {
        useNewUrlParser: true, useUnifiedTopology: true
    })
    .then(() => console.log("connection successful"))
    .catch((err) => console.log(err));

//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/episode', (req, res) => {
    // searching for letter 'A' returns multiple
    BusinessModel.find( { title: new RegExp(req.query.title, "i") }, 'title description season episode shark1 shark2 shark3 shark4 shark5 coords website askedFor exchangeForStake location category deal entrepreneurs image', function (err, business) {
      if (err) return handleError(err);
      res.send(business);
    })
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));