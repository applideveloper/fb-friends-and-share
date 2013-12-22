var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OfferSchema = new Schema({
    username: {type: String},
    details : {
        name: {type: String},
        description: {type: String}
    }
});

module.exports = mongoose.model('Offer', OfferSchema);