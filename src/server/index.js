const express = require('express');
const mongoose = require('mongoose');
const BusinessModel = require('./models/Business');
const BusinessLocationModel = require('./models/BusinessLocation');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/sharkdb', 
    {
        useNewUrlParser: true, useUnifiedTopology: true
    })
    .then(() => console.log("connection successful"))
    .catch((error) => console.log(error));

//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/episode', (req, res) => {
    if(req.query.title) {
        //business title search
        BusinessModel.find( { title: new RegExp(req.query.title, "i") }, '_id deal description episode category entrepreneurs location website askedFor exchangeForStake valuation season shark1 shark2 shark3 shark4 shark5 title coords image comment', function (error, results) {
            if (error) return (error);
            res.send(results);
        });
    } else if(req.query.coords) {
        let lat = req.query.coords.split(" ").join("").split(",")[0];
        let long = req.query.coords.split(" ").join("").split(",")[1];
        console.log(lat + "_" + long);
        //coords search (finds businesses within 25 miles of search
        BusinessLocationModel.find({
            location: {
             $near: {
              $maxDistance: 40000,
              $geometry: {
               type: "Point",
               coordinates: [long, lat]
              }
             }
            }
           }).find((error, results) => {
                console.log(error);
                if (error) return (error);
                res.send(results);
           });
    }
});

app.put('/episode', (req, res) => {
    console.log('attempting to update entry with id: ' + req.query.id + ' with comment: ' + req.query.comment);
    BusinessModel.updateOne({_id: req.query.id}, 
        {comment: req.query.comment}, function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Updated Docs : ", docs);
        }
    });
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));