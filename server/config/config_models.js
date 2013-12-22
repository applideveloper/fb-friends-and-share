var mongoose = require('mongoose');
// this file relates the models to the App, as this file is 'require'd in app.js
var Schema = mongoose.Schema;

module.exports = function() {
	var offer = require('../models/offers');
	var user= require('../models/user');

};