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
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        }).fetch()
        return res.ok({
            id: user.id,
            username: user.username,
            email: user.email
        })
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
                    iat: new Date().getTime()//มาจากคำว่า issued at time (สร้างเมื่อ)
                 };
                 const SECRET = "secret"; //ในการใช้งานจริง คีย์นี้ให้เก็บเป็นความลับ
                //  res.send(jwt.encde(payload, SECRET));

                return res.ok({
                email: user.email,
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

