/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const passport = require('passport');
const jwt = require('jsonwebtoken');
module.exports = {
    register: async function(req, res){
        let user = await Users.create({
            username: req.body.username,
            password: req.body.password
        }).fetch()
        return res.ok({
            id: user.id,
            username: user.username,
        })
    },
    registerView: async function(req, res){
        await Users.create({
            username: req.body.username,
            password: req.body.password
        })
        res.redirect('/login')
    },
    login: function(req, res) {
        passport.authenticate('local', function(err, user, info){
            if((err) || (!user)) {
                return res.send({
                message: info.message,
                user
                });
            }
            req.logIn(user, function(err) {
                if(err) res.send(err);
                const payload = {
                    sub: req.body.username,
                    iat: new Date().getTime()
                 };
                 const SECRET = "secret";

                return res.ok({
                    id: user.id,
                    username: user.username,
                    access_token: jwt.sign(payload, SECRET)
                });
            });
        })(req, res);
    },
    loginView: function(req, res) {
        passport.authenticate('local', function(err, user, info){
            if((err) || (!user)) {
                return res.send({
                    message: info.message,
                    user
                });
            }
            req.logIn(user, function(err) {
                if(err) res.send(err);
                const payload = {
                    sub: req.body.username,
                    iat: new Date().getTime()
                 };
                 const SECRET = "secret";

                return res.view('pages/userInfo', {
                    id: user.id,
                    username: user.username,
                    access_token: jwt.sign(payload, SECRET)
                });
            });
        })(req, res);
    },
    logout: function(req, res) {
        req.logout();
        res.redirect('/');
    }
};

