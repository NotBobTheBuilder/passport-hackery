var express   = require('express'),
    app       = express(),
    passport  = require('passport'),
      Google  = require('passport-google').Strategy;

app.use(passport.initialize());

passport.use(new Google({
    'returnURL': 'http://192.168.0.10:2000/',
    'realm': 'http://192.168.0.10:2000'
  },
  function(identifier, profile, done) {
    done(null, {id: identifier, profile: profile});
  }
));

var auth = passport.authenticate('google', {
  'session': false,
  'failureRedirect': '/bacon'
});

app.get('/', auth, function(req, res) {
  res.json(200, req.user);
});

app.listen(2000);

