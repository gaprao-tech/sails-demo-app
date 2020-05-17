/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const passport = require('passport')
const jwt = require('jsonwebtoken');

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
  },
  userView: async(req, res) => {
    let userID = req.session && req.session.passport && req.session.passport.user
    if (!userID) {
      return res.status(401).json({error: 'unauthorized'})
    }
    let user = await Users.findOne({id: userID})
    if (!user) {
      return res.status(401).json({error: 'unauthorized'})
    }
    const payload = {
        sub: user.username,
        iat: new Date().getTime()
    };
    return res.view('pages/userInfo', {
        id: user.id,
        username: user.username,
        access_token: jwt.sign(payload, sails.config.jwt.secret)
    });
  }
};

