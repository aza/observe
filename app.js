var passport = require('passport')
  , OAuth2Strategy = require('passport-oauth').OAuth2Strategy
  , express = require('express')


var app = express();

/*
passport.use('provider', new OAuth2Strategy({
    authorizationURL: 'https://jawbone.com/auth/oauth2/auth',
    tokenURL: 'https://jawbone.com/auth/oauth2/token',
    clientID: 'jHFl1awD4ak',
    clientSecret: '079e14b4939bbc00b7a6108486b5d2dc2db6aace',
    callbackURL: 'https://127.0.0.1:3000/auth/provider/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    console.log('authed!', accessToken)
  }
));

// Redirect the user to the OAuth 2.0 provider for authentication.  When
// complete, the provider will redirect the user back to the application at
//     /auth/provider/callback
app.get('/auth/provider', passport.authenticate('provider'));

// The OAuth 2.0 provider has redirected the user back to the application.
// Finish the authentication process by attempting to obtain an access
// token.  If authorization was granted, the user will be logged in.
// Otherwise, authentication has failed.
app.get('/auth/provider/callback', 
  passport.authenticate('provider', { successRedirect: '/',
                                      failureRedirect: '/login' }));
*/
app.get('/', function(req, res){
  res.send('Hi! <a href="auth/provider">Login</a>')
})

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});