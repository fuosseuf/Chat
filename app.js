var app = require('express')(),
	server = require('http'),
	config = require('./core/config');


config.config(app);
app.listen(3030, function(){
	console.log('Demarrage du server ...');
});