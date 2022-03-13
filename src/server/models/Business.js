const mongoose = require('mongoose');

const BusinessSchema = new mongoose.Schema({
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
    location: {
        type: String,
        required: true
    },
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
    coords: {
        type: Object,
        required: true
    },
    image: {
        type: String,
        required: true
    }
},
{ 
    collection : 'sharkepisodes' 
}
);

const Business = mongoose.model('BusinessData', BusinessSchema);
module.exports = Business;