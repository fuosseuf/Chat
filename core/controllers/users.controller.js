var Users = require('../models/users.model');

exports.controller = function(app){
	app.get('/', function(req, res){

		Users.add({name:"toto", email:'titi@toto'},function(data){
			console.log(data);
		});
		res.render('index.html.twig');
	})
};