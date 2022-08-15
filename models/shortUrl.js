const mongoose = require('mongoose')
const { Schema } = mongoose;
const shortId = require('shortId')

const strReq = {
    type: String,
    required: true
}

const shortUrlSchema = new mongoose.Schema({
    full: strReq,
    short: {
        type: String,
        required: true,
        default: shortId.generate
    },
    clicks: {
        type: String,
        required: true,
        default: 0
    }
});

module.exports = mongoose.model('shortUrl', shortUrlSchema)