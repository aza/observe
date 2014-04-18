var passport = require('passport')
  , OAuth2Strategy = require('passport-oauth').OAuth2Strategy
  , express = require('express')
  , cookieParser = require('cookie-parser')
  , session = require('express-session')
  , api = require('./api')
  , Firebase = require('firebase')


var app = express();

app.use(passport.initialize())
app.use(cookieParser())
app.use(session({secret:'noobletrabbit', key:'sid', cookie: { secure: true }}))
app.use(express.static(__dirname + '/static'))


passport.use('provider', new OAuth2Strategy({
    authorizationURL: 'https://jawbone.com/auth/oauth2/auth',
    tokenURL: 'https://jawbone.com/auth/oauth2/token',
    clientID: 'jHFl1awD4ak',
    clientSecret: '079e14b4939bbc00b7a6108486b5d2dc2db6aace',
    callbackURL: 'https://shielded-woodland-3199.herokuapp.com/auth/provider/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    console.log('authed!', accessToken, "profile", profile )
    var user = new api.UP(accessToken)
    user.get('users/@me', function(json){
      console.log( json )
      var userRef = new Firebase('https://observe.firebaseio.com/users');
      userRef.child( json.data.xid ).child('me').set( json.data )
      userRef.child( json.data.xid ).update({token: accessToken})
    })
    done(null, {accessToken: accessToken, refreshToken: refreshToken})
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

var auth = passport.authenticate('provider', {
  successRedirect: '/success',
  failureRedirect: '/login',
  scope: ['basic_read', 'extended_read', 'location_read', 'mood_read', 'move_read', 'sleep_read', 'meal_read', 'generic_event_read', 'generic_event_write']  
})

// Redirect the user to the OAuth 2.0 provider for authentication.  When
// complete, the provider will redirect the user back to the application at
//     /auth/provider/callback
app.get('/login', auth);

// The OAuth 2.0 provider has redirected the user back to the application.
// Finish the authentication process by attempting to obtain an access
// token.  If authorization was granted, the user will be logged in.
// Otherwise, authentication has failed.
app.get('/auth/provider/callback', auth);


app.get('/', function(req, res){
  res.send('<a href="/login">Sign up</a> for nutrition coaching!')
})

app.get('/success', function(req, res){
  console.log( req )
  res.send('You have been succesfully signed up!')
})

var port = Number(process.env.PORT || 5000);
var server = app.listen(port, function() {
    console.log('Listening on port %d', server.address().port);
});