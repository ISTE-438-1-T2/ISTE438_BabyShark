const express = require('express');
const mongoose = require('mongoose');
const BusinessModel = require('./models/Business');
var cors = require('cors');

const app = express();
const corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
var gfs;
const connect = mongoose.connect('mongodb://127.0.0.1:27017/sharkdb', 
    {
        useNewUrlParser: true, useUnifiedTopology: true
    })
    .then(() => {
        gfs = new mongoose.mongo.GridFSBucket(mongoose.connection)
    })
    .catch((error) => console.log(error));

//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/episode', async (req, res) => {
    if(req.query.title) {
        //business title search
        BusinessModel.find({$or: [{ description: new RegExp(req.query.title, "i") }, { title: new RegExp(req.query.title, "i") }]} , '_id deal description episode category entrepreneurs location website askedFor exchangeForStake valuation season shark1 shark2 shark3 shark4 shark5 title coords image comment', async function (error, results) {
            if (error) return ('cannot find title');
            try {
                if (results.length > 0) {
                    for(var i=0; i<results.length; i++) {
                        var imgfilename = results[i].title.replace('&','and') + ".jpg";
                        var imageFile = await getFileData(gfs, imgfilename);
                        results[i].file = imageFile;
                    }
                    res.send(results);
                }
            } catch(error) {
                console.log("Search Error: " + error);
            }
        });
    } else if(req.query.coords) {
        let latString = req.query.coords.split(" ").join("").split(",")[0];
        let longString = req.query.coords.split(" ").join("").split(",")[1];
		let lat = Number(latString);
		let long = Number(longString);
        console.log(lat + "_" + long);
        //coords search (finds businesses within 25 miles of search
        BusinessModel.find({
            coords: {
             $geoNear: {
              $maxDistance: 40000, 
              $geometry: {
               type: "Point",
               coordinates: [long, lat],
			   index: '2dsphere'  //probably unnecessary line but just in case
              }
             }
            }
           }).find( async (error, results) => {
			    //console.log("Hello. Error happened here.");
                console.log(error);
                if (error) return (error);
                for(var i=0; i<results.length; i++) {
            
                    var imgfilename = results[i].title.replace('&','and') + ".jpg";
                    // gfs.find({filename: imgfilename}).toArray(async (err, files) => {
                    var imageFile = await getFileData(gfs, imgfilename);
                    results[i].file = imageFile;
                        
                    // });
                }
                
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

async function getFileData(gfs, imgfilename) {
    const stream = gfs.openDownloadStreamByName(imgfilename);
    stream.read();
    return new Promise((resolve, reject) => {
     const chunks = [];
     stream.on('data', data => {
      chunks.push(data.toString('base64')); //.toString('base64'));
     });
     stream.on('end', () => {
      //const data = Buffer.concat(chunks);
      const data = chunks.join('');
  
    //   if (this._fileKey !== null) {
    //    const authTagLocation = data.length - 16;
    //    const ivLocation = data.length - 32;
    //    const authTag = data.slice(authTagLocation);
    //    const iv = data.slice(ivLocation, authTagLocation);
    //    const encrypted = data.slice(0, ivLocation);
    //    const decipher = crypto.createDecipheriv(this._algorithm, this._fileKey, iv);
    //    decipher.setAuthTag(authTag);
    //    return resolve(Buffer.concat([decipher.update(encrypted), decipher.final()]));
    //   }
  
      resolve(data);
     });
     stream.on('error', err => {
      reject(err);
     });
    });
   }