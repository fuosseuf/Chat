
var bodyParser = require('body-parser'),
        twig = require('twig'),
        fs = require('fs');



exports.config = function (app) {
    app.set("twig options", {strict_variables: false});
    app.set("views", __dirname + '/views');
    app.use(bodyParser.urlencoded({extended: false}));


    fs.readdirSync( __dirname +'/controllers').forEach(function (file) {
        if (file.substr(-3) == '.js') {
            route = require('./controllers/' + file);
            route.controller(app);
        }
    });



};

