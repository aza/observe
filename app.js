var passport = require('passport')
  , OAuth2Strategy = require('passport-oauth').OAuth2Strategy
  , express = require('express')


var app = express();


passport.use('provider', new OAuth2Strategy({
    authorizationURL: 'https://jawbone.com/auth/oauth2/auth',
    tokenURL: 'https://jawbone.com/auth/oauth2/token',
    clientID: 'jHFl1awD4ak',
    clientSecret: '079e14b4939bbc00b7a6108486b5d2dc2db6aace',
    callbackURL: 'https://shielded-woodland-3199.herokuapp.com/auth/provider/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    console.log('authed!', accessToken, profile, done)
  }
));

// Redirect the user to the OAuth 2.0 provider for authentication.  When
// complete, the provider will redirect the user back to the application at
//     /auth/provider/callback
app.get('/auth/provider', passport.authenticate('provider', {
  scope: ['basic_read', 'extended_read', 'location_read', 'mood_read', 'move_read', 'sleep_read', 'meal_read', 'generic_event_read', 'generic_event_write']
}));

// The OAuth 2.0 provider has redirected the user back to the application.
// Finish the authentication process by attempting to obtain an access
// token.  If authorization was granted, the user will be logged in.
// Otherwise, authentication has failed.
app.get('/auth/provider/callback', 
  passport.authenticate('provider', { successRedirect: '/',
                                      failureRedirect: '/login' }),
  function(req, res){
    res.json( req.user )

  }
);

app.get('/', function(req, res){
  res.send('Hi! <a href="auth/provider">Login</a>')
})

app.get('/hi', function(req, res){
  res.send('Hi! <a href="auth/provider">Login</a>')
})

var port = Number(process.env.PORT || 5000);
var server = app.listen(port, function() {
    console.log('Listening on port %d', server.address().port);
});