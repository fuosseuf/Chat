var express = require('express'),
	server = require('http'),
        path = require('path'),
	config = require('./core/config');

var app = express();
app.use(express.static(path.join(__dirname, 'public')));

config.config(app);
app.listen(3030, function(){
	console.log('Demarrage du server ...');
});