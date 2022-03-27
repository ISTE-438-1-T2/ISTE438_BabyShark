const mongoose = require('mongoose');

const BusinessSchema = new mongoose.Schema({
    _id: {
        type: mongoose.ObjectId,
        required: true
    },
    deal: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    episode: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    entrepreneurs: {
        type: String,
        required: true
    },
	//Blown up during geo query work, use script if need to add locations.
    //location: {

    //},
    website: {
        type: String,
        required: true
    },
    askedFor: {
        type: Number,
        required: true
    },
    exchangeForStake: {
        type: Number,
        required: true
    },
    valuation: {
        type: Number,
        required: true
    },
    season: {
        type: Number,
        required: true
    },
    shark1: {
        type: String,
        required: true
    },
    shark2: {
        type: String,
        required: true
    },
    shark3: {
        type: String,
        required: true
    },
    shark4: {
        type: String,
        required: true
    },
    shark5: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    'episode-season': {
        type: String,
        required: true
    },
    'Multiple Entreprenuers': {
        type: Boolean,
        required: true
    },
	//Old coords, in case we need it for some reason
    //coords: {
        //type: Object,
        //required: true
    //},
	coords: {
		type: { type: String, default: "Point" },
		coordinates: [],
	},
    image: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: false
    },
    file: {
        type: String,
        required: true
    }
},


{ 
    collection : 'sharkepisodes' 
}
);


//moving index to here instead of new schema
BusinessSchema.index({ coords: "2dsphere"});

const Business = mongoose.model('BusinessData', BusinessSchema);
module.exports = Business;