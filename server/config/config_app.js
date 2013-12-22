var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var FacebookStrategy=require('passport-facebook').Strategy;
var settings = require('./settings');
var cr = require('./config_routes');
var fb_app_details = {
    app_ID: '250508195115155',                
    app_Secret: '035942c929d650baeaab6f574be78a6f',
    yourCallbackURL: '/api/v1/auth/facebook/callback'
}
module.exports = function(app) {
	app.configure(function() {		
		app.use(express.logger('dev'));
		app.use(express.bodyParser());
		app.use(express.cookieParser('some secret'));
		app.use(express.session());
		app.use(express.methodOverride());
	    app.use(passport.initialize());
        app.use(passport.session());
		app.use(express.static(__dirname + '/../../client/'));
	    app.use(app.router);
		app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
		 passport.use(new FacebookStrategy({
         clientID: fb_app_details.app_ID,
         clientSecret: fb_app_details.app_Secret,
         callbackURL: fb_app_details.yourCallbackURL
        },
        function(accessToken, refreshToken, profile, done) {
         var User = mongoose.model('User');
         console.log("We are storing the token now!!");
         cr.userAccessToken = accessToken;
         console.log("The access token is:-"); 
         console.log(accessToken);
         User.findOne({ 'facebook.id': profile.id }, function (err, user) {
         if (err) { return done(err) }
         if (!user) {
         user = new User({
         name: profile.displayName,
         email: profile.emails[0].value,
         username: profile.username,
         provider: 'facebook',
         facebook: profile._json
         })
         user.save(function (err) {
         if (err) console.log(err)
         return done(err, user)
         })
         }
         else { 
         return done(err, user)
         }
         })
        }
        ))
    //serializeUser and deserializeUser are there for storing the obtained user in MongoDB database
    passport.serializeUser(function(user, done) {
        done(null, user.id)
    });

    passport.deserializeUser(function(id, done) {
        var User = mongoose.model('User');
        User.findOne({ _id: id }, function (err, user) {
         done(err, user)
        })	//User.findOne ends
	});  //passport.deserializeUser ends


})   //module.exports ends

app.all("/api/*", function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "  X-Requested-With,Content-Type");
      res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
      return next();
    });	 //This code is there to prevent CORS errors. 
	
    // Connect to the database
	mongoose.connect(settings.values.db)

};