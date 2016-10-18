
var bodyParser = require('body-parser'),
        twig = require('twig'),
        fs = require('fs'),
        session = require('express-session');



exports.config = function (app) {
    app.set("twig options", {strict_variables: false});
    app.set("views", __dirname + '/views');
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}));
    var io = app.get('io');
    //io.use()


    fs.readdirSync( __dirname +'/controllers').forEach(function (file) {
        if (file.substr(-3) == '.js') {
            route = require('./controllers/' + file);
            route.controller(app);
        }
    });



};

