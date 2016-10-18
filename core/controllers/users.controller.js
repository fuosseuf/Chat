var Users = require('../models/users.model');
var ent = require('ent');

exports.controller = function (app) {
    app.post('/login', function (req, res) {
        var user = {
            username: ent.encode(req.body.username),
            password: ent.encode(req.body.pwd),
            email: "toto@fffk"
        };

        req.session.user = user;
        res.redirect('/tchat');
//        Users.authenticate(user, function (data) {
//            if (data == false) {
//                res.redirect('/');
//            } else {
//                req.session.user = data;
//                res.redirect('/tchat');
//            }
//        });
    });

    app.post('/register', function (req, res) {
        if (ent.encode(req.body.pswd) != ent.encode(req.body.repswd))
            res.redirect('/');
        var user = {
            username: ent.encode(req.body.username),
            email: ent.encode(req.body.email),
            password: ent.encode(req.body.pswd),
        };

        Users.add(user, function (data) {
            if (data == false) {
                res.redirect('/');
            } else {
                res.redirect('/tchat');
            }
        });

    });
};