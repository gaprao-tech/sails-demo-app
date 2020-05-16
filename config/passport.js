const passport = require('passport'),
      LocalStrategy = require('passport-local').Strategy,
      bcrypt = require('bcrypt-nodejs');

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb){
  Users.findOne({id}, function(err, users) {
    cb(err, users);
  });
});

const JWT = require('passport-jwt')
var JwtStrategy = JWT.Strategy,
    ExtractJwt = JWT.ExtractJwt;

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

passport.use(new JwtStrategy(opts, function(payload, next) {
    Users.findOne({username: payload.sub}, function(err, user) {
        if (err) {
            return next(err, false);
        } else if (user) {
            return next(null, user);
        } else {
            return next(null, false);
        }
    });
}));

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
  }, function(username, password, next){
    Users.findOne({username: username}, function(err, user){
        if(err) return next(err);
        if(!user) return next(null, false, {message: 'Username not found'});
    bcrypt.compare(password, user.password, function(err, res){
        if(!res) return next(null, false, { message: 'Invalid Password' });
        let userDetails = {
                email: user.email,
                username: user.username,
                id: user.id
            };
        return next(null, userDetails, { message: 'Login Succesful'});
    });
  });
}));

