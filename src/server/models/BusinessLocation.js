const mongoose = require('mongoose');

const BusinessLocationSchema = new mongoose.Schema({
    loc: {
        type: { type: String },
        coordinates: []
    }
});

BusinessLocationSchema.index({ loc: "2dsphere" });

const BusinessLocation = mongoose.model('BusinessLocation', BusinessLocationSchema);
module.exports = BusinessLocation;