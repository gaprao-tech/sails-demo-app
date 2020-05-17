const passport = require('passport')

module.exports = async function (req, res, next) {

    // If `req.me` is set, then we know that this request originated
    // from a logged-in user.  So we can safely proceed to the next policy--
    // or, if this is the last policy, the relevant action.
    // > For more about where `req.me` comes from, check out this app's
    // > custom hook (`api/hooks/custom/index.js`).
    passport.authenticate('jwt', function(err, user, info){
      if((err) || (!user)) {
        return res.status(403).json({error: 'forbidden'})
      }
      req.user = user
      return next()
    })(req, res);
  };