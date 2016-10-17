
var bodyParser = require('body-parser'),
	twig = require('twig');
	//parameters = require('./parameters'),
	//io = require('socket.io');var 
	//mysql      = require('mysql');



exports.config = function (app){
	app.set("twig options", { strict_variables: false });
	app.set("views", __dirname + '/views');
	app.use(bodyParser.urlencoded({ extended: false }));
	//app.use(session({ secret: 'Langouste', cookie: { maxAge: 60000 }}));


	var users = require('./controllers/users.controller');
	users.controller(app);

};

