const mongoose = require('mongoose');
const UrlSchema = mongoose.Schema(
    {
        urlId: {
            type: String
        },

        url: {
            type: String
        },

        shortUrl: {
            type: String
        }
    },
    {
        timestamp: true
    }

);

const Url = mongoose.model('Url', UrlSchema);

module.exports =  Url;