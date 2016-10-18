var Users = require('../models/users.model');
var ent = require('ent');

exports.controller = function (app) {
    var db = app.get('db');
    app.post('/login', function (req, res) {
        var user = {
            username: req.body.username,
            password: req.body.pwd,
        };

        Users.authenticate(user, db, function (data) {
            if (data == false) {
                res.redirect('/');
            } else {
                req.session.user = data;
                res.redirect('/tchat');
            }
        });
    });

    app.post('/register', function (req, res) {
        if (ent.encode(req.body.pswd) != ent.encode(req.body.repswd))
            res.redirect('/');
        var user = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.pswd,
        };

        Users.add(user, db, function (data) {
            if (data == false) {
                res.redirect('/');
            } else {
                Users.getByUsername(user.username, db, function (u) {
                    if (data == false) {
                        res.redirect('/');
                    } else {
                        req.session.user = u;
                        res.redirect('/tchat');
                    }
                });
            }
        });

    });
};