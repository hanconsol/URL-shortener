const mongoose = require('mongoose');
const randomString = require('randomized-string');

const UrlSchema = mongoose.Schema(
    {
    
        url: {
            type: String
        },

        short_url: {
            type: String,
            default: () => randomString.generate(7)
        }
    },
    {
        timestamp: true
    }

);

const Url = mongoose.model('Url', UrlSchema);

module.exports =  Url;