var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
	name: { type: String, default: '' },
     email: { type: String, default: '' },
     username: { type: String, default: '' },
     provider: { type: String, default: '' },
     authToken: { type: String, default: '' },
     facebook: {},
     google: {},
        });

	
module.exports = mongoose.model('User', User);