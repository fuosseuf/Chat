var Users = require('../models/users.model');

exports.controller = function (app) {
    app.get('/connect', function (req, res) {
        var user = {
            username: req.body.username,
            password: req.body.pwd,
        };

        Users.authenticate(user, function (data) {
            if (data == false) {
                res.redirect('/');
            } else {
                res.redirect(200, '/tchat', user);
            }
        });
    });

    app.post('/register', function (req, res) {
        if (req.body.pswd != req.body.repswd)
            res.redirect('/');
        var user = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.pswd,
        };

        Users.add(user, function (data) {
            if (data == false) {
                res.redirect(200, '/');
            } else {
                res.redirect(200, '/tchat');
            }
        });

    });
};