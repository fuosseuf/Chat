
var bodyParser = require('body-parser'),
        twig = require('twig'),
        fs = require('fs'),
        session = require('express-session'),
        mysql = require('mysql'),
        params = require('./parameters');


exports.config = function (app) {

    //configuration de la bdd
    var db = mysql.createConnection({
        host: params.dbhost,
        user: params.dbuser,
        password: params.dbpwd,
        database: params.dbname
    });
    db.connect();

    //configuration générale
    app.set("twig options", {strict_variables: false});
    app.set("db", db);
    app.set("views", __dirname + '/views');
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(session({secret: 'keyboard cat', cookie: {maxAge: 60000}}));


    //chargement automatique des controllers
    fs.readdirSync(__dirname + '/controllers').forEach(function (file) {
        if (file.substr(-3) == '.js') {
            route = require('./controllers/' + file);
            route.controller(app);
        }
    });



};

