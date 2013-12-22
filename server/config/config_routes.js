var mongoose = require('mongoose');
var passport = require('passport');
var userglobal;
module.exports = function(app) {


var userAccessToken;

(function authentication_routes() {
	
	app.get('/api/v1/auth/facebook',passport.authenticate('facebook', {
  scope: [ 'email'],
  failureRedirect: '/'
}), function(req,res) {});

    app.get('/api/v1/auth/facebook/callback',
     passport.authenticate('facebook', { failureRedirect: '/login' }),
     function(req, res) {
     // Successful authentication, redirect home.
     userglobal = req.user;
     res.send(200,{status:'success', user: userglobal});
     res.redirect('http://localhost:3000/logged_in.html');
     });

})();

(function handle_defaults() {
	app.use(function (req,res){
		res.end('404 - Page not found');
	});
})();
};