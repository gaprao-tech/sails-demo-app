/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

 const passport = require('passport')

module.exports = {
  _config: {
    shortcuts: false,
    rest: false
  },
  user: async(req, res) => {
    passport.authenticate('jwt', function(err, user, info){
      if((err) || (!user)) {
        return res.badRequest({})
      }
      return res.ok(user)
    })(req, res);
  }
};

